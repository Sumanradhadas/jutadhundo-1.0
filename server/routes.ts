import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/villages", async (_req, res) => {
    try {
      const villages = await storage.getVillages();
      res.json(villages);
    } catch (error) {
      console.error("Error fetching villages:", error);
      res.status(500).json({ error: "Failed to fetch village data" });
    }
  });

  return httpServer;
}
