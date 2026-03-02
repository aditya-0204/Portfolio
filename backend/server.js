import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();
app.use(cors());

/* =====================================================
   CODECHEF HELPER (Stable Version)
===================================================== */
async function fetchCodeChef(username) {
  try {
    const { data } = await axios.get(
      `https://www.codechef.com/users/${username}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    const $ = cheerio.load(data);

    const rating = $(".rating-number").first().text().trim();
    const stars = $(".rating").first().text().trim();

    let problemsSolved = 0;

    // Scrape total solved from profile
    $(".content .problem-solved").each((i, el) => {
      const count = $(el).find("span").last().text().trim();
      problemsSolved += Number(count || 0);
    });

    return {
      solved: problemsSolved,
      rating: Number(rating || 0),
      stars: stars || "-",
    };
  } catch (err) {
    console.log("CodeChef failed:", err.message);
    return { solved: 0, rating: 0, stars: "-" };
  }
}

/* =====================================================
   LEETCODE HELPER (Official GraphQL)
===================================================== */
async function fetchLeetCode(username) {
  try {
    const query = {
      query: `
        query userProfile($username: String!) {
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }
      `,
      variables: { username },
    };

    const response = await axios.post(
      "https://leetcode.com/graphql",
      query,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const stats =
      response.data?.data?.matchedUser?.submitStats?.acSubmissionNum || [];

    let totalSolved = 0;

    stats.forEach((item) => {
      if (item.difficulty === "All") {
        totalSolved = item.count;
      }
    });

    return totalSolved;
  } catch (err) {
    console.log("LeetCode failed:", err.message);
    return 0;
  }
}

/* =====================================================
   CODEFORCES HELPER (Cloudflare Safe)
===================================================== */
async function fetchCodeforces(username) {
  try {
    const headers = {
      "User-Agent": "Mozilla/5.0",
    };

    const statusRes = await axios.get(
      `https://codeforces.com/api/user.status?handle=${username}`,
      { headers }
    );

    if (statusRes.data.status !== "OK") {
      throw new Error("CF status failed");
    }

    const submissions = statusRes.data.result;
    const solvedSet = new Set();

    submissions.forEach((sub) => {
      if (sub.verdict === "OK") {
        solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
      }
    });

    const infoRes = await axios.get(
      `https://codeforces.com/api/user.info?handles=${username}`,
      { headers }
    );

    if (infoRes.data.status !== "OK") {
      throw new Error("CF info failed");
    }

    const info = infoRes.data.result[0];

    return {
      solved: solvedSet.size,
      rating: info.rating || 0,
      rank: info.rank || "unrated",
    };
  } catch (err) {
    console.log("Codeforces failed:", err.message);
    return { solved: 0, rating: 0, rank: "unrated" };
  }
}

/* =====================================================
   CACHE SYSTEM (10 Minutes)
===================================================== */
let cache = null;
let lastFetch = 0;
const CACHE_TIME = 10 * 60 * 1000;

/* =====================================================
   MAIN STATS ROUTE
===================================================== */
app.get("/stats", async (req, res) => {
  try {
    if (cache && Date.now() - lastFetch < CACHE_TIME) {
      return res.json(cache);
    }

    const lcUser = "error_2003";
    const cfUser = "adityakumawat2003";
    const ccUser = "aditya0203";

    const [leetcode, codeforces, codechef] =
      await Promise.all([
        fetchLeetCode(lcUser),
        fetchCodeforces(cfUser),
        fetchCodeChef(ccUser),
      ]);

    const response = {
      leetcode,
      codeforces,
      codechef,
    };

    cache = response;
    lastFetch = Date.now();

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

/* =====================================================
   START SERVER
===================================================== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});