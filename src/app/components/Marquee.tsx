import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import leetcodeLogo from "../../assets/leetcode_img.png";
import codeforcesLogo from "../../assets/codeforces_img.png";
import codechefLogo from "../../assets/codechef_img.png";
import { motion } from "motion/react";
import { shouldFetchLiveStats, statsApiUrl } from "../lib/stats-api";

const techStack = [
  "JavaScript",
  "AWS",
  "TypeScript",
  "React",
  "Node.js",
  "Git",
  "Docker",
  "MongoDB",
  "C",
  "Java",
  "Tailwind",
  "C++",
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Git",
  "Docker",
  "MongoDB",
  "C",
  "Java",
  "Tailwind",
  "C++",
  "Python"
];

export function TechMarquee() {
  // duplicate list for seamless loop
  const items = [...techStack, ...techStack];

  return (
    <section className="py-10 overflow-hidden bg-neutral-900">
      <div className="relative">

        {/* gradient fade edges (premium look) */}
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-neutral-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-neutral-900 to-transparent z-10" />

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,   // ← increase for slower speed
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {items.map((tech, index) => (
            <div
              key={index}
              className="
                px-5 py-2 rounded-full
                border border-white/15
                bg-white/5 backdrop-blur
                text-sm text-neutral-300
                whitespace-nowrap
                hover:bg-white hover:text-black
                transition
              "
            >
              {tech}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

function capitalize(text: string) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "-";
}

function formatCodeChefStars(stars: string) {
  const normalized = (stars || "-").replace("★", "").trim();
  if (!normalized || normalized === "-") {
    return "Unrated";
  }

  return `${normalized} Star`;
}

export function Marquee() {
  const [stats, setStats] = useState({
    leetRating: 0,
    leetSolved: 0,
    cfRating: 0,
    cfRank: "unrated",
    cfSolved: 0,
    ccRating: 0,
    ccSolved: 0,
    ccStars: "-",
  });

  useEffect(() => {
    if (!shouldFetchLiveStats) {
      return;
    }

    async function fetchStats() {
      try {
        const res = await fetch(statsApiUrl);

        if (!res.ok) {
          throw new Error(`Stats request failed with ${res.status}`);
        }

        const data = await res.json();

        setStats({
          leetRating: Number(data.leetcode?.contestRating || 0),
          leetSolved: Number(data.leetcode?.solved || 0),
          cfRating: Number(data.codeforces?.rating || 0),
          cfRank: data.codeforces?.rank || "unrated",
          cfSolved: Number(data.codeforces?.solved || 0),
          ccRating: Number(data.codechef?.rating || 0),
          ccSolved: Number(data.codechef?.solved || 0),
          ccStars: data.codechef?.stars || "-",
        });
      } catch (error) {
        console.log("api error", error);
      }
    }

    fetchStats();
  }, []);

  const total =
    stats.leetSolved + stats.cfSolved + stats.ccSolved;

    return (
      <section className="bg-black py-20 sm:py-24 lg:py-28">
      <div className="mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Programming Dashboard
            </h2>
            <p className="mt-2 text-base text-neutral-400 sm:text-lg">
              Problem solving metrics across platforms.
            </p>
          </div>

          <div className="text-left lg:text-right">
            <p className="text-4xl font-bold text-white sm:text-5xl">{total}+</p>
            <p className="text-xs text-neutral-500 uppercase tracking-[0.2em]">
              Total DSA Problems
            </p>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {/* CARD TEMPLATE */}
          {[
            {
              name: "LeetCode",
              logo: leetcodeLogo,
              rating: stats.leetRating,
              solved: stats.leetSolved,
              subtitle: "Contest Rating",
              color: "text-orange-400",
              link: "https://leetcode.com/u/error_2003/",
            },
            {
              name: "Codeforces",
              logo: codeforcesLogo,
              rating: stats.cfRating,
              solved: stats.cfSolved,
              subtitle: capitalize(stats.cfRank),
              color: "text-cyan-400",
              link: "https://codeforces.com/profile/adityakumawat2003",
            },
            {
              name: "CodeChef",
              logo: codechefLogo,
              rating: stats.ccRating,
              solved: stats.ccSolved,
              subtitle: formatCodeChefStars(stats.ccStars),
              color: "text-yellow-400",
              link: "https://www.codechef.com/users/aditya0203",
            },
          ].map((card) => (
            <div
              key={card.name}
              className="group relative rounded-3xl border border-white/10
              bg-gradient-to-b from-neutral-900 to-neutral-950
              p-6 shadow-xl transition-all duration-300
              hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)]"
            >
              {/* glow */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-br from-white/5 to-transparent" />

              <div className="relative z-10">

                <div className="flex items-center gap-3 mb-6">
                  <img src={card.logo} className="w-8 h-8" />
                  <p className="text-neutral-300 font-semibold tracking-wide">
                    {card.name}
                  </p>
                </div>

                <h3 className="text-6xl font-bold text-white leading-none">
                  {card.rating || "—"}
                </h3>

                <p className={`${card.color} mt-2 font-medium`}>
                  {card.subtitle}
                </p>

                {/* solved box */}
                <div className="mt-6 rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-xs text-neutral-400 uppercase tracking-wider">
                    Problems Solved
                  </p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {card.solved}
                  </p>
                </div>

                {/* button */}
                <a
                  href={card.link}
                  target="_blank"
                  className="mt-6 block text-center py-2.5 rounded-full
                  border border-white/20 text-white font-medium
                  hover:bg-white hover:text-black transition"
                >
                  Open Profile 
                </a>
              </div>
            </div>
          ))}

        </div>
      </div>
      <TechMarquee/>
    </section>
  );
}
