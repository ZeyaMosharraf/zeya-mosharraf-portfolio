import { motion } from "framer-motion";
import { Calendar, Building2, Briefcase, ExternalLink } from "lucide-react";
import { certificates } from "@/data/Certificatedata";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

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
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      skipSnaps: false,
      dragFree: false
    }
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

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

  const carouselVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const sortedExperiences = experienceEntries
    .sort((a, b) => parseStartDate(b.date).getTime() - parseStartDate(a.date).getTime());

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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

        {/* Carousel Container */}
        <motion.div
          variants={carouselVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {sortedExperiences.map((experience, index) => (
                <div 
                  key={experience.id} 
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_100%] md:flex-[0_0_calc(50%_-_12px)] lg:flex-[0_0_calc(33.333%_-_16px)]"
                >
                  <ExperienceCard experience={experience} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === selectedIndex
                    ? 'w-8 h-3 bg-green-600 dark:bg-green-500'
                    : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-green-400 dark:hover:bg-green-700'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                data-testid={`button-pagination-${index}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Complete Work History Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="/certificates?tab=experience"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg"
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: "0 10px 25px rgba(34, 197, 94, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            data-testid="button-complete-work-history"
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

// 3D Flip Card Component
const ExperienceCard = ({ experience, index }: { experience: any; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFlip = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      className="relative h-[400px] cursor-pointer perspective-1000"
      onMouseEnter={() => !isMobile && setIsFlipped(true)}
      onMouseLeave={() => !isMobile && setIsFlipped(false)}
      onClick={handleFlip}
      data-testid={`card-experience-${experience.id}`}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="h-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate">
                  {experience.title}
                </h3>
                <div className="flex items-center text-green-600 dark:text-green-400 mb-2">
                  <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="font-semibold text-sm truncate">{experience.issuer}</span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{experience.date}</span>
                </div>
              </div>
              <div className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-3 py-1.5 rounded-lg text-xs font-semibold ml-3 flex-shrink-0">
                Work
              </div>
            </div>

            {/* Description — truncated */}
            <div className="mb-4 flex-grow overflow-hidden">
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                {experience.description}
              </p>
            </div>

            {/* Flip Indicator */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-green-600 dark:text-green-400 mt-auto font-medium">
              <span>{isMobile ? '↑ Tap to read full experience' : '↑ Hover to read full experience'}</span>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl border border-green-200 dark:border-green-700 flex flex-col">
            {/* Role + company header */}
            <div className="mb-3 flex-shrink-0">
              <h4 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                {experience.title}
              </h4>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-0.5">
                {experience.issuer} &middot; {experience.date}
              </p>
            </div>

            {/* Full description */}
            <div className="flex-grow overflow-y-auto mb-3 pr-1">
              <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                {experience.description}
              </p>
            </div>

            {/* Skills */}
            {experience.skills && experience.skills.length > 0 && (
              <div className="flex-shrink-0 pt-3 border-t border-green-200 dark:border-green-700">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Skills</p>
                <div className="flex flex-wrap gap-1">
                  {experience.skills.slice(0, 8).map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-xs font-medium bg-white dark:bg-gray-700 text-green-700 dark:text-green-300 rounded-md border border-green-200 dark:border-green-600"
                      data-testid={`tag-skill-${idx}`}
                    >
                      {skill}
                    </span>
                  ))}
                  {experience.skills.length > 8 && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md border border-gray-200 dark:border-gray-600">
                      +{experience.skills.length - 8}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExperienceSection;
