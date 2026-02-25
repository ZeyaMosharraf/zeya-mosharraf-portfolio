import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useRef, useState } from "react";
import { Sparkles, TrendingUp, Eye } from "lucide-react";
import { caseStudies } from "../../data/CaseStudiesdata";
import CaseStudyCard from "../ui/CaseStudyCard";

const FeaturedCaseStudySection = () => {
  const [, setLocation] = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: index * 420,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };
  
  // Show all case studies instead of just 2
  const featuredCaseStudies = caseStudies;

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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/10 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/20 dark:from-blue-600/10 dark:to-purple-600/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-40 w-96 h-96 bg-gradient-to-tr from-green-200/20 to-blue-200/30 dark:from-green-600/5 dark:to-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-yellow-200/10 to-orange-200/20 dark:from-yellow-600/5 dark:to-orange-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <motion.div 
        className="container mx-auto max-w-7xl relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 font-medium text-sm mb-6"
            variants={itemVariants}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Case Studies Portfolio
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent leading-tight"
            variants={itemVariants}
          >
            Featured Case Studies
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Dive deep into real-world projects showcasing data-driven solutions and business impact
          </motion.p>
          
          {/* Stats Row */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mt-8"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-gray-900 dark:text-white">4</span>
              <span>Success Stories</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Eye className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-gray-900 dark:text-white">Real Impact</span>
              <span>Measurable Results</span>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Carousel */}
        <div className="relative mb-16">

          {/* Enhanced Carousel Container */}
          <motion.div
            className="relative overflow-hidden rounded-2xl"
            variants={itemVariants}
          >
            <div 
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide scroll-smooth px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {featuredCaseStudies.map((caseStudy) => (
                <motion.div
                  key={caseStudy.id}
                  className="flex-none w-80 md:w-96 lg:w-[420px]"
                  variants={itemVariants}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CaseStudyCard caseStudy={caseStudy} />
                </motion.div>
              ))}
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {featuredCaseStudies.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 w-2'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent pointer-events-none z-10"></div>
          </motion.div>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <div className="relative inline-block">
            <motion.button
              onClick={() => setLocation("/case-studies")}
              className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 via-blue-600 to-purple-600 hover:from-blue-700 hover:via-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              data-testid="button-view-all-case-studies"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span>View All Case Studies</span>
                <motion.div
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.div>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </div>
          
          <motion.p 
            className="mt-6 text-gray-600 dark:text-gray-400 max-w-md mx-auto"
            variants={itemVariants}
          >
            Explore detailed breakdowns of each project including methodologies, challenges, and measurable outcomes
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturedCaseStudySection;