import { motion, useInView } from "framer-motion";
import ContactForm from "@/components/forms/ContactForm";
import { FaEnvelope, FaMapMarkerAlt, FaClock, FaLinkedin, FaGithub } from "react-icons/fa";
import { Mail } from "lucide-react";
import { useRef } from "react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ContactSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden" style={{ background: '#0B0F14' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 30%, rgba(220,38,38,0.03) 0%, transparent 60%)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase mb-5 relative overflow-hidden"
            style={{ background: 'rgba(239,68,68,0.08)', color: 'rgba(239,68,68,0.8)', border: '1px solid rgba(239,68,68,0.12)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.1) 50%, transparent 100%)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
            />
            <Mail className="w-3 h-3 relative z-10" />
            <span className="relative z-10">Contact</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.06 }}
          >
            Get In{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)' }}>Touch</span>
          </motion.h2>

          <motion.p
            className="text-[15px] text-gray-500 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
          >
            Have a project in mind or interested in working together? Feel free to reach out through the form below or connect with me directly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form card */}
          <motion.div
            className="rounded-xl p-6 lg:p-8"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <ContactForm />
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            <div className="space-y-5">
              <h3 className="text-[15px] font-semibold text-gray-300 uppercase tracking-wider">Contact Information</h3>

              {[
                { icon: <FaEnvelope className="text-[13px]" />, label: "Email", value: "zeyamosharraf999@gmail.com", href: "mailto:zeyamosharraf999@gmail.com" },
                { icon: <FaMapMarkerAlt className="text-[13px]" />, label: "Location", value: "New Delhi, India" },
                { icon: <FaClock className="text-[13px]" />, label: "Working Hours", value: "Monday - Friday, 9AM - 5PM IST" },
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-red-400/70" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.1)' }}>
                    {item.icon}
                  </div>
                  <div className="ml-3">
                    <p className="text-[13px] font-medium text-gray-300">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-[13px] text-gray-500 hover:text-red-400 transition-colors duration-200">{item.value}</a>
                    ) : (
                      <p className="text-[13px] text-gray-500">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-[15px] font-semibold text-gray-300 uppercase tracking-wider">Connect With Me</h3>
              <div className="flex gap-3">
                {[
                  { href: "https://www.linkedin.com/in/zeya-mosharraf/", icon: <FaLinkedin className="text-[15px]" />, label: "LinkedIn" },
                  { href: "https://github.com/ZeyaMosharraf", icon: <FaGithub className="text-[15px]" />, label: "GitHub" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200"
                    style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
