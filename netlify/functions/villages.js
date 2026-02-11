import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let cachedVillages = null;

function loadVillageData() {
  if (cachedVillages) {
    return cachedVillages;
  }
  
  try {
    const dataPath = path.join(__dirname, 'data', 'villages.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const jsonData = JSON.parse(rawData);
    
    cachedVillages = jsonData.map((item) => ({
      villageName: (item["THANA/VILLAGE_NAME "] || "").trim(),
      thanaNo: (item["THANA_NO"] || "").trim(),
      circleName: (item["CIRCLE_NAME "] || "").trim(),
    }));
    
    return cachedVillages;
  } catch (error) {
    console.error("Error loading village data:", error);
    return [];
  }
}

export default async (req, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Cache-Control': 'public, max-age=3600',
  };

  if (req.method === 'OPTIONS') {
    return new Response('', {
      status: 200,
      headers,
    });
  }

  try {
    const villages = loadVillageData();
    return new Response(JSON.stringify(villages), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error fetching villages:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch village data" }),
      {
        status: 500,
        headers,
      }
    );
  }
};
