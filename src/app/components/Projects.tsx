import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import skillSwapImg from "../../assets/skillswap.png";
import smartDocImg from "../../assets/smartdoc.png";

const projects = [
  {
    title: "SkillSwap",
    category: "EdTech Platform",
    description: "A platform for students to exchange skills (e.g., coding for design) with zero monetary transactions. Features a 5-star peer review system and a coin-based reward mechanism.",
    image: skillSwapImg,
    color: "#171717", // neutral-900
    tech: ["React", "Tailwind CSS", "Firebase", "Faceted Search"],
    link: "https://github.com/aditya-0204",
    stats: "40% faster search, 15% more engagement"
  },
  {
    title: "SmartDoc",
    category: "Cloud Automation",
    description: "A cloud-based system that automatically triggers document expiry reminders. Built with serverless architecture to handle notifications securely and efficiently.",
    image: smartDocImg,
    color: "#0a0a0a", // neutral-950
    tech: ["AWS Lambda", "DynamoDB", "EventBridge", "Google OAuth"],
    link: "https://github.com/aditya-0204",
    stats: "70+ alerts sent, OAuth Security"
  },
];

const Card = ({ i, title, description, src, url, color, range, targetScale, progress, tech, category, stats }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, backgroundColor: color, top: `calc(-5vh + ${i * 25}px)` }} 
        className="flex flex-col relative -top-[25%] h-[500px] w-[1000px] rounded-3xl p-12 border border-neutral-700 shadow-2xl origin-top overflow-hidden"
      >
        <div className="flex h-full gap-12 relative z-10">
          <div className="w-[40%] flex flex-col justify-between">
             <div>
                <span className="text-lime-400 font-mono text-xs tracking-widest uppercase mb-2 block">{category}</span>
                <h2 className="text-4xl font-bold text-white mb-4 leading-tight">{title}</h2>
                <p className="text-neutral-400 text-sm leading-relaxed mb-4">{description}</p>
                
                {/* Key Stat Highlight */}
                <div className="pl-4 border-l-2 border-lime-400/50">
                    <p className="text-white text-sm font-bold">{stats}</p>
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
                <div className="flex gap-4">
                    <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white font-medium hover:text-lime-400 transition-colors group text-sm">
                        View Project <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"/>
                    </a>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-neutral-400 font-medium hover:text-white transition-colors text-sm">
                        <Github size={18}/> Code
                    </a>
                </div>
             </div>
          </div>

          <div className="relative w-[60%] h-full rounded-2xl overflow-hidden border border-neutral-600/50 group">
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
    <div ref={container} id="projects" className="relative mt-[10vh] mb-[10vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <span className="text-lime-400 font-mono text-sm tracking-widest uppercase">Selected Work</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mt-2">Projects</h2>
        </div>
      {
        projects.map( (project, i) => {
          const targetScale = 1 - ( (projects.length - i) * 0.05);
          return <Card key={i} i={i} {...project} src={project.image} url={project.link} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale}/>
        })
      }
    </div>
  )
}
