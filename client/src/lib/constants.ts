export const COLORS = {
  primary: "#DC2626",
  secondary: "#F97316",
  gradient: "linear-gradient(135deg, #DC2626 0%, #F97316 100%)",
  gradientBg: "radial-gradient(ellipse 60% 50% at 60% 40%, rgba(220,38,38,0.03) 0%, transparent 60%)",
  red: {
    "03": "rgba(220,38,38,0.03)",
    "06": "rgba(220,38,38,0.06)",
    "08": "rgba(220,38,38,0.08)",
    "12": "rgba(220,38,38,0.12)",
    "15": "rgba(220,38,38,0.15)",
    "2": "rgba(220,38,38,0.2)",
    "3": "rgba(220,38,38,0.3)",
    "35": "rgba(220,38,38,0.35)",
    "5": "rgba(220,38,38,0.5)",
    "55": "rgba(220,38,38,0.55)",
    "6": "rgba(220,38,38,0.6)",
    "8": "rgba(220,38,38,0.8)",
    "9": "rgba(220,38,38,0.9)",
  },
};

export const FONTS = {
  size: {
    xs: "text-[10px]",
    sm: "text-[11px]",
    base: "text-[12px]",
    md: "text-[13px]",
    lg: "text-[15px]",
    xl: "text-lg",
  },
  weight: {
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  },
  tracking: {
    wide: "tracking-wide",
    wider: "tracking-wider",
  },
};

export const STYLES = {
  card: "rounded-xl p-6 lg:p-8 bg-white/2 border border-white/6 backdrop-blur-sm",
  cardHover: "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
  badge: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase",
  badgeBg: "bg-white/2 border border-white/6",
  iconButton: "w-10 h-10 rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200 bg-white/2 border border-white/6",
  textBase: "text-[15px] text-gray-400",
  textSmall: "text-[13px] text-gray-500",
  textTiny: "text-[12px] text-gray-600",
};

export const BADGES = {
  work: {
    bg: "rgba(220,38,38,0.08)",
    text: "rgba(220,38,38,0.8)",
    border: "1px solid rgba(220,38,38,0.12)",
  },
  primary: {
    bg: "bg-white/2",
    border: "border-white/6",
  },
};

export const BG_GRADIENTS = {
  sectionDark: "#0d0d0d",
  radialRed60: "radial-gradient(ellipse 60% 50% at 60% 40%, rgba(220,38,38,0.03) 0%, transparent 60%)",
  radialRed50: "radial-gradient(ellipse 50% 50% at 25% 50%, rgba(220,38,38,0.03) 0%, transparent 60%)",
  radialRed70: "radial-gradient(ellipse 70% 50% at 70% 30%, rgba(220,38,38,0.03) 0%, transparent 60%)",
  radialRed55: "radial-gradient(ellipse 55% 40% at 50% 45%, rgba(220,38,38,0.025) 0%, transparent 70%)",
};

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

export const BREAKPOINTS = {
  mobile: "640px",
  tablet: "1024px",
  desktop: "1280px",
};

export const TIMINGS = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  slower: 1.2,
};

export const SECTION_IDS = {
  home: "home",
  about: "about",
  projects: "projects",
  skills: "skills",
  experience: "experience",
  contact: "contact",
};

export interface CategoryConfig {
  name: string;
  color: string;
  dot: string;
  subBadge: string;
}

export const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  "SQL": { 
    name: "SQL", 
    color: "#FBBF24", 
    dot: "rgba(251,191,36,0.7)", 
    subBadge: "DATAPREP PIPELINE" 
  },
  "Python": { 
    name: "Python", 
    color: "#60A5FA", 
    dot: "rgba(59,130,246,0.7)", 
    subBadge: "SYSTEM AUTOMATION" 
  },
  "Machine Learning": { 
    name: "Machine Learning", 
    color: "#C084FC", 
    dot: "rgba(168,85,247,0.7)", 
    subBadge: "PREDICTIVE MODELING" 
  },
  "Power BI": { 
    name: "Power BI", 
    color: "#FACC15", 
    dot: "rgba(234,179,8,0.7)", 
    subBadge: "OPERATIONAL SYSTEM" 
  },
  "Excel": { 
    name: "Excel", 
    color: "#4ADE80", 
    dot: "rgba(34,197,94,0.7)", 
    subBadge: "DECISION ENGINE" 
  },
  "Tableau": { 
    name: "Tableau", 
    color: "#818CF8", 
    dot: "rgba(99,102,241,0.7)", 
    subBadge: "ANALYTICS ENGINE" 
  },
  "Looker Studio": { 
    name: "Looker Studio", 
    color: "#2DD4BF", 
    dot: "rgba(20,184,166,0.7)", 
    subBadge: "METRICS WAREHOUSE" 
  }
};

export const PROJECT_CATEGORIES = Object.keys(CATEGORY_CONFIGS);
