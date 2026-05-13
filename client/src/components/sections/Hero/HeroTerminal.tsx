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
    <span className="inline-block relative" style={{ minWidth: 'clamp(160px, 30vw, 280px)', minHeight: '1.2em' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="inline-block bg-clip-text text-transparent leading-relaxed"
          style={{ backgroundImage: 'linear-gradient(135deg, var(--accent-primary) 0%, #F97316 100%)' }}
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
    <div className="relative p-[1px] rounded-xl" style={{ background: 'rgba(220,38,38,0.2)' }}>
      <div className="rounded-xl overflow-hidden relative" style={{ background: '#0D0D0D' }}>
        {children}
      </div>
    </div>
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
      setActiveCmd("stack");
      setVisibleLines(COMMANDS["stack"].lines);
      setTypedCmd(COMMANDS["stack"].cmd);
      return;
    }
    const t = setTimeout(() => runCommand("stack"), 600);
    return () => clearTimeout(t);
  }, [runCommand]);

  return (
    <div className="w-full max-w-2xl mx-auto lg:mx-0">
      <AnimatedBorder>
        {/* Terminal header / tabs */}
        <div 
          className="flex items-center gap-1.5 px-4 py-3"
          style={{ background: '#111111', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          {CMD_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => runCommand(key)}
              className="px-3 py-1 rounded-md text-xs font-medium transition-all duration-200"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                background: activeCmd === key ? 'rgba(220,38,38,0.1)' : 'rgba(255,255,255,0.04)',
                color: activeCmd === key ? '#EF4444' : '#8892A0',
                border: activeCmd === key ? '1px solid rgba(220,38,38,0.2)' : '1px solid rgba(255,255,255,0.06)',
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
              <span style={{ color: '#EF4444' }}>$</span>
              <span style={{ color: '#6B7280' }}>{" ~ "}</span>
              <span>{typedCmd}</span>
              {isTyping && visibleLines.length === 0 && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '7px',
                    height: '14px',
                    background: '#EF4444',
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
                {...terminalLineAnimation}
                style={{
                  color: line.accent ? '#EF4444' : line.color || '#A0AEC0',
                  opacity: line.dim ? 0.4 : 1,
                  minHeight: line.text === "" ? '10px' : undefined,
                  whiteSpace: 'pre',
                }}
              >
                {line.accent || line.color ? line.text : highlightText(line.text)}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Idle prompt with cursor */}
          {!isTyping && typedCmd !== "" && (
            <div style={{ color: '#A0AEC0', marginTop: '4px' }}>
              <span style={{ color: '#EF4444' }}>$</span>
              <span style={{ color: '#6B7280' }}>{" ~ "}</span>
              <span
                style={{
                  display: 'inline-block',
                  width: '7px',
                  height: '14px',
                  background: '#EF4444',
                  verticalAlign: 'middle',
                  opacity: showCursor ? 0.9 : 0,
                  transition: 'opacity 0.1s',
                }}
              />
            </div>
          )}

          {/* Initial state */}
          {typedCmd === "" && (
            <div style={{ color: '#A0AEC0' }}>
              <span style={{ color: '#EF4444' }}>$</span>
              <span style={{ color: '#6B7280' }}>{" ~ "}</span>
              <span
                style={{
                  display: 'inline-block',
                  width: '7px',
                  height: '14px',
                  background: '#EF4444',
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
  );
};
