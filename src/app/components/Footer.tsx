import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-scroll";

export function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Aditya Kumawat</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Crafting digital experiences with a focus on performance and scalability.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://linkedin.com/in/0204-aditya" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-lime-400 flex items-center gap-2 transition-colors text-sm">
                  <Linkedin size={16} /> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/aditya-0204" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-lime-400 flex items-center gap-2 transition-colors text-sm">
                  <Github size={16} /> GitHub
                </a>
              </li>
              <li>
                <a href="mailto:adityakumawat2003@gmail.com" className="text-neutral-400 hover:text-lime-400 flex items-center gap-2 transition-colors text-sm">
                  <Mail size={16} /> Email
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Sitemap</h4>
            <ul className="space-y-2">
              {["Home", "Journey", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    to={item.toLowerCase()} 
                    smooth={true} 
                    className="text-neutral-400 hover:text-lime-400 cursor-pointer text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Status</h4>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
              </span>
              <span className="text-neutral-400 text-sm">Open to Opportunities</span>
            </div>
            <p className="text-neutral-500 text-xs mt-4">
              Based in Chennai, India.<br />
              Remote friendly.
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 text-xs">
            © {new Date().getFullYear()} Aditya Kumawat. All rights reserved.
          </p>
          <p className="text-neutral-600 text-xs font-mono">
            Built with React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
