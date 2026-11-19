
import { BigQuery } from "@google-cloud/bigquery";

export function getBigQueryClient() {
  const projectId = process.env.GCP_PROJECT_ID;

  if (!projectId) {
    throw new Error("GCP_PROJECT_ID is missing.");
  }

  // Vercel authentication using environment variable
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (serviceAccountKey) {
    const credentials = JSON.parse(serviceAccountKey);

    return new BigQuery({
      projectId,
      credentials,
    });
  }

  // Local development authentication using JSON file
  const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (keyFilename) {
    return new BigQuery({
      projectId,
      keyFilename,
    });
  }

  throw new Error("BigQuery credentials are missing.");
}
