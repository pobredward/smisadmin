import { google } from "googleapis";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 }); // 5분 TTL

const sheets = google.sheets("v4");

async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: process.env.GOOGLE_TYPE,
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"), // 줄바꿈 문자 처리
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
      universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const authClient = await auth.getClient();
  return authClient;
}

async function fetchSheetData(spreadsheetId, range) {
  try {
    const authClient = await getAuthClient();

    const response = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range,
    });
    return response.data.values;
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    throw error;
  }
}

export default async function handler(req, res) {
  const { spreadsheetId, sheetKey } = req.query;
  const cacheKey = `sheetData-${spreadsheetId}-${sheetKey}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return res.status(200).json(cachedData);
  }

  try {
    const range = sheetKey.startsWith("All") ? "ST!A2:AQ" : "ST!A1:AQ";
    const data = await fetchSheetData(spreadsheetId, range);
    cache.set(cacheKey, data); // 데이터 캐싱
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
