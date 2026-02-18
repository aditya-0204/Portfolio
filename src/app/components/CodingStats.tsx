import { useEffect, useState, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "motion/react";

/* ---------------- TYPES ---------------- */

type StatsType = {
  loading: boolean;
  leetcode: number;
  codeforces: {
    solved: number;
    rating: number;
    rank: string;
  } | null;
  codechef: {
    stars: string;
    rating: number;
    solved: number;
  } | null;
};

/* ---------------- HELPERS ---------------- */

function getCFColor(rank?: string) {
  if (!rank) return "text-neutral-300";
  rank = rank.toLowerCase();

  if (rank.includes("newbie")) return "text-gray-400";
  if (rank.includes("pupil")) return "text-green-400";
  if (rank.includes("specialist")) return "text-cyan-400";
  if (rank.includes("expert")) return "text-blue-400";
  if (rank.includes("candidate master")) return "text-purple-400";
  if (rank.includes("master")) return "text-orange-400";
  if (rank.includes("grandmaster")) return "text-red-400";

  return "text-neutral-300";
}

/* ---------- COUNT ANIMATION ---------- */

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 80, damping: 20 });

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useMotionValueEvent(spring, "change", (latest) => {
    setDisplay(Math.round(latest));
  });

  return <motion.span ref={ref}>{display}</motion.span>;
}

/* ---------------- COMPONENT ---------------- */

export default function CodingStats() {
  const [stats, setStats] = useState<StatsType>({
    loading: true,
    leetcode: 0,
    codeforces: null,
    codechef: null,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        /* ---------- LEETCODE ---------- */
        const lcRes = await fetch(
          "https://leetcode-api-faisalshohag.vercel.app/error_2003"
        );
        const lcData = await lcRes.json();
        const lcSolved = lcData.totalSolved || 0;

        /* ---------- CODEFORCES ---------- */
        const cfRes = await fetch(
          "https://codeforces.com/api/user.status?handle=adityakumawat2003"
        );
        const cfData = await cfRes.json();

        const solvedSet = new Set<string>();
        cfData?.result?.forEach((sub: any) => {
          if (sub.verdict === "OK") {
            solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
          }
        });

        const cfInfoRes = await fetch(
          "https://codeforces.com/api/user.info?handles=adityakumawat2003"
        );
        const cfInfo = await cfInfoRes.json();

        /* ---------- CODECHEF (YOUR API) ---------- */
        const ccRes = await fetch(
          "http://localhost:3000/codechef/aditya0203"
        );
        const ccData = await ccRes.json();

        setStats({
          loading: false,
          leetcode: lcSolved,
          codeforces: {
            solved: solvedSet.size,
            rating: cfInfo?.result?.[0]?.rating || 0,
            rank: cfInfo?.result?.[0]?.rank || "unrated",
          },
          codechef: {
            stars: ccData?.stars || "-",
            rating: Number(ccData?.rating || 0),
            solved: Number(ccData?.problemsSolved || 0), // ⭐ FIXED
          },
        });
      } catch (err) {
        console.error(err);
        setStats((s) => ({ ...s, loading: false }));
      }
    }

    fetchStats();
  }, []);

  if (stats.loading) {
    return (
      <div className="py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 rounded-2xl bg-neutral-900 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  const totalSolved =
    stats.leetcode +
    (stats.codeforces?.solved || 0) +
    (stats.codechef?.solved || 0);

  return (
    <div className="py-8">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
        Live Coding <span className="text-lime-400">Stats</span>
      </h2>

      <p className="text-neutral-400 mb-10">
        Total Solved:{" "}
        <span className="text-white font-bold text-xl">
          <AnimatedNumber value={totalSolved} />+
        </span>
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        {/* ---------- LEETCODE ---------- */}
        <motion.a
          href="https://leetcode.com/u/error_2003/"
          target="_blank"
          whileHover={{ scale: 1.03 }}
          className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800"
        >
          <h3 className="text-orange-400 text-xl font-semibold">LeetCode</h3>
          <p className="text-5xl font-bold text-white mt-3">
            <AnimatedNumber value={stats.leetcode} />
          </p>
          <p className="text-neutral-400">Problems Solved</p>
        </motion.a>

        {/* ---------- CODEFORCES ---------- */}
        <motion.a
          href="https://codeforces.com/profile/adityakumawat2003"
          target="_blank"
          whileHover={{ scale: 1.03 }}
          className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800"
        >
          <h3 className="text-blue-400 text-xl font-semibold">Codeforces</h3>
          <p className="text-5xl font-bold text-white mt-3">
            <AnimatedNumber value={stats.codeforces?.solved || 0} />
          </p>
          <p className="text-neutral-400">Problems Solved</p>
          <p className="text-sm text-neutral-300 mt-3">
            Rating: {stats.codeforces?.rating}
          </p>
          <p className={`text-sm ${getCFColor(stats.codeforces?.rank)}`}>
            {stats.codeforces?.rank}
          </p>
        </motion.a>

        {/* ---------- CODECHEF ---------- */}
        <motion.a
          href="https://www.codechef.com/users/aditya0203"
          target="_blank"
          whileHover={{ scale: 1.03 }}
          className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800"
        >
          <h3 className="text-yellow-400 text-xl font-semibold">CodeChef</h3>
          <p className="text-5xl font-bold text-white mt-3">
            <AnimatedNumber value={stats.codechef?.solved || 0} />
          </p>
          <p className="text-neutral-400">Problems Solved</p>
          <p className="text-sm text-neutral-300 mt-3">
            Stars: {stats.codechef?.stars}
          </p>
          <p className="text-sm text-neutral-300">
            Rating: {stats.codechef?.rating}
          </p>
        </motion.a>

      </div>
    </div>
  );
}
