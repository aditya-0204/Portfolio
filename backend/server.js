import express from "express";
import cors from "cors";
import { getStats } from "./stats-service.js";

const app = express();
app.use(cors());

app.get("/stats", async (req, res) => {
  try {
    const response = await getStats();
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

app.get("/api/stats", async (req, res) => {
  try {
    const response = await getStats();
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* =====================================================
   START SERVER
===================================================== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
