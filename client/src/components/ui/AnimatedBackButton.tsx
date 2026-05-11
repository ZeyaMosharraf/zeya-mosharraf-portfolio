/**
 * AnimatedBackButton — premium editorial back-navigation link.
 * Minimal, restrained, Linear/Vercel-inspired.
 */
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface AnimatedBackButtonProps {
  onClick: () => void;
  label: string;
}

const AnimatedBackButton = ({ onClick, label }: AnimatedBackButtonProps) => (
  <motion.button
    onClick={onClick}
    className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors duration-200 group"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    whileHover={{ x: -2 }}
  >
    <ArrowLeft
      className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
    />
    <span className="text-[12px] font-medium tracking-wide">{label}</span>
  </motion.button>
);

export default AnimatedBackButton;
