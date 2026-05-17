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
    <motion.div className="space-y-8">
      {/* Role Badge */}
      <motion.div variants={heroItemFadeUp}>
        <div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase relative overflow-hidden"
          style={{ 
            background: 'rgba(220,38,38,0.08)', 
            color: 'rgba(220,38,38,0.8)',
            border: '1px solid rgba(220,38,38,0.12)'
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)' }}
            animate={shimmerSlide}
            transition={shimmerTransition}
          />
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: '#EF4444' }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#EF4444' }} />
          </span>
          <span className="relative z-10">Analytics Engineer</span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        className="text-[2.25rem] sm:text-4xl md:text-5xl lg:text-[3.6rem] font-bold leading-[1.1] tracking-tight text-white max-w-2xl"
        variants={heroItemFadeUp}
      >
        <span className="sr-only">Zeya Mosharraf – </span>
        Building{" "}
        <RotatingWord />
        <br />
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)' }}
        >
          Data Systems
        </span>
      </motion.h1>

      {/* Value Proposition */}
      <motion.p
        className="text-[16px] md:text-lg text-gray-400 max-w-md leading-relaxed"
        variants={heroItemFadeUp}
      >
        Architecting high-performance data infrastructure and automated 
        analytics workflows for{" "}
        <span className="text-gray-200 font-medium">
          operational intelligence
        </span>.
      </motion.p>
    </motion.div>
  );
};
