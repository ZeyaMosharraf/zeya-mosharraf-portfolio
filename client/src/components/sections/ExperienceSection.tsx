import { Calendar, Building2, Briefcase } from "lucide-react";
import { experiences } from "@/data/experience";
import SectionHeader from "@/components/ui/SectionHeader";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { sortExperiencesByDate } from "@/lib/dataTransforms";

const ExperienceSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', skipSnaps: false, dragFree: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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

  const sortedExperiences = sortExperiencesByDate(experiences);

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden" style={{ background: '#0B0F14' }}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 70% 30%, rgba(220,38,38,0.03) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          icon={Briefcase}
          badge="Experience"
          title="Professional"
          highlight="Experience"
          subtitle="Building expertise through hands-on professional roles"
        />

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


      </div>
    </section>
  );
};

// Experience Card — simple hover lift
const ExperienceCard = ({ experience, index }: { experience: any; index: number }) => {
  return (
    <div
      className="relative h-[400px] cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-xl overflow-hidden bg-white/2 border border-white/6 backdrop-blur-sm"
      data-testid={`card-experience-${experience.id}`}
    >
      <div className="h-full p-6 flex flex-col relative overflow-hidden">
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
          <p className="text-[13px] text-gray-400 leading-relaxed line-clamp-4">{experience.description}</p>
        </div>

        {experience.skills && experience.skills.length > 0 && (
          <div className="flex-shrink-0 pt-3 border-t border-white/10">
            <p className="text-[10px] font-semibold text-gray-500 mb-2 uppercase tracking-wider">Skills</p>
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
