/**
 * Shared animation constants and variants for Framer Motion.
 * Import from here instead of duplicating across components.
 */

// ── Easing ──────────────────────────────────────────────────────
export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Fade / Slide Presets ────────────────────────────────────────
export const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
});

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

// ── Shimmer transition (for badge glow effect) ──────────────────
export const shimmerTransition = {
  duration: 3,
  repeat: Infinity,
  repeatDelay: 5,
  ease: "easeInOut" as const,
};

// ── Hover presets ───────────────────────────────────────────────
export const hoverLift = {
  whileHover: { scale: 1.02, y: -2 },
  whileTap: { scale: 0.98 },
};

export const cardHover = {
  whileHover: { y: -4, borderColor: "rgba(220,38,38,0.2)" },
};

// ── WhileInView helper (used in multiple sections) ──────────────
export const whileInViewProps = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease, delay },
});
