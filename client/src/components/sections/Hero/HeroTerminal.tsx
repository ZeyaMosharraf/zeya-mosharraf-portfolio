import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Clock } from "lucide-react";
import { COMMANDS, TermLine } from "./terminalData";
import { rotatingWordAnimation, terminalLineAnimation } from "@/lib/animations";
import { highlightText } from "@/lib/utils/highlightText";

/* ── Rotating Words Animation ── */
export const RotatingWord = () => {
  const [index, setIndex] = useState(0);
  const words = ["Automated", "Observable", "Modular", "Performant"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative text-left align-bottom h-[1.3em] overflow-hidden font-heading">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="inline-block leading-relaxed whitespace-nowrap font-heading font-semibold text-[#C23125]"
          style={{ 
            fontFamily: 'var(--font-heading)',
          }}
          {...rotatingWordAnimation}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* ── Sleek Static Dark Glass Container (No heavy conic gradient repaints) ── */
export const AnimatedBorder = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative rounded-xl border border-white/10 bg-[#09090d]/95 shadow-[0_24px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl hover:border-red-500/20 transition-colors duration-300 overflow-hidden">
      {children}
    </div>
  );
};

/* ── Visual dbt DAG Pipeline Flow ── */
export const PipelineDAG = () => {
  const nodes = ["ingest_raw", "stg_transform", "core_models", "mart_activations"];
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode(prev => (prev + 1) % nodes.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-4 px-3 py-3.5 rounded-lg bg-[#050507]/90 border border-white/5 flex items-center justify-between relative overflow-hidden shadow-inner select-none">
      {/* Dynamic connecting line */}
      <div className="absolute left-[15%] right-[15%] top-1/2 -translate-y-1/2 h-[2px] bg-white/5 z-0">
        <motion.div 
          className="h-full origin-left bg-red-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: activeNode / (nodes.length - 1) }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {nodes.map((node, i) => (
        <div key={node} className="flex flex-col items-center gap-1.5 z-10 relative">
          <div 
            className="w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 relative"
            style={{
              background: i <= activeNode ? '#dc2626' : '#121217',
              boxShadow: i === activeNode ? '0 0 10px rgba(220,38,38,0.6)' : 'none',
              border: i <= activeNode ? '1px solid #dc2626' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {i === activeNode && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            )}
            <div className="w-1 h-1 rounded-full bg-white" />
          </div>
          <span 
            className="text-[8.5px] font-mono font-medium tracking-wider transition-colors duration-300"
            style={{
              color: i <= activeNode ? '#FFFFFF' : '#4A5568',
            }}
          >
            {node}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ── Visual SQL Code Block ── */
export const SQLCodeBlock = () => {
  return (
    <pre className="my-3 p-3 rounded-lg bg-[#050507]/90 border border-white/5 font-mono text-[11px] leading-relaxed text-slate-300 overflow-x-auto shadow-inner select-none">
      <code className="block text-left">
        <span className="text-red-400 font-semibold">select</span>{"\n"}
        {"  "}user_id,{"\n"}
        {"  "}event_type,{"\n"}
        {"  "}event_timestamp,{"\n"}
        {"  "}payload{"\n"}
        <span className="text-red-400 font-semibold">from</span> {"{{"} ref(<span className="text-slate-400">'stg_events'</span>) {"}}"}{"\n"}
        <span className="text-red-400 font-semibold">where</span> event_timestamp &gt;= <span className="text-slate-400">dateadd</span>(day, -7, current_date){"\n"}
        <span className="text-red-400 font-semibold">order by</span> event_timestamp <span className="text-red-400 font-semibold">desc</span>
      </code>
    </pre>
  );
};

/* ── Lightweight, Instant Terminal Main Component ── */
export const HeroTerminal = () => {
  const termBodyRef = useRef<HTMLDivElement>(null);
  const [activeCmd, setActiveCmd] = useState<string>("pipeline");
  const [typedCmd, setTypedCmd] = useState<string>(COMMANDS["pipeline"].cmd);
  const [visibleLines, setVisibleLines] = useState<TermLine[]>(COMMANDS["pipeline"].lines);

  const CMD_KEYS = Object.keys(COMMANDS);

  const runCommand = useCallback((key: string) => {
    const data = COMMANDS[key];
    if (!data) return;
    setActiveCmd(key);
    setTypedCmd(data.cmd);
    setVisibleLines(data.lines);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto lg:mx-0 relative">
      <AnimatedBorder>
        {/* Terminal header / tabs */}
        <div 
          className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/5"
        >
          {/* macOS window dots */}
          <div className="flex items-center gap-1.5 mr-4 select-none shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>

          {/* Interactive capsule buttons */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-0.5">
            {CMD_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => runCommand(key)}
                className="px-3 py-1 rounded-md text-[11px] font-mono tracking-wider transition-all duration-200"
                style={{
                  background: activeCmd === key ? 'rgba(220, 38, 38, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: activeCmd === key ? '#ef4444' : '#9ca3af',
                  border: activeCmd === key ? '1px solid rgba(220, 38, 38, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                  cursor: 'pointer',
                }}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal body */}
        <div
          ref={termBodyRef}
          className="overflow-y-auto min-h-[300px] max-h-[360px] p-4 font-mono text-[12px] leading-relaxed select-none"
        >
          {/* Command line */}
          <div className="text-slate-300 text-left mb-2">
            <span className="text-red-500 font-bold">$</span>
            <span className="text-gray-500">{" ~ "}</span>
            <span>{typedCmd}</span>
          </div>

          {/* Output lines */}
          <div className="space-y-1">
            {visibleLines.map((line, i) => {
              if (activeCmd === "pipeline" && i === 1) {
                return <PipelineDAG key="dag-flow" />;
              }

              if (activeCmd === "transform" && i === 1) {
                return <SQLCodeBlock key="sql-code" />;
              }

              if (activeCmd === "pipeline" && i > 1 && i < 5 && line.text === "") return null;
              if (activeCmd === "transform" && i > 1 && i < 7 && line.text === "") return null;

              return (
                <div
                  key={`${activeCmd}-${i}`}
                  style={{
                    color: line.accent ? '#ef4444' : line.color || '#94a3b8',
                    opacity: line.dim ? 0.5 : 1,
                    minHeight: line.text === "" ? '8px' : undefined,
                    whiteSpace: 'pre',
                    textAlign: 'left',
                  }}
                >
                  {line.accent || line.color ? line.text : highlightText(line.text)}
                </div>
              );
            })}
          </div>

          {/* Idle prompt with CSS cursor */}
          <div className="text-slate-300 mt-3 text-left flex items-center">
            <span className="text-red-500 font-bold">$</span>
            <span className="text-gray-500">{" ~ "}</span>
            <span className="inline-block w-1.5 h-3.5 bg-red-500/80 ml-1.5 animate-pulse" />
          </div>
        </div>

        {/* Status bar */}
        <div
          className="flex items-center justify-between px-4 py-2 bg-black/50 border-t border-white/5 font-mono text-[10px] text-gray-500 select-none"
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <Wifi className="w-3 h-3" />
              <span>connected</span>
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
  );
};

