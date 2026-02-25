import { motion } from "framer-motion";
import SkillBar from "@/components/ui/SkillBar";
import { programmingSkills, visualizationSkills, additionalSkills } from "@/data/skillsData";

const SkillsSection = () => {
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
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-purple-50/10 to-blue-50/10 dark:from-gray-900 dark:via-purple-950/5 dark:to-blue-950/5 transition-colors duration-300 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-20 w-80 h-80 bg-gradient-to-l from-purple-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/5 to-green-400/5 rounded-full blur-3xl"></div>
      <motion.div 
        className="container mx-auto max-w-7xl relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
          data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">Technical Skills</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
          My professional toolkit includes programming languages, data analysis tools, and visualization platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
            data-aos="fade-right"
          >
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">Data Analysis & Programming</h3>
            

            <div className="space-y-4">
              {programmingSkills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  percentage={skill.percentage}
                  color="primary"
                />
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="space-y-8"
            variants={itemVariants}
            data-aos="fade-left"
          >
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">Data Visualization & BI Tools</h3>
            

            <div className="space-y-4">
              {visualizationSkills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  percentage={skill.percentage}
                  color="secondary"
                />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-16"
          variants={itemVariants}
        >
          <h3 className="text-xl font-bold mb-6 text-center">Additional Skills</h3>

          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill, index) => (
              <motion.span
                key={skill}
                className="px-6 py-3 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-md text-gray-700 dark:text-gray-200 hover:shadow-lg hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 font-medium border border-gray-200 dark:border-gray-600"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
        
        {/* Visual divider between sections */}
        <motion.div 
          className="mt-20 flex justify-center" 
          variants={itemVariants}
        >
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-primary rounded"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
