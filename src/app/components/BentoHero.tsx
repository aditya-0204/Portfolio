import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, MapPin, Globe, Mail, X, Coffee, Clock, Zap, Layers, Cpu, Code, BookOpen, Award, Briefcase, Terminal, Server, Database } from "lucide-react";
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
                <div className="relative pl-4 border-l-2 border-neutral-800">
                    <div className="absolute top-0 left-[-5px] w-2 h-2 bg-neutral-600 rounded-full" />
                    <h5 className="text-white font-bold text-sm">Open Source & Problem Solving</h5>
                    <div className="text-neutral-400 text-xs font-mono mb-1">Self-Directed • 2023 - Present</div>
                    <p className="text-neutral-500 text-xs">Solved 300+ coding problems on LeetCode, CodeChef, and Codeforces.</p>
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
                    {["React.js", "Next.js", "Tailwind CSS", "Three.js", "HTML5/CSS3"].map(t => (
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
  impact: {
    title: "Impact & Stats",
    subtitle: "Quantifiable achievements.",
    icon: <Zap className="text-lime-400" size={32} />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NzEyNzAxMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    content: (
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-800 text-center">
                <div className="text-3xl font-bold text-white mb-1">42%</div>
                <div className="text-neutral-500 text-xs">Faster Load Time</div>
            </div>
            <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-800 text-center">
                <div className="text-3xl font-bold text-white mb-1">71%</div>
                <div className="text-neutral-500 text-xs">Request Reduction</div>
            </div>
            <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-800 text-center">
                <div className="text-3xl font-bold text-white mb-1">250+</div>
                <div className="text-neutral-500 text-xs">Problems Solved</div>
            </div>
            <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-800 text-center">
                <div className="text-3xl font-bold text-white mb-1">8.33</div>
                <div className="text-neutral-500 text-xs">Current CGPA</div>
            </div>
             <p className="col-span-2 text-xs text-neutral-400 text-center mt-2">
                Consistently delivering optimized, high-performance code and solving complex algorithmic challenges.
            </p>
        </div>
    )
  }
};

export function BentoHero() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <section id="home" className="min-h-screen p-4 md:p-8 pt-24 bg-neutral-950 flex items-center justify-center relative">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-full md:h-[800px]">
        
        {/* Block 1: Main Intro - Large Square */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2 md:row-span-2 bg-neutral-900 rounded-3xl p-8 flex flex-col justify-between border border-neutral-800 relative overflow-hidden group"
        >
          {/* Lime Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-lime-400/20 transition-all duration-500" />
          
          <div className="z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse" />
              <span className="text-neutral-400 text-sm font-medium tracking-wide">AVAILABLE FOR WORK</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tighter">
              Aditya<br />
              <span className="text-neutral-500">Kumawat.</span>
            </h1>
          </div>
          
          <div className="z-10">
            <p className="text-neutral-400 text-lg max-w-md mb-6">
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
          className="md:col-span-1 md:row-span-2 relative rounded-3xl overflow-hidden border border-neutral-800 group cursor-pointer"
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
            className="md:col-span-1 md:row-span-1 bg-lime-400 rounded-3xl p-6 flex flex-col justify-between border border-lime-500 relative overflow-hidden cursor-pointer group hover:bg-lime-500 transition-colors"
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

        {/* Block 4: Tech Stack or Abstract - Clickable (SKILLS) */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => setSelectedFeature('tech')}
            className="md:col-span-1 md:row-span-1 bg-neutral-900 rounded-3xl p-0 overflow-hidden border border-neutral-800 relative cursor-pointer group"
        >
             <img 
                src="https://images.unsplash.com/photo-1749651950300-9054d02f893a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjBhZXN0aGV0aWMlMjBhYnN0cmFjdCUyMG9iamVjdHxlbnwxfHx8fDE3Njk5Mjc5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                className="w-full h-full object-cover opacity-80 grayscale mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
                alt="Abstract"
             />
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <Code size={32} className="text-lime-400 mb-2"/>
                 <span className="text-white font-bold tracking-widest uppercase">Tech Stack</span>
             </div>
        </motion.div>

        {/* Block 5: Contact CTA - Wide Rectangle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-2 md:row-span-1 bg-neutral-100 rounded-3xl p-8 flex items-center justify-between group hover:bg-lime-400 transition-colors duration-300 cursor-pointer"
        >
           <div>
               <h3 className="text-neutral-900 font-bold text-3xl transition-colors">Let's Talk</h3>
               <p className="text-neutral-500 group-hover:text-black/70 transition-colors">Have an idea? I can help.</p>
           </div>
           <div className="bg-neutral-900 group-hover:bg-black p-4 rounded-full transition-colors">
               <Mail className="text-white group-hover:text-lime-400 transition-colors" size={24} />
           </div>
        </motion.div>

         {/* Block 6: Socials / Numbers - Clickable (IMPACT) */}
         <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          onClick={() => setSelectedFeature('impact')}
          className="md:col-span-2 md:row-span-1 bg-neutral-900 rounded-3xl p-8 border border-neutral-800 flex items-center justify-around cursor-pointer hover:border-lime-400/50 transition-colors group"
        >
            <div className="text-center group-hover:scale-110 transition-transform">
                <div className="text-3xl font-bold text-white group-hover:text-lime-400 transition-colors">300+</div>
                <div className="text-neutral-500 text-sm uppercase tracking-wider">Problems</div>
            </div>
            <div className="w-px h-12 bg-neutral-800" />
            <div className="text-center group-hover:scale-110 transition-transform">
                <div className="text-3xl font-bold text-white group-hover:text-lime-400 transition-colors">40%</div>
                <div className="text-neutral-500 text-sm uppercase tracking-wider">Faster</div>
            </div>
             <div className="w-px h-12 bg-neutral-800" />
            <div className="text-center group-hover:scale-110 transition-transform">
                <div className="text-3xl font-bold text-white group-hover:text-lime-400 transition-colors">100%</div>
                <div className="text-neutral-500 text-sm uppercase tracking-wider">Commitment</div>
            </div>
             <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={16} className="text-lime-400" />
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
              className="bg-neutral-900 border border-neutral-800 w-full max-w-2xl rounded-3xl overflow-hidden relative z-10 shadow-2xl flex flex-col max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedFeature(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-white hover:text-black text-white p-2 rounded-full transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-2 flex-grow overflow-auto">
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
                
                <div className="p-8 flex flex-col">
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
