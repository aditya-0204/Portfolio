import axios from "axios";
import * as cheerio from "cheerio";

const USERNAMES = {
  leetcode: "error_2003",
  codeforces: "adityakumawat2003",
  codechef: "aditya0203",
};

const FALLBACK_STATS = {
  leetcode: {
    solved: 300,
    contestRating: "unrated",
  },
  codeforces: {
    solved: 0,
    rating: 0,
    rank: "unrated",
  },
  codechef: {
    solved: 0,
    rating: 0,
    stars: "-",
  },
};

let cache = null;
let lastFetch = 0;
const CACHE_TIME = 10 * 60 * 1000;

function logFetchError(source, err) {
  const status = err?.response?.status;
  const statusText = err?.response?.statusText;
  const code = err?.code;
  const message = err?.message || "Unknown error";

  console.log(
    `${source} failed: ${message}` +
      (code ? ` | code=${code}` : "") +
      (status ? ` | status=${status}` : "") +
      (statusText ? ` ${statusText}` : "")
  );
}

function extractCodeChefSolvedCount($, html) {
  let problemsSolved = 0;

  $(".content .problem-solved").each((i, el) => {
    const count = $(el).find("span").last().text().trim();
    problemsSolved += Number(count || 0);
  });

  if (problemsSolved > 0) {
    return problemsSolved;
  }

  const regexPatterns = [
    /Total Problems Solved[\s\S]{0,80}?(\d[\d,]*)/i,
    /Problems Solved[\s\S]{0,80}?(\d[\d,]*)/i,
    /"totalProblemsSolved"\s*:\s*"?(\d+)"?/i,
    /"problemsSolved"\s*:\s*"?(\d+)"?/i,
  ];

  for (const pattern of regexPatterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      return Number(match[1].replace(/,/g, ""));
    }
  }

  return 0;
}

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
    const problemsSolved = extractCodeChefSolvedCount($, data);

    if (!problemsSolved) {
      console.log("CodeChef solved count not found in public profile markup");
    }

    return {
      solved: problemsSolved,
      rating: Number(rating || FALLBACK_STATS.codechef.rating),
      stars: stars || FALLBACK_STATS.codechef.stars,
    };
  } catch (err) {
    logFetchError("CodeChef", err);
    return { ...FALLBACK_STATS.codechef };
  }
}

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
            profile {
              ranking
            }
          }
          userContestRanking(username: $username) {
            rating
            attendedContestsCount
          }
          userContestRankingHistory(username: $username) {
            attended
            rating
            contest {
              title
              startTime
            }
          }
        }
      `,
      variables: { username },
    };

    const response = await axios.post("https://leetcode.com/graphql", query, {
      headers: { "Content-Type": "application/json" },
    });

    const stats =
      response.data?.data?.matchedUser?.submitStats?.acSubmissionNum || [];
    const currentContestRating = response.data?.data?.userContestRanking?.rating;
    const rankingHistory =
      response.data?.data?.userContestRankingHistory?.filter(
        (entry) => entry?.attended && typeof entry?.rating === "number"
      ) || [];
    const latestHistoryRating =
      rankingHistory.length > 0
        ? rankingHistory[rankingHistory.length - 1]?.rating
        : null;

    let totalSolved = 0;

    stats.forEach((item) => {
      if (item.difficulty === "All") {
        totalSolved = item.count;
      }
    });

    return {
      solved: totalSolved || FALLBACK_STATS.leetcode.solved,
      contestRating: Math.round(
        currentContestRating ||
          latestHistoryRating ||
          FALLBACK_STATS.leetcode.contestRating
      ),
    };
  } catch (err) {
    logFetchError("LeetCode", err);
    return { ...FALLBACK_STATS.leetcode };
  }
}

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
    logFetchError("Codeforces", err);
    return { ...FALLBACK_STATS.codeforces };
  }
}

export async function getStats() {
  if (cache && Date.now() - lastFetch < CACHE_TIME) {
    return cache;
  }

  const [leetcode, codeforces, codechef] = await Promise.all([
    fetchLeetCode(USERNAMES.leetcode),
    fetchCodeforces(USERNAMES.codeforces),
    fetchCodeChef(USERNAMES.codechef),
  ]);

  const response = {
    leetcode,
    codeforces,
    codechef,
  };

  cache = response;
  lastFetch = Date.now();

  return response;
}
