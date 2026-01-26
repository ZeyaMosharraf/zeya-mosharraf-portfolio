import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink, Building2, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { certificates } from "@/data/Certificatedata";
import { useRef } from "react";

// Filter for experience entries
const experienceEntries = certificates.filter(cert => cert.category === "experience");

// Helper function to parse dates for proper sorting
const parseStartDate = (dateString: string) => {
  // Handle different date formats and dash characters (both "-" and "–")
  const startDate = dateString.split(/\s*[-–]\s*/)[0] || dateString;
  
  // Convert month abbreviations to numbers
  const monthMap: { [key: string]: number } = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  
  const parts = startDate.trim().split(' ');
  if (parts.length === 2) {
    const month = monthMap[parts[0]];
    const year = parseInt(parts[1]);
    return new Date(year, month);
  }
  
  return new Date(startDate);
};

const ExperienceSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mobileScrollContainerRef = useRef<HTMLDivElement>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const headerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: 'smooth'
      });
    }
    if (mobileScrollContainerRef.current) {
      mobileScrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: 'smooth'
      });
    }
    if (mobileScrollContainerRef.current) {
      mobileScrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Briefcase className="h-6 w-6 text-white" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Professional Experience
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Building expertise through hands-on professional roles
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <motion.button
            onClick={scrollLeft}
            className="group relative p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </motion.button>
          <motion.button
            onClick={scrollRight}
            className="group relative p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </motion.button>
        </div>

        {/* Horizontal Timeline Experience */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Desktop & Tablet: Horizontal scrollable timeline */}
          <div className="hidden md:block">
            {/* Timeline Line */}
            <div className="relative mb-16">
              {/* Horizontal scrollable container */}
              <div ref={scrollContainerRef} className="relative overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-6 min-w-max px-4">
                  {experienceEntries
                    .sort((a, b) => parseStartDate(a.date).getTime() - parseStartDate(b.date).getTime())
                    .map((experience, index) => (
                    <motion.div
                      key={experience.id}
                      variants={item}
                      className="relative flex-shrink-0 w-80"
                    >
                      {/* Timeline line above card */}
                      {index > 0 && (
                        <div className="absolute top-6 right-80 w-6 h-0.5 bg-gray-300 dark:bg-gray-700" />
                      )}
                      
                      {/* Timeline dot */}
                      <motion.div
                        className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full z-10 shadow-lg border-4 border-white dark:border-gray-900"
                        initial={{ scale: 0, rotate: 0 }}
                        whileInView={{ scale: 1, rotate: 360 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                          animate={{ 
                            boxShadow: [
                              "0 0 0 0 rgba(34, 197, 94, 0.4)",
                              "0 0 0 10px rgba(34, 197, 94, 0)",
                              "0 0 0 0 rgba(34, 197, 94, 0)"
                            ] 
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                      
                      {/* Experience card */}
                      <motion.div
                        className="mt-12"
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <ExperienceCard experience={experience} index={index} />
                      </motion.div>
                      
                      {/* Timeline label */}
                      <motion.div
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-green-600 dark:text-green-400 bg-white dark:bg-gray-900 px-2 py-1 rounded-full whitespace-nowrap"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                        viewport={{ once: true }}
                      >
                        {experience.date.split(/\s*[-–]\s*/)[0]}
                      </motion.div>
                    </motion.div>
                  ))}
                  
                  {/* Future indicator */}
                  <motion.div
                    className="flex-shrink-0 w-32 flex items-start justify-center pt-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex flex-col items-center text-green-600 dark:text-green-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full mb-2 animate-pulse"></div>
                      <span className="text-sm font-medium">Growing...</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Horizontal scrollable */}
          <div className="md:hidden">
            <div ref={mobileScrollContainerRef} className="overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex gap-4 min-w-max px-2">
                {experienceEntries
                  .sort((a, b) => parseStartDate(a.date).getTime() - parseStartDate(b.date).getTime())
                  .map((experience, index) => (
                  <motion.div
                    key={experience.id}
                    variants={item}
                    className="flex-shrink-0 w-72"
                  >
                    <ExperienceCard experience={experience} index={index} />
                  </motion.div>
                ))}
                
                {/* Future indicator */}
                <motion.div
                  className="flex-shrink-0 w-24 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col items-center text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mb-2 animate-pulse"></div>
                    <span className="text-xs font-medium">Growing...</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Compact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <motion.a
            href="/certificates?tab=experience"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-medium transition-all duration-300"
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: "0 10px 25px rgba(34, 197, 94, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Briefcase className="w-4 h-4 mr-2" />
            </motion.div>
            Complete Work History
            <ExternalLink className="w-4 h-4 ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// Modern Experience Card Component with Animated Gradient Border
const ExperienceCard = ({ experience, index }: { experience: any; index: number }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 relative overflow-hidden group"
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      {/* Animated Gradient Border */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, #10b981, #059669, #047857, #10b981)",
          backgroundSize: "400% 100%",
          padding: "2px",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-full h-full bg-white dark:bg-gray-800 rounded-xl" />
      </motion.div>

      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30 dark:from-green-900/5 dark:to-emerald-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors truncate">
              {experience.title}
            </h3>
            <div className="flex items-center text-green-600 dark:text-green-400 mb-1">
              <Building2 className="h-3 w-3 mr-1 flex-shrink-0" />
              <span className="font-medium text-sm truncate">{experience.issuer}</span>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
              <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
              <span>{experience.date}</span>
            </div>
          </div>
          <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs font-medium ml-2 flex-shrink-0">
            Work
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {experience.description.length > 100 
              ? `${experience.description.substring(0, 100)}...` 
              : experience.description}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {experience.skills.slice(0, 4).map((skill: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md"
              >
                {skill}
              </span>
            ))}
            {experience.skills.length > 4 && (
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md">
                +{experience.skills.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        {experience.credentialLink && experience.credentialLink !== "#" && (
          <motion.a
            href={experience.credentialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium text-xs transition-all duration-300 shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-3 h-3 mr-2" />
            View Details
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

export default ExperienceSection;