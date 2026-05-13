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
    <div className="space-y-14">
      {/* Primary Buttons */}
      <motion.div
        className="flex flex-wrap items-center gap-4 pt-8"
        variants={heroItemFadeUp}
      >
        <button
          onClick={() => handleSectionClick("contact")}
          className="group h-[52px] px-8 text-[14px] text-white rounded-xl font-bold flex items-center transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
          style={{ 
            background: '#DC2626', 
            boxShadow: '0 8px 24px -8px rgba(220,38,38,0.4)' 
          }}
        >
          Work With Me 
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>

        <button
          onClick={() => setLocation("/case-studies")}
          className="group h-[52px] px-8 text-[14px] text-gray-400 rounded-xl font-semibold transition-all duration-300 hover:text-white hover:bg-white/5 active:scale-[0.98]"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          View Case Studies
        </button>
      </motion.div>

      {/* Social Links Connect Zone */}
      <motion.div
        className="flex items-center gap-4 pt-6"
        variants={heroItemFadeUp}
      >
        <SocialLinks />
        <div className="w-10 h-px bg-white/5" />
        <span className="text-[11px] font-medium tracking-widest uppercase text-gray-600 select-none">
          Connect
        </span>
      </motion.div>
    </div>
  );
};
