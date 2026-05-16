import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useRef, useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  Target,
  Zap
} from "lucide-react";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";
import { CaseStudy } from "@/types/supabase";
import { useMemo } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import { ease } from "@/lib/animations";

const getCategoryColor = (cat: string) => {
  const c = cat.toLowerCase();
  if (c.includes("marketing")) return "#f97316";
  if (c.includes("automation")) return "#a78bfa";
  if (c.includes("data analytics") || c.includes("business intelligence"))
    return "#22d3ee";
  return "#34d399";
};

const getPrimaryCat = (cat: string) => cat.split("|")[0].trim();

const firstSentence = (text: string | null) => {
  if (!text) return "";
  const s = text.split('.')[0];
  return s + '.';
};

const FeaturedCaseStudySection = () => {
  const [, setLocation] = useLocation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const orderBy = useMemo(() => ({ column: "sort_order", ascending: true }), []);
  const { data: allCaseStudies, loading } = useSupabaseTable<CaseStudy>("case_studies", orderBy);

  const featuredStudies = useMemo(() => {
    if (!allCaseStudies) return [];
    return allCaseStudies.filter(cs => cs.featured);
  }, [allCaseStudies]);

  const [activeIndex, setActiveIndex] = useState(0);
  const active = featuredStudies[activeIndex];
  
  const catColor = useMemo(() => active ? getCategoryColor(active.category) : "#34d399", [active]);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const idx = cardRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: 0.6 },
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [featuredStudies]);

  if (loading || !active) return null;

  return (
    <section className="relative overflow-hidden" style={{ background: "#0d0d0d" }}>
      {/* Subtle bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 45%, rgba(220,38,38,0.015) 0%, transparent 70%)",
        }}
      />

      <div
        ref={sectionRef}
        className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="mb-16">
          <SectionHeader
            icon={Sparkles}
            badge="Portfolio"
            title="Featured"
            highlight="Case Studies"
            subtitle="Deep dives into engineering challenges, automated workflows, and measurable business outcomes."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Executive Summary */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease }}
                className="rounded-3xl p-8 lg:p-10 relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.015)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: catColor, boxShadow: `0 0 8px ${catColor}` }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: catColor }}>
                      {getPrimaryCat(active.category)}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">
                    {new Date(active.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
                  {active.title}
                </h3>

                <p className="text-[14px] text-gray-500 leading-relaxed mb-8">
                  {active.summary}
                </p>

                {/* Impact Highlight */}
                {(active.impact || active.results) && (
                  <div 
                    className="p-6 rounded-2xl mb-8 relative overflow-hidden"
                    style={{ background: "rgba(220,38,38,0.02)", border: "1px solid rgba(220,38,38,0.06)" }}
                  >
                    <div className="flex items-center gap-2 text-red-500/80 mb-3">
                      <Target className="w-3.5 h-3.5" />
                      <span className="text-[10px] text-red-500 font-black uppercase tracking-[0.3em]">Impact</span>
                    </div>
                    <p className="text-[13px] text-gray-400 leading-relaxed italic">
                      {active.impact ? active.impact.replace(/"/g, '') : firstSentence(active.results)}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setLocation(`/case-study/${active.slug}`)}
                  className="group inline-flex items-center gap-3 h-[48px] px-8 rounded-full text-[13px] font-bold text-white transition-all duration-300"
                  style={{ background: "#DC2626" }}
                >
                  View Story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Scroll Track */}
          <div className="lg:col-span-7 relative">
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide"
              style={{ scrollbarWidth: "none" }}
            >
              {featuredStudies.map((cs: CaseStudy, i: number) => {
                const isActive = activeIndex === i;
                const tools = cs.tools_array || [];
                
                return (
                  <div
                    key={cs.id}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    className="snap-center shrink-0 cursor-pointer"
                    style={{ width: "min(80vw, 360px)" }}
                    onClick={() => setLocation(`/case-study/${cs.slug}`)}
                  >
                    <div
                      className="group relative rounded-3xl p-8 h-full transition-all duration-500 overflow-hidden"
                      style={{
                        background: isActive ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.015)",
                        border: isActive ? "1px solid rgba(220,38,38,0.2)" : "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <div className="flex justify-between items-start mb-8">
                        <div className={`p-2.5 rounded-xl transition-colors ${isActive ? 'bg-red-500/10 text-red-500' : 'bg-white/5 text-gray-600'}`}>
                          <Zap className="w-5 h-5" />
                        </div>
                        <span className="text-[24px] font-bold text-white/5">0{i + 1}</span>
                      </div>

                      <h4 className="text-xl font-bold text-white mb-4 group-hover:text-red-50 transition-colors">
                        {cs.title}
                      </h4>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {tools.slice(0, 3).map((tool: string, j: number) => (
                          <span key={j} className="text-[9px] font-bold uppercase tracking-widest text-gray-600">
                            {tool.trim()}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                        <span className="text-[11px] text-gray-600 font-medium uppercase tracking-widest">
                          {new Date(cs.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-red-500/30 group-hover:text-red-500 transition-all">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudySection;
