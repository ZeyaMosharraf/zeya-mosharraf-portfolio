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
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 dark:from-gray-950 dark:via-slate-900 dark:to-gray-950 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Brand Section */}
              <motion.div 
                className="lg:col-span-5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.h3 
                  className="text-4xl font-bold mb-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Zeya
                  </span>
                  <span className="text-white ml-2">Mosharraf</span>
                </motion.h3>
                
                <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-md">
                  Transforming complex data into strategic insights. Specialized in advanced analytics, 
                  machine learning, and business intelligence solutions.
                </p>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {[
                    { href: "https://github.com/zeyamosharraf", icon: FaGithub, label: "GitHub", color: "hover:bg-gray-700" },
                    { href: "https://www.linkedin.com/in/zeya-mosharraf/", icon: FaLinkedinIn, label: "LinkedIn", color: "hover:bg-blue-600" },
                    { href: "https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0", icon: FaCloud, label: "Google Cloud", color: "hover:bg-green-600" },
                    { href: "https://www.hackerrank.com/profile/zeyamosharraf999", icon: FaHackerrank, label: "HackerRank", color: "hover:bg-emerald-600" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 ${social.color} transition-all duration-300 hover:scale-110 hover:text-white`}
                      aria-label={social.label}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <social.icon className="text-xl" />
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
                <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
                <ul className="space-y-4">
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
                        className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 text-base"
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
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
                <h4 className="text-xl font-bold mb-6 text-white">Get In Touch</h4>
                <div className="space-y-6">
                  <motion.div 
                    className="group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                        <FaEnvelope className="text-blue-400 text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Email</p>
                        <a
                          href="mailto:zeyamosharraf999@gmail.com"
                          className="text-white hover:text-blue-400 transition-colors font-medium"
                        >
                          zeyamosharraf999@gmail.com
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                        <FaMapMarkerAlt className="text-purple-400 text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Location</p>
                        <span className="text-white font-medium">New Delhi, India</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.p 
                className="text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                © {new Date().getFullYear()} Zeya Mosharraf. All rights reserved.
              </motion.p>
              
              <motion.div 
                className="flex items-center space-x-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-400 text-sm flex items-center">
                  Built with <FaHeart className="text-red-500 mx-2 animate-pulse" /> using modern web technologies
                </p>
                
                <motion.button
                  onClick={scrollToTop}
                  className="group p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Scroll to top"
                >
                  <FaArrowUp className="text-sm" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
