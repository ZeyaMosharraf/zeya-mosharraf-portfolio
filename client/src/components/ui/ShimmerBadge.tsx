/**
 * ShimmerBadge Component
 * Reusable animated badge with shimmer effect
 * Replaces duplicated badge pattern across SectionHeader, AboutSection, etc.
 */
import { motion } from "framer-motion";
import { shimmerTransition, shimmerSlide, badgeFadeIn } from "@/lib/animations";
import { BADGE_COLORS } from "@/lib/constants";
import type { ReactNode } from "react";

interface ShimmerBadgeProps {
  /** Icon component or JSX */
  icon?: ReactNode;
  /** Badge label text */
  label: string;
  /** Color variant: 'red' or 'orange' */
  color?: "red" | "orange";
  /** Custom className */
  className?: string;
}

const ShimmerBadge: React.FC<ShimmerBadgeProps> = ({
  icon,
  label,
  color = "red",
  className = "",
}) => {
  const colors = BADGE_COLORS[color];

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase mb-5 relative overflow-hidden ${className}`}
      style={{
        background: colors.bg,
        color: colors.text,
        border: colors.border,
      }}
      {...badgeFadeIn}
    >
      {/* Shimmer sweep animation */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.1) 50%, transparent 100%)`,
        }}
        animate={shimmerSlide}
        transition={shimmerTransition}
      />

      {/* Icon (if provided) */}
      {icon && <span className="relative z-10 w-3 h-3">{icon}</span>}

      {/* Label */}
      <span className="relative z-10">{label}</span>
    </motion.div>
  );
};

export default ShimmerBadge;
