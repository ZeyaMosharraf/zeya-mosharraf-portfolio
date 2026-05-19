import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion } from "framer-motion";
import {
  Database, Cpu, Globe, BarChart3, Zap, Layers,
  ChevronRight, ShieldCheck, FileText, Activity,
  Bell, LayoutDashboard, Brain, Monitor, Network,
  Server, Share2, Terminal, Workflow, Cloud
} from "lucide-react";

/**
 * UNIVERSAL ENTERPRISE ARCHITECTURE ENGINE v4.0 (UNIFIED NODE SYSTEM)
 * Optimized for high-density scalability and predictable orthogonal routing.
 * 
 * DESIGN PRINCIPLES:
 * 1. Unified Node Geometry: Identical dimensions for all nodes to ensure perfect alignment.
 * 2. Content-Responsive Text: Text wraps naturally within the node without truncation.
 * 3. Scalable Stage Distribution: Categorization is handled by Stage Zones, not individual roles.
 * 4. Precision Routing: Mathematical port consistency for synchronized packet pulses.
 */

interface RenderNode {
  id: string;
  stage: number;
  lane?: number;
  title: string;
  desc?: string;
  icon?: string;
  color?: string;
  _order: number;
}

interface RenderLink {
  from: string;
  to: string;
}

const ICON_MAP: Record<string, any> = {
  database: Database, cpu: Cpu, globe: Globe, barChart: BarChart3,
  zap: Zap, layers: Layers, shield: ShieldCheck, file: FileText,
  activity: Activity, bell: Bell, dashboard: LayoutDashboard,
  brain: Brain, monitor: Monitor, network: Network, server: Server,
  share: Share2, terminal: Terminal, workflow: Workflow, cloud: Cloud,
  default: Database,
};

// UNIFIED NODE GEOMETRY
const NODE_W = 230;
const NODE_H = 84;

const animStyles = `
  .pipeline-card {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .pipeline-card:hover {
    transform: translateY(-4px) scale(1.02);
    border-color: rgba(255,255,255,0.2) !important;
    background: rgba(15,15,15,0.98) !important;
  }
  .grid-pattern {
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size: 30px 30px;
  }
  .radial-vignette {
    background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 60%, rgba(0,0,0,0.4) 100%);
  }
  .packet-pulse {
    filter: drop-shadow(0 0 1px currentColor);
  }
  .metadata-text {
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
  }
  .stage-indicator {
    font-size: 56px;
    font-weight: 900;
    color: rgba(255,255,255,0.05);
    line-height: 1;
    user-select: none;
  }
`;

const getOrthogonalPath = (x1: number, y1: number, x2: number, y2: number) => {
  const midX = x1 + (x2 - x1) * 0.45;
  return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
};

const normalizeArchitecture = (dbArch: any) => {
  const rawNodes = dbArch?.nodes || [];
  const rawLinks = dbArch?.links || [];

  const nodes: RenderNode[] = rawNodes.map((node: any, idx: number) => ({
    id: String(node.id || `node-${idx}`),
    stage: Number(node.stage ?? 0),
    lane: node.lane !== undefined ? Number(node.lane) : undefined,
    title: String(node.title || 'Component'),
    desc: String(node.desc || ''),
    icon: String(node.icon || 'database'),
    color: String(node.color || '#4F46E5'),
    _order: Number(node._order ?? idx),
  }));

  const validIds = new Set(nodes.map(n => n.id));
  const links: RenderLink[] = rawLinks
    .map((l: any) => (Array.isArray(l) ? { from: String(l[0]), to: String(l[1]) } : { from: String(l.from), to: String(l.to) }))
    .filter((l: any) => validIds.has(l.from) && validIds.has(l.to));

  const maxStage = Math.max(...nodes.map(n => n.stage), 0);
  const metadata = {
    topLeft: String(dbArch?.metadata?.topLeft || 'System Architecture'),
    topRight: String(dbArch?.metadata?.topRight || 'Operational Intelligence Pipeline'),
    bottomLeft: String(dbArch?.metadata?.bottomLeft || 'Data Flow Orchestration'),
    bottomRight: String(dbArch?.metadata?.bottomRight || 'Enterprise Analytics Platform'),
  };

  return { nodes, links, maxStage, metadata };
};

export default function ArchitectureRenderer({ architecture: dbArch }: { architecture: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);

  const VIRTUAL_W = 1600;
  const VIRTUAL_H = 750;
  const H_PAD = 150;

  const arch = useMemo(() => normalizeArchitecture(dbArch), [dbArch]);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        
        // Scale down to fit perfectly without horizontal scroll
        const s = Math.max(0.1, Math.min(1, w / VIRTUAL_W));
        setScale(s);
        
        // Center the scaled diagram
        const scaledWidth = VIRTUAL_W * s;
        setOffsetX(Math.max(0, (w - scaledWidth) / 2));
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [arch]);

  const layout = useMemo(() => {
    const stageCount = arch.maxStage + 1;
    const slotMap = new Map<string, RenderNode[]>();
    let maxNodesInLane = 0;
    arch.nodes.forEach(node => {
      const lane = node.lane !== undefined ? node.lane : 1;
      const key = `${node.stage}-${lane}`;
      if (!slotMap.has(key)) slotMap.set(key, []);
      slotMap.get(key)!.push(node);
      maxNodesInLane = Math.max(maxNodesInLane, slotMap.get(key)!.length);
    });

    const hScale = maxNodesInLane > 2 ? Math.max(0.6, 1 - (maxNodesInLane - 2) * 0.18) : 1;
    const wScale = stageCount > 5 ? Math.max(0.7, 1 - (stageCount - 5) * 0.08) : 1;
    const dW = NODE_W * wScale;
    const dH = NODE_H * hScale;
    const dGap = 48 * hScale;

    const availableW = VIRTUAL_W - (H_PAD * 2);
    const stageGap = stageCount > 1 ? availableW / (stageCount - 1) : 0;
    const nodeLayout = new Map<string, { x: number; y: number; w: number; h: number; node: RenderNode }>();

    slotMap.forEach((nodes, key) => {
      const [stage, lane] = key.split('-').map(Number);
      const laneY = lane === 0 ? VIRTUAL_H * 0.26 : lane === 1 ? VIRTUAL_H * 0.5 : VIRTUAL_H * 0.74;
      nodes.sort((a, b) => a._order - b._order);
      const totalH = (nodes.length * dH) + ((nodes.length - 1) * dGap);
      let curY = laneY - totalH / 2;
      nodes.forEach(node => {
        const xPos = H_PAD + (stage * stageGap) - (dW / 2);
        nodeLayout.set(node.id, { x: xPos, y: curY, w: dW, h: dH, node });
        curY += dH + dGap;
      });
    });

    return { nodeLayout, stageGap, stageCount, hScale, dW, dH };
  }, [arch]);

  return (
    <div className="w-full bg-[#050505] relative font-inter overflow-hidden border border-white/[0.04] rounded-xl shadow-2xl">
      <style>{animStyles}</style>

      <div ref={containerRef} className="relative w-full overflow-hidden" style={{ height: VIRTUAL_H * scale }}>
        <div 
          className="absolute"
          style={{
            width: VIRTUAL_W * scale,
            height: VIRTUAL_H * scale,
          }}
        >
        <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40" />
        <div className="absolute inset-0 radial-vignette pointer-events-none" />

        <div
          style={{
            width: VIRTUAL_W,
            height: VIRTUAL_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            position: 'absolute',
            left: offsetX,
          }}
        >
          {/* ── QUAD-CORNER METADATA ── */}
          <div className="absolute top-10 left-10 flex items-center gap-4 z-50">
            <div className="w-2.5 h-2.5 bg-red-600 rounded-sm shadow-[0_0_12px_rgba(220,38,38,0.8)]" />
            <span className="metadata-text" style={{ fontSize: '14px' }}>{arch.metadata.topLeft}</span>
          </div>
          <div className="absolute top-10 right-10 z-50">
            <span className="metadata-text opacity-40" style={{ fontSize: '14px' }}>{arch.metadata.topRight}</span>
          </div>
          <div className="absolute bottom-10 left-10 flex items-center gap-4 z-50">
            <div className="w-2.5 h-2.5 bg-red-600 rounded-sm shadow-[0_0_12px_rgba(220,38,38,0.8)]" />
            <span className="metadata-text" style={{ fontSize: '14px' }}>{arch.metadata.bottomLeft}</span>
          </div>
          <div className="absolute bottom-10 right-10 z-50 flex items-center gap-4">
            <span className="metadata-text opacity-40" style={{ fontSize: '14px' }}>{arch.metadata.bottomRight}</span>
            <div className="w-2.5 h-2.5 bg-red-600 rounded-sm shadow-[0_0_12px_rgba(220,38,38,0.8)]" />
          </div>
          {/* ── CONNECTION LAYER ── */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox={`0 0 ${VIRTUAL_W} ${VIRTUAL_H}`}>
            <defs>
              <filter id="port-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {arch.links.map((link, idx) => {
              const s = layout.nodeLayout.get(link.from);
              const e = layout.nodeLayout.get(link.to);
              if (!s || !e) return null;

              const x1 = s.x + s.w;
              const y1 = s.y + s.h / 2;
              const x2 = e.x;
              const y2 = e.y + e.h / 2;

              const d = getOrthogonalPath(x1, y1, x2, y2);
              const color = s.node.color || '#4F46E5';

              return (
                <g key={`${link.from}-${link.to}`}>
                  <path d={d} stroke={color} strokeWidth={1.5} fill="none" strokeOpacity={0.15} />
                  <motion.path
                    d={d}
                    stroke={color}
                    strokeWidth={2.5}
                    fill="none"
                    strokeOpacity={0.9}
                    strokeDasharray="100 1000"
                    animate={{ strokeDashoffset: [0, -1100] }}
                    transition={{
                      duration: Math.max(5, (e.node.stage - s.node.stage) * 3),
                      repeat: Infinity,
                      ease: "linear",
                      delay: idx * 0.5
                    }}
                    className="packet-pulse"
                  />
                  <circle cx={x1} cy={y1} r={3} fill={color} filter="url(#port-glow)" />
                  <circle cx={x2} cy={y2} r={3} fill={color} filter="url(#port-glow)" />
                </g>
              );
            })}
          </svg>

          {/* ── UNIFIED COMPONENT LAYER ── */}
          {arch.nodes.map((node, idx) => {
            const box = layout.nodeLayout.get(node.id);
            if (!box) return null;
            const Icon = ICON_MAP[node.icon || 'default'] || ICON_MAP.default;

            return (
              <motion.div
                key={node.id}
                className="absolute"
                style={{ left: box.x, top: box.y, width: box.w, height: box.h, zIndex: 10 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="relative w-full h-full bg-[#0a0a0a]/90 border border-white/[0.08] rounded-xl flex items-center px-4 shadow-2xl pipeline-card group cursor-pointer overflow-hidden backdrop-blur-md"
                  style={{ borderRadius: layout.hScale < 0.8 ? '8px' : '12px' }}
                >
                  <div className="absolute inset-y-0 left-0 w-[3px]" style={{ background: node.color }} />
                  <div
                    className="rounded-lg flex items-center justify-center shrink-0 border border-white/[0.05]"
                    style={{
                      background: `${node.color}15`,
                      width: layout.hScale < 0.8 ? '32px' : '40px',
                      height: layout.hScale < 0.8 ? '32px' : '40px'
                    }}
                  >
                    <Icon className="w-1/2 h-1/2" style={{ color: node.color }} />
                  </div>
                  <div className="ml-4 min-w-0 flex-1 py-2">
                    <h3
                      className="text-white font-black tracking-tighter leading-tight uppercase whitespace-normal"
                      style={{ fontSize: layout.hScale < 0.8 ? '9px' : '11px' }}
                    >
                      {node.title}
                    </h3>
                    {layout.hScale > 0.75 && (
                      <p className="text-[9px] text-gray-500 mt-0.5 font-bold leading-tight whitespace-normal opacity-70">
                        {node.desc}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        </div>
      </div>

    </div>
  );
}
