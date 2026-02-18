import { useRef, useState } from "react";
import { Link } from "react-scroll";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { Home, Map, Layers, Mail, Copy, Check } from "lucide-react";
import { toast } from "sonner";

// Navigation Items - Corrected Order: Home -> Journey -> Projects -> Contact
const navItems = [
  { name: "Home", to: "home", icon: <Home size={20} /> },
  { name: "Journey", to: "journey", icon: <Map size={20} /> },
  { name: "Projects", to: "projects", icon: <Layers size={20} /> },
  { name: "Contact", to: "contact", icon: <Mail size={20} /> },
];

function MagneticItem({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set((clientX - centerX) * 0.3); // Magnetic strength
    mouseY.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

export function Navbar() {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
      {/* Main Navigation */}
      <nav className="bg-neutral-900/90 backdrop-blur-2xl border border-neutral-800/50 rounded-full p-2 px-6 shadow-2xl flex items-center gap-2 ring-1 ring-white/10">
        <div className="flex items-center gap-1">
            {navItems.map((item) => (
            <MagneticItem key={item.name}>
                <Link
                to={item.to}
                smooth={true}
                spy={true}
                offset={-100}
                activeClass="bg-white text-black"
                className="w-12 h-12 flex items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer relative group"
                >
                {item.icon}
                {/* Tooltip */}
                <span className="absolute -top-14 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-neutral-800 pointer-events-none whitespace-nowrap shadow-xl">
                    {item.name}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 border-r border-b border-neutral-800 rotate-45" />
                </span>
                </Link>
            </MagneticItem>
            ))}
        </div>
      </nav>
    </div>
  );
}
