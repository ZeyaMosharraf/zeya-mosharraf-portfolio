/**
 * SectionHeader — reusable animated section header with badge + title + subtitle.
 * Replaces the duplicated header pattern across 7+ section components.
 */
import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { ease, shimmerTransition } from "@/lib/animations";
import type { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  /** Lucide icon shown in the badge */
  icon: LucideIcon;
  /** Badge label text (e.g. "Projects", "Skills") */
  badge: string;
  /** Main title — plain text part */
  title: string;
  /** Highlighted (gradient) part of the title */
  highlight: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Extra content rendered after the subtitle (e.g. filter pills) */
  children?: ReactNode;
}

const SectionHeader = ({
  icon: Icon,
  badge,
  title,
  highlight,
  subtitle,
  children,
}: SectionHeaderProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="text-center mb-10">
      {/* Badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase mb-5 relative overflow-hidden"
        style={{
          background: "rgba(239,68,68,0.08)",
          color: "rgba(239,68,68,0.8)",
          border: "1px solid rgba(239,68,68,0.12)",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease }}
      >
        {/* Shimmer sweep */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.1) 50%, transparent 100%)",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={shimmerTransition}
        />
        <Icon className="w-3 h-3 relative z-10" />
        <span className="relative z-10">{badge}</span>
      </motion.div>

      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease, delay: 0.06 }}
      >
        {title}{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg, #DC2626 0%, #F97316 100%)",
          }}
        >
          {highlight}
        </span>
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          className="text-[15px] text-gray-500 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.12 }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Extra content (filters, etc.) */}
      {children}
    </div>
  );
};

export default SectionHeader;
