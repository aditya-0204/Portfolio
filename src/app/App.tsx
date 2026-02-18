import { Navbar } from "@/app/components/Navbar";
import { BentoHero } from "@/app/components/BentoHero";
import { Journey } from "@/app/components/Journey";
import { Marquee } from "@/app/components/Marquee";
import { Projects } from "@/app/components/Projects";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="bg-neutral-950 min-h-screen font-sans selection:bg-lime-400 selection:text-black">
      <Navbar />
      <BentoHero />
      <Marquee />
      <Journey />
      <Projects />
      <Contact />
      <Footer />
      <Toaster position="top-center" richColors theme="dark" />
    </div>
  );
}
