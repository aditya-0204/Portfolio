import express from "express";
import cors from "cors";
import { getStats } from "./stats-service.js";

const app = express();

const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://aditya-0204.github.io",
]);

if (process.env.FRONTEND_ORIGIN) {
  allowedOrigins.add(process.env.FRONTEND_ORIGIN);
}

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  methods: ["GET", "OPTIONS"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

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
