/**
 * PageHero — reusable hero banner for detail/list pages.
 * Data-ecosystem themed: animated node graph, floating symbols,
 * scan-sweep, corner brackets, typewriter subtitle, live stat bar.
 */
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

// ─── Canvas Node-Graph ────────────────────────────────────────────────────────

interface Node {
  x: number; y: number; vx: number; vy: number;
  r: number; color: string; pulse: number; pulseSpeed: number;
}

const NODE_COLORS = [
  "rgba(220,38,38,0.9)", "rgba(249,115,22,0.75)",
  "rgba(255,255,255,0.55)", "rgba(220,38,38,0.4)",
];

function DataNodeCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let id: number; let nodes: Node[] = [];
    const N = 50, MAX = 130;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; init(); };
    const init = () => {
      nodes = Array.from({ length: N }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2.2 + 1,
        color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
        pulse: Math.random() * Math.PI * 2, pulseSpeed: 0.018 + Math.random() * 0.02,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX) {
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(220,38,38,${(1 - d / MAX) * 0.16})`; ctx.lineWidth = 0.7; ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        n.pulse += n.pulseSpeed;
        const gr = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        gr.addColorStop(0, n.color); gr.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2); ctx.fillStyle = gr; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, Math.max(0.01, n.r + Math.sin(n.pulse) * 1.2), 0, Math.PI * 2);
        ctx.fillStyle = n.color; ctx.fill();
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      id = requestAnimationFrame(draw);
    };
    resize(); draw();
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    return () => { cancelAnimationFrame(id); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} className={className} style={{ width: "100%", height: "100%" }} />;
}

// ─── Mini Sparkline SVG (background decoration) ──────────────────────────────

function Sparkline() {
  const points = [28, 18, 34, 22, 40, 16, 38, 10, 30, 20, 12, 26, 8, 20, 14];
  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * 9} ${45 - p}`)
    .join(" ");
  return (
    <svg
      width="135" height="50" viewBox="0 0 135 50"
      className="absolute bottom-6 right-8 opacity-[0.07] pointer-events-none"
    >
      <polyline
        points={points.map((p, i) => `${i * 9},${45 - p}`).join(" ")}
        fill="none" stroke="#DC2626" strokeWidth="1.5" strokeLinejoin="round"
      />
      {/* Dots on each point */}
      {points.map((p, i) => (
        <circle key={i} cx={i * 9} cy={45 - p} r="1.5" fill="#F97316" />
      ))}
    </svg>
  );
}

// ─── Corner Bracket Decorations ──────────────────────────────────────────────

function CornerBrackets() {
  const style =
    "absolute w-5 h-5 pointer-events-none";
  const lineColor = "rgba(220,38,38,0.55)";
  return (
    <>
      {/* Top-left */}
      <div className={`${style} top-5 left-5`}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M0 10 L0 0 L10 0" stroke={lineColor} strokeWidth="1.5" />
        </svg>
      </div>
      {/* Top-right */}
      <div className={`${style} top-5 right-5`}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M20 10 L20 0 L10 0" stroke={lineColor} strokeWidth="1.5" />
        </svg>
      </div>
      {/* Bottom-left */}
      <div className={`${style} bottom-5 left-5`}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M0 10 L0 20 L10 20" stroke={lineColor} strokeWidth="1.5" />
        </svg>
      </div>
      {/* Bottom-right */}
      <div className={`${style} bottom-5 right-5`}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M20 10 L20 20 L10 20" stroke={lineColor} strokeWidth="1.5" />
        </svg>
      </div>
    </>
  );
}

// ─── Scan-sweep line ─────────────────────────────────────────────────────────

function ScanSweep() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none z-10"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(220,38,38,0.5) 40%, rgba(249,115,22,0.4) 60%, transparent)",
        boxShadow: "0 0 8px rgba(220,38,38,0.3)",
      }}
      animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
    />
  );
}

// ─── Floating Data Symbol Tags ────────────────────────────────────────────────

const SYMBOLS = [
  "SELECT *", "Python", "SQL", "{ JSON }", "∑ SUM",
  "BigQuery", "Power BI", "ETL", ">_ pandas", "ML Model",
  "GROUP BY", "R² = 0.97", "📊", "INNER JOIN", "→ Pipeline",
];

function FloatingSymbols() {
  return (
    <>
      {SYMBOLS.map((sym, i) => (
        <motion.span
          key={i}
          className="absolute text-[10px] sm:text-[11px] font-mono font-medium pointer-events-none select-none whitespace-nowrap"
          style={{
            left: `${5 + (i * 6.3) % 88}%`,
            top: `${8 + (i * 14.1) % 78}%`,
            color:
              i % 3 === 0 ? "rgba(220,38,38,0.3)"
                : i % 3 === 1 ? "rgba(249,115,22,0.28)"
                  : "rgba(255,255,255,0.13)",
          }}
          animate={{
            y: [0, -12, 0, 7, 0],
            opacity: [0.35, 0.8, 0.35, 0.65, 0.35],
            rotate: [0, i % 2 === 0 ? 2 : -2, 0],
          }}
          transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
        >
          {sym}
        </motion.span>
      ))}
    </>
  );
}

// ─── Typewriter Hook ─────────────────────────────────────────────────────────

function useTypewriter(text: string, speed = 28, delay = 500) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, speed, delay]);
  return displayed;
}

// ─── Animated Counter ────────────────────────────────────────────────────────

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(to / 40);
    const interval = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(interval); }
      else setVal(start);
    }, 30);
    return () => clearInterval(interval);
  }, [to]);
  return <>{val}{suffix}</>;
}

// ─── Live Stats Bar ──────────────────────────────────────────────────────────

const STATS = [
  { value: 18, suffix: "+", label: "Projects" },
  { value: 8, suffix: "", label: "Tools" },
  { value: 18, suffix: "", label: "Certifications" },
  { value: 4, suffix: "+", label: "Years Learning" },
];

function LiveStatsBar() {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-2 mt-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      {/* Live indicator */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full self-center"
        style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)" }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-red-500"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <span className="text-[9px] font-semibold text-red-400 uppercase tracking-widest">Live</span>
      </div>

      {STATS.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.85 + i * 0.1, duration: 0.4 }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <span
            className="text-[12px] font-bold bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #DC2626, #F97316)" }}
          >
            <Counter to={s.value} suffix={s.suffix} />
          </span>
          <span className="text-[10px] text-gray-500 tracking-wide">{s.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── PageHeroStat (exported helper for per-page custom stats) ─────────────────

export function PageHeroStat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 + delay }}
      className="flex flex-col items-center px-5 py-2 rounded-xl"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" }}
    >
      <span className="text-2xl font-bold bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(135deg, #DC2626, #F97316)" }}>
        {value}
      </span>
      <span className="text-[11px] text-gray-500 mt-0.5 tracking-wide uppercase">{label}</span>
    </motion.div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface PageHeroProps {
  title: string;
  subtitle?: string;
  topContent?: ReactNode;
  bottomContent?: ReactNode;
  center?: boolean;
  /** Show the live stats bar (default true) */
  showStats?: boolean;
}

// ─── Main Component ───────────────────────────────────────────────────────────

const PageHero = ({
  title,
  subtitle,
  topContent,
  bottomContent,
  center = true,
  showStats = true,
}: PageHeroProps) => {
  const typed = useTypewriter(subtitle ?? "", 22, 600);
  const words = title.split(" ");

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "#0d0d0d", minHeight: "clamp(240px, 32vh, 340px)" }}
    >
      {/* Layer 1: node-graph canvas */}
      <div className="absolute inset-0 opacity-55">
        <DataNodeCanvas />
      </div>

      {/* Layer 2: floating text symbols */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingSymbols />
      </div>

      {/* Layer 3: subtle red grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(220,38,38,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220,38,38,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Layer 4: radial red glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 75% 65% at 50% 115%, rgba(220,38,38,0.2) 0%, transparent 70%)",
        }}
      />

      {/* Layer 5: scan sweep */}
      <ScanSweep />

      {/* Layer 6: sparkline decoration */}
      <Sparkline />

      {/* Layer 7: corner brackets */}
      <CornerBrackets />

      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.55) 40%, rgba(249,115,22,0.45) 60%, transparent)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-4xl mx-auto w-full ${center ? "text-center" : ""}`}>

          {topContent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              {topContent}
            </motion.div>
          )}

          {/* Title — gradient first word + white rest */}
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight mb-3"
          >
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #DC2626 0%, #F97316 100%)" }}
            >
              {words[0]}
            </span>
            {words.length > 1 && (
              <span className="text-white"> {words.slice(1).join(" ")}</span>
            )}
          </motion.h1>

          {/* Subtitle — typewriter */}
          {subtitle && (
            <p className="text-[13px] text-gray-400 max-w-2xl mx-auto leading-relaxed min-h-[1.6rem]">
              {typed}
              {typed.length < subtitle.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-0.5 h-3.5 bg-red-500 ml-0.5 align-middle"
                />
              )}
            </p>
          )}

          {/* Live stats bar */}
          {showStats && <LiveStatsBar />}

          {/* Custom bottom content */}
          {bottomContent && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-5"
            >
              {bottomContent}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHero;
