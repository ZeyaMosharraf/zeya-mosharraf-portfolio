'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Database, Globe, FileText, Zap, BarChart3,
  Brain, Bell, Users, LayoutDashboard,
  Activity, Clock, ShieldCheck, Layers, Gem,
  ArrowRight
} from 'lucide-react';

/* ─────────────────────────────────────────────
   ANIMATION — Subtle, directional flow
───────────────────────────────────────────── */
const animStyles = `
  @keyframes dashFlow {
    0% { stroke-dashoffset: 100; }
    100% { stroke-dashoffset: 0; }
  }
  .flow-line {
    stroke-dasharray: 20 80;
    animation: dashFlow 3s linear infinite;
  }
  .flow-line-fast {
    stroke-dasharray: 20 80;
    animation: dashFlow 1s linear infinite;
  }
  .pipeline-card {
    transition: transform 0.3s ease, border-color 0.3s ease;
  }
  .pipeline-card:hover {
    transform: translateY(-2px);
    border-color: rgba(255,255,255,0.15) !important;
  }
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SOURCES = [
  { label: 'CRM', sub: 'Customer data', icon: Users },
  { label: 'APIs', sub: 'External feeds', icon: Globe },
  { label: 'Files', sub: 'CSV, JSON, Excel', icon: FileText },
  { label: 'Databases', sub: 'MySQL, PostgreSQL', icon: Database },
  { label: 'Streaming', sub: 'Kafka, Events', icon: Zap },
];

const OUTPUTS = [
  { label: 'BI & Reporting', sub: 'Insights & reports', icon: BarChart3 },
  { label: 'Dashboards', sub: 'Real-time views', icon: LayoutDashboard },
  { label: 'ML Models', sub: 'Training & scoring', icon: Brain },
  { label: 'Alerts & Monitor', sub: 'Notifications', icon: Bell },
  { label: 'AI & Analytics', sub: 'Predictive insights', icon: Activity },
];

/* ─────────────────────────────────────────────
   SVG COORDINATE CONSTANTS
───────────────────────────────────────────── */
const CANVAS_H = 480;
const CARD_H = 60;
const SRC_LEFT = 24;
const SRC_W = 160;
const SRC_RIGHT = SRC_LEFT + SRC_W;

const PIPE_W = 190;
const PIPE_H = 260;
const PIPE_TOP = (CANVAS_H - PIPE_H) / 2;
const PIPE_CY = CANVAS_H / 2;

const PIPE_GAP = 60;
const PIPE_START = 280;
const PIPE_LEFT = [
  PIPE_START, 
  PIPE_START + PIPE_W + PIPE_GAP, 
  PIPE_START + (PIPE_W + PIPE_GAP) * 2
];
const PIPE_RIGHT = PIPE_LEFT.map(l => l + PIPE_W);

const OUT_LEFT_X = 1016;
const OUT_W = 160;

const SRC_Y = [50, 130, 210, 290, 370];
const OUT_Y = [50, 130, 210, 290, 370];

const srcCY = SRC_Y.map(y => y + CARD_H / 2);
const outCY = OUT_Y.map(y => y + CARD_H / 2);

const FAN_IN_X = 232;
const OUT_CTRL_X = 978;

const PIPELINE = [
  {
    title: 'Bronze', subtitle: 'Raw Data', color: '#EF4444',
    bullets: ['Unstructured', 'As-is ingestion', 'Unified storage'],
    label: 'RAW INGESTION', icon: Database, left: PIPE_LEFT[0],
  },
  {
    title: 'Silver', subtitle: 'Cleaned Data', color: '#F97316',
    bullets: ['Deduplication', 'Validation', 'Standardization'],
    label: 'CLEAN & TRANSFORM', icon: Layers, left: PIPE_LEFT[1],
  },
  {
    title: 'Gold', subtitle: 'Analytics Ready', color: '#FBBF24',
    bullets: ['Aggregated', 'Optimized', 'Business-grade'],
    label: 'BUSINESS READY', icon: Gem, left: PIPE_LEFT[2],
  },
];

const METRICS = [
  { label: 'Throughput', value: '2.4M', unit: 'rec/s', change: '↑ 12.5%', up: true, icon: Activity },
  { label: 'Latency P99', value: '45', unit: 'ms', change: '↓ 8.2%', up: false, icon: Clock },
  { label: 'Uptime', value: '99.9', unit: '%', change: '↑ 0.01%', up: true, icon: ShieldCheck },
  { label: 'Data Sources', value: '7', unit: '', change: 'Active', up: null, icon: Layers },
  { label: 'Data Quality', value: '98.2', unit: '%', change: '↑ 3.6%', up: true, icon: Gem },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function MedallionArchitectureUI() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    const update = () => {
      if (wrapRef.current) {
        const w = wrapRef.current.offsetWidth;
        const s = Math.min(1, w / 1200);
        setScale(s);
        setOffsetX((w - 1200 * s) / 2);
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
        background: '#0D0D0D',
        border: '1px solid rgba(220,38,38,0.20)',
        padding: '3.5rem 2rem 3rem',
      }}
    >
      <style>{animStyles}</style>

      {/* Subtle ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(239,68,68,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">

        {/* ── TITLE ── */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Medallion{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #EF4444 0%, #F97316 100%)' }}
            >
              Architecture
            </span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            A scalable data design pattern that logically organizes data in a lakehouse, 
            progressively improving structure and quality as it flows through the pipeline.
          </p>
        </div>

        {/* ── DIAGRAM ── */}
        <div ref={wrapRef} className="w-full relative" style={{ height: CANVAS_H * scale }}>
          <div
            style={{
              width: 1200,
              height: CANVAS_H,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              position: 'absolute',
              left: offsetX,
            }}
          >

            {/* ════════════════════════════════════
                SVG — CRISP DIRECT FLOW LINES
            ════════════════════════════════════ */}
            <svg
              className="absolute inset-0 pointer-events-none"
              width={1200} height={CANVAS_H}
              viewBox={`0 0 1200 ${CANVAS_H}`}
              fill="none"
            >
              <defs>
                <filter id="glow" filterUnits="userSpaceOnUse" x="-100" y="-100" width="1400" height="680">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Base paths (Subtle grid-like lines) */}
              <g>
                {srcCY.map((cy, i) => (
                  <path key={`base-src-${i}`} 
                    d={`M${SRC_RIGHT},${cy} C${FAN_IN_X},${cy} ${FAN_IN_X},${PIPE_CY} ${PIPE_LEFT[0]},${PIPE_CY}`} 
                    stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                ))}
                <path d={`M${PIPE_RIGHT[0]},${PIPE_CY} L${PIPE_LEFT[1]},${PIPE_CY}`} 
                  stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <path d={`M${PIPE_RIGHT[1]},${PIPE_CY} L${PIPE_LEFT[2]},${PIPE_CY}`} 
                  stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                {outCY.map((cy, i) => (
                  <path key={`base-out-${i}`} 
                    d={`M${PIPE_RIGHT[2]},${PIPE_CY} C${OUT_CTRL_X},${PIPE_CY} ${OUT_CTRL_X},${cy} ${OUT_LEFT_X},${cy}`} 
                    stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                ))}
              </g>

              {/* Animated Flow Packets */}
              {srcCY.map((cy, i) => (
                <path key={`flow-src-${i}`} 
                  d={`M${SRC_RIGHT},${cy} C${FAN_IN_X},${cy} ${FAN_IN_X},${PIPE_CY} ${PIPE_LEFT[0]},${PIPE_CY}`} 
                  stroke={PIPELINE[0].color} strokeWidth="1.5"
                  pathLength="100" className="flow-line" filter="url(#glow)"
                  style={{ animationDelay: `${i * 0.4}s` }} />
              ))}
              
              {/* Fast flow packets between Pipeline Stages */}
              {[0, 1].map((i) => (
                <path key={`flow-pipe1-${i}`}
                  d={`M${PIPE_RIGHT[0]},${PIPE_CY} L${PIPE_LEFT[1]},${PIPE_CY}`} 
                  stroke={PIPELINE[1].color} strokeWidth="1.5"
                  pathLength="100" className="flow-line-fast" filter="url(#glow)"
                  style={{ animationDelay: `${i * 0.5}s` }} />
              ))}
                
              {[0, 1].map((i) => (
                <path key={`flow-pipe2-${i}`}
                  d={`M${PIPE_RIGHT[1]},${PIPE_CY} L${PIPE_LEFT[2]},${PIPE_CY}`} 
                  stroke={PIPELINE[2].color} strokeWidth="1.5"
                  pathLength="100" className="flow-line-fast" filter="url(#glow)"
                  style={{ animationDelay: `${0.25 + i * 0.5}s` }} />
              ))}

              {outCY.map((cy, i) => (
                <path key={`flow-out-${i}`} 
                  d={`M${PIPE_RIGHT[2]},${PIPE_CY} C${OUT_CTRL_X},${PIPE_CY} ${OUT_CTRL_X},${cy} ${OUT_LEFT_X},${cy}`} 
                  stroke={PIPELINE[2].color} strokeWidth="1.5"
                  pathLength="100" className="flow-line" filter="url(#glow)"
                  style={{ animationDelay: `${1.5 + i * 0.4}s` }} />
              ))}
            </svg>

            {/* ════ SECTION LABELS ════ */}
            <div
              className="absolute text-[11px] font-semibold tracking-widest uppercase text-gray-500"
              style={{ left: SRC_LEFT, top: 16 }}
            >
              Sources
            </div>
            <div
              className="absolute text-[11px] font-semibold tracking-widest uppercase text-gray-500"
              style={{ left: OUT_LEFT_X, top: 50 }}
            >
              Destinations
            </div>

            {/* ════ SOURCE CARDS ════ */}
            {SOURCES.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="absolute flex items-center gap-3 px-3 rounded-lg group"
                  style={{
                    left: SRC_LEFT, top: SRC_Y[i],
                    width: SRC_W, height: CARD_H,
                    background: '#111111',
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                  }}
                >
                  <div className="w-8 h-8 rounded flex items-center justify-center bg-white/[0.02] border border-white/[0.05] group-hover:bg-white/[0.05] transition-colors">
                    <Icon size={14} className="text-gray-400 group-hover:text-gray-200" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-gray-300 leading-tight truncate">{s.label}</p>
                    <p className="text-[10px] text-gray-500 leading-tight truncate mt-0.5">{s.sub}</p>
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: "easeOut" }}
                  className="absolute rounded-xl flex flex-col p-5 bg-[#111111] pipeline-card z-10"
                  style={{
                    left: p.left, top: PIPE_TOP,
                    width: PIPE_W, height: PIPE_H,
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: '0 8px 32px -8px rgba(0,0,0,0.8)',
                  }}
                >
                  {/* Subtle top border highlight */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl opacity-60"
                    style={{ background: p.color }} 
                  />
                  
                  <div className="flex flex-col gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#111] border border-white/[0.05]">
                      <Icon size={20} style={{ color: p.color }} />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-semibold text-white leading-none mb-1.5">{p.title}</h3>
                      <p className="text-[12px] text-gray-400 leading-none">{p.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <ul className="space-y-3">
                      {p.bullets.map(b => (
                        <li key={b} className="text-[12px] text-gray-400 flex items-start gap-2.5 leading-tight">
                          <span className="w-1.5 h-1.5 rounded-sm flex-shrink-0 mt-1" style={{ background: p.color, opacity: 0.8 }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-gray-500">{p.label}</span>
                    <ArrowRight size={14} className="text-gray-600" />
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
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  className="absolute flex items-center gap-3 px-3 rounded-lg group"
                  style={{
                    left: OUT_LEFT_X, top: OUT_Y[i],
                    width: OUT_W, height: CARD_H,
                    background: '#111111',
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                  }}
                >
                  <div className="w-8 h-8 rounded flex items-center justify-center bg-white/[0.02] border border-white/[0.05] group-hover:bg-white/[0.05] transition-colors">
                    <Icon size={14} className="text-gray-400 group-hover:text-gray-200" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-gray-300 leading-tight truncate">{o.label}</p>
                    <p className="text-[10px] text-gray-500 leading-tight truncate mt-0.5">{o.sub}</p>
                  </div>
                </motion.div>
              );
            })}

          </div>
        </div>

        {/* ── METRICS ROW ── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">
          {METRICS.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                className="flex flex-col p-4 rounded-xl"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} className="text-gray-500" />
                  <span className="text-[11px] font-medium text-gray-400">{m.label}</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-semibold text-white leading-none">{m.value}</span>
                  {m.unit && <span className="text-[13px] text-gray-500 mb-0.5">{m.unit}</span>}
                </div>
                <div className="mt-2 text-[11px] font-medium">
                  <span className={m.up === true ? 'text-emerald-400' : m.up === false ? 'text-rose-400' : 'text-gray-500'}>
                    {m.change}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
