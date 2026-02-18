import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
    toast.success("Message sent! I'll get back to you soon.");
    reset();
  };

  return (
    <section id="contact" className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-lime-400/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-lime-400 font-mono text-sm tracking-widest uppercase">Get in Touch</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">Let's Build Something<br /> <span className="text-neutral-500">Exceptional.</span></h2>
              <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                Whether you have a project in mind, need help with frontend performance, or just want to chat about tech, feel free to reach out.
              </p>
            </motion.div>

            <div className="space-y-6">
              <motion.a 
                href="mailto:adityakumawat2003@gmail.com"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-white group p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-lime-400/50 transition-colors"
              >
                <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center group-hover:bg-lime-400 group-hover:text-black transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-400 group-hover:text-lime-400 transition-colors">Email</h4>
                  <p className="text-lg">adityakumawat2003@gmail.com</p>
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
                  <p className="text-lg">+91 96804 09006</p>
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
                  <p className="text-lg">Chennai, India</p>
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

          {/* Form */}
          <div className="bg-neutral-900 p-8 rounded-3xl border border-neutral-800 shadow-2xl relative overflow-hidden">
             {/* Form Glow */}
             <div className="absolute -top-20 -right-20 w-40 h-40 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400">Name</label>
                  <input
                    {...register("name", { required: true })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-400 transition-colors placeholder:text-neutral-600"
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="text-red-400 text-xs">Name is required</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400">Email</label>
                  <input
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-400 transition-colors placeholder:text-neutral-600"
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="text-red-400 text-xs">Valid email is required</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">Subject</label>
                 <select 
                    {...register("subject")}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-400 transition-colors placeholder:text-neutral-600 appearance-none"
                 >
                     <option value="General">General Inquiry</option>
                     <option value="Project">Project Proposal</option>
                     <option value="Freelance">Freelance Availability</option>
                 </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">Message</label>
                <textarea
                  {...register("message", { required: true })}
                  rows={4}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-400 transition-colors placeholder:text-neutral-600 resize-none"
                  placeholder="Tell me about your project..."
                />
                {errors.message && <span className="text-red-400 text-xs">Message is required</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-lime-400 text-black font-bold py-4 rounded-xl hover:bg-lime-300 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                    "Sending..."
                ) : (
                    <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
