import { getStats } from "../backend/stats-service.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const stats = await getStats();
    return res.status(200).json(stats);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch stats" });
  }
}
