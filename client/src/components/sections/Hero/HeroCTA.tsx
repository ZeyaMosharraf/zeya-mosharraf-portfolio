import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { SocialLinks } from "@/components/ui/common";
import { heroItemFadeUp } from "@/lib/animations";

/**
 * HeroCTA — The interactive action zone including primary buttons and social links.
 * Modularized to separate "Action" logic from "Content" logic.
 */
export const HeroCTA = () => {
  const [, setLocation] = useLocation();

  const handleSectionClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <motion.div className="space-y-8 md:space-y-14">
      {/* Primary Buttons */}
      <motion.div
        className="flex flex-wrap items-center gap-4 pt-8"
        variants={heroItemFadeUp}
      >
        <button
          onClick={() => handleSectionClick("contact")}
          className="group h-[46px] px-8 text-[13px] text-white rounded-lg font-semibold flex items-center transition-all duration-300 hover:bg-[#A91B0F] active:scale-[0.98] select-none"
          style={{ 
            background: '#C82315', 
            border: '1px solid rgba(200, 35, 21, 0.8)',
            borderTop: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
          }}
        >
          Work With Me 
          <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
        </button>

        <button
          onClick={() => setLocation("/case-studies")}
          className="group h-[46px] px-8 text-[13px] text-gray-400 rounded-lg font-semibold transition-all duration-300 hover:text-white hover:bg-white/5 active:scale-[0.98] select-none"
          style={{ 
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)' 
          }}
        >
          View Case Studies
        </button>
      </motion.div>

      {/* Social Links Connect Zone */}
      <motion.div
        className="flex items-center gap-5 pt-6"
        variants={heroItemFadeUp}
      >
        <SocialLinks 
          containerClassName="flex gap-5 items-center"
          linkClassName="text-gray-500 hover:text-[var(--accent-primary)] transition-colors duration-300 select-none"
          iconClassName="text-[17px]"
        />
        <div className="w-12 h-px bg-white/10" />
        <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-500 select-none" style={{ fontFamily: 'var(--font-heading)' }}>
          Connect
        </span>
      </motion.div>
    </motion.div>
  );
};
