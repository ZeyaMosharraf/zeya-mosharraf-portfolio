import { motion } from "framer-motion";
import { FolderOpen, Award, Users, TrendingUp, Clock, Star } from "lucide-react";
import { projects } from "@/data/projectsData";

const MetricsCards = () => {
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        return (
          <motion.div
            key={index}
            className="professional-card p-6 rounded-2xl text-center group hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center text-white mx-auto mb-3 group-hover:scale-110 transition-transform`}>
              <IconComponent size={20} />
            </div>
            
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {metric.value}
            </div>
            
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
  );
};

export default MetricsCards;