import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { FaGithub, FaArrowRight, FaEye } from "react-icons/fa";
import { TrendingUp } from "lucide-react";
import { Project } from "@/data/projectsData";

interface ProjectCardProps {
  project: Project;
}

// Category-specific tech accent colors
const getCategoryAccent = (category: string) => {
  switch (category) {
    case "SQL":            return { badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",   bar: "from-amber-400 to-orange-500" };
    case "Python":         return { badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",       bar: "from-blue-400 to-cyan-500" };
    case "Machine Learning": return { badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400", bar: "from-purple-400 to-violet-600" };
    case "Power BI":       return { badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400", bar: "from-yellow-400 to-orange-400" };
    case "Excel":          return { badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",   bar: "from-green-400 to-emerald-600" };
    case "Tableau":        return { badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400", bar: "from-indigo-400 to-blue-600" };
    case "Looker Studio":  return { badge: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",     bar: "from-teal-400 to-cyan-600" };
    default:               return { badge: "bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300",       bar: "from-gray-400 to-gray-600" };
  }
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [, setLocation] = useLocation();
  const accent = getCategoryAccent(project.category);

  const handleViewProject = () => {
    setLocation(`/project/${project.slug}`);
  };

  return (
    <motion.div
      className="group relative bg-white dark:bg-gray-800/90 rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition-all duration-400 border border-gray-200/80 dark:border-gray-700/60 flex flex-col h-full"
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={handleViewProject}
      layout
    >
      {/* Category color bar at top */}
      <div className={`h-1 w-full bg-gradient-to-r ${accent.bar}`} />

      {/* Thumbnail */}
      {project.thumbhnailUrl && (
        <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-900">
          <img
            src={project.thumbhnailUrl}
            alt={project.title + ' preview'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3">
              <FaEye className="text-white text-xl" />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category badge */}
        <span className={`self-start px-2.5 py-1 text-xs font-semibold rounded-md mb-3 ${accent.badge}`}>
          {project.category}
        </span>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 mb-2 leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Impact metric */}
        {project.resultsAndImpact && (
          <div className="flex items-start gap-2 mb-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700/50">
            <TrendingUp className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
              {project.resultsAndImpact}
            </p>
          </div>
        )}

        {/* Skills */}
        {project.skills && project.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700/70 text-gray-600 dark:text-gray-300 rounded-md"
              >
                {skill}
              </span>
            ))}
            {project.skills.length > 3 && (
              <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700/70 text-gray-500 dark:text-gray-400 rounded-md">
                +{project.skills.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto">
          <motion.button
            onClick={(e) => { e.stopPropagation(); handleViewProject(); }}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaEye className="text-xs" /> View Project
          </motion.button>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-300"
            aria-label="GitHub repository"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="text-sm" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

