import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();
app.use(cors());

/* ---------- CODECHEF API ---------- */
app.get("/codechef/:username", async (req, res) => {
  try {
    const username = req.params.username;

    /* ---------- PROFILE PAGE ---------- */
    const { data } = await axios.get(
      `https://www.codechef.com/users/${username}`
    );

    const $ = cheerio.load(data);

    // Basic profile info
    const rating = $(".rating-number").first().text().trim();
    const stars = $(".rating").first().text().trim();

    const highestRating = $(".rating-header small")
      .text()
      .replace("Highest Rating", "")
      .trim();

    const globalRank = $("div.rating-ranks li")
      .first()
      .find("strong")
      .text()
      .trim();

    const countryRank = $("div.rating-ranks li")
      .eq(1)
      .find("strong")
      .text()
      .trim();

    /* ---------- TOTAL PROBLEMS SOLVED ---------- */
    let problemsSolved = "N/A";

    try {
      // CodeChef submissions API
      const submissionsRes = await axios.get(
        `https://www.codechef.com/recent/user?page=0&user_handle=${username}`
      );

      const submissions = submissionsRes.data;

      if (Array.isArray(submissions)) {
        const solvedSet = new Set();

        submissions.forEach((sub) => {
          if (sub.status === "AC") {
            solvedSet.add(sub.problem_code);
          }
        });

        problemsSolved = solvedSet.size;
      }
    } catch (err) {
      console.log("Could not fetch solved count");
    }

    /* ---------- RESPONSE ---------- */
    res.json({
      username,
      rating: rating || "N/A",
      stars: stars || "N/A",
      highestRating: highestRating || "N/A",
      globalRank: globalRank || "N/A",
      countryRank: countryRank || "N/A",
      problemsSolved,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to fetch CodeChef data",
    });
  }
});



/* ---------- LEETCODE LAST SOLVED ---------- */
app.get("/leetcode/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const query = {
      query: `
        query recentAcSubmissions($username: String!) {
          recentAcSubmissionList(username: $username) {
            title
            titleSlug
            timestamp
          }
        }
      `,
      variables: { username },
    };

    const response = await axios.post(
      "https://leetcode.com/graphql",
      query,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const lastSolved =
      response.data?.data?.recentAcSubmissionList?.[0];

    res.json({
      username,
      lastSolved: lastSolved || null,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Failed to fetch LeetCode data",
    });
  }
});
/* ---------- START SERVER ---------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
