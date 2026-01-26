import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const HeroDataVisualization = () => {
  // Sample data for the mini charts
  const data1 = [
    { value: 20 }, { value: 45 }, { value: 35 }, { value: 65 }, { value: 55 }, { value: 80 }
  ];
  
  const data2 = [
    { value: 30 }, { value: 25 }, { value: 70 }, { value: 45 }, { value: 85 }, { value: 60 }
  ];

  const data3 = [
    { value: 40 }, { value: 80 }, { value: 35 }, { value: 90 }, { value: 65 }, { value: 75 }
  ];

  const skills = [
    { name: "SQL", level: 95, color: "#3B82F6" },
    { name: "Python", level: 90, color: "#8B5CF6" },
    { name: "Power BI", level: 88, color: "#10B981" },
    { name: "Machine Learning", level: 85, color: "#F59E0B" }
  ];

  return (
    <div className="relative">
      {/* Floating Data Cards */}
      <motion.div
        className="absolute -top-4 -left-8 w-32 h-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-3"
        initial={{ opacity: 0, x: -50, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.5, type: "spring" }}
        whileHover={{ scale: 1.05, y: -5 }}
      >
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Growth Rate</div>
        <div className="text-lg font-bold text-green-600 dark:text-green-400">+285%</div>
        <div className="h-8 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data1}>
              <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        className="absolute -top-12 -right-4 w-36 h-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-3"
        initial={{ opacity: 0, x: 50, y: -20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 2, type: "spring" }}
        whileHover={{ scale: 1.05, y: -5 }}
      >
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Projects Completed</div>
        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">24+</div>
        <div className="h-8 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data2}>
              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 -left-12 w-40 h-28 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-3"
        initial={{ opacity: 0, x: -30, y: 30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 2.5, type: "spring" }}
        whileHover={{ scale: 1.05, y: -5 }}
      >
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Skill Levels</div>
        <div className="space-y-1">
          {skills.slice(0, 2).map((skill, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
              <div className="flex items-center">
                <div className="w-12 h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 3 + index * 0.2, duration: 1 }}
                  />
                </div>
                <span className="ml-1 font-medium" style={{ color: skill.color }}>
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-4 -right-8 w-32 h-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-3"
        initial={{ opacity: 0, x: 40, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 3, type: "spring" }}
        whileHover={{ scale: 1.05, y: -5 }}
      >
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Accuracy</div>
        <div className="text-lg font-bold text-purple-600 dark:text-purple-400">97.8%</div>
        <div className="h-8 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data3}>
              <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Network Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
        <motion.path
          d="M100,50 Q200,30 300,80"
          stroke="url(#heroConnectionGradient)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="3,3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ delay: 3.5, duration: 2 }}
        />
        <motion.path
          d="M50,200 Q150,150 250,180"
          stroke="url(#heroConnectionGradient)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="3,3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ delay: 4, duration: 2 }}
        />
        <defs>
          <linearGradient id="heroConnectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default HeroDataVisualization;