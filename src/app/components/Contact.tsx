import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { motion } from "motion/react";

const gmailComposeUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=adityakumawat2003@gmail.com";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-neutral-950 py-20 sm:py-24">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-lime-400/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl">
          
          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-lime-400 font-mono text-sm tracking-widest uppercase">Get in Touch</span>
              <h2 className="mt-2 mb-6 text-4xl font-bold text-white md:text-5xl">Let's Build Something<br /> <span className="text-neutral-500">Exceptional.</span></h2>
              <p className="mb-8 text-base leading-relaxed text-neutral-400 sm:text-lg">
                Whether you have a project in mind, need help with frontend performance, or just want to chat about tech, feel free to reach out.
              </p>
            </motion.div>

            <div className="space-y-6">
              <motion.a 
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-white group p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-lime-400/50 transition-colors"
              >
                <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center group-hover:bg-lime-400 group-hover:text-black transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-400 group-hover:text-lime-400 transition-colors">Email</h4>
                  <p className="break-all text-base sm:text-lg">adityakumawat2003@gmail.com</p>
                </div>
              </motion.a>

              <motion.a 
                href="tel:+919680409006"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-white group p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-lime-400/50 transition-colors"
              >
                <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center group-hover:bg-lime-400 group-hover:text-black transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-400 group-hover:text-lime-400 transition-colors">Phone</h4>
                  <p className="text-base sm:text-lg">+91 96804 09006</p>
                </div>
              </motion.a>

              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-white group p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-lime-400/50 transition-colors"
              >
                <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center group-hover:bg-lime-400 group-hover:text-black transition-colors">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-400 group-hover:text-lime-400 transition-colors">Location</h4>
                  <p className="text-base sm:text-lg">Chennai, India</p>
                </div>
              </motion.div>
              
              <div className="pt-8 flex gap-4">
                  <a href="https://linkedin.com/in/0204-aditya" target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-900 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors border border-neutral-800">
                      <Linkedin size={20} />
                  </a>
                  <a href="https://github.com/aditya-0204" target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-900 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors border border-neutral-800">
                      <Github size={20} />
                  </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
