
import { NextResponse } from "next/server";
import { getBigQueryClient } from "../../lib/bigquery";

export async function GET() {
  try {
    const projectId = process.env.GCP_PROJECT_ID;
    const dataset = process.env.BIGQUERY_DATASET;

    if (!projectId || !dataset) {
      return NextResponse.json(
        { success: false, error: "BigQuery environment variables are missing." },
        { status: 500 }
      );
    }

    const bigquery = getBigQueryClient();

    const query = `
      SELECT table_name, table_type
      FROM \`${projectId}.${dataset}.INFORMATION_SCHEMA.TABLES\`
      ORDER BY table_name
    `;

    const [rows] = await bigquery.query({ query });

    return NextResponse.json({
      success: true,
      project: projectId,
      dataset,
      tableCount: rows.length,
      tables: rows.map((row: { table_name: string; table_type: string }) => ({
        name: row.table_name,
        type: row.table_type,
      })),
    });
  } catch (error) {
    console.error("BigQuery connection failed:", error);

    return NextResponse.json(
      { success: false, error: "Could not connect to BigQuery. Check server logs." },
      { status: 500 }
    );
  }
}
