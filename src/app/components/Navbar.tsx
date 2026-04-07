import { useRef } from "react";
import { Link } from "react-scroll";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Home, Map, Layers, Mail } from "lucide-react";

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
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 px-4 sm:bottom-6">
      <nav className="flex items-center gap-2 rounded-full border border-neutral-800/50 bg-neutral-900/90 p-2 px-3 shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl sm:px-5">
        <div className="flex items-center gap-1">
            {navItems.map((item) => (
            <MagneticItem key={item.name}>
                <Link
                to={item.to}
                smooth={true}
                spy={true}
                offset={-100}
                activeClass="bg-white text-black"
                className="group relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white sm:h-12 sm:w-12"
                >
                {item.icon}
                <span className="pointer-events-none absolute -top-14 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100 sm:block">
                    {item.name}
                    <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-neutral-800 bg-neutral-900" />
                </span>
                </Link>
            </MagneticItem>
            ))}
        </div>
      </nav>
    </div>
  );
}
