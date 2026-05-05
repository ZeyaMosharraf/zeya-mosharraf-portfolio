/**
 * Global Constants & Reusable Styles
 * Centralized colors, gradients, and style patterns to avoid duplication
 */

// ─── Color Palette ───────────────────────────────────────────────
export const COLORS = {
  primary: "#DC2626",    // Red
  secondary: "#F97316",  // Orange
  gradient: "linear-gradient(135deg, #DC2626 0%, #F97316 100%)",
  gradientBg: "radial-gradient(ellipse 60% 50% at 60% 40%, rgba(220,38,38,0.03) 0%, transparent 60%)",
};

// ─── Repeated Tailwind Classes ──────────────────────────────────
export const STYLES = {
  // Section card styling
  card: "rounded-xl p-6 lg:p-8 bg-white/2 border border-white/6 backdrop-blur-sm",
  cardHover: "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
  
  // Badge styling
  badge: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase",
  badgeBg: "bg-white/2 border border-white/6",
  
  // Icon buttons
  iconButton: "w-10 h-10 rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200 bg-white/2 border border-white/6",
  
  // Text styling
  textBase: "text-[15px] text-gray-400",
  textSmall: "text-[13px] text-gray-500",
  textTiny: "text-[12px] text-gray-600",
};

// ─── Background Gradients ───────────────────────────────────────
export const BG_GRADIENTS = {
  sectionDark: "#0d0d0d",
  radialRed60: "radial-gradient(ellipse 60% 50% at 60% 40%, rgba(220,38,38,0.03) 0%, transparent 60%)",
  radialRed50: "radial-gradient(ellipse 50% 50% at 25% 50%, rgba(220,38,38,0.03) 0%, transparent 60%)",
  radialRed70: "radial-gradient(ellipse 70% 50% at 70% 30%, rgba(220,38,38,0.03) 0%, transparent 60%)",
  radialRed55: "radial-gradient(ellipse 55% 40% at 50% 45%, rgba(220,38,38,0.025) 0%, transparent 70%)",
};

// ─── Badge Colors ───────────────────────────────────────────────
export const BADGE_COLORS = {
  red: {
    bg: "rgba(239,68,68,0.08)",
    text: "rgba(239,68,68,0.8)",
    border: "1px solid rgba(239,68,68,0.12)",
  },
  orange: {
    bg: "rgba(249,115,22,0.08)",
    text: "rgba(249,115,22,0.8)",
    border: "1px solid rgba(249,115,22,0.12)",
  },
};

// ─── Breakpoints ────────────────────────────────────────────────
export const BREAKPOINTS = {
  mobile: "640px",
  tablet: "1024px",
  desktop: "1280px",
};

// ─── Animation Timings ──────────────────────────────────────────
export const TIMINGS = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  slower: 1.2,
};

// ─── Section IDs ────────────────────────────────────────────────
export const SECTION_IDS = {
  home: "home",
  about: "about",
  projects: "projects",
  skills: "skills",
  experience: "experience",
  contact: "contact",
};

// ─── Project Categories ─────────────────────────────────────────
export const PROJECT_CATEGORIES = [
  "SQL",
  "Python",
  "Machine Learning",
  "Power BI",
  "Excel",
  "Tableau",
  "Looker Studio",
];
