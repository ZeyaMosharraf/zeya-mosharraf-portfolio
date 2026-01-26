import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { FaGithub, FaArrowRight, FaEye } from "react-icons/fa";
import { Calendar, Clock, Star } from "lucide-react";
import { Project } from "@/data/projectsData";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [, setLocation] = useLocation();

  const handleViewProject = () => {
    setLocation(`/project/${project.slug}`);
  };

  return (
    <motion.div
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl project-card cursor-pointer transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
      whileHover={{ 
        y: -12, 
        scale: 1.02,
        rotateX: 5,
        rotateY: 2,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={handleViewProject}
      layout
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      {/* Thumbnail/Image Section */}
      {project.thumbhnailUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.thumbhnailUrl}
            alt={project.title + ' preview'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 text-xs font-medium rounded-full bg-white/90 backdrop-blur-sm ${project.tagColor.replace('bg-', 'text-')}`}>
              {project.category}
            </span>
          </div>

          {/* View Project Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3">
              <FaEye className="text-white text-xl" />
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Quick Info */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 mb-2">
            {project.title}
          </h3>
          
          {/* Quick Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>2-3 weeks</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>Advanced</span>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Skills Tags */}
        {project.skills && project.skills.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {project.skills.slice(0, 3).map((skill, idx) => (
                <motion.span
                  key={idx}
                  className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md"
                  whileHover={{ 
                    scale: 1.1, 
                    y: -2,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  {skill}
                </motion.span>
              ))}
              {project.skills.length > 3 && (
                <motion.span 
                  className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  +{project.skills.length - 3} more
                </motion.span>
              )}
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleViewProject();
            }}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-xl font-medium flex items-center justify-center transition-all duration-300"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              initial={{ x: -2 }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaEye className="mr-2" />
            </motion.div>
            View Project
          </motion.button>
          
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white transition-all duration-300"
            aria-label="GitHub repository"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ 
              scale: 1.1,
              rotate: 10,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="text-lg" />
          </motion.a>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5" />
    </motion.div>
  );
};

export default ProjectCard;
