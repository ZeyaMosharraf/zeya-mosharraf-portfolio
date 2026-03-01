import { motion, useAnimation, AnimationControls } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface SkillBarProps {
  name: string;
  percentage: number;
  color: "primary" | "secondary";
  controls?: AnimationControls;
}

const SkillBar = ({ name, percentage, color, controls }: SkillBarProps) => {
  const barRef = useRef(null);
  const isInView = useInView(barRef, { once: true, amount: 0.5 });
  const localControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      const c = controls || localControls;
      c.start({ width: `${percentage}%`, transition: { duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] } });
    }
  }, [isInView, percentage, controls, localControls]);

  return (
    <div ref={barRef} className="group">
      <div className="flex justify-between mb-2">
        <span className="text-[13px] font-medium text-gray-300 group-hover:text-white transition-colors duration-200">{name}</span>
        <span className="text-[12px] font-medium text-gray-600">{percentage}%</span>
      </div>
      <div className="w-full h-[6px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            width: "0%",
            background: color === "primary"
              ? 'linear-gradient(90deg, #DC2626, #EF4444)'
              : 'linear-gradient(90deg, #991B1B, #DC2626)',
          }}
          initial={{ width: "0%" }}
          animate={controls || localControls}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 animate-shimmer" />
        </motion.div>
      </div>
    </div>
  );
};

export default SkillBar;
