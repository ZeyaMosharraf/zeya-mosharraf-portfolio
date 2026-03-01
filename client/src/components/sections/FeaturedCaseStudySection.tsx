import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useRef, useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { caseStudies } from "../../data/CaseStudiesdata";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const getCategoryColor = (cat: string) => {
  const c = cat.toLowerCase();
  if (c.includes("marketing")) return "#f97316";
  if (c.includes("automation")) return "#a78bfa";
  if (c.includes("data analytics") || c.includes("business intelligence"))
    return "#22d3ee";
  return "#34d399";
};

const getPrimaryCat = (cat: string) => cat.split("|")[0].trim();

const firstSentences = (text: string, n = 2) => {
  const s = text.match(/[^.!?]+[.!?]+/g) || [text];
  return s.slice(0, n).join(" ").trim();
};

/* ================================================================
   FeaturedCaseStudySection
   Top headline -> Left executive summary | Right horizontal scroll cards
   ================================================================ */
const FeaturedCaseStudySection = () => {
  const [, setLocation] = useLocation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });

  const [activeIndex, setActiveIndex] = useState(0);
  const active = caseStudies[activeIndex];
  const catColor = getCategoryColor(active.category);

  /* ---- Scroll snap observer: detect which card is in view ---- */
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
  }, []);


  return (
    <section className="relative overflow-hidden" style={{ background: "#0d0d0d" }}>
      {/* Subtle bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 45%, rgba(220,38,38,0.025) 0%, transparent 70%)",
        }}
      />

      <div
        ref={sectionRef}
        className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6 lg:px-8 py-24 lg:py-28"
      >
        {/* ═══ TOP: Section Headline ═══ */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase mb-5 relative overflow-hidden"
            style={{
              background: "rgba(239,68,68,0.08)",
              color: "rgba(239,68,68,0.8)",
              border: "1px solid rgba(239,68,68,0.12)",
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.1) 50%, transparent 100%)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
            />
            <Sparkles className="w-3 h-3 relative z-10" />
            <span className="relative z-10">Case Studies</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-3">
            Featured{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #DC2626 0%, #F97316 100%)",
              }}
            >
              Case Studies
            </span>
          </h2>

          <p className="text-[15px] text-gray-500 max-w-md mx-auto leading-relaxed">
            Real-world projects showcasing data-driven solutions and measurable business impact.
          </p>
        </motion.div>

        {/* ═══ MAIN: Left Summary + Right Scroll Cards ═══ */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7, ease }}
        >
          {/* ─── LEFT: Executive Summary (synced with active card) ─── */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
                className="rounded-2xl p-7 lg:p-8"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Category + Date */}
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      background: `${catColor}12`,
                      color: catColor,
                      border: `1px solid ${catColor}20`,
                    }}
                  >
                    {getPrimaryCat(active.category)}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-600">
                    <Calendar className="w-3 h-3" />
                    {active.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-white leading-snug mb-4">
                  {active.title}
                </h3>

                {/* Short Executive Summary */}
                <p className="text-[14px] text-gray-400 leading-relaxed mb-5">
                  {active.shortDescription}
                </p>

                {/* Key Highlights (2-3 bullet points) */}
                {active.bulletPoints && active.bulletPoints.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {active.bulletPoints.slice(0, 3).map((point, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-2.5 text-[13px] text-gray-500 leading-relaxed"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease }}
                      >
                        <CheckCircle2
                          className="w-3.5 h-3.5 shrink-0 mt-0.5"
                          style={{ color: "#DC2626" }}
                        />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                )}

                {/* Results snippet */}
                <div
                  className="rounded-lg p-4 mb-6"
                  style={{
                    background: "rgba(220,38,38,0.03)",
                    border: "1px solid rgba(220,38,38,0.08)",
                  }}
                >
                  <p className="text-[12px] text-gray-500 leading-relaxed">
                    <span className="text-[10px] uppercase tracking-wider font-semibold block mb-1.5" style={{ color: "rgba(220,38,38,0.6)" }}>
                      Impact
                    </span>
                    {firstSentences(active.results, 2)}
                  </p>
                </div>

                {/* CTA */}
                <motion.button
                  onClick={() => setLocation(`/case-study/${active.slug}`)}
                  className="group inline-flex items-center gap-2.5 h-[42px] px-5 rounded-xl text-[13px] font-semibold text-white transition-all duration-300"
                  style={{
                    background: "#DC2626",
                    boxShadow: "0 0 16px rgba(220,38,38,0.15)",
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(220,38,38,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Full Case Study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─── RIGHT: Horizontal Scroll Cards ─── */}
          <div className="lg:col-span-7 relative">


            {/* Scrollable card track */}
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none" }}
            >
              {caseStudies.map((cs, i) => {
                const color = getCategoryColor(cs.category);
                const isActive = activeIndex === i;

                return (
                  <motion.div
                    key={cs.id}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    data-card
                    className="snap-center shrink-0 cursor-pointer"
                    style={{ width: "min(85vw, 340px)" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease }}
                    onClick={() => setLocation(`/case-study/${cs.slug}`)}
                  >
                    <div
                      className="relative rounded-2xl p-6 h-full transition-all duration-300 overflow-hidden"
                      style={{
                        background: isActive
                          ? "rgba(220,38,38,0.035)"
                          : "rgba(255,255,255,0.02)",
                        border: isActive
                          ? "1px solid rgba(220,38,38,0.2)"
                          : "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {/* Active top glow */}
                      {isActive && (
                        <motion.div
                          className="absolute top-0 left-0 right-0 h-px"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent)",
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}

                      {/* Card number */}
                      <div className="flex items-center justify-between mb-5">
                        <span
                          className="inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                          style={{
                            background: `${color}12`,
                            color: color,
                            border: `1px solid ${color}20`,
                          }}
                        >
                          {getPrimaryCat(cs.category)}
                        </span>
                        <span
                          className="text-[20px] font-bold"
                          style={{ color: "rgba(255,255,255,0.04)" }}
                        >
                          0{i + 1}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-[16px] font-semibold text-white leading-snug mb-3">
                        {cs.title}
                      </h4>

                      {/* Short desc */}
                      <p className="text-[12px] text-gray-500 leading-relaxed mb-5 line-clamp-3">
                        {cs.shortDescription}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {cs.toolsUsed.slice(0, 3).map((tool, j) => (
                          <span
                            key={j}
                            className="px-2 py-0.5 text-[9px] font-medium rounded"
                            style={{
                              color: isActive ? "rgba(220,38,38,0.65)" : "#555",
                              border: isActive
                                ? "1px solid rgba(220,38,38,0.12)"
                                : "1px solid rgba(255,255,255,0.06)",
                            }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* Footer: date + read more */}
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-[11px] text-gray-600">
                          <Calendar className="w-3 h-3" />
                          {cs.date}
                        </span>
                        <span
                          className="inline-flex items-center gap-1 text-[11px] font-semibold"
                          style={{ color: "#DC2626" }}
                        >
                          Read more
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile dot indicators */}
            <div className="flex lg:hidden items-center justify-center gap-1.5 mt-2">
              {caseStudies.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: activeIndex === i ? 18 : 6,
                    height: 6,
                    background:
                      activeIndex === i ? "#DC2626" : "rgba(255,255,255,0.12)",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudySection;
