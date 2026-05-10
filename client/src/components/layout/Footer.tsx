import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaCloud,
  FaArrowUp
} from "react-icons/fa";
import { FaHackerrank } from "react-icons/fa6";
import { SiGooglecloud } from "react-icons/si";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";

interface PortfolioInfo {
  id: string;
  category: string;
  label: string;
  value: string;
  display_value?: string;
  link_url?: string;
  icon_name?: string;
  sort_order?: number;
}

const Footer = () => {
  const { data: allData, loading } = useSupabaseTable<PortfolioInfo>("portfolio_info", { column: "sort_order", ascending: true });

  const socialLinks = allData.filter(item => item.category === "social_link");
  const contactInfo = allData.filter(item => item.category === "contact_info");

  const iconMap: Record<string, React.ReactNode> = {
    github: <FaGithub className="text-lg" />,
    linkedin: <FaLinkedinIn className="text-lg" />,
    cloud: <SiGooglecloud className="text-lg" />,
    hackerrank: <FaHackerrank className="text-lg" />,
    envelope: <FaEnvelope className="text-sm" />,
    "map-pin": <FaMapMarkerAlt className="text-sm" />,
    mail: <FaEnvelope className="text-sm" />,
  };

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY - 80;
      window.scrollTo({
        top: absoluteTop,
        behavior: "smooth"
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="relative text-white overflow-hidden" style={{ background: '#0d0d0d' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(220,38,38,0.03) 0%, transparent 60%)' }} />

      <div className="relative z-10">
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* Brand */}
              <motion.div
                className="lg:col-span-5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold mb-5">
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)' }}>Zeya</span>
                  <span className="text-white ml-2">Mosharraf</span>
                </h3>

                <p className="text-gray-500 mb-8 text-[15px] leading-relaxed max-w-md">
                  Transforming complex data into strategic insights. Specialized in advanced analytics,
                  machine learning, and business intelligence solutions.
                </p>

                <div className="flex space-x-3">
                  {loading ? (
                    <div className="text-xs text-gray-600">Loading...</div>
                  ) : (
                    socialLinks.map((social, index) => (
                      <motion.a
                        key={social.id}
                        href={social.link_url || (social.label.toLowerCase() === 'email' || social.icon_name === 'mail' ? `https://mail.google.com/mail/?view=cm&fs=1&to=${social.display_value || social.value}` : (social.display_value || social.value))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg text-gray-500 transition-all duration-300 hover:text-red-400 bg-white/3 border border-white/6"
                        aria-label={social.label}
                        whileHover={{ y: -3, borderColor: 'rgba(220,38,38,0.2)' }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 + 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {iconMap[social.icon_name || ''] || <FaCloud className="text-lg" />}
                      </motion.a>
                    ))
                  )}
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-sm font-semibold mb-6 text-white uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-3">
                  {[
                    { id: "home", label: "Home" },
                    { id: "projects", label: "Projects" },
                    { id: "skills", label: "Skills" },
                    { id: "about", label: "About" },
                    { id: "contact", label: "Contact" }
                  ].map((link, index) => (
                    <motion.li key={index}>
                      <motion.button
                        onClick={() => handleSectionClick(link.id)}
                        className="group flex items-center text-gray-500 hover:text-red-400 transition-all duration-300 text-[14px]"
                        whileHover={{ x: 4 }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 + 0.4, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: '#DC2626' }} />
                        {link.label}
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                className="lg:col-span-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="text-sm font-semibold mb-6 text-white uppercase tracking-wider">Get In Touch</h4>
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-xs text-gray-600">Loading...</div>
                  ) : (
                    contactInfo.map((item) => (
                      <motion.div key={item.id} className="group" whileHover={{ x: 4 }}>
                        <div className="flex items-center p-4 rounded-xl transition-all duration-300" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4" style={{ background: 'rgba(220,38,38,0.06)' }}>
                            <div className="text-red-400/70 text-sm">
                              {iconMap[item.icon_name || ''] || <FaEnvelope className="text-sm" />}
                            </div>
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-600 mb-0.5">{item.label}</p>
                            {item.link_url ? (
                              <a href={item.link_url} className="text-gray-300 hover:text-red-400 transition-colors text-[13px] font-medium">
                                {item.display_value || item.value}
                              </a>
                            ) : (
                              <span className="text-gray-300 text-[13px] font-medium">{item.display_value || item.value}</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-600 text-[12px]">
                © {new Date().getFullYear()} Zeya Mosharraf. All rights reserved.
              </p>

              <div className="flex items-center space-x-5">
                <p className="text-gray-600 text-[12px] flex items-center">
                  Built with <FaHeart className="text-red-500 mx-1.5 animate-pulse text-[10px]" /> using modern web technologies
                </p>

                <motion.button
                  onClick={scrollToTop}
                  className="p-2.5 rounded-lg text-gray-500 hover:text-red-400 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  whileHover={{ y: -2, borderColor: 'rgba(220,38,38,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Scroll to top"
                >
                  <FaArrowUp className="text-xs" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
