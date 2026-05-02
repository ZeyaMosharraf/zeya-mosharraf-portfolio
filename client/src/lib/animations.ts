/**
 * Shared animation constants and variants for Framer Motion.
 * Import from here instead of duplicating across components.
 */

// ── Easing ──────────────────────────────────────────────────────
export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Fade / Slide Presets ────────────────────────────────────────

export const fadeInLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease, delay },
});

export const fadeInRight = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease, delay },
});

// ── Hero Section Animations ─────────────────────────────────────
export const heroLeftColumn = {
  initial: {},
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const heroItemFadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" },
};

export const heroRightTerminal = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, delay: 0.2, ease: "easeOut" },
};

// ── Badge shimmer (rotating word, hero badge) ───────────────────
export const rotatingWordAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: "easeInOut" },
};

// ── Shimmer transition (for badge glow effect) ──────────────────
export const shimmerTransition = {
  duration: 3,
  repeat: Infinity,
  repeatDelay: 5,
  ease: "easeInOut" as const,
};

export const shimmerSlide = {
  x: ['-100%', '200%'],
};

// ── Terminal / Output animations ────────────────────────────────
export const terminalLineAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.15, ease: "easeOut" },
};


// ── Stagger Container/Item (for lists & grids) ─────────────────
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// ── Section Reveal (scroll-triggered upward reveal) ─────────────
export const sectionReveal = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

// ── Hover presets (none currently in use — placeholder)

// ── WhileInView FadeUp (for cards and sections) ────────────────
export const whileInViewFadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease, delay },
});

// ── Badge animations (for "About Me" and similar badges) ────────
export const badgeFadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease },
};


// ── Page-level animations ───────────────────────────────────────
export const pageHeaderAnimation = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease },
};

