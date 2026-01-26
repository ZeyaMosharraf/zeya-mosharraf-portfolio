import { motion } from "framer-motion";
import { Target, Database, Settings, BarChart3, Brain, TrendingUp, Monitor, CheckCircle, ArrowRight } from "lucide-react";

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

      {/* Desktop: Grid layout */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {workflowSteps.map((step, index) => {
          const IconComponent = step.icon;
          
          return (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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

              {/* Arrow for flow (except last item) */}
              {index < workflowSteps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.5 }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                    <ArrowRight size={12} />
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Flow Connection Line */}
      <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800 opacity-30 -z-10"></div>

      {/* Animated Progress Line */}
      <motion.div
        className="hidden lg:block absolute top-1/2 left-8 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 -z-10"
        initial={{ width: 0 }}
        animate={{ width: "calc(100% - 4rem)" }}
        transition={{ delay: 1, duration: 3, ease: "easeInOut" }}
      />

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-red-500 blur-3xl"></div>
      </div>
    </motion.div>
  );
};

export default DataFlowVisualization;