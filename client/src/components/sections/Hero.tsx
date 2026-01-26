import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import HeroDataVisualization from "@/components/ui/HeroDataVisualization";

const Hero = () => {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typedRef.current) {
      const typed = new Typed(typedRef.current, {
        strings: [
          "Data Analyst",
          "Power BI Developer", 
          "Business Analyst"
        ],
        typeSpeed: 100,
        backSpeed: 50,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        backDelay: 2000,
        startDelay: 1000
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

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

  return (
    <section 
      id="home" 
      className="relative pt-24 md:pt-28 pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/10 transition-colors duration-300 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-l from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center justify-center">
          <motion.div 
            className="lg:col-span-7 space-y-4 lg:space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants} 
              className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200/50 dark:border-blue-700/50 backdrop-blur-sm"
            >
              <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">I'm a </span>
              <span ref={typedRef} className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold"></span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white transition-colors duration-300"
            >
              Transforming Data into{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent font-extrabold">
                Actionable Insights
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl transition-colors duration-300"
            >
              Hi, I'm Zeya Mosharraf. I help businesses make data-driven decisions through advanced analytics, 
              interactive visualizations, and predictive modeling. With expertise in Python, SQL, Power BI, and other BI tools, 
              I turn complex data into clear strategies that drive business growth.
            </motion.p>
            
            <motion.div 
              variants={itemVariants} 
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => handleSectionClick("projects")}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                View My Work <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => handleSectionClick("contact")}
                className="group px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-semibold backdrop-blur-sm hover:bg-blue-50 dark:hover:bg-blue-900/10 transform hover:-translate-y-1"
              >
                Contact Me
              </button>
            </motion.div>
            
            <motion.div 
              variants={itemVariants} 
              className="flex gap-3 pt-2"
            >
              <motion.a
                href="https://github.com/ZeyaMosharraf"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="GitHub"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="text-xl" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/zeya-mosharraf/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedinIn className="text-xl" />
              </motion.a>
              <motion.a
                href="mailto:zeyamosharraf999@gmail.com"
                className="group p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="Email"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope className="text-xl" />
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              {/* Animated Background Blobs */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blob-animation"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 blob-animation" style={{animationDelay: '2s'}}></div>
              
              <div className="glass-effect rounded-2xl shadow-2xl relative z-10 w-full h-auto p-6 flex flex-col items-center backdrop-blur-xl border border-white/20 dark:border-gray-700/50">
                {/* Profile Image */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-600/30 rounded-full opacity-60 group-hover:opacity-80 transition duration-700 blur-sm"></div>
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-white/50 dark:border-gray-300/30 shadow-xl backdrop-blur-sm">
                    <img 
                      src="https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/image/profile%20image.png"
                      alt="Zeya Mosharraf" 
                      className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-300 group-hover:brightness-110"
                    />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 mt-6 transition-colors duration-300">Zeya Mosharraf</h3>
                <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold mb-4 text-lg">Data Analyst & BI Specialist</p>
                
              {/* Data Visualization Section */}
                <div className="w-full mt-6 p-5 rounded-xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 backdrop-blur-sm border border-blue-200/30 dark:border-blue-700/30">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">Professional Expertise</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="floating-card bg-blue-100/70 dark:bg-blue-900/40 p-4 rounded-xl transition-all duration-300 border border-blue-200/50 dark:border-blue-700/50">
                      <div className="text-blue-700 dark:text-blue-300 font-semibold mb-1 text-sm">SQL & Database</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Advanced queries & modeling</div>
                    </div>
                    
                    <div className="floating-card bg-green-100/70 dark:bg-green-900/40 p-4 rounded-xl transition-all duration-300 border border-green-200/50 dark:border-green-700/50">
                      <div className="text-green-700 dark:text-green-300 font-semibold mb-1 text-sm">Power BI</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Interactive dashboards</div>
                    </div>
                    
                    <div className="floating-card bg-yellow-100/70 dark:bg-yellow-900/40 p-4 rounded-xl transition-all duration-300 border border-yellow-200/50 dark:border-yellow-700/50">
                      <div className="text-yellow-700 dark:text-yellow-300 font-semibold mb-1 text-sm">Python</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">ML & data processing</div>
                    </div>
                    
                    <div className="floating-card bg-purple-100/70 dark:bg-purple-900/40 p-4 rounded-xl transition-all duration-300 border border-purple-200/50 dark:border-purple-700/50">
                      <div className="text-purple-700 dark:text-purple-300 font-semibold mb-1 text-sm">Excel</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Advanced analytics</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
