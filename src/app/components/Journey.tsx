import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import { useRef } from "react";
import { Briefcase, GraduationCap, Code } from "lucide-react";

const items = [
  {
    title: "Software Developer Intern",
    subtitle: "Ecoflect • 2025",
    desc: "Rebuilt the frontend from WordPress to a custom stack, reducing requests by 71% and improving performance by 42%.",
    icon: Briefcase,
    glow: "from-lime-400/25 to-transparent",
  },
  {
    title: "B.Tech Computer Science",
    subtitle: "VIT Chennai • 2023 — Present",
    desc: "Focused on DSA, algorithms and full-stack engineering while maintaining strong academics.",
    icon: GraduationCap,
    glow: "from-blue-400/25 to-transparent",
  },
  {
    title: "Competitive Programmer",
    subtitle: "LeetCode • CodeChef • Codeforces",
    desc: "Solved 250+ problems across platforms and built strong problem-solving consistency.",
    icon: Code,
    glow: "from-purple-400/25 to-transparent",
  },
];

export function Journey() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 28,
  });

  /* background movement */
  const bgY = useTransform(smooth, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={ref} className="relative h-[600vh] bg-neutral-950">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* -------- BACKGROUND PARALLAX -------- */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0"
        >
          <div className="absolute -top-40 left-[-10%] w-[500px] h-[500px] rounded-full bg-lime-400/10 blur-3xl" />
          <div className="absolute bottom-[-120px] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-3xl" />
        </motion.div>

        {/* Header */}
        <div className="absolute top-10 left-10 z-20">
          <p className="text-lime-400 uppercase tracking-[0.2em] text-sm">
            Experience
          </p>
          <h2 className="text-5xl font-bold text-white mt-2">
            My Journey
          </h2>
        </div>

        {/* Progress bar */}
        <motion.div
          style={{ scaleX: smooth }}
          className="absolute top-0 left-0 h-[2px] w-full origin-left bg-lime-400"
        />

        {/* -------- STAGES -------- */}
        {items.map((item, i) => {
          const start = i / items.length;
          const end = (i + 1) / items.length;

          const opacity = useTransform(
            smooth,
            [start, start + 0.15, end - 0.15, end],
            [0, 1, 1, 0]
          );

          const scale = useTransform(
            smooth,
            [start, start + 0.15, end],
            [0.82, 1, 1.1]
          );

          const y = useTransform(
            smooth,
            [start, end],
            [100, -100]
          );

          const rotate = useTransform(
            smooth,
            [start, end],
            [1.5, -1.5]
          );

          const blur = useTransform(
            smooth,
            [start, start + 0.1, end - 0.1, end],
            ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]
          );

          const Icon = item.icon;

          return (
            <motion.div
              key={i}
              style={{
                opacity,
                scale,
                y,
                rotate,
                filter: blur,
              }}
              className="absolute w-full max-w-4xl px-6"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  relative rounded-3xl border border-white/10
                  bg-neutral-900/70 backdrop-blur-xl
                  p-10 shadow-[0_40px_100px_rgba(0,0,0,0.5)]
                  overflow-hidden
                "
              >
                {/* dynamic glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.glow}`}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-white">
                      <Icon size={24} />
                    </div>
                    <p className="text-neutral-400">{item.subtitle}</p>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {item.title}
                  </h3>

                  <p className="text-neutral-300 text-lg leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
