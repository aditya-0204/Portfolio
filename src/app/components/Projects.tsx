import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import flowShieldImg from "../../assets/Flowshield.png";
import skillSwapImg from "../../assets/skillswap.png";
import smartDocImg from "../../assets/smartdoc.png";

const projects = [
  {
    title: "FlowShield",
    category: "System Design",
    description:
      "A covert multi-hop communication demo built with a C++20 engine, React dashboard, and Node.js bridge services to encrypt, conceal, route, and recover messages through a relay-based steganographic pipeline.",
    image: flowShieldImg,
    color: "#0a0f0d",
    tech: [
      "C++",
      "React",
      "Node.js",
      "Express",
      "Steganography",
      "Onion Routing",
    ],
    link: "https://github.com/aditya-0204/FlowShield",
    stats: "3-layer AES-256-GCM onion flow with 1.5s heartbeat chaff traffic",
    highlights: [
      "Built a 6-stage routing pipeline with synchronized reveal gating across sender, relays, and receiver.",
      "Implemented LSB PNG steganography plus automated extraction and message reconstruction at the receiver node.",
      "Added JSONL traffic logging and a filesystem-backed relay queue to monitor real and dummy traffic in real time.",
    ],
  },
  {
    title: "SmartDoc",
    category: "Cloud Automation",
    description: "A serverless document reminder system that tracks expiry dates and triggers scheduled alerts through AWS services with secure credential handling and OAuth-based access control.",
    image: smartDocImg,
    color: "#0a0a0a", // neutral-950
    tech: ["AWS Lambda", "DynamoDB", "EventBridge", "Google OAuth"],
    link: "https://github.com/aditya-0204",
    stats: "70+ expiry alerts delivered with modular Lambda scheduling",
    highlights: [
      "Deployed 3 modular AWS Lambda functions for document intake, notification delivery, and expiry reminder processing.",
      "Configured EventBridge schedules for reminders at 30, 15, 7, 3, and 1 days before expiry.",
      "Tested the system with 15+ official documents while storing metadata in DynamoDB and credentials in Secrets Manager.",
    ]
  },
  {
    title: "SkillSwap",
    category: "EdTech Platform",
    description: "A peer-to-peer learning platform where students exchange skills through dedicated sessions with zero monetary transactions.",
    image: skillSwapImg,
    color: "#171717", // neutral-900
    tech: ["React", "Tailwind CSS", "Firebase", "Faceted Search"],
    link: "https://github.com/aditya-0204",
    stats: "Peer-to-peer skill exchange with ratings and coin-based incentives",
    highlights: [
      "Built a peer-to-peer learning flow that lets students teach and learn through dedicated sessions.",
      "Included a 5-star rating system to build trust and surface strong learning partners.",
      "Added a session award system while keeping the platform fully zero monetary transaction based.",
    ]
  },
];

const Card = ({ i, title, description, src, url, color, range, targetScale, progress, tech, category, stats, highlights }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale]);
  const hasImage = Boolean(src);

  return (
    <div ref={container} className="sticky top-0 flex min-h-screen items-center justify-center py-10">
      <motion.div 
        style={{ scale, backgroundColor: color, top: `calc(-2vh + ${i * 18}px)` }} 
        className="relative w-full max-w-6xl origin-top overflow-hidden rounded-[2rem] border border-neutral-700 p-5 shadow-2xl sm:p-8 lg:p-10 xl:p-12"
      >
        <div className="relative z-10 grid gap-6 lg:min-h-[34rem] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
          <div className="flex min-w-0 flex-col justify-between gap-8">
             <div>
                <span className="text-lime-400 font-mono text-xs tracking-widest uppercase mb-2 block">{category}</span>
                <h2 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl xl:text-5xl">{title}</h2>
                <p className="mb-4 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">{description}</p>
                
                {/* Key Stat Highlight */}
                <div className="pl-4 border-l-2 border-lime-400/50">
                    <p className="text-sm font-bold text-white sm:text-base">{stats}</p>
                </div>
                <div className="mt-5 space-y-3">
                  {highlights.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-400" />
                      <p className="text-sm leading-relaxed text-neutral-400">{point}</p>
                    </div>
                  ))}
                </div>
             </div>

             <div>
                <div className="flex flex-wrap gap-2 mb-8">
                    {tech.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full border border-neutral-600 text-neutral-400 text-xs bg-neutral-800/50">
                            {t}
                        </span>
                    ))}
                </div>
                <div className="flex flex-wrap gap-4">
                    <a href={url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-lime-400">
                        View Project <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"/>
                    </a>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white">
                        <Github size={18}/> Code
                    </a>
                </div>
             </div>
          </div>

          <div className="group relative min-h-[15rem] overflow-hidden rounded-2xl border border-neutral-600/50 lg:min-h-full">
            {hasImage ? (
              <motion.div
                style={{ scale: imageScale }}
                className="w-full h-full"
              >
                <img 
                  src={src}
                  alt={title}
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 object-top"
                />
              </motion.div>
            ) : (
              <div className="relative flex h-full min-h-[15rem] w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(163,230,53,0.18),transparent_30%),linear-gradient(135deg,#0f1512,#080a09_55%,#111714)] p-6">
                <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:34px_34px]" />
                <div className="absolute left-8 top-8 rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-lime-300">
                  Async Route
                </div>
                <div className="relative z-10 w-full max-w-md">
                  <div className="mb-5 flex items-center justify-between text-xs font-mono uppercase tracking-[0.28em] text-neutral-500">
                    <span>Sender</span>
                    <span>Relays</span>
                    <span>Receiver</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {["TXT", "ENC", "PNG", "PNG", "OUT"].map((step, index) => (
                      <div key={step + index} className="flex items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
                          {step}
                        </div>
                        {index < 4 ? (
                          <div className="h-px w-6 bg-gradient-to-r from-lime-400/80 to-transparent" />
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 rounded-3xl border border-lime-400/20 bg-black/30 p-5 backdrop-blur-sm">
                    <div className="text-xs font-mono uppercase tracking-[0.3em] text-lime-300">
                      FlowShield
                    </div>
                    <div className="mt-3 text-2xl font-bold text-white">
                      Steganographic onion routing demo
                    </div>
                    <div className="mt-3 text-sm leading-relaxed text-neutral-400">
                      C++ processing engine, React control panel, Node bridge services, and filesystem relay simulation.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  return (
    <section ref={container} id="projects" className="relative my-20 lg:my-28">
        <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="text-lime-400 font-mono text-sm tracking-widest uppercase">Selected Work</span>
            <h2 className="mt-2 text-4xl font-bold text-white md:text-6xl">Projects</h2>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
      {
        projects.map( (project, i) => {
          const targetScale = 1 - ( (projects.length - i) * 0.05);
          return <Card key={i} i={i} {...project} src={project.image} url={project.link} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale}/>
        })
      }
        </div>
    </section>
  )
}
