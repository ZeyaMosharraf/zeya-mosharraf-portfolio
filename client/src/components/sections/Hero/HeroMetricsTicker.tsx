import React from "react";
import { motion } from "framer-motion";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";
import { HeroMetric } from "@/types/supabase";

const METRICS_ORDER = { column: "sort_order", ascending: true };

/**
 * HeroMetricsTicker — Ambient scrolling marquee of dynamic metrics.
 * Fetches data from Supabase and implements a seamless loop with hover-pause.
 */
export const HeroMetricsTicker = () => {
  const { data: metrics, loading } = useSupabaseTable<HeroMetric>("hero_metrics", METRICS_ORDER);

  if (loading || metrics.length === 0) return <div className="h-6" />;

  // Duplicate metrics for seamless horizontal loop
  const tickerContent = [...metrics, ...metrics]; 

  return (
    <div className="relative w-full overflow-hidden py-2 select-none">
      {/* Edge Fading Masks */}
      <div 
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0d0d0d, transparent)' }}
      />
      <div 
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #0d0d0d, transparent)' }}
      />

      <motion.div 
        className="flex items-center gap-12 whitespace-nowrap"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {tickerContent.map((metric, i) => (
          <div key={`${metric.id}-${i}`} className="flex items-center gap-4">
            <span className="text-[13px] md:text-[14px] font-medium text-gray-300 tracking-wide">
              <span className="text-white font-bold">{metric.value}</span> {metric.label}
            </span>
            <span className="text-white/10 select-none">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
