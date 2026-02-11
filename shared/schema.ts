import { z } from "zod";

export const villageRecordSchema = z.object({
  villageName: z.string(),
  thanaNo: z.string(),
  circleName: z.string(),
});

export type VillageRecord = z.infer<typeof villageRecordSchema>;

export interface GroupedResult {
  thanaNo: string;
  circleName: string;
  villages: string[];
}

export interface SearchResult {
  item: VillageRecord;
  score?: number;
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
  city: string;
  ip?: string;
  region?: string;
  country?: string;
}

export const DISTRICTS = [
  "Araria",
  "Arwal",
  "Aurangabad",
  "Banka",
  "Begusarai",
  "Bettiah",
  "Bhabhua (Kaimur)",
  "Bhagalpur",
  "Bhojpur",
  "Buxar",
  "Darbhanga",
  "Gaya",
  "Gopalganj",
  "Jamui",
  "Jehanabad",
  "Katihar",
  "Khagaria",
  "Kishanganj",
  "Lakhisarai",
  "Madhepura",
  "Madhubani",
  "Motihari",
  "Munger",
  "Muzaffarpur",
  "Nalanda",
  "Nawada",
  "Patna",
  "Purnea",
  "Rohtas (Sasaram)",
  "Saharsa",
  "Samastipur",
  "Saran",
  "Seikhpura",
  "Shivhar",
  "Sitamarhi",
  "Siwan",
  "Supaul",
  "Vaishali (Hajipur)"
];
