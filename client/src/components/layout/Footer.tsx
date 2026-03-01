import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  FaGithub, 
  FaLinkedinIn, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaHackerrank,
  FaCloud,
  FaArrowUp
} from "react-icons/fa";

const Footer = () => {
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
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
    <footer className="relative text-white overflow-hidden" style={{ background: '#080b10' }}>
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
                  {[
                    { href: "https://github.com/zeyamosharraf", icon: FaGithub, label: "GitHub" },
                    { href: "https://www.linkedin.com/in/zeya-mosharraf/", icon: FaLinkedinIn, label: "LinkedIn" },
                    { href: "https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0", icon: FaCloud, label: "Google Cloud" },
                    { href: "https://www.hackerrank.com/profile/zeyamosharraf999", icon: FaHackerrank, label: "HackerRank" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg text-gray-500 transition-all duration-300 hover:text-red-400"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      aria-label={social.label}
                      whileHover={{ y: -3, borderColor: 'rgba(220,38,38,0.2)' }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 + 0.3, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <social.icon className="text-lg" />
                    </motion.a>
                  ))}
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
                  <motion.div className="group" whileHover={{ x: 4 }}>
                    <div className="flex items-center p-4 rounded-xl transition-all duration-300" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4" style={{ background: 'rgba(220,38,38,0.06)' }}>
                        <FaEnvelope className="text-red-400/70 text-sm" />
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-600 mb-0.5">Email</p>
                        <a href="mailto:zeyamosharraf999@gmail.com" className="text-gray-300 hover:text-red-400 transition-colors text-[13px] font-medium">
                          zeyamosharraf999@gmail.com
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div className="group" whileHover={{ x: 4 }}>
                    <div className="flex items-center p-4 rounded-xl transition-all duration-300" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4" style={{ background: 'rgba(220,38,38,0.06)' }}>
                        <FaMapMarkerAlt className="text-red-400/70 text-sm" />
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-600 mb-0.5">Location</p>
                        <span className="text-gray-300 text-[13px] font-medium">New Delhi, India</span>
                      </div>
                    </div>
                  </motion.div>
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
