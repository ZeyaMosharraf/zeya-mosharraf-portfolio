/**
 * PageHero — reusable hero banner for detail/list pages.
 * Replaces the duplicated gradient hero across AllProjects, Blog, CaseStudies, Certificates, ProjectDetails.
 */
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const dotPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

interface PageHeroProps {
  /** Headline text */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Optional gradient override — default is red→orange */
  gradient?: string;
  /** Extra content (back button, badges, meta info) rendered above the title */
  topContent?: ReactNode;
  /** Extra content rendered below the subtitle (CTAs, stats, etc.) */
  bottomContent?: ReactNode;
  /** Center-align text (default: true) */
  center?: boolean;
}

const PageHero = ({
  title,
  subtitle,
  gradient = "from-red-600 to-orange-500",
  topContent,
  bottomContent,
  center = true,
}: PageHeroProps) => {
  return (
    <div className={`relative bg-gradient-to-r ${gradient} overflow-hidden`}>
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: dotPattern }}
      />

      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-4xl mx-auto ${center ? "text-center" : ""}`}>
          {topContent}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/90 max-w-3xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}

          {bottomContent}
        </div>
      </div>
    </div>
  );
};

export default PageHero;
