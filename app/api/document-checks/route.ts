
import { NextRequest, NextResponse } from "next/server";
import { getBigQueryClient } from "../../lib/bigquery";

// Mask PAN numbers, keeping only the first 2 and last 2 characters.
function maskPAN(value: string | null) {
  if (!value) return value;

  if (value.length <= 4) {
    return "****";
  }

  return value.slice(0, 2) + "*".repeat(value.length - 4) + value.slice(-2);
}

// Mask bank account numbers, keeping only the last 4 digits.
function maskAccount(value: string | null) {
  if (!value) return value;

  if (value.length <= 4) {
    return "****";
  }

  return "*".repeat(value.length - 4) + value.slice(-4);
}

export async function GET(request: NextRequest) {
  try {
    const projectId = process.env.GCP_PROJECT_ID;
    const dataset = process.env.BIGQUERY_DATASET;

    if (!projectId || !dataset) {
      return NextResponse.json(
        { success: false, error: "BigQuery configuration is missing." },
        { status: 500 }
      );
    }

    const applicationId = request.nextUrl.searchParams.get("id");

    if (!applicationId) {
      return NextResponse.json(
        { success: false, error: "Please provide an application ID." },
        { status: 400 }
      );
    }

    const bigquery = getBigQueryClient();

    const checksQuery = `
      SELECT
        application_id,
        check_name,
        value_a,
        value_b,
        diff_pct,
        result,
        detail
      FROM \`${projectId}.${dataset}.doc_checks\`
      WHERE application_id = @applicationId
    `;

    const extractionsQuery = `
      SELECT
        application_id,
        doc_type,
        field,
        value,
        confidence
      FROM \`${projectId}.${dataset}.doc_extractions\`
      WHERE application_id = @applicationId
    `;

    const [checksResult, extractionsResult] = await Promise.all([
      bigquery.query({
        query: checksQuery,
        params: { applicationId },
      }),
      bigquery.query({
        query: extractionsQuery,
        params: { applicationId },
      }),
    ]);

    // Mask PAN values in document verification comparisons.
    const checks = checksResult[0].map((row: any) => {
      const isPAN = row.check_name?.toLowerCase().includes("pan");

      return {
        checkName: row.check_name,
        valueA: isPAN ? maskPAN(row.value_a) : row.value_a,
        valueB: isPAN ? maskPAN(row.value_b) : row.value_b,
        differencePercent:
          row.diff_pct === null ? null : Number(row.diff_pct),
        result: row.result,
        detail: row.detail,
      };
    });

    // Mask sensitive values in extracted document fields.
    const extractions = extractionsResult[0].map((row: any) => {
      const field = row.field?.toLowerCase();

      let safeValue = row.value;

      if (field === "pan") {
        safeValue = maskPAN(row.value);
      } else if (
        field === "account_no" ||
        field === "account_number"
      ) {
        safeValue = maskAccount(row.value);
      }

      return {
        documentType: row.doc_type,
        field: row.field,
        value: safeValue,
        confidence:
          row.confidence === null ? null : Number(row.confidence),
      };
    });

    return NextResponse.json({
      success: true,
      source: "Google BigQuery",
      applicationId,
      summary: {
        totalChecks: checks.length,
        totalExtractions: extractions.length,
        failedChecks: checks.filter(
          (item: any) =>
            item.result?.toUpperCase() === "FAIL" ||
            item.result?.toUpperCase() === "FAILED"
        ).length,
      },
      checks,
      extractions,
    });
  } catch (error) {
    console.error("Document verification BigQuery error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to retrieve document verification data.",
      },
      { status: 500 }
    );
  }
}
