import { motion } from "framer-motion";
import { Target, Database, Settings, BarChart3, Brain, TrendingUp, Monitor, CheckCircle } from "lucide-react";

export const DataFlowVisualization = () => {
  const workflowSteps = [
    {
      step: 1,
      title: "Problem Definition",
      icon: Target,
      description: "Define business objectives and success metrics",
      tools: ["Stakeholder Analysis", "KPI Definition", "Success Criteria"],
      color: "from-red-500 to-pink-500"
    },
    {
      step: 2,
      title: "Data Collection",
      icon: Database,
      description: "Gather and source relevant data",
      tools: ["SQL Queries", "APIs", "Web Scraping", "Surveys"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: 3,
      title: "Data Preparation",
      icon: Settings,
      description: "Clean, transform and prepare data",
      tools: ["Python/Pandas", "Data Cleaning", "Feature Engineering"],
      color: "from-purple-500 to-violet-500"
    },
    {
      step: 4,
      title: "Exploratory Analysis",
      icon: BarChart3,
      description: "Analyze patterns and relationships",
      tools: ["Statistical Analysis", "Correlation", "Hypothesis Testing"],
      color: "from-emerald-500 to-green-500"
    },
    {
      step: 5,
      title: "Model Development",
      icon: Brain,
      description: "Build and train analytical models",
      tools: ["Machine Learning", "Deep Learning", "Model Selection"],
      color: "from-indigo-500 to-blue-500"
    },
    {
      step: 6,
      title: "Model Evaluation",
      icon: TrendingUp,
      description: "Test and validate model performance",
      tools: ["Cross-validation", "Performance Metrics", "A/B Testing"],
      color: "from-orange-500 to-red-500"
    },
    {
      step: 7,
      title: "Visualization & Reporting",
      icon: Monitor,
      description: "Create insights and communicate results",
      tools: ["Power BI", "Tableau", "Python Plotly", "Dashboards"],
      color: "from-teal-500 to-cyan-500"
    },
    {
      step: 8,
      title: "Implementation",
      icon: CheckCircle,
      description: "Deploy solutions and monitor outcomes",
      tools: ["MLOps", "Production Deployment", "Monitoring"],
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <motion.div 
      className="relative professional-card p-8 rounded-2xl mb-16 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Data Science Problem-Solving Workflow
          </span>
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Structured approach from problem to solution
        </p>
      </div>

      {/* Mobile: Horizontal scroll, Desktop: Grid */}
      <div className="md:hidden">
        {/* Mobile horizontal scroll container */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
          {workflowSteps.map((step, index) => {
            const IconComponent = step.icon;
            
            return (
              <motion.div
                key={index}
                className="flex-none w-64 relative group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                {/* Step Card */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 h-full">
                  {/* Step Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center text-white text-sm font-bold">
                      {step.step}
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-md`}>
                      <IconComponent size={20} />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-2">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Tools */}
                  <div className="space-y-1">
                    {step.tools.map((tool, toolIndex) => (
                      <div 
                        key={toolIndex}
                        className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700/50 px-2 py-1 rounded-md inline-block mr-1 mb-1"
                      >
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Desktop: Two-row grid with flowing pipeline lines */}
      <div className="hidden md:block space-y-0">

        {/* ROW 1: Steps 1–4 */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Pipeline track — row 1 */}
          <div className="hidden lg:block absolute top-1/2 left-6 right-6 -translate-y-1/2 -z-10">
            {/* Base track */}
            <div className="w-full h-[3px] rounded-full bg-gradient-to-r from-blue-900/60 via-purple-900/60 to-pink-900/60" />
            {/* Flowing shimmer */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <motion.div
                className="absolute top-0 h-full w-1/3 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.9) 30%, rgba(167,139,250,1) 50%, rgba(236,72,153,0.9) 70%, transparent 100%)",
                  filter: "blur(1px)",
                  boxShadow: "0 0 8px 2px rgba(167,139,250,0.6)",
                }}
                animate={{ left: ["-33%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 0.4 }}
              />
            </div>
            {/* Glow */}
            <div className="absolute inset-0 overflow-hidden rounded-full opacity-40">
              <motion.div
                className="absolute top-0 h-full w-1/4 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.8), transparent)",
                  filter: "blur(4px)",
                }}
                animate={{ left: ["-25%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 0.4 }}
              />
            </div>
          </div>

          {workflowSteps.slice(0, 4).map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center text-white text-sm font-bold">
                      {step.step}
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-md`}>
                      <IconComponent size={20} />
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-2">{step.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 leading-relaxed">{step.description}</p>
                  <div className="space-y-1">
                    {step.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700/50 px-2 py-1 rounded-md inline-block mr-1 mb-1">
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Vertical snake connector: right side, row1 → row2 */}
        <div className="hidden lg:flex justify-end pr-6 relative" style={{ height: "2.5rem" }}>
          <div className="relative w-[3px]">
            {/* Track */}
            <div className="absolute inset-0 bg-gradient-to-b from-pink-900/60 to-indigo-900/60 rounded-full" />
            {/* Flowing shimmer */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <motion.div
                className="absolute w-full rounded-full"
                style={{
                  height: "50%",
                  background: "linear-gradient(180deg, transparent, rgba(236,72,153,0.9), rgba(129,140,248,0.9), transparent)",
                  filter: "blur(1px)",
                  boxShadow: "0 0 6px 2px rgba(167,139,250,0.5)",
                }}
                animate={{ top: ["-50%", "100%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
              />
            </div>
          </div>
        </div>

        {/* ROW 2: Steps 5–8 */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Pipeline track — row 2 */}
          <div className="hidden lg:block absolute top-1/2 left-6 right-6 -translate-y-1/2 -z-10">
            {/* Base track */}
            <div className="w-full h-[3px] rounded-full bg-gradient-to-r from-indigo-900/60 via-teal-900/60 to-green-900/60" />
            {/* Flowing shimmer */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <motion.div
                className="absolute top-0 h-full w-1/3 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(129,140,248,0.9) 30%, rgba(45,212,191,1) 50%, rgba(74,222,128,0.9) 70%, transparent 100%)",
                  filter: "blur(1px)",
                  boxShadow: "0 0 8px 2px rgba(45,212,191,0.6)",
                }}
                animate={{ left: ["-33%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 0.4, delay: 0.6 }}
              />
            </div>
            {/* Glow */}
            <div className="absolute inset-0 overflow-hidden rounded-full opacity-40">
              <motion.div
                className="absolute top-0 h-full w-1/4 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.8), transparent)",
                  filter: "blur(4px)",
                }}
                animate={{ left: ["-25%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 0.4, delay: 0.6 }}
              />
            </div>
          </div>

          {workflowSteps.slice(4, 8).map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index + 4}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 4) * 0.15 }}
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center text-white text-sm font-bold">
                      {step.step}
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-md`}>
                      <IconComponent size={20} />
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-2">{step.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 leading-relaxed">{step.description}</p>
                  <div className="space-y-1">
                    {step.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700/50 px-2 py-1 rounded-md inline-block mr-1 mb-1">
                        {tool}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-red-500 blur-3xl"></div>
      </div>
    </motion.div>
  );
};

export default DataFlowVisualization;