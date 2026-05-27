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

/* ── Animated Border for Terminal ── */
export const AnimatedBorder = ({ children }: { children: React.ReactNode }) => {
  return (
    <div 
      className="relative p-[1px] rounded-xl overflow-hidden" 
      style={{ 
        background: 'conic-gradient(from var(--border-angle), rgba(255,255,255,0.02) 0%, var(--accent-primary) 35%, rgba(255,255,255,0.02) 50%, var(--accent-primary) 65%, rgba(255,255,255,0.02) 100%)',
        animation: 'border-rotate 10s linear infinite',
      } as React.CSSProperties}
    >
      <div 
        className="rounded-xl overflow-hidden relative backdrop-blur-3xl shadow-[0_32px_80px_rgba(0,0,0,0.85)]" 
        style={{ 
          background: 'rgba(5, 5, 8, 0.75)',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        {children}
      </div>
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
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-5 px-3 py-4 rounded-lg bg-[#050507]/90 border border-white/5 flex items-center justify-between relative overflow-hidden shadow-inner select-none">
      {/* Dynamic connecting line */}
      <div className="absolute left-[15%] right-[15%] top-1/2 -translate-y-1/2 h-[2px] bg-white/5 z-0">
        <motion.div 
          className="h-full origin-left"
          style={{ background: 'var(--accent-primary)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: activeNode / (nodes.length - 1) }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>

      {nodes.map((node, i) => (
        <div key={node} className="flex flex-col items-center gap-2 z-10 relative">
          <div 
            className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 relative"
            style={{
              background: i <= activeNode ? 'var(--accent-primary)' : '#121217',
              boxShadow: i === activeNode ? '0 0 14px var(--accent-primary)' : 'none',
              border: i <= activeNode ? '1px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {i === activeNode && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--accent-primary)' }} />
            )}
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <span 
            className="text-[9px] font-semibold tracking-wider transition-colors duration-300"
            style={{
              color: i <= activeNode ? '#FFFFFF' : '#4A5568',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {node}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ── Visual SQL Code Block (dbt compilation representation) ── */
export const SQLCodeBlock = () => {
  return (
    <pre className="my-4 p-3 rounded-lg bg-[#050507]/90 border border-white/5 font-mono text-[11px] leading-relaxed text-slate-300 overflow-x-auto shadow-inner select-none">
      <code className="block text-left">
        <span className="text-[#C82315] font-semibold">select</span>{"\n"}
        {"  "}user_id,{"\n"}
        {"  "}event_type,{"\n"}
        {"  "}event_timestamp,{"\n"}
        {"  "}payload{"\n"}
        <span className="text-[#C82315] font-semibold">from</span> {"{{"} ref(<span className="text-slate-400">'stg_events'</span>) {"}}"}{"\n"}
        <span className="text-[#C82315] font-semibold">where</span> event_timestamp &gt;= <span className="text-slate-400">dateadd</span>(day, -7, current_date){"\n"}
        <span className="text-[#C82315] font-semibold">order by</span> event_timestamp <span className="text-[#C82315] font-semibold">desc</span>
      </code>
    </pre>
  );
};

/* ── Terminal Main Component ── */
export const HeroTerminal = () => {
  const termBodyRef = useRef<HTMLDivElement>(null);
  const [activeCmd, setActiveCmd] = useState<string | null>(null);
  const [visibleLines, setVisibleLines] = useState<TermLine[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typedCmd, setTypedCmd] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const typingTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const CMD_KEYS = Object.keys(COMMANDS);

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

    const cmdChars = data.cmd.split("");
    const charDelay = 35;
    const cmdDuration = cmdChars.length * charDelay;

    cmdChars.forEach((_, ci) => {
      const t = setTimeout(() => {
        setTypedCmd(data.cmd.slice(0, ci + 1));
      }, ci * charDelay);
      typingTimers.current.push(t);
    });

    const lineDelay = 220;
    data.lines.forEach((line, li) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        if (li === data.lines.length - 1) {
          setIsTyping(false);
        }
      }, cmdDuration + 300 + li * lineDelay);
      typingTimers.current.push(t);
    });
  }, [isTyping]);

  /* Run initial command on mount */
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setActiveCmd("pipeline");
      setVisibleLines(COMMANDS["pipeline"].lines);
      setTypedCmd(COMMANDS["pipeline"].cmd);
      return;
    }
    const t = setTimeout(() => runCommand("pipeline"), 1200);
    return () => clearTimeout(t);
  }, [runCommand]);

  return (
    <div className="w-full max-w-2xl mx-auto lg:mx-0 relative">
      <AnimatedBorder>
        {/* Terminal header / tabs */}
        <div 
          className="flex items-center justify-between px-4 py-2.5"
          style={{ background: 'rgba(9, 9, 12, 0.45)', borderBottom: '1px solid rgba(255,255,255,0.035)' }}
        >
          {/* macOS minimalist window dots */}
          <div className="flex items-center gap-1.5 mr-4 select-none shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>

          {/* Interactive capsule buttons */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-0.5">
            {CMD_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => runCommand(key)}
                className="px-3 py-0.5 rounded-full text-[11px] font-semibold tracking-wider transition-all duration-200"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  background: activeCmd === key ? 'rgba(200, 35, 21, 0.08)' : 'rgba(255,255,255,0.02)',
                  color: activeCmd === key ? '#C82315' : '#6B7280',
                  border: activeCmd === key ? '1px solid rgba(200, 35, 21, 0.25)' : '1px solid rgba(255,255,255,0.04)',
                  opacity: isTyping ? 0.5 : 1,
                  cursor: isTyping ? 'wait' : 'pointer',
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
          className="overflow-y-auto"
          style={{
            background: 'transparent',
            height: '360px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12.5px',
            lineHeight: '1.7',
            padding: '16px',
          }}
        >
          {/* Command line */}
          {typedCmd !== "" && (
            <div style={{ color: '#A0AEC0', textAlign: 'left' }}>
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
            {visibleLines.map((line, i) => {
              /* Dynamic visual node flowchart representation inside output */
              if (activeCmd === "pipeline" && i === 1) {
                return (
                  <motion.div key="dag-flow" {...terminalLineAnimation}>
                    <PipelineDAG />
                  </motion.div>
                );
              }

              /* Dynamic syntax editor SQL code block representation inside output */
              if (activeCmd === "transform" && i === 1) {
                return (
                  <motion.div key="sql-code" {...terminalLineAnimation}>
                    <SQLCodeBlock />
                  </motion.div>
                );
              }

              /* Skip displaying empty lines used as layout placeholders for visual components */
              if (activeCmd === "pipeline" && i > 1 && i < 5 && line.text === "") {
                return null;
              }
              if (activeCmd === "transform" && i > 1 && i < 7 && line.text === "") {
                return null;
              }

              return (
                <motion.div
                  key={`${activeCmd}-${i}`}
                  {...terminalLineAnimation}
                  style={{
                    color: line.accent ? 'var(--accent-primary)' : line.color || '#A0AEC0',
                    opacity: line.dim ? 0.4 : 1,
                    minHeight: line.text === "" ? '10px' : undefined,
                    whiteSpace: 'pre',
                    textAlign: 'left',
                  }}
                >
                  {line.accent || line.color ? line.text : highlightText(line.text)}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Idle prompt with cursor */}
          {!isTyping && typedCmd !== "" && (
            <div style={{ color: '#A0AEC0', marginTop: '4px', textAlign: 'left' }}>
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

          {/* Initial state */}
          {typedCmd === "" && (
            <div style={{ color: '#A0AEC0', textAlign: 'left' }}>
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

        {/* Status bar */}
        <div
          className="flex items-center justify-between px-4 py-1.5"
          style={{
            background: 'rgba(5, 5, 8, 0.45)',
            borderTop: '1px solid rgba(255,255,255,0.035)',
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
  );
};
