
import { NextResponse } from "next/server";
import { getBigQueryClient } from "../../lib/bigquery";

export async function GET() {
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

    const summaryQuery = `
      SELECT
        COUNT(*) AS total_applications,
        COALESCE(SUM(loan_amount), 0) AS total_requested_amount,
        COUNT(DISTINCT customer_id) AS total_customers
      FROM \`${projectId}.${dataset}.applications\`
    `;

    const statusQuery = `
      SELECT
        status,
        COUNT(*) AS application_count
      FROM \`${projectId}.${dataset}.applications\`
      GROUP BY status
      ORDER BY application_count DESC
    `;

    const recentQuery = `
      SELECT
        a.application_id,
        a.customer_id,
        c.full_name,
        a.loan_amount,
        a.property_city,
        a.status,
        a.requested_date
      FROM \`${projectId}.${dataset}.applications\` AS a
      LEFT JOIN \`${projectId}.${dataset}.customers\` AS c
        ON a.customer_id = c.customer_id
      ORDER BY a.requested_date DESC
      LIMIT 10
    `;

    const [summaryResult, statusResult, recentResult] =
      await Promise.all([
        bigquery.query({ query: summaryQuery }),
        bigquery.query({ query: statusQuery }),
        bigquery.query({ query: recentQuery }),
      ]);

    const summary = summaryResult[0][0];

    return NextResponse.json({
      success: true,
      source: "Google BigQuery",
      summary: {
        totalApplications: Number(summary.total_applications),
        totalRequestedAmount: Number(summary.total_requested_amount),
        totalCustomers: Number(summary.total_customers),
      },
      statusBreakdown: statusResult[0].map((row: any) => ({
        status: row.status,
        count: Number(row.application_count),
      })),
      recentApplications: recentResult[0].map((row: any) => ({
        applicationId: row.application_id,
        customerId: row.customer_id,
        customerName: row.full_name ?? "Unknown",
        loanAmount: Number(row.loan_amount),
        propertyCity: row.property_city,
        status: row.status,
        requestedDate: row.requested_date?.value ?? null,
      })),
    });
  } catch (error) {
    console.error("Dashboard BigQuery error:", error);

    return NextResponse.json(
      { success: false, error: "Unable to retrieve dashboard data." },
      { status: 500 }
    );
  }
}
