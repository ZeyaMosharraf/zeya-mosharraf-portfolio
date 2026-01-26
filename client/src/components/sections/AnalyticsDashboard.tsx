import { motion, useInView } from "framer-motion";

import { Database, BarChart3, Brain, Monitor, Zap, TrendingUp, FolderOpen, Award, Users, Clock, Star } from "lucide-react";
import { projects } from "@/data/projectsData";
import { useRef } from "react";
import { DataFlowVisualization } from "@/components/ui/DataFlowVisualization";

const AnalyticsDashboard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Calculate technology-based project counts
  const technologyStats = projects.reduce((acc, project) => {
    const category = project.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Technology cards data
  const technologyCards = [
    {
      name: "Power BI",
      count: technologyStats["Power BI"] || 0,
      icon: Monitor,
      color: "from-yellow-500 to-orange-500",
      description: "Interactive Dashboards"
    },
    {
      name: "SQL",
      count: technologyStats["SQL"] || 0,
      icon: Database,
      color: "from-blue-500 to-cyan-500",
      description: "Database Analysis"
    },
    {
      name: "Python",
      count: technologyStats["Python"] || 0,
      icon: Brain,
      color: "from-green-500 to-emerald-500",
      description: "Data Processing"
    },
    {
      name: "Machine Learning",
      count: technologyStats["Machine Learning"] || 0,
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      description: "AI & ML Models"
    },
    {
      name: "Excel",
      count: technologyStats["Excel"] || 0,
      icon: BarChart3,
      color: "from-indigo-500 to-purple-500",
      description: "Advanced Analytics"
    },
    {
      name: "Tableau",
      count: technologyStats["Tableau"] || 0,
      icon: TrendingUp,
      color: "from-pink-500 to-red-500",
      description: "Data Visualization"
    }
  ];





  // Metrics data
  const metrics = [
    {
      icon: FolderOpen,
      value: projects.length.toString(),
      label: "Projects Completed",
      color: "from-blue-500 to-cyan-500",
      trend: "+12%"
    },
    {
      icon: Award,
      value: "15+",
      label: "Certifications",
      color: "from-purple-500 to-pink-500",
      trend: "+5"
    },
    {
      icon: Users,
      value: "50+",
      label: "Clients Served",
      color: "from-green-500 to-emerald-500",
      trend: "+23%"
    },
    {
      icon: TrendingUp,
      value: "85%",
      label: "Accuracy Rate",
      color: "from-orange-500 to-red-500",
      trend: "+2%"
    },
    {
      icon: Clock,
      value: "2+",
      label: "Years Experience",
      color: "from-indigo-500 to-purple-500",
      trend: "Growing"
    },
    {
      icon: Star,
      value: "4.9",
      label: "Client Rating",
      color: "from-yellow-500 to-orange-500",
      trend: "★★★★★"
    }
  ];



  return (
    <section 
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Data-driven insights into my portfolio performance and technical expertise
          </p>
        </motion.div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={index}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-6 rounded-3xl text-center group hover:scale-105 transition-all duration-500 border border-gray-200/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                transition={{ 
                  delay: index * 0.1 + 0.3,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${metric.color} flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}
                  whileHover={{ 
                    scale: 1.15,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                  animate={{
                    boxShadow: [
                      "0 4px 20px rgba(0,0,0,0.1)",
                      "0 8px 30px rgba(0,0,0,0.15)",
                      "0 4px 20px rgba(0,0,0,0.1)"
                    ]
                  }}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <IconComponent size={24} />
                </motion.div>
                
                <motion.div 
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ 
                    delay: index * 0.1 + 0.8,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {metric.value}
                </motion.div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {metric.label}
                </div>
                
                <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                  {metric.trend}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technology-Based Project Counter */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-12">

            <motion.h3 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Projects by Technology
              </span>
            </motion.h3>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              Comprehensive expertise across cutting-edge data analysis and visualization technologies
            </motion.p>
          </div>

          {/* Mobile: Horizontal scroll, Desktop: Grid */}
          <div className="md:hidden">
            {/* Mobile horizontal scroll container */}
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
              {technologyCards.map((tech, index) => {
                const IconComponent = tech.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex-none w-48 relative group cursor-pointer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ 
                      delay: index * 0.15 + 1.4,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 80
                    }}
                    whileHover={{ 
                      y: -15,
                      scale: 1.05,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    {/* Glowing Background Effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${tech.color} rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-lg`}></div>
                    
                    {/* Main Card */}
                    <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-2xl rounded-2xl p-6 text-center border border-gray-200/50 dark:border-gray-700/50 shadow-2xl group-hover:shadow-3xl transition-all duration-500 h-full">
                      
                      {/* Animated Icon Container */}
                      <motion.div 
                        className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-white mx-auto mb-4 shadow-xl`}
                        whileHover={{ 
                          scale: 1.2,
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.4 }
                        }}
                        animate={{
                          boxShadow: [
                            "0 8px 32px rgba(0,0,0,0.1)",
                            "0 12px 48px rgba(0,0,0,0.2)",
                            "0 8px 32px rgba(0,0,0,0.1)"
                          ]
                        }}
                        transition={{
                          boxShadow: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm"></div>
                        <IconComponent size={20} className="relative z-10" />
                      </motion.div>

                      {/* Count Display */}
                      <motion.div 
                        className="mb-3"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                        transition={{ delay: index * 0.15 + 1.8, duration: 0.6, type: "spring" }}
                      >
                        <div className={`text-3xl font-black bg-gradient-to-br ${tech.color} bg-clip-text text-transparent mb-1`}>
                          {tech.count}
                        </div>
                        <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                          {tech.name}
                        </div>
                      </motion.div>

                      {/* Description */}
                      <motion.div 
                        className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: index * 0.15 + 2.0, duration: 0.6 }}
                      >
                        {tech.description}
                      </motion.div>

                      {/* Project Label */}
                      <motion.div 
                        className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 mt-3 font-semibold"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: index * 0.15 + 2.2, duration: 0.6 }}
                      >
                        {tech.count === 1 ? 'Project' : 'Projects'}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
            {technologyCards.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <motion.div
                  key={index}
                  className="relative group cursor-pointer"
                  initial={{ opacity: 0, y: 40, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.8 }}
                  transition={{ 
                    delay: index * 0.15 + 1.4,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 80
                  }}
                  whileHover={{ 
                    y: -15,
                    scale: 1.05,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  {/* Glowing Background Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${tech.color} rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-lg`}></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-2xl rounded-2xl p-6 text-center border border-gray-200/50 dark:border-gray-700/50 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                    
                    {/* Animated Icon Container */}
                    <motion.div 
                      className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-white mx-auto mb-4 shadow-xl`}
                      whileHover={{ 
                        scale: 1.2,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.4 }
                      }}
                      animate={{
                        boxShadow: [
                          "0 8px 32px rgba(0,0,0,0.1)",
                          "0 12px 48px rgba(0,0,0,0.2)",
                          "0 8px 32px rgba(0,0,0,0.1)"
                        ]
                      }}
                      transition={{
                        boxShadow: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      {/* Icon Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} rounded-2xl opacity-50 blur-md`}></div>
                      <IconComponent size={16} className="relative z-10" />
                    </motion.div>
                    
                    {/* Project Count with Counter Animation */}
                    <motion.div 
                      className="text-4xl font-black mb-2"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                      transition={{ 
                        delay: index * 0.15 + 1.8,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }}
                    >
                      <span className={`bg-gradient-to-br ${tech.color} bg-clip-text text-transparent`}>
                        {tech.count}
                      </span>
                    </motion.div>
                    
                    {/* Technology Name */}
                    <motion.div 
                      className="text-lg font-bold text-gray-900 dark:text-white mb-2"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: index * 0.15 + 2.0, duration: 0.6 }}
                    >
                      {tech.name}
                    </motion.div>
                    
                    {/* Description */}
                    <motion.div 
                      className="text-sm text-gray-600 dark:text-gray-400 font-medium"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: index * 0.15 + 2.1, duration: 0.6 }}
                    >
                      {tech.description}
                    </motion.div>

                    {/* Project Label */}
                    <motion.div 
                      className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500 mt-3 font-semibold"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: index * 0.15 + 2.2, duration: 0.6 }}
                    >
                      {tech.count === 1 ? 'Project' : 'Projects'}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Data Science Workflow Visualization */}
        <DataFlowVisualization />





      </div>
    </section>
  );
};

export default AnalyticsDashboard;