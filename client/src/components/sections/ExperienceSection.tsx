import { motion, useInView } from "framer-motion";
import { Calendar, Building2, Briefcase, ExternalLink, ArrowRight } from "lucide-react";
import { certificates } from "@/data/Certificatedata";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState, useRef } from 'react';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Filter for experience entries
const experienceEntries = certificates.filter(cert => cert.category === "experience");

// Helper function to parse dates for proper sorting
const parseStartDate = (dateString: string) => {
  const startDate = dateString.split(/\s*[-–]\s*/)[0] || dateString;
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', skipSnaps: false, dragFree: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  const scrollTo = useCallback((index: number) => { if (emblaApi) emblaApi.scrollTo(index); }, [emblaApi]);
  const onSelect = useCallback(() => { if (!emblaApi) return; setSelectedIndex(emblaApi.selectedScrollSnap()); }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => { emblaApi.off('select', onSelect); emblaApi.off('reInit', onSelect); };
  }, [emblaApi, onSelect]);

  const sortedExperiences = experienceEntries.sort((a, b) => parseStartDate(b.date).getTime() - parseStartDate(a.date).getTime());

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ background: '#0B0F14' }}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 70% 30%, rgba(220,38,38,0.03) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase mb-5 relative overflow-hidden"
            style={{ background: 'rgba(239,68,68,0.08)', color: 'rgba(239,68,68,0.8)', border: '1px solid rgba(239,68,68,0.12)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.1) 50%, transparent 100%)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
            />
            <Briefcase className="w-3 h-3 relative z-10" />
            <span className="relative z-10">Experience</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.06 }}
          >
            Professional{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)' }}>Experience</span>
          </motion.h2>

          <motion.p
            className="text-[15px] text-gray-500 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
          >
            Building expertise through hands-on professional roles
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 pt-5">
              {sortedExperiences.map((experience, index) => (
                <div key={experience.id} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_100%] md:flex-[0_0_calc(50%_-_12px)] lg:flex-[0_0_calc(33.333%_-_16px)]">
                  <ExperienceCard experience={experience} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-1.5 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className="h-[3px] rounded-full transition-all duration-400"
                style={{
                  width: index === selectedIndex ? 28 : 8,
                  background: index === selectedIndex ? '#DC2626' : 'rgba(255,255,255,0.08)',
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <motion.a
            href="/certificates?tab=experience"
            className="group inline-flex items-center gap-2 h-[38px] px-5 text-[13px] font-medium rounded-lg transition-all duration-250"
            style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#9CA3AF' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(220,38,38,0.4)'; e.currentTarget.style.color = '#e5e7eb'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#9CA3AF'; }}
            data-testid="button-complete-work-history"
          >
            <Briefcase className="w-3.5 h-3.5" />
            Complete Work History
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

// Experience Card — glassmorphism flip card
const ExperienceCard = ({ experience, index }: { experience: any; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFlip = () => { if (isMobile) setIsFlipped(!isFlipped); };

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
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden" style={{ backfaceVisibility: "hidden" }}>
          <div
            className="h-full rounded-xl p-6 flex flex-col relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent)' }} />
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white mb-2 truncate">{experience.title}</h3>
                <div className="flex items-center text-red-400/80 mb-2">
                  <Building2 className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
                  <span className="font-medium text-[13px] truncate">{experience.issuer}</span>
                </div>
                <div className="flex items-center text-gray-500 text-[12px]">
                  <Calendar className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
                  <span>{experience.date}</span>
                </div>
              </div>
              <div
                className="px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wide ml-3 flex-shrink-0"
                style={{ background: 'rgba(220,38,38,0.08)', color: 'rgba(220,38,38,0.8)', border: '1px solid rgba(220,38,38,0.12)' }}
              >
                Work
              </div>
            </div>

            <div className="mb-4 flex-grow overflow-hidden">
              <p className="text-[13px] text-gray-400 leading-relaxed line-clamp-3">{experience.description}</p>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-600 mt-auto">
              <span>{isMobile ? '↑ Tap to read full experience' : '↑ Hover to read full experience'}</span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div
            className="h-full rounded-xl p-6 flex flex-col"
            style={{ background: 'rgba(220,38,38,0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(220,38,38,0.1)' }}
          >
            <div className="mb-3 flex-shrink-0">
              <h4 className="text-[15px] font-bold text-white leading-tight">{experience.title}</h4>
              <p className="text-[11px] text-red-400/70 font-medium mt-0.5">{experience.issuer} · {experience.date}</p>
            </div>

            <div className="flex-grow overflow-y-auto mb-3 pr-1">
              <p className="text-[12px] text-gray-400 leading-relaxed">{experience.description}</p>
            </div>

            {experience.skills && experience.skills.length > 0 && (
              <div className="flex-shrink-0 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[10px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Skills</p>
                <div className="flex flex-wrap gap-1">
                  {experience.skills.slice(0, 8).map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-medium text-gray-400 rounded"
                      style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
                      data-testid={`tag-skill-${idx}`}
                    >
                      {skill}
                    </span>
                  ))}
                  {experience.skills.length > 8 && (
                    <span className="px-2 py-0.5 text-[10px] font-medium text-gray-600 rounded" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
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
