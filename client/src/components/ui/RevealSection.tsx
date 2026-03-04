/**
 * RevealSection — scroll-triggered reveal wrapper.
 * Replaces the 8× duplicated `<motion.div variants={sectionReveal} ...>` in Home.tsx.
 */
import { motion } from "framer-motion";
import { sectionReveal } from "@/lib/animations";
import type { ReactNode } from "react";

interface RevealSectionProps {
  children: ReactNode;
  /** Fraction of element visible before triggering (default 0.08) */
  amount?: number;
}

const RevealSection = ({ children, amount = 0.08 }: RevealSectionProps) => (
  <motion.div
    variants={sectionReveal}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount }}
  >
    {children}
  </motion.div>
);

export default RevealSection;
