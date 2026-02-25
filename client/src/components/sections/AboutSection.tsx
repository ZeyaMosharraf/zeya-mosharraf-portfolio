import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaDownload } from "react-icons/fa";

const AboutSection = () => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50/10 to-purple-50/5 dark:from-gray-900 dark:via-blue-950/5 dark:to-purple-950/5 transition-colors duration-300 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-l from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
      <motion.div 
        className="container mx-auto max-w-7xl relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            className="lg:col-span-5"
            variants={itemVariants}
            data-aos="zoom-in"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-400 opacity-10 rounded-2xl transform -rotate-3"></div>
              <svg 
                className="rounded-2xl shadow-lg relative z-10 w-full h-auto bg-white dark:bg-gray-800 transition-colors duration-300"
                viewBox="0 0 400 500" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Professional portrait SVG */}
                <rect className="fill-[#F9FAFB] dark:fill-gray-700 transition-colors duration-300" width="400" height="500" rx="12" />
                
                {/* Stylized person silhouette */}
                <rect x="100" y="80" width="200" height="200" rx="100" fill="#E5E7EB" />
                <circle cx="200" cy="150" r="70" fill="#9CA3AF" />
                <path d="M200,180 Q240,180 240,220 T200,260 Q160,260 160,220 T200,180 z" fill="#9CA3AF" />
                
                <rect x="100" y="300" width="200" height="30" rx="6" fill="#E5E7EB" />
                <rect x="130" y="350" width="140" height="20" rx="4" fill="#E5E7EB" />
                <rect x="150" y="390" width="100" height="20" rx="4" fill="#E5E7EB" />
                
                {/* Data elements */}
                <circle cx="70" cy="450" r="20" fill="#3B82F6" opacity="0.2" />
                <circle cx="330" cy="450" r="20" fill="#3B82F6" opacity="0.2" />
                <circle cx="50" cy="50" r="15" fill="#10B981" opacity="0.2" />
                <circle cx="350" cy="50" r="15" fill="#10B981" opacity="0.2" />
                
                <path d="M70,100 Q90,80 110,100 T150,100" stroke="#3B82F6" strokeWidth="2" opacity="0.5" />
                <path d="M250,100 Q270,80 290,100 T330,100" stroke="#3B82F6" strokeWidth="2" opacity="0.5" />
              </svg>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-7 space-y-6"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center lg:text-left">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">About Me</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">
              I'm a passionate Data Analyst with hands-on experience in SQL, Python, Power BI, and data visualization. 
              I specialize in transforming raw data into meaningful insights that help businesses make smarter decisions.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">
             I've worked on real-world projects across healthcare and retail domains, including analyzing pathology lab data and optimizing sales campaigns. 
             I enjoy solving business problems through data exploration, trend analysis, and building interactive dashboards that drive impact.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Currently, I'm focused on sharpening my database development and advanced SQL skills while preparing for full-time opportunities in data analytics and business intelligence.
            </p>

            <div className="space-y-6 pt-4">
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white transition-colors duration-300 text-center lg:text-left">Education</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <div className="flex-shrink-0 h-5 w-5 text-primary mt-1">
                      <FaGraduationCap />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300">BSc in Industrial Chemistry</p>
                      <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Delhi University, Deshbandhu College Dec 2020 - May 2023</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white transition-colors duration-300 text-center lg:text-left">Experience</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <div className="flex-shrink-0 h-5 w-5 text-primary mt-1">
                      <FaBriefcase />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300">SQL Developer / Database Consultant Intern</p>
                      <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Nirjai Technologies, March 2025 - May 2025</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 h-5 w-5 text-primary mt-1">
                      <FaBriefcase />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300">Data Analytics & Operations Intern</p>
                      <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">The Design Cart, Nov 2024 - Feb 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 text-center lg:text-left">
              <a
                href="https://drive.google.com/uc?export=download&id=1Mon66Yw1K6FgRXC6NYJbUZopdefqNRqH"
                className="inline-flex items-center text-primary hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-300"
              >
                Download Resume <FaDownload className="ml-2" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
