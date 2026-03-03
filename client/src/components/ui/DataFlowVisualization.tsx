import { motion, useInView } from "framer-motion";
import {
  Target,
  Database,
  Settings,
  BarChart3,
  Brain,
  TrendingUp,
  Monitor,
  CheckCircle,
} from "lucide-react";
import { useRef } from "react";

/* ── pipeline step data ── */
const workflowSteps = [
  {
    step: 1,
    title: "Problem Definition",
    icon: Target,
    tools: ["Stakeholder Analysis", "KPI Definition", "Success Criteria"],
  },
  {
    step: 2,
    title: "Data Collection",
    icon: Database,
    tools: ["SQL Queries", "APIs", "Web Scraping"],
  },
  {
    step: 3,
    title: "Data Preparation",
    icon: Settings,
    tools: ["Python / Pandas", "Data Cleaning", "Feature Eng."],
  },
  {
    step: 4,
    title: "Exploratory Analysis",
    icon: BarChart3,
    tools: ["Statistical Analysis", "Correlation", "Hypothesis"],
  },
  {
    step: 5,
    title: "Model Development",
    icon: Brain,
    tools: ["Machine Learning", "Deep Learning", "Model Selection"],
  },
  {
    step: 6,
    title: "Model Evaluation",
    icon: TrendingUp,
    tools: ["Cross-validation", "Metrics", "A/B Testing"],
  },
  {
    step: 7,
    title: "Visualization",
    icon: Monitor,
    tools: ["Power BI", "Tableau", "Plotly", "Dashboards"],
  },
  {
    step: 8,
    title: "Implementation",
    icon: CheckCircle,
    tools: ["MLOps", "Deployment", "Monitoring"],
  },
];

/* ── Main component ── */
export const DataFlowVisualization = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl mb-4 overflow-hidden py-6 sm:py-8 px-2 sm:px-6"
      style={{
        background: "linear-gradient(180deg, rgba(11,15,20,0.6) 0%, rgba(11,15,20,0.9) 100%)",
        border: "1px solid rgba(255,255,255,0.04)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-1">
          <span className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent">
            Data Pipeline Execution Flow
          </span>
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm">
          End-to-end analytical workflow — from problem to production
        </p>
      </div>

      {/* ── Horizontal pipeline ── */}
      <div className="relative overflow-x-auto pb-2 scrollbar-hide">
        <div className="relative flex items-start min-w-[720px] px-2">

          {/* ── Horizontal spine line (behind nodes) ── */}
          <div className="absolute left-0 right-0 top-[19px] h-[2px] z-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-900/30 via-orange-900/25 to-red-900/30" />
            {/* Flowing shimmer */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <motion.div
                className="absolute top-0 h-full w-[15%] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(220,38,38,0.7), rgba(249,115,22,0.7), transparent)",
                  filter: "blur(1px)",
                  boxShadow: "0 0 6px 1px rgba(220,38,38,0.3)",
                }}
                animate={{ left: ["-15%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>

          {/* ── Nodes ── */}
          {workflowSteps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === workflowSteps.length - 1;

            return (
              <div key={step.step} className="relative z-10 flex-1 min-w-0 flex flex-col items-center">
                {/* Node circle */}
                <motion.div
                  className="relative shrink-0 w-[38px] h-[38px] rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #DC2626, #F97316)",
                    boxShadow: "0 0 14px 2px rgba(220,38,38,0.2)",
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Icon size={15} className="text-white" />
                  {/* Step badge */}
                  <span
                    className="absolute -top-1.5 -right-1.5 w-[16px] h-[16px] rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                    style={{ background: "#0B0F14", border: "1.5px solid #DC2626" }}
                  >
                    {step.step}
                  </span>
                </motion.div>

                {/* Connector arrow to next node (on the spine line) */}
                {!isLast && (
                  <div className="absolute top-[16px] left-[calc(50%+19px)] right-0 h-[6px] z-0 flex items-center pointer-events-none">
                    <div
                      className="w-0 h-0 ml-auto mr-0"
                      style={{
                        borderTop: "3px solid transparent",
                        borderBottom: "3px solid transparent",
                        borderLeft: "5px solid rgba(220,38,38,0.3)",
                        position: "absolute",
                        right: "calc(50% - 22px)",
                      }}
                    />
                  </div>
                )}

                {/* Card below node */}
                <motion.div
                  className="group mt-3 w-full px-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                >
                  <div
                    className="relative p-2.5 rounded-lg border transition-all duration-300
                                bg-gray-900/60 backdrop-blur-sm border-gray-700/40
                                hover:border-red-600/30 hover:bg-gray-800/70"
                    style={{ boxShadow: "0 1px 10px rgba(0,0,0,0.2)" }}
                  >
                    {/* Top accent */}
                    <div
                      className="absolute top-0 left-2 right-2 h-[1px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(220,38,38,0.25), rgba(249,115,22,0.25), transparent)",
                      }}
                    />

                    <h4 className="font-semibold text-gray-100 text-[11px] leading-tight text-center mb-1.5">
                      {step.title}
                    </h4>

                    <div className="flex flex-wrap gap-1 justify-center">
                      {step.tools.map((tool, j) => (
                        <span
                          key={j}
                          className="text-[8px] font-medium px-1.5 py-[2px] rounded
                                     text-gray-400 bg-gray-800/80 border border-gray-700/50
                                     group-hover:text-red-300/80 group-hover:border-red-900/30 transition-colors"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle background blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
        <div className="absolute top-1/4 left-1/3 w-40 h-40 rounded-full bg-gradient-to-r from-red-500 to-orange-500 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full bg-gradient-to-r from-orange-500 to-red-500 blur-3xl" />
      </div>
    </motion.div>
  );
};

export default DataFlowVisualization;