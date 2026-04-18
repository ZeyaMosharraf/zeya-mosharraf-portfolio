import { motion } from "framer-motion";
import ContactForm from "@/components/forms/ContactForm";
import SectionHeader from "@/components/ui/SectionHeader";
import { FaEnvelope, FaMapMarkerAlt, FaClock, FaLinkedin, FaGithub } from "react-icons/fa";
import { Mail } from "lucide-react";
import { ease } from "@/lib/animations";

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-12 lg:py-16 overflow-hidden" style={{ background: '#0B0F14' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 30%, rgba(220,38,38,0.03) 0%, transparent 60%)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          icon={Mail}
          badge="Contact"
          title="Get In"
          highlight="Touch"
          subtitle="Have a project in mind or interested in working together? Feel free to reach out through the form below or connect with me directly."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form card */}
          <motion.div
            className="rounded-xl p-6 lg:p-8 bg-white/2 border border-white/6 backdrop-blur-sm"
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
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-red-400/70 bg-red-900/10 border border-red-900/20">
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
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200 bg-white/2 border border-white/6"
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
