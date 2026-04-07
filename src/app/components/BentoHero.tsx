import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, MapPin, X, Coffee, Clock, Code, BookOpen, Award, Briefcase, Terminal } from "lucide-react";
import { Link } from "react-scroll";

// Resume Data Content
const resumeContent = {
  profile: {
    title: "Aditya Kumawat",
    subtitle: "CS Undergrad @ VIT Chennai",
    icon: <BookOpen className="text-lime-400" size={32} />,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmdlciUyMGxhcHRvcCUyMGRhcmt8ZW58MXx8fHwxNzcxMjcwMTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Coffee size={18} className="text-lime-400"/> Bio</h4>
          <p className="text-neutral-400 text-sm leading-relaxed">
            I'm a computer science student passionate about building scalable web applications and optimizing performance. I don't just write code; I engineer solutions that reduce load times and enhance user experience.
          </p>
        </div>
        <div>
           <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Award size={18} className="text-lime-400"/> Education</h4>
           <ul className="space-y-3">
             <li className="bg-neutral-800/50 p-3 rounded-lg border border-neutral-800">
               <div className="text-white font-medium text-sm">B.Tech Computer Science</div>
               <div className="text-neutral-500 text-xs">Vellore Institute of Technology, Chennai • 2023 - 2027</div>
               <div className="text-lime-400 text-xs font-mono mt-1">CGPA: 8.33</div>
             </li>
           </ul>
        </div>
        <div>
           <h4 className="text-white font-bold mb-2">Coding Languages</h4>
           <div className="flex gap-2 flex-wrap">
             <span className="px-2 py-1 bg-neutral-800 text-neutral-400 text-xs rounded border border-neutral-700">C++</span>
             <span className="px-2 py-1 bg-neutral-800 text-neutral-400 text-xs rounded border border-neutral-700">Java</span>
             <span className="px-2 py-1 bg-neutral-800 text-neutral-400 text-xs rounded border border-neutral-700">Python</span>
             <span className="px-2 py-1 bg-neutral-800 text-neutral-400 text-xs rounded border border-neutral-700">JavaScript</span>
           </div>
        </div>
      </div>
    )
  },
  experience: {
    title: "Experience",
    subtitle: "My professional journey.",
    icon: <Briefcase className="text-lime-400" size={32} />,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBzZXJ2ZXIlMjByb29tfGVufDF8fHx8MTc3MTI3MDEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: (
        <div className="space-y-6">
            <p className="text-neutral-400 text-sm">
                Focusing on full-stack development, cloud architecture, and frontend performance optimization.
            </p>
            <div className="space-y-4">
                <div className="relative pl-4 border-l-2 border-lime-400/30">
                    <div className="absolute top-0 left-[-5px] w-2 h-2 bg-lime-400 rounded-full" />
                    <h5 className="text-white font-bold text-sm">Software Developer Intern</h5>
                    <div className="text-lime-400 text-xs font-mono mb-1">Ecoflect • Nov 2025 - Dec 2025</div>
                    <ul className="text-neutral-500 text-xs space-y-1 list-disc pl-3">
                        <li>Replaced WordPress theme with custom frontend.</li>
                        <li>Reduced network requests by 71% (48 to 14).</li>
                        <li>Improved load time by 42% (2.01s to 1.17s).</li>
                    </ul>
                </div>
                
            </div>
        </div>
    )
  },
  tech: {
    title: "Tech Stack",
    subtitle: "The tools I use daily.",
    icon: <Terminal className="text-lime-400" size={32} />,
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXN0cml4JTIwY29kZXxlbnwxfHx8fDE3NzEyNzAxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: (
        <div className="space-y-6">
            <div>
                <h5 className="text-white font-bold text-sm mb-3">Frontend</h5>
                <div className="flex flex-wrap gap-2">
                    {["React.js", "Next.js", "Tailwind CSS", "HTML5/CSS3"].map(t => (
                        <span key={t} className="px-3 py-1 bg-lime-400/10 text-lime-400 border border-lime-400/20 rounded text-xs font-mono">{t}</span>
                    ))}
                </div>
            </div>
            <div>
                <h5 className="text-white font-bold text-sm mb-3">Backend & Cloud</h5>
                <div className="flex flex-wrap gap-2">
                    {["Node.js", "Express.js", "AWS Lambda", "Firebase", "MongoDB", "SQL Plus"].map(t => (
                        <span key={t} className="px-3 py-1 bg-neutral-800 text-neutral-300 border border-neutral-700 rounded text-xs font-mono">{t}</span>
                    ))}
                </div>
            </div>
            <div>
                <h5 className="text-white font-bold text-sm mb-3">Tools</h5>
                <div className="flex flex-wrap gap-2">
                    {["Git", "Docker", "Linux", "VS Code", "Jupyter"].map(t => (
                        <span key={t} className="px-3 py-1 bg-neutral-800 text-neutral-300 border border-neutral-700 rounded text-xs font-mono">{t}</span>
                    ))}
                </div>
            </div>
        </div>
    )
  },
};

export function BentoHero() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center bg-neutral-950 px-4 pb-24 pt-24 md:px-8">
      <div className="grid h-full w-full max-w-7xl grid-cols-1 gap-4 md:h-[800px] md:grid-cols-4 md:grid-rows-3 md:gap-5">
        
        {/* Block 1: Main Intro - Large Square */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="group relative flex min-h-[24rem] flex-col justify-between overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 p-6 sm:p-8 md:col-span-2 md:row-span-2"
        >
          {/* Lime Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-lime-400/20 transition-all duration-500" />
          
          <div className="z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse" />
              <span className="text-neutral-400 text-sm font-medium tracking-wide">AVAILABLE FOR WORK</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tighter text-white sm:text-5xl md:text-7xl">
              Aditya<br />
              <span className="text-neutral-500">Kumawat.</span>
            </h1>
          </div>
          
          <div className="z-10">
            <p className="mb-6 max-w-md text-base text-neutral-400 sm:text-lg">
              I build high-performance web applications with modern tech stacks.
            </p>
            <Link 
              to="projects" 
              smooth={true} 
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-lime-400 hover:text-black transition-all cursor-pointer"
            >
              See My Work <ArrowUpRight size={20} />
            </Link>
          </div>
        </motion.div>

        {/* Block 2: Profile Image - Clickable (ABOUT ME) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => setSelectedFeature('profile')}
          className="group relative min-h-[20rem] cursor-pointer overflow-hidden rounded-3xl border border-neutral-800 md:col-span-1 md:row-span-2"
        >
          <img 
            src="https://images.unsplash.com/photo-1580644043501-627f569f7e25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjB3b3JraW5nJTIwaW4lMjBjYWZlJTIwYWVzdGhldGljJTIwZ3JhaW55fGVufDF8fHx8MTc2OTkyNzk2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="Profile" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
             <div className="flex justify-between items-end">
                <div>
                    <span className="text-white font-mono text-sm block mb-1">Portfolio</span>
                    <span className="text-white font-bold text-xl flex items-center gap-1"><MapPin size={18} className="text-lime-400"/> Profile & Bio</span>
                </div>
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight size={16} className="text-white" />
                </div>
             </div>
          </div>
        </motion.div>

        {/* Block 3: Location / Map Graphic - Clickable (EXPERIENCE) */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => setSelectedFeature('experience')}
            className="group relative flex min-h-[14rem] cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-lime-500 bg-lime-400 p-6 transition-colors hover:bg-lime-500 md:col-span-1 md:row-span-1"
        >
             <Briefcase className="text-black/10 w-32 h-32 absolute -bottom-8 -right-8" />
             <div className="relative z-10 flex justify-between items-start">
                 <div>
                    <h3 className="text-black font-bold text-2xl">Experience</h3>
                    <p className="text-black/70 text-sm mt-1">My Career Path</p>
                 </div>
                  <ArrowUpRight size={20} className="text-black opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
             <div className="relative z-10 font-mono text-black/60 text-xs flex items-center gap-2">
                 <Clock size={12} /> Ecoflect Intern
             </div>
        </motion.div>

        {/* Block 4: Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={() => setSelectedFeature('tech')}
          className="group relative flex min-h-[14rem] cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-lime-400/35 bg-neutral-900 p-6 transition-colors hover:border-lime-400/70 md:col-span-1 md:row-span-1"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.12),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0))]" />
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <Code size={32} className="mb-3 text-lime-400" />
            <p className="text-2xl font-bold tracking-[0.22em] text-white sm:text-3xl">
              TECH STACK
            </p>
          </div>
          <div className="absolute right-5 top-5 z-10 text-lime-400 opacity-0 transition-opacity group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </div>
        </motion.div>

      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedFeature && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              layoutId={selectedFeature}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedFeature(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-white hover:text-black text-white p-2 rounded-full transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div className="grid flex-grow overflow-auto md:grid-cols-2">
                <div className="h-48 md:h-full relative shrink-0">
                  <img 
                    src={resumeContent[selectedFeature].image} 
                    alt={resumeContent[selectedFeature].title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent md:bg-lime-400/20 md:mix-blend-overlay" />
                  
                  {/* Title overlay for mobile readability */}
                  <div className="absolute bottom-4 left-4 md:hidden">
                    <h3 className="text-2xl font-bold text-white mb-1">{resumeContent[selectedFeature].title}</h3>
                  </div>
                </div>
                
                <div className="flex flex-col p-6 sm:p-8">
                  <div className="hidden md:block mb-6">
                    <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                        {resumeContent[selectedFeature].icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{resumeContent[selectedFeature].title}</h3>
                    <p className="text-lime-400 font-mono text-sm">{resumeContent[selectedFeature].subtitle}</p>
                  </div>
                  
                  <div className="text-neutral-300">
                    {resumeContent[selectedFeature].content}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
