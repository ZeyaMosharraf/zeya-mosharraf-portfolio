import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Activity, Database, Zap, Clock, Wifi } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { useLocation } from "wouter";

/* ═══════════════════════════════════════════════════════
   Animated Counter Hook
   ═══════════════════════════════════════════════════════ */

function useCountUp(target: number, duration = 2000, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const startTime = performance.now() + delay;
    let rafId: number;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) { rafId = requestAnimationFrame(tick); return; }
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, delay]);
  return value;
}

/* ═══════════════════════════════════════════════════════
   Floating Data Keywords (background ambiance)
   ═══════════════════════════════════════════════════════ */

const FLOAT_WORDS = [
  "ETL", "Kafka", "dbt", "Airflow", "Spark", "SQL",
  "BigQuery", "Snowflake", "Pipeline", "Schema",
  "Transform", "Ingest", "Stream", "Warehouse",
];

const FloatingKeywords = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
    {FLOAT_WORDS.map((word, i) => (
      <motion.span
        key={word}
        className="absolute text-xs font-mono select-none"
        style={{
          color: 'var(--accent-primary)',
          opacity: 0,
          left: `${8 + (i * 6.5) % 85}%`,
          top: `${12 + (i * 7.3) % 75}%`,
        }}
        animate={{
          opacity: [0, 0.06, 0.06, 0],
          y: [0, -20],
        }}
        transition={{
          duration: 8,
          delay: i * 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {word}
      </motion.span>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════
   Terminal Output Data
   ═══════════════════════════════════════════════════════ */

/* ── Rotating Words Animation ── */
const ROTATING_WORDS = ["Scalable", "Reliable", "Intelligent", "Production"];

const RotatingWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative" style={{ minWidth: '280px' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING_WORDS[index]}
          className="inline-block bg-clip-text text-transparent"
          style={{ backgroundImage: 'linear-gradient(135deg, var(--accent-primary) 0%, #F97316 100%)' }}
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)', rotateX: 90 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0 }}
          exit={{ opacity: 0, y: -30, filter: 'blur(8px)', rotateX: -90 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ── Scan Line Effect ── */
const ScanLine = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 3 }}>
    <motion.div
      className="absolute left-0 right-0 h-[1px]"
      style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.08) 30%, rgba(239,68,68,0.15) 50%, rgba(239,68,68,0.08) 70%, transparent 100%)' }}
      animate={{ top: ['0%', '100%'] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

/* ── Animated Border for Terminal ── */
const AnimatedBorder = ({ children }: { children: React.ReactNode }) => {
  const angle = useMotionValue(0);
  const smoothAngle = useSpring(angle, { damping: 20, stiffness: 80 });

  useEffect(() => {
    let id: number;
    let a = 0;
    const tick = () => {
      a = (a + 0.5) % 360;
      angle.set(a);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [angle]);

  const background = useTransform(
    smoothAngle,
    (a: number) =>
      `conic-gradient(from ${a}deg at 50% 50%, rgba(220,38,38,0.5) 0deg, transparent 60deg, transparent 180deg, rgba(239,68,68,0.3) 240deg, transparent 360deg)`
  );

  return (
    <motion.div className="relative p-[1px] rounded-xl" style={{ background }}>
      <div className="rounded-xl overflow-hidden relative" style={{ background: '#0D0D0D' }}>
        {children}
      </div>
    </motion.div>
  );
};

interface TermLine {
  text: string;
  color?: string;        // default #A0AEC0 (gray-400ish)
  accent?: boolean;      // use --accent-primary
  dim?: boolean;         // 50% opacity
}

const COMMANDS: Record<string, { cmd: string; lines: TermLine[] }> = {
  skills: {
    cmd: "cat skills.json",
    lines: [
      { text: "{", dim: true },
      { text: '  "languages":  ["Python", "SQL", "TypeScript"],' },
      { text: '  "data":       ["Spark", "Airflow", "dbt", "Kafka"],' },
      { text: '  "cloud":      ["AWS", "GCP", "Snowflake"],' },
      { text: '  "databases":  ["PostgreSQL", "BigQuery", "Redis"],' },
      { text: '  "tools":      ["Docker", "Git", "Terraform"]' },
      { text: "}", dim: true },
      { text: "" },
      { text: "✓ Skills loaded successfully.", accent: true },
    ],
  },
  projects: {
    cmd: "ls ./projects --featured",
    lines: [
      { text: "NAME                   STATUS    STACK", dim: true },
      { text: "──────────────────────────────────────────", dim: true },
      { text: "etl-pipeline           live      Python, Airflow" },
      { text: "analytics-dashboard    live      React, D3, SQL" },
      { text: "stream-processor       live      Kafka, Flink" },
      { text: "data-warehouse         live      dbt, Snowflake" },
      { text: "ml-feature-store       beta      Python, Redis" },
      { text: "" },
      { text: "5 projects found.", accent: true },
    ],
  },
  stack: {
    cmd: "zeya --stack",
    lines: [
      { text: "┌────────────────────────────────────────┐", dim: true },
      { text: "│  Ingestion    │  Airflow, Kafka, APIs   │" },
      { text: "│  Transform    │  dbt, Spark, Python     │" },
      { text: "│  Storage      │  Snowflake, S3, BQ      │" },
      { text: "│  Serve        │  REST, GraphQL, React   │" },
      { text: "│  Observe      │  Datadog, Great Expect. │" },
      { text: "└────────────────────────────────────────┘", dim: true },
      { text: "" },
      { text: "Architecture ready.", accent: true },
    ],
  },
  experience: {
    cmd: "zeya --experience --summary",
    lines: [
      { text: "▸ Analytics Engineer", accent: true },
      { text: "  Building production data pipelines" },
      { text: "  Processing 2M+ records daily" },
      { text: "" },
      { text: "▸ Key Achievements" , accent: true },
      { text: "  • Reduced pipeline latency by 60%" },
      { text: "  • Built real-time analytics dashboard" },
      { text: "  • Automated data quality checks" },
      { text: "" },
      { text: "Experience verified.", accent: true },
    ],
  },
};

const CMD_KEYS = Object.keys(COMMANDS) as (keyof typeof COMMANDS)[];

/* ══════════════════════════════════════════════════════════
   Interactive Particle Field
   ══════════════════════════════════════════════════════════ */

interface Dot {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  isWhite: boolean;     // false = red accent
  baseAlpha: number;
}

function useHeroCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  sectionRef: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const cs = getComputedStyle(document.documentElement);
    const accentPrimary = cs.getPropertyValue("--accent-primary").trim() || "#EF4444";

    let w = 0, h = 0;

    /* ── Mouse tracking ── */
    let mx = -9999, my = -9999;
    const MOUSE_RADIUS = 140;         // interaction zone
    const MOUSE_FORCE  = 2.8;         // push strength

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mx = -9999; my = -9999; };

    /* Listen on the section (not canvas) so hover works even over content */
    section.addEventListener("mousemove", onMouseMove, { passive: true });
    section.addEventListener("mouseleave", onMouseLeave, { passive: true });

    /* ── Particles ── */
    const COUNT = isMobile ? 55 : 130;
    const CONNECT_DIST = isMobile ? 70 : 100;
    const dots: Dot[] = [];

    const initDots = () => {
      dots.length = 0;
      for (let i = 0; i < COUNT; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: 0.8 + Math.random() * 1.2,
          isWhite: Math.random() < 0.35,
          baseAlpha: 0.12 + Math.random() * 0.18,
        });
      }
    };

    /* ── Draw & update particles ── */
    const drawDots = () => {
      for (const d of dots) {
        /* Mouse repulsion */
        const dx = d.x - mx;
        const dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
          d.vx += (dx / dist) * force * 0.15;
          d.vy += (dy / dist) * force * 0.15;
        }

        /* Velocity damping */
        d.vx *= 0.985;
        d.vy *= 0.985;

        /* Move */
        d.x += d.vx;
        d.y += d.vy;

        /* Wrap edges */
        if (d.x < -10) d.x = w + 10;
        if (d.x > w + 10) d.x = -10;
        if (d.y < -10) d.y = h + 10;
        if (d.y > h + 10) d.y = -10;

        /* Draw dot */
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.isWhite ? "#ffffff" : accentPrimary;
        ctx.globalAlpha = d.baseAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      /* Connection lines between nearby particles */
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const d = dx * dx + dy * dy;
          if (d < CONNECT_DIST * CONNECT_DIST) {
            const dist = Math.sqrt(d);
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            // mix: if either is white → white line, else red
            const isW = dots[i].isWhite || dots[j].isWhite;
            ctx.strokeStyle = isW ? "rgba(255,255,255,0.06)" : accentPrimary;
            ctx.globalAlpha = (1 - dist / CONNECT_DIST) * 0.14;
            ctx.lineWidth = 0.4;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    };

    /* ── Canvas sizing ── */
    const resize = () => {
      const rect = section.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initDots();
    };
    resize();

    /* ── Animation loop ── */
    let rafId: number;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      drawDots();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [canvasRef, sectionRef]);
}



/* ─── Hero Component ─── */
const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const termBodyRef = useRef<HTMLDivElement>(null);
  const [editorOffset, setEditorOffset] = useState(0);
  const [, setLocation] = useLocation();

  /* Terminal state */
  const [activeCmd, setActiveCmd] = useState<string | null>(null);
  const [visibleLines, setVisibleLines] = useState<TermLine[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typedCmd, setTypedCmd] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const typingTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* Interactive particle field + heartbeat ring */
  useHeroCanvas(canvasRef, sectionRef);

  /* Blinking cursor */
  useEffect(() => {
    const id = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(id);
  }, []);

  /* Auto-scroll terminal body */
  useEffect(() => {
    const el = termBodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleLines, typedCmd]);

  /* Run a command */
  const runCommand = useCallback((key: string) => {
    if (isTyping) return;
    const data = COMMANDS[key];
    if (!data) return;

    /* Clear previous timers */
    typingTimers.current.forEach(clearTimeout);
    typingTimers.current = [];

    setActiveCmd(key);
    setVisibleLines([]);
    setTypedCmd("");
    setIsTyping(true);

    /* Phase 1: type the command character by character */
    const cmdChars = data.cmd.split("");
    const charDelay = 35;                                // ms per char
    const cmdDuration = cmdChars.length * charDelay;

    cmdChars.forEach((_, ci) => {
      const t = setTimeout(() => {
        setTypedCmd(data.cmd.slice(0, ci + 1));
      }, ci * charDelay);
      typingTimers.current.push(t);
    });

    /* Phase 2: print output lines one by one */
    const lineDelay = 220;                               // ms per line
    data.lines.forEach((line, li) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        if (li === data.lines.length - 1) {
          setIsTyping(false);
        }
      }, cmdDuration + 300 + li * lineDelay);            // 300ms pause after cmd
      typingTimers.current.push(t);
    });
  }, [isTyping]);

  /* Run "skills" on mount for an initial impression */
  useEffect(() => {
    const t = setTimeout(() => runCommand("skills"), 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Desktop-only parallax */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const el = editorRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
        setEditorOffset(Math.max(-1, Math.min(1, progress)) * 15);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, []);

  const handleSectionClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative pt-24 md:pt-28 pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0B0F14 0%, #0B0F14 55%, #1a0a0a 100%)' }}
    >
      {/* Interactive canvas (full hero background) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ zIndex: 1 }}
      />

      {/* Floating data keywords */}
      <FloatingKeywords />

      {/* Scan line effect */}
      <ScanLine />

      {/* One-sided accent gradient glow (bottom-right) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 60% at 75% 65%, rgba(239,68,68,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Layer 3 — Grid overlay */}
      <div className="absolute inset-0 pointer-events-none hero-grid-overlay" style={{ opacity: 0.06, zIndex: 2 }} />

      <div className="container mx-auto max-w-7xl relative" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ─── Left Column ─── */}
          <motion.div
            className="lg:col-span-7 space-y-5"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
            }}
          >
            {/* Badge with live pulse + shimmer */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold relative overflow-hidden"
                style={{ background: 'var(--accent-soft)', color: 'var(--accent-primary)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* Shimmer sweep */}
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: 'var(--accent-primary)' }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--accent-primary)' }} />
                </span>
                <span className="relative z-10">Analytics Engineer</span>
              </div>
            </motion.div>

            {/* Headline with rotating gradient keywords */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.12] tracking-tight text-white max-w-xl"
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              Building{" "}
              <RotatingWord />
              <br />
              <motion.span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, var(--accent-primary) 0%, #F97316 100%)' }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                Data Systems
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg text-gray-400 max-w-lg leading-relaxed"
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              Designing reliable data pipelines, transformations, and analytics
              infrastructure that power{" "}
              <span className="text-gray-200 font-medium">
                data-driven decisions
              </span>.
            </motion.p>

            {/* Metrics strip */}
            <motion.div
              className="flex flex-wrap gap-6 pt-1"
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <MetricPill icon={<Database className="w-3.5 h-3.5" />} value={useCountUp(2, 2000, 800)} suffix="M+" label="Records / Day" />
              <MetricPill icon={<Activity className="w-3.5 h-3.5" />} value={useCountUp(99, 2200, 1000)} suffix=".9%" label="Pipeline Uptime" />
              <MetricPill icon={<Zap className="w-3.5 h-3.5" />} value={useCountUp(60, 1800, 1200)} suffix="%" label="Faster ETL" />
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex items-center gap-3 pt-2"
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <button
                onClick={() => handleSectionClick("contact")}
                className="group h-[42px] px-5 text-[14px] text-white rounded-lg font-semibold flex items-center transition-all duration-250 hover:scale-[1.02]"
                style={{ background: '#DC2626' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 16px rgba(220,38,38,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                Work With Me <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>

              <button
                onClick={() => setLocation("/case-studies")}
                className="h-[42px] px-5 text-[14px] text-gray-300 rounded-lg font-medium transition-all duration-250 hover:scale-[1.02]"
                style={{ border: '1px solid rgba(255,255,255,0.10)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(220,38,38,0.5)'; e.currentTarget.style.color = '#f3f4f6'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; e.currentTarget.style.color = '#D1D5DB'; }}
              >
                View Case Studies
              </button>
            </motion.div>

            {/* Social links — tight under CTAs */}
            <motion.div
              className="flex items-center gap-3 pt-1"
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              {[
                { href: "https://github.com/ZeyaMosharraf", icon: <FaGithub className="text-[15px]" />, label: "GitHub" },
                { href: "https://www.linkedin.com/in/zeya-mosharraf/", icon: <FaLinkedinIn className="text-[15px]" />, label: "LinkedIn" },
                { href: "mailto:zeyamosharraf999@gmail.com", icon: <FaEnvelope className="text-[15px]" />, label: "Email" },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 transition-all duration-250"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(220,38,38,0.4)'; e.currentTarget.style.color = '#f3f4f6'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = ''; }}
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
              <span className="text-[10px] font-mono text-gray-600 ml-0.5 select-none">·  Let's connect</span>
            </motion.div>
          </motion.div>

          {/* ─── Right Column — Interactive Terminal ─── */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          >
            <div
              ref={editorRef}
              className="relative will-change-transform"
              style={{ transform: `translateY(${editorOffset}px)`, transition: 'transform 0.15s ease-out' }}
            >
              {/* Backlight glow */}
              <div
                className="absolute -inset-8 -z-10 rounded-3xl"
                style={{ background: 'radial-gradient(ellipse at 50% 50%, var(--accent-glow), transparent 70%)' }}
              />

              <AnimatedBorder>
                {/* Title bar */}
                <div className="flex items-center justify-between px-4 py-2.5" style={{ background: '#1A1A1A' }}>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF5F57' }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FFBD2E' }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28CA40' }} />
                    </div>
                    <span
                      className="text-xs"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: '#6B6B6B' }}
                    >
                      zeya@portfolio ~ %
                    </span>
                  </div>
                </div>

                {/* Command buttons */}
                <div className="flex gap-2 px-4 py-2.5" style={{ background: '#141414', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  {CMD_KEYS.map(key => (
                    <button
                      key={key}
                      onClick={() => runCommand(key)}
                      disabled={isTyping}
                      className="px-3 py-1 rounded-md text-xs font-medium transition-all duration-200"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        background: activeCmd === key ? 'var(--accent-soft)' : 'rgba(255,255,255,0.04)',
                        color: activeCmd === key ? 'var(--accent-primary)' : '#8892A0',
                        border: activeCmd === key ? '1px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.06)',
                        opacity: isTyping ? 0.5 : 1,
                        cursor: isTyping ? 'wait' : 'pointer',
                      }}
                    >
                      {key}
                    </button>
                  ))}
                </div>

                {/* Terminal body */}
                <div
                  ref={termBodyRef}
                  className="overflow-y-auto"
                  style={{
                    background: '#0D0D0D',
                    minHeight: '340px',
                    maxHeight: '400px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '12.5px',
                    lineHeight: '1.7',
                    padding: '16px',
                  }}
                >
                  {/* Command line */}
                  {typedCmd !== "" && (
                    <div style={{ color: '#A0AEC0' }}>
                      <span style={{ color: 'var(--accent-primary)' }}>$</span>
                      <span style={{ color: '#6B7280' }}>{" ~ "}</span>
                      <span>{typedCmd}</span>
                      {isTyping && visibleLines.length === 0 && (
                        <span
                          style={{
                            display: 'inline-block',
                            width: '7px',
                            height: '14px',
                            background: 'var(--accent-primary)',
                            marginLeft: '2px',
                            verticalAlign: 'middle',
                            opacity: showCursor ? 0.9 : 0,
                          }}
                        />
                      )}
                    </div>
                  )}

                  {/* Output lines */}
                  <AnimatePresence>
                    {visibleLines.map((line, i) => (
                      <motion.div
                        key={`${activeCmd}-${i}`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        style={{
                          color: line.accent
                            ? 'var(--accent-primary)'
                            : line.color || '#A0AEC0',
                          opacity: line.dim ? 0.4 : 1,
                          minHeight: line.text === "" ? '10px' : undefined,
                          whiteSpace: 'pre',
                        }}
                      >
                        {line.text}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Idle prompt with cursor */}
                  {!isTyping && typedCmd !== "" && (
                    <div style={{ color: '#A0AEC0', marginTop: '4px' }}>
                      <span style={{ color: 'var(--accent-primary)' }}>$</span>
                      <span style={{ color: '#6B7280' }}>{" ~ "}</span>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '7px',
                          height: '14px',
                          background: 'var(--accent-primary)',
                          verticalAlign: 'middle',
                          opacity: showCursor ? 0.9 : 0,
                          transition: 'opacity 0.1s',
                        }}
                      />
                    </div>
                  )}

                  {/* Initial state before any command */}
                  {typedCmd === "" && (
                    <div style={{ color: '#A0AEC0' }}>
                      <span style={{ color: 'var(--accent-primary)' }}>$</span>
                      <span style={{ color: '#6B7280' }}>{" ~ "}</span>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '7px',
                          height: '14px',
                          background: 'var(--accent-primary)',
                          verticalAlign: 'middle',
                          opacity: showCursor ? 0.9 : 0,
                          transition: 'opacity 0.1s',
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Terminal status bar */}
                <div
                  className="flex items-center justify-between px-4 py-1.5"
                  style={{
                    background: '#0A0A0A',
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: '#4A5568',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Wifi className="w-3 h-3" style={{ color: '#28CA40' }} />
                      <span style={{ color: '#28CA40' }}>connected</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>latency: 12ms</span>
                    </span>
                  </div>
                  <span>zsh · node v20.11</span>
                </div>
              </AnimatedBorder>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

/* ─── Metric Pill ─── */
const MetricPill = ({ icon, value, suffix, label }: {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}) => (
  <div
    className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg"
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
  >
    <div
      className="flex items-center justify-center w-7 h-7 rounded-md"
      style={{ background: 'var(--accent-soft)', color: 'var(--accent-primary)' }}
    >
      {icon}
    </div>
    <div>
      <div className="text-sm font-bold text-white leading-none">
        {value}{suffix}
      </div>
      <div className="text-[10px] text-gray-500 mt-0.5">{label}</div>
    </div>
  </div>
);

export default Hero;
