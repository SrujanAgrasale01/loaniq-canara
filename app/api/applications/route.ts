
import { NextRequest, NextResponse } from "next/server";
import { getBigQueryClient } from "../../lib/bigquery";

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

    const bigquery = getBigQueryClient();
    const applicationId = request.nextUrl.searchParams.get("id");

    const query = `
      SELECT
        a.application_id,
        a.customer_id,
        c.full_name,
        c.date_of_birth,
        c.city AS customer_city,
        c.employer,
        c.designation,
        c.employment_type,
        c.monthly_net_income,
        c.kyc_status,
        a.loan_amount,
        a.property_value,
        a.property_city,
        a.tenure_years,
        a.interest_rate,
        a.requested_date,
        a.status
      FROM \`${projectId}.${dataset}.applications\` AS a
      LEFT JOIN \`${projectId}.${dataset}.customers\` AS c
        ON a.customer_id = c.customer_id
      WHERE @applicationId IS NULL
         OR a.application_id = @applicationId
      ORDER BY a.requested_date DESC
      LIMIT 100
    `;

    const [rows] = await bigquery.query({
      query,
      params: { applicationId },
      types: { applicationId: "STRING" },
    });

    const applications = rows.map((row: any) => ({
      applicationId: row.application_id,
      customerId: row.customer_id,
      fullName: row.full_name ?? "Unknown",
      dateOfBirth: row.date_of_birth?.value ?? null,
      customerCity: row.customer_city ?? null,
      employer: row.employer ?? null,
      designation: row.designation ?? null,
      employmentType: row.employment_type ?? null,
      monthlyIncome: Number(row.monthly_net_income ?? 0),
      kycStatus: row.kyc_status ?? "Unknown",
      loanAmount: Number(row.loan_amount ?? 0),
      propertyValue: Number(row.property_value ?? 0),
      propertyCity: row.property_city ?? null,
      tenureYears: Number(row.tenure_years ?? 0),
      interestRate: Number(row.interest_rate ?? 0),
      requestedDate: row.requested_date?.value ?? null,
      status: row.status ?? "Unknown",
    }));

    return NextResponse.json({
      success: true,
      source: "Google BigQuery",
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Applications BigQuery error:", error);

    return NextResponse.json(
      { success: false, error: "Unable to retrieve applications." },
      { status: 500 }
    );
  }
}
