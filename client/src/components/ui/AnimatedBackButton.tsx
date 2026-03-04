/**
 * AnimatedBackButton — reusable animated back-navigation button.
 * Replaces the 4× duplicated pattern in detail pages.
 */
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface AnimatedBackButtonProps {
  /** Click handler (typically navigate back) */
  onClick: () => void;
  /** Button label after the arrow (e.g. "Back to Blog") */
  label: string;
}

const AnimatedBackButton = ({ onClick, label }: AnimatedBackButtonProps) => (
  <motion.button
    onClick={onClick}
    className="mb-8 inline-flex items-center px-6 py-3 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ArrowLeft className="mr-3" /> {label}
  </motion.button>
);

export default AnimatedBackButton;
