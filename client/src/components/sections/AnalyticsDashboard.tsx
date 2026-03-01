import { motion, useInView } from "framer-motion";
import { Database, BarChart3, Brain, Monitor, Zap, TrendingUp, FolderOpen, Award, Users, Clock, Star } from "lucide-react";
import { projects } from "@/data/projectsData";
import { useRef } from "react";
import { DataFlowVisualization } from "@/components/ui/DataFlowVisualization";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const AnalyticsDashboard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const technologyStats = projects.reduce((acc, project) => {
    acc[project.category] = (acc[project.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const technologyCards = [
    { name: "Power BI", count: technologyStats["Power BI"] || 0, icon: Monitor, description: "Interactive Dashboards" },
    { name: "SQL", count: technologyStats["SQL"] || 0, icon: Database, description: "Database Analysis" },
    { name: "Python", count: technologyStats["Python"] || 0, icon: Brain, description: "Data Processing" },
    { name: "Machine Learning", count: technologyStats["Machine Learning"] || 0, icon: Zap, description: "AI & ML Models" },
    { name: "Excel", count: technologyStats["Excel"] || 0, icon: BarChart3, description: "Advanced Analytics" },
    { name: "Tableau", count: technologyStats["Tableau"] || 0, icon: TrendingUp, description: "Data Visualization" },
  ];

  const metrics = [
    { icon: FolderOpen, value: projects.length.toString(), label: "Projects Completed", trend: "+12%" },
    { icon: Award, value: "15+", label: "Certifications", trend: "+5" },
    { icon: Users, value: "50+", label: "Clients Served", trend: "+23%" },
    { icon: TrendingUp, value: "85%", label: "Accuracy Rate", trend: "+2%" },
    { icon: Clock, value: "2+", label: "Years Experience", trend: "Growing" },
    { icon: Star, value: "4.9", label: "Client Rating", trend: "★★★★★" },
  ];

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden" style={{ background: '#0B0F14' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(220,38,38,0.03) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase mb-5 relative overflow-hidden"
            style={{ background: 'rgba(239,68,68,0.08)', color: 'rgba(239,68,68,0.8)', border: '1px solid rgba(239,68,68,0.12)' }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.1) 50%, transparent 100%)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
            />
            <BarChart3 className="w-3 h-3 relative z-10" />
            <span className="relative z-10">Analytics</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-4">
            Analytics{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)' }}>Dashboard</span>
          </h2>
          <p className="text-[15px] text-gray-500 max-w-xl mx-auto leading-relaxed">
            Data-driven insights into my portfolio performance and technical expertise
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                className="rounded-xl p-5 text-center group transition-all duration-300 relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' }}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.08 + 0.2, duration: 0.6, ease }}
                whileHover={{ y: -4, borderColor: 'rgba(220,38,38,0.2)' }}
              >
                {/* Top glow line on hover */}
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent)' }} />
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-red-400/70 mx-auto mb-3" style={{ background: 'rgba(220,38,38,0.06)' }}>
                  <Icon size={18} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-[11px] text-gray-500 mb-1">{metric.label}</div>
                <div className="text-[10px] font-medium text-red-400/60">{metric.trend}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Technology Cards */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8, ease }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Projects by{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)' }}>Technology</span>
            </h3>
            <p className="text-[14px] text-gray-500 max-w-lg mx-auto">
              Comprehensive expertise across cutting-edge data analysis and visualization technologies
            </p>
          </div>

          {/* Mobile: scroll */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {technologyCards.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex-none w-44 rounded-xl p-5 text-center group transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 + 1, duration: 0.6, ease }}
                    whileHover={{ y: -6, borderColor: 'rgba(220,38,38,0.2)' }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-red-400/70 mx-auto mb-3" style={{ background: 'rgba(220,38,38,0.06)' }}>
                      <Icon size={18} />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{tech.count}</div>
                    <div className="text-[13px] font-semibold text-gray-300 mb-0.5">{tech.name}</div>
                    <div className="text-[11px] text-gray-500">{tech.description}</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-600 mt-2 font-semibold">
                      {tech.count === 1 ? 'Project' : 'Projects'}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {technologyCards.map((tech, index) => {
              const Icon = tech.icon;
              return (
                  <motion.div
                  key={index}
                  className="rounded-xl p-5 text-center group cursor-default transition-all duration-300 relative overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 1, duration: 0.6, ease }}
                  whileHover={{ y: -6, borderColor: 'rgba(220,38,38,0.2)' }}
                >
                  {/* Top glow line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent)' }} />
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-red-400/70 mx-auto mb-3" style={{ background: 'rgba(220,38,38,0.06)' }}>
                    <Icon size={18} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{tech.count}</div>
                  <div className="text-[13px] font-semibold text-gray-300 mb-0.5">{tech.name}</div>
                  <div className="text-[11px] text-gray-500">{tech.description}</div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-600 mt-2 font-semibold">
                    {tech.count === 1 ? 'Project' : 'Projects'}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Data Science Workflow */}
        <DataFlowVisualization />
      </div>
    </section>
  );
};

export default AnalyticsDashboard;