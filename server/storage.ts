import { readFileSync } from "fs";
import { join } from "path";
import type { VillageRecord } from "@shared/schema";

interface RawVillageData {
  "THANA/VILLAGE_NAME ": string;
  "THANA_NO": string;
  "CIRCLE_NAME ": string;
}

export interface IStorage {
  getVillages(): Promise<VillageRecord[]>;
}

export class MemStorage implements IStorage {
  private villages: VillageRecord[];

  constructor() {
    this.villages = this.loadVillageData();
  }

  private loadVillageData(): VillageRecord[] {
    try {
      const dataPath = join(process.cwd(), "attached_assets", "tableConvert.com_pvw6ux_1766081014499.json");
      const rawData = readFileSync(dataPath, "utf-8");
      const jsonData: RawVillageData[] = JSON.parse(rawData);

      return jsonData.map((item) => ({
        villageName: (item["THANA/VILLAGE_NAME "] || "").trim(),
        thanaNo: (item["THANA_NO"] || "").trim(),
        circleName: (item["CIRCLE_NAME "] || "").trim(),
      }));
    } catch (error) {
      console.error("Error loading village data:", error);
      return [];
    }
  }

  async getVillages(): Promise<VillageRecord[]> {
    return this.villages;
  }
}

export const storage = new MemStorage();
