import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { projects } from "@/data/projectsData";

const ProjectStatsChart = () => {
  // Calculate project statistics
  const projectStats = projects.reduce((acc, project) => {
    const category = project.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Convert to chart data
  const chartData = Object.entries(projectStats).map(([category, count]) => ({
    category: category.length > 12 ? category.substring(0, 12) + '...' : category,
    fullCategory: category,
    count,
    percentage: Math.round((count / projects.length) * 100)
  })).sort((a, b) => b.count - a.count);

  // Colors for different categories
  const colors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B',
    '#EF4444', '#06B6D4', '#84CC16', '#F97316'
  ];

  // Pie chart data
  const pieData = chartData.map((item, index) => ({
    ...item,
    color: colors[index % colors.length]
  }));

  // Timeline data (simulated project completion over time)
  const timelineData = [
    { month: 'Jan', projects: 2 },
    { month: 'Feb', projects: 4 },
    { month: 'Mar', projects: 3 },
    { month: 'Apr', projects: 5 },
    { month: 'May', projects: 6 },
    { month: 'Jun', projects: 4 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
      {/* Project Count by Category - Bar Chart */}
      <motion.div 
        className="lg:col-span-2 professional-card p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Projects by Technology
          </span>
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="category" 
                tick={{ fontSize: 12 }}
                className="fill-gray-600 dark:fill-gray-400"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                className="fill-gray-600 dark:fill-gray-400"
              />
              <Bar 
                dataKey="count" 
                fill="url(#gradient1)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Project Distribution - Pie Chart */}
      <motion.div 
        className="professional-card p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Portfolio Distribution
          </span>
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="count"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {pieData.slice(0, 4).map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-600 dark:text-gray-400">{item.fullCategory}</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">{item.count}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Timeline Chart */}
      <motion.div 
        className="lg:col-span-3 professional-card p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-xl font-bold mb-4">
          <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Project Development Timeline
          </span>
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="month" 
                className="fill-gray-600 dark:fill-gray-400"
              />
              <YAxis 
                className="fill-gray-600 dark:fill-gray-400"
              />
              <Line 
                type="monotone" 
                dataKey="projects" 
                stroke="url(#gradient2)"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#8B5CF6' }}
              />
              <defs>
                <linearGradient id="gradient2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectStatsChart;