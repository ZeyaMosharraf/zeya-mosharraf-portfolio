import React from "react";
import { motion } from "framer-motion";
import { RotatingWord } from "./HeroTerminal";
import { heroItemFadeUp, shimmerSlide, shimmerTransition } from "@/lib/animations";

/**
 * HeroContent — The main narrative container of the Hero section.
 * Contains the role badge, the editorial headline, and the value proposition paragraph.
 */
export const HeroContent = () => {
  return (
    <motion.div className="space-y-10 md:space-y-12">
      {/* Role Badge */}
      <motion.div variants={heroItemFadeUp}>
        <div 
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase relative overflow-hidden"
          style={{ 
            background: 'rgba(200, 35, 21, 0.05)', 
            color: '#E2E8F0',
            border: '1px solid rgba(200, 35, 21, 0.15)'
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)' }}
            animate={shimmerSlide}
            transition={shimmerTransition}
          />
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-30" style={{ background: 'var(--accent-primary)' }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--accent-primary)' }} />
          </span>
          <span className="relative z-10">Analytics Engineer</span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] font-semibold leading-[1.1] tracking-normal text-white max-w-2xl"
        variants={heroItemFadeUp}
      >
        <span className="sr-only">Zeya Mosharraf – </span>
        Building{" "}
        <RotatingWord />
        <br />
        <span
          className="text-[#C23125] font-semibold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Data Systems
        </span>
      </motion.h1>

      {/* Value Proposition */}
      <motion.p
        className="text-[16px] md:text-lg text-slate-300 max-w-md leading-relaxed"
        variants={heroItemFadeUp}
      >
        Architecting high-performance data infrastructure and automated 
        analytics workflows for{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] font-semibold">
          operational intelligence
        </span>.
      </motion.p>
    </motion.div>
  );
};
