import { Calendar, Building2, Briefcase } from "lucide-react";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";
import SectionHeader from "@/components/ui/SectionHeader";
import { useRef, useState, useEffect } from 'react';
import { COLORS, FONTS, BADGES, BG_GRADIENTS } from "@/lib/constants";

interface Experience {
  id: string;
  title: string;
  company: string;
  start_date: string;
  end_date: string;
  description: string;
  skills: string[];
  is_current: boolean;
  sort_order: number;
}

const ExperienceSection = () => {
  const { data: experiences, loading } = useSupabaseTable<Experience>("experience", {
    column: "sort_order",
    ascending: true
  });
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft } = scrollContainerRef.current;
    
    // Calculate which card is currently snapped into view
    // Using the card width + gap (approx 380px + 24px)
    const cardWidth = scrollContainerRef.current.children[0]?.children[0]?.clientWidth || 380;
    const gap = 24; 
    const index = Math.round(scrollLeft / (cardWidth + gap));
    
    if (experiences && index >= 0 && index < experiences.length) {
      setSelectedIndex(index);
    }
  };

  const scrollTo = (index: number) => {
    if (!scrollContainerRef.current) return;
    const cardWidth = scrollContainerRef.current.children[0]?.children[0]?.clientWidth || 380;
    const gap = 24;
    scrollContainerRef.current.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth'
    });
    setSelectedIndex(index);
  };

  const sortedExperiences = experiences || [];

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden" style={{ background: BG_GRADIENTS.sectionDark }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: BG_GRADIENTS.radialRed70 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          icon={Briefcase}
          badge="Experience"
          title="Professional"
          highlight="Experience"
          subtitle="Building expertise through hands-on professional roles"
        />

        {/* Native Horizontal Scrolling Carousel */}
        <div className="relative">
          {loading ? (
            <div className="flex justify-center items-center h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
          ) : (
            <>
              {/* Main Scrolling Row */}
              <div 
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide pb-6 pt-5 snap-x snap-mandatory scroll-smooth"
                onScroll={checkScrollPosition}
              >
                <div className="flex gap-6 px-1" style={{ width: 'max-content' }}>
                  {sortedExperiences.map((experience, index) => (
                    <div 
                      key={experience.id} 
                      className="snap-start flex-shrink-0 w-[85vw] sm:w-[350px] md:w-[380px] lg:w-[400px]"
                    >
                      <ExperienceCard experience={experience} index={index} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              {sortedExperiences.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-6">
                  {sortedExperiences.map((_, index) => (
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
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// Experience Card — simple hover lift
const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => {
  const dateRange = `${experience.start_date} – ${experience.is_current ? 'Present' : experience.end_date}`;
  
  return (
    <div
      className="relative h-[400px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-xl overflow-hidden bg-white/2 border border-white/6 backdrop-blur-sm"
      data-testid={`card-experience-${experience.id}`}
    >
      <div className="h-full p-6 flex flex-col relative overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white mb-2 truncate">{experience.title}</h3>
            <div className="flex items-center text-red-400/80 mb-2">
              <Building2 className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
              <span className="font-medium text-[13px] truncate">{experience.company}</span>
            </div>
            <div className="flex items-center text-gray-500 text-[12px]">
              <Calendar className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
              <span>{dateRange}</span>
            </div>
          </div>
          <div
            className="px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wide ml-3 flex-shrink-0"
            style={{ background: BADGES.work.bg, color: BADGES.work.text, border: BADGES.work.border }}
          >
            Work
          </div>
        </div>

        <div className="mb-4 flex-grow overflow-hidden">
          <p className="text-[13px] text-gray-400 leading-relaxed line-clamp-4">{experience.description}</p>
        </div>

        {experience.skills && experience.skills.length > 0 && (
          <div className="flex-shrink-0 pt-3 border-t border-white/10">
            <p className={`${FONTS.size.xs} font-semibold text-gray-500 mb-2 uppercase tracking-wider`}>Skills</p>
            <div className="flex flex-wrap gap-1">
              {experience.skills.slice(0, 6).map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[10px] font-medium text-gray-400 rounded bg-white/2 border border-white/6"
                  data-testid={`tag-skill-${idx}`}
                >
                  {skill}
                </span>
              ))}
              {experience.skills.length > 6 && (
                <span className="px-2 py-0.5 text-[10px] font-medium text-gray-600 rounded bg-white/1 border border-white/4">
                  +{experience.skills.length - 6}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;
