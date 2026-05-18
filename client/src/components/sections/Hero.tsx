import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { heroLeftColumn, heroRightTerminal } from "@/lib/animations";

/* Modular Sub-components */
import { HeroContent } from "./Hero/HeroContent";
import { HeroCTA } from "./Hero/HeroCTA";
import { HeroTerminal } from "./Hero/HeroTerminal";
import { HeroMetricsTicker } from "./Hero/HeroMetricsTicker";
import { useHeroCanvas } from "./Hero/useHeroCanvas";

/**
 * Hero — Main Landing Section.
 * 
 * Orchestrates the modular components into a cohesive, high-performance 
 * editorial engineering experience. Uses a split-column layout on desktop:
 * - Left: Narrative content and primary actions.
 * - Right: Interactive interactive terminal (parallax-aware).
 * - Bottom: Ambient metrics ticker.
 */
const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorOffset, setEditorOffset] = useState(0);

  /* Interactive particle field (Canvas Background) */
  useHeroCanvas(canvasRef, sectionRef);

  /* Desktop-only parallax for the Terminal window */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const el = editorRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // Calculate offset based on scroll position relative to center
        const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
        setEditorOffset(Math.max(-1, Math.min(1, progress)) * 15);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative pt-24 md:pt-32 pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #0d0d0d 55%, #1a0a0a 100%)' }}
    >
      {/* Layer 1: Interactive canvas (full hero background) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ zIndex: 1 }}
      />

      {/* Layer 2: One-sided accent gradient glow (bottom-right) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 60% at 75% 65%, rgba(239,68,68,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Layer 3: Engineering grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none hero-grid-overlay" 
        style={{ opacity: 0.06, zIndex: 2 }} 
      />

      <div className="container mx-auto max-w-7xl relative" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* ─── Left Column: Narrative & Action ─── */}
          <motion.div
            className="lg:col-span-7"
            initial={heroLeftColumn.initial}
            animate={heroLeftColumn.animate}
          >
            <HeroContent />
            <HeroCTA />
          </motion.div>

          {/* ─── Right Column: Interactive Terminal ─── */}
          <motion.div
            className="lg:col-span-5 hidden sm:block"
            {...heroRightTerminal}
          >
            <div
              ref={editorRef}
              className="relative will-change-transform"
              style={{ 
                transform: `translateY(${editorOffset}px)`, 
                transition: 'transform 0.15s ease-out' 
              }}
            >
              {/* Terminal Backdrop Glow */}
              <div
                className="absolute -inset-12 -z-10 rounded-full blur-[120px] opacity-10"
                style={{ background: 'var(--accent-primary)' }}
              />

              <HeroTerminal />
            </div>
          </motion.div>
        </div>

        {/* Ambient Editorial Ticker */}
        <div className="mt-12 md:mt-24 pt-10 border-t border-white/5">
          <HeroMetricsTicker />
        </div>
      </div>
    </section>
  );
};

export default Hero;
