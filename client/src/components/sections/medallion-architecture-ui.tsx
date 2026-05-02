'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Database, Globe, FileText, Zap, BarChart3,
  Brain, Bell, Users, LayoutDashboard,
  Activity, Clock, ShieldCheck, Layers, Gem,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   ANIMATION — smooth pulsing glow, no dots
   Each path class carries its own delay via
   style attribute; the keyframe only animates
   opacity so the line stays solid at all times.
───────────────────────────────────────────── */
const animStyles = `
  @keyframes glowPulse {
    0%, 100% { opacity: 0.38; }
    50%       { opacity: 0.90; }
  }
  .gline { animation: glowPulse 2.8s ease-in-out infinite; }

  @keyframes nodePulse {
    0%, 100% { opacity: 0.6;  r: 5;  }
    50%       { opacity: 1.0;  r: 7;  }
  }
  .jnode-core { animation: nodePulse 2.4s ease-in-out infinite; }

  @keyframes ringPulse {
    0%, 100% { opacity: 0.18; r: 14; }
    50%       { opacity: 0.40; r: 18; }
  }
  .jnode-ring { animation: ringPulse 2.4s ease-in-out infinite; }
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SOURCES = [
  { label: 'CRM', sub: 'Customer data', icon: Users, color: '#f87171' },
  { label: 'APIs', sub: 'External feeds', icon: Globe, color: '#fb923c' },
  { label: 'Files', sub: 'CSV, JSON, Excel', icon: FileText, color: '#a3e635' },
  { label: 'Databases', sub: 'MySQL, PostgreSQL', icon: Database, color: '#22d3ee' },
  { label: 'Streaming', sub: 'Kafka, Events', icon: Zap, color: '#facc15' },
];
const SRC_Y = [72, 147, 222, 297, 372];   // card top Y inside 1200×480 canvas

const OUTPUTS = [
  { label: 'BI & Reporting', sub: 'Insights & reports', icon: BarChart3, color: '#60a5fa' },
  { label: 'Dashboards', sub: 'Real-time views', icon: LayoutDashboard, color: '#34d399' },
  { label: 'ML Models', sub: 'Training & scoring', icon: Brain, color: '#c084fc' },
  { label: 'Alerts & Monitor', sub: 'Notifications', icon: Bell, color: '#f472b6' },
];
const OUT_Y = [97, 185, 273, 361];

const PIPELINE = [
  {
    title: 'BRONZE', subtitle: 'Raw Data', color: '#f97316',
    border: 'rgba(249,115,22,0.45)', glow: 'rgba(249,115,22,0.14)',
    bullets: ['Unstructured', 'As-is ingestion', 'Unified storage'],
    label: 'RAW INGESTION', icon: Database, left: 340,
  },
  {
    title: 'SILVER', subtitle: 'Cleaned Data', color: '#3b82f6',
    border: 'rgba(59,130,246,0.45)', glow: 'rgba(59,130,246,0.14)',
    bullets: ['Deduplication', 'Validation', 'Standardization'],
    label: 'CLEAN & TRANSFORM', icon: Layers, left: 540,
  },
  {
    title: 'GOLD', subtitle: 'Analytics Ready', color: '#eab308',
    border: 'rgba(234,179,8,0.45)', glow: 'rgba(234,179,8,0.14)',
    bullets: ['Aggregated', 'Optimized', 'Business-grade'],
    label: 'BUSINESS READY', icon: Gem, left: 740,
  },
];

const METRICS = [
  { label: 'Throughput', value: '2.4M', unit: 'rec/s', change: '↑ 12.5%', up: true, icon: Activity, bg: 'rgba(59,130,246,0.1)', ic: '#60a5fa' },
  { label: 'Latency P99', value: '45', unit: 'ms', change: '↓ 8.2%', up: false, icon: Clock, bg: 'rgba(34,197,94,0.1)', ic: '#4ade80' },
  { label: 'Uptime', value: '99.9', unit: '%', change: '↑ 0.01%', up: true, icon: ShieldCheck, bg: 'rgba(234,179,8,0.1)', ic: '#facc15' },
  { label: 'Data Sources', value: '7', unit: '', change: 'Active', up: null, icon: Layers, bg: 'rgba(168,85,247,0.1)', ic: '#c084fc' },
  { label: 'Data Quality', value: '98.2', unit: '%', change: '↑ 3.6%', up: true, icon: Gem, bg: 'rgba(244,63,94,0.1)', ic: '#fb7185' },
];

/* ─────────────────────────────────────────────
   SVG COORDINATE CONSTANTS
   Canvas: 1200 × 480
───────────────────────────────────────────── */
const CANVAS_H = 480;
const CARD_H = 56;
const SRC_LEFT = 32;
const SRC_W = 148;
const SRC_RIGHT = SRC_LEFT + SRC_W;   // 180

const PIPE_W = 168;
const PIPE_H = 220;
const PIPE_TOP = (CANVAS_H - PIPE_H) / 2;   // 130
const PIPE_CY = CANVAS_H / 2;               // 240

const PIPE_LEFT = [340, 540, 740];
const PIPE_RIGHT = PIPE_LEFT.map(l => l + PIPE_W);   // [508, 708, 908]

const OUT_LEFT_X = 988;
const OUT_W = 176;

// Y-centre for each source card
const srcCY = SRC_Y.map(y => y + CARD_H / 2);
// Y-centre for each output card
const outCY = OUT_Y.map(y => y + CARD_H / 2);

/* junction node positions — sit at actual card connection points */
const FAN_IN_X = 300;  // bezier ctrl for source curves
const NODES = [
  { cx: PIPE_LEFT[0],  cy: PIPE_CY, color: '#a78bfa', rGrad: 'nMerge' },
  { cx: PIPE_RIGHT[0], cy: PIPE_CY, color: '#f97316', rGrad: 'nMid1'  },
  { cx: PIPE_RIGHT[1], cy: PIPE_CY, color: '#60a5fa', rGrad: 'nMid2'  },
  { cx: PIPE_RIGHT[2], cy: PIPE_CY, color: '#fbbf24', rGrad: 'nFan'   },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function MedallionArchitectureUI() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      if (wrapRef.current) {
        setScale(Math.min(1, wrapRef.current.offsetWidth / 1200));
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: '#0d0d0d',
        border: '1px solid rgba(255,255,255,0.06)',
        padding: '2.5rem 2rem 2rem',
      }}
    >
      <style>{animStyles}</style>

      {/* Radial glow — matches red accent used on every other section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(220,38,38,0.03) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10">

        {/* ── TITLE ── */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-1.5">
            Medallion{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)' }}
            >
              Architecture
            </span>
          </h2>
          <p className="text-gray-400 text-sm">Data flows through layers of transformation</p>
        </div>

        {/* ── DIAGRAM ── */}
        <div ref={wrapRef} className="w-full" style={{ height: CANVAS_H * scale }}>
          <div
            style={{
              width: 1200,
              height: CANVAS_H,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              position: 'relative',
            }}
          >

            {/* ════════════════════════════════════
                SVG — SMOOTH PULSING GLOW LINES
                Pure CSS keyframe on opacity only.
                NO dashoffset, NO moving elements.
                strokeLinecap="round" → smooth ends.
            ════════════════════════════════════ */}
            <svg
              className="absolute inset-0 pointer-events-none"
              width={1200} height={CANVAS_H}
              viewBox={`0 0 1200 ${CANVAS_H}`}
              fill="none"
            >
              <defs>
                {/* ── Per-segment gradients ── */}
                <linearGradient id="gSrc" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="55%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
                <linearGradient id="gBS" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="gSG" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#eab308" />
                </linearGradient>
                <linearGradient id="gOut" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#eab308" />
                  <stop offset="45%" stopColor="#f97316" />
                  <stop offset="75%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>

                {/* ── Glow filters: core (crisp) + soft halo only ── */}
                <filter id="fCore">
                  <feGaussianBlur stdDeviation="0.8" />
                </filter>
                <filter id="fSoft" x="-15%" y="-15%" width="130%" height="130%">
                  <feGaussianBlur stdDeviation="2.5" />
                </filter>

                {/* ── Junction node radial gradients ── */}
                <radialGradient id="nMerge">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="nMid1">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="nMid2">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="nFan">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* ════ Sources → Bronze (direct, no orphan segment) ════ */}
              {srcCY.map((cy, i) => {
                const d   = `M${SRC_RIGHT},${cy} C${FAN_IN_X},${cy} ${FAN_IN_X},${PIPE_CY} ${PIPE_LEFT[0]},${PIPE_CY}`;
                const del = `${(i * 0.42).toFixed(2)}s`;
                return (
                  <g key={`src${i}`}>
                    <path d={d} stroke="url(#gSrc)" strokeWidth="3" strokeLinecap="round"
                      opacity="0.45" filter="url(#fSoft)"
                      className="gline" style={{ animationDelay: del }} />
                    <path d={d} stroke="url(#gSrc)" strokeWidth="1.8" strokeLinecap="round"
                      opacity="0.85"
                      className="gline" style={{ animationDelay: del }} />
                  </g>
                );
              })}

              {/* Bronze → Silver */}
              {(() => {
                const d = `M${PIPE_RIGHT[0]},${PIPE_CY} L${PIPE_LEFT[1]},${PIPE_CY}`;
                return (
                  <g>
                    <path d={d} stroke="url(#gBS)" strokeWidth="3" strokeLinecap="round"
                      opacity="0.45" filter="url(#fSoft)" className="gline" style={{ animationDelay: '0.5s' }} />
                    <path d={d} stroke="url(#gBS)" strokeWidth="1.8" strokeLinecap="round"
                      opacity="0.85" className="gline" style={{ animationDelay: '0.5s' }} />
                  </g>
                );
              })()}

              {/* Silver → Gold */}
              {(() => {
                const d = `M${PIPE_RIGHT[1]},${PIPE_CY} L${PIPE_LEFT[2]},${PIPE_CY}`;
                return (
                  <g>
                    <path d={d} stroke="url(#gSG)" strokeWidth="3" strokeLinecap="round"
                      opacity="0.45" filter="url(#fSoft)" className="gline" style={{ animationDelay: '1.0s' }} />
                    <path d={d} stroke="url(#gSG)" strokeWidth="1.8" strokeLinecap="round"
                      opacity="0.85" className="gline" style={{ animationDelay: '1.0s' }} />
                  </g>
                );
              })()}

              {/* Gold → Outputs */}
              {outCY.map((cy, i) => {
                const d   = `M${PIPE_RIGHT[2]},${PIPE_CY} C${PIPE_RIGHT[2]+44},${PIPE_CY} ${OUT_LEFT_X-44},${cy} ${OUT_LEFT_X},${cy}`;
                const del = `${(1.4 + i * 0.38).toFixed(2)}s`;
                return (
                  <g key={`out${i}`}>
                    <path d={d} stroke="url(#gOut)" strokeWidth="3" strokeLinecap="round"
                      opacity="0.45" filter="url(#fSoft)"
                      className="gline" style={{ animationDelay: del }} />
                    <path d={d} stroke="url(#gOut)" strokeWidth="1.8" strokeLinecap="round"
                      opacity="0.85"
                      className="gline" style={{ animationDelay: del }} />
                  </g>
                );
              })}

              {/* ════ JUNCTION NODES ════ */}
              {NODES.map((n, i) => (
                <g key={`jn${i}`}>
                  {/* pulsing outer ring */}
                  <circle cx={n.cx} cy={n.cy} r={14}
                    fill={`url(#${n.rGrad})`} opacity={0.22}
                    className="jnode-ring"
                    style={{ animationDelay: `${i * 0.5}s` }} />
                  {/* inner halo */}
                  <circle cx={n.cx} cy={n.cy} r={7}
                    fill={`url(#${n.rGrad})`} opacity={0.48} />
                  {/* core */}
                  <circle cx={n.cx} cy={n.cy} r={4.5}
                    fill={n.color} opacity={0.95}
                    filter="url(#fCore)"
                    className="jnode-core"
                    style={{ animationDelay: `${i * 0.5}s` }} />
                  {/* bright centre */}
                  <circle cx={n.cx} cy={n.cy} r={1.8}
                    fill="#ffffff" opacity={0.85} />
                </g>
              ))}
            </svg>

            {/* ════ SECTION LABELS ════ */}
            <div
              className="absolute text-[10px] font-semibold tracking-[2.5px] uppercase text-slate-500"
              style={{ left: SRC_LEFT, top: 40 }}
            >
              Data Sources
            </div>
            <div
              className="absolute text-[10px] font-semibold tracking-[2.5px] uppercase text-slate-500"
              style={{ left: OUT_LEFT_X, top: 62 }}
            >
              Output Systems
            </div>

            {/* ════ SOURCE CARDS ════ */}
            {SOURCES.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="absolute flex items-center gap-2.5 px-3 rounded-xl cursor-default transition-all"
                  style={{
                    left: SRC_LEFT, top: SRC_Y[i],
                    width: SRC_W, height: CARD_H,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${s.color}15` }}
                  >
                    <Icon size={15} style={{ color: s.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-white leading-tight truncate">{s.label}</p>
                    <p className="text-[9px] text-gray-500 leading-tight truncate">{s.sub}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* ════ PIPELINE CARDS ════ */}
            {PIPELINE.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.12 }}
                  className="absolute rounded-2xl flex flex-col p-4"
                  style={{
                    left: p.left, top: PIPE_TOP,
                    width: PIPE_W, height: PIPE_H,
                    background: 'rgba(11,15,20,0.95)',
                    border: `1px solid ${p.border}`,
                    boxShadow: `0 0 28px ${p.glow}, inset 0 0 18px ${p.glow}`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-2.5"
                    style={{ background: `${p.color}18` }}
                  >
                    <Icon size={18} style={{ color: p.color }} />
                  </div>
                  <p className="text-[13px] font-bold text-white tracking-wide leading-none mb-0.5">{p.title}</p>
                  <p className="text-[10px] font-medium mb-2.5 leading-none" style={{ color: p.color }}>{p.subtitle}</p>
                  <ul className="flex-1 space-y-1.5">
                    {p.bullets.map(b => (
                      <li key={b} className="text-[9px] text-gray-400 flex items-center gap-1.5 leading-tight">
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: p.color }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div
                    className="text-center text-[8px] font-bold tracking-[1.5px] py-1.5 rounded-md mt-2"
                    style={{ background: `${p.color}18`, color: p.color }}
                  >
                    {p.label}
                  </div>
                </motion.div>
              );
            })}

            {/* ════ OUTPUT CARDS ════ */}
            {OUTPUTS.map((o, i) => {
              const Icon = o.icon;
              return (
                <motion.div
                  key={o.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28 + i * 0.07 }}
                  className="absolute flex items-center gap-2.5 px-3 rounded-xl cursor-default"
                  style={{
                    left: OUT_LEFT_X, top: OUT_Y[i],
                    width: OUT_W, height: CARD_H,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${o.color}15` }}
                  >
                    <Icon size={15} style={{ color: o.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-white leading-tight truncate">{o.label}</p>
                    <p className="text-[9px] text-gray-500 leading-tight truncate">{o.sub}</p>
                  </div>
                </motion.div>
              );
            })}

          </div>
        </div>

        {/* ── METRICS ROW ── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-3 pt-3 border-t border-white/[0.06]">
          {METRICS.map((m) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="flex items-center gap-2 p-2.5 rounded-lg transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: m.bg }}
                >
                  <Icon size={13} style={{ color: m.ic }} />
                </div>
                <div>
                  <p className="text-[7px] font-semibold tracking-[1px] uppercase text-gray-500">{m.label}</p>
                  <p className="text-[13px] font-extrabold text-white leading-tight">
                    {m.value}
                    {m.unit && (
                      <span className="text-[9px] font-normal text-gray-500 ml-0.5">{m.unit}</span>
                    )}
                  </p>
                  <p className={`text-[7px] font-medium leading-tight ${m.up === true ? 'text-emerald-400' : m.up === false ? 'text-red-400' : 'text-gray-500'
                    }`}>
                    {m.change}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
