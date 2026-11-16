
import { motion } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";

const items = [
  {
    title: "Software Developer Intern",
    subtitle: "Ecoflect • 2025",
    desc: [
      "Diagnosed LCP and page-lag issues using Chrome DevTools and Lighthouse, and re-architected the legacy CMS frontend into a modular, mobile-first JavaScript, HTML5, and Tailwind CSS codebase.",

      "Implemented secure phone OTP (Firebase Auth) and email (SMTP) authentication, replaced redundant plugins with direct API integrations, and introduced a three-provider fallback for reliable data fetching.",

      "Reduced homepage network requests by 71% (48 to 14) and improved full-page load time by 42% (2.01s to 1.17s)."
    ],
    icon: Briefcase,
    glow: "from-lime-400/25 to-transparent",
  },
  {
    title: "B.Tech Computer Science",
    subtitle: "VIT Chennai • 2023 — Present",
    desc: [
      "Strengthened problem-solving skills through Data Structures & Algorithms, Object-Oriented Programming, and core CS subjects including Operating Systems, DBMS, and System Design.",

      "Developed full-stack applications using React.js, Next.js, Node.js, Express.js, REST APIs, and databases like MongoDB, MySQL, and Firestore.",

      "Gained hands-on experience with AWS services, Docker, Git, Linux, API testing using Postman, and performance monitoring using k6 and Grafana."
    ],
    icon: GraduationCap,
    glow: "from-blue-400/25 to-transparent",
  },
];

export function Journey() {
  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-neutral-950 py-20 sm:py-24"
    >
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-lime-400/8 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-400/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm uppercase tracking-[0.2em] text-lime-400">
          Experience
        </p>

        <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
          My Journey
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-400 sm:text-base">
          A simple snapshot of my education and professional experience so far.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {items.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/85 p-6 shadow-[0_25px_70px_rgba(0,0,0,0.28)] sm:p-8"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.glow}`}
                />

                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white ring-1 ring-white/10">
                      <Icon size={22} />
                    </div>

                    <div>
                      <p className="text-sm text-neutral-400">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                    {item.title}
                  </h3>

                  {Array.isArray(item.desc) ? (
                    <ul className="list-disc space-y-3 pl-5 text-sm leading-7 text-neutral-300 sm:text-base">
                      {item.desc.map((point, index) => (
                        <li key={index} className="pl-1">
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm leading-7 text-neutral-300 sm:text-base">
                      {item.desc}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
