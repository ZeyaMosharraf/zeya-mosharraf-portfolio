import { motion, useAnimation, AnimationControls } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface SkillBarProps {
  name: string;
  percentage: number;
  color: "primary" | "secondary";
  custom?: number;
  controls?: AnimationControls;
}

const SkillBar = ({ name, percentage, color, custom, controls }: SkillBarProps) => {
  const barRef = useRef(null);
  const isInView = useInView(barRef, { once: true, amount: 0.5 });
  const localControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      const controlsToUse = controls || localControls;
      controlsToUse.start({
        width: `${percentage}%`,
        transition: { duration: 1, delay: 0.2 }
      });
    }
  }, [isInView, percentage, controls, localControls]);

  return (
    <div ref={barRef} className="group">
      <div className="flex justify-between mb-3">
        <span className="font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{name}</span>
        <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300 font-medium">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 transition-colors duration-300 overflow-hidden shadow-inner">
        <motion.div
          className={`h-3 rounded-full relative overflow-hidden ${
            color === "primary" 
              ? "bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600" 
              : "bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"
          }`}
          initial={{ width: "0%" }}
          animate={controls || localControls}
          custom={custom}
          style={{ width: "0%" }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillBar;
