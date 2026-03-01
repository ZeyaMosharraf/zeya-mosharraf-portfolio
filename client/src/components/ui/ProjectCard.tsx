import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { FaGithub, FaEye } from "react-icons/fa";
import { TrendingUp } from "lucide-react";
import { Project } from "@/data/projectsData";

interface ProjectCardProps {
  project: Project;
}

// Dark-theme category tint map
const getCategoryAccent = (category: string) => {
  switch (category) {
    case "SQL":              return { bg: 'rgba(251,191,36,0.06)', color: '#FBBF24', border: 'rgba(251,191,36,0.12)' };
    case "Python":           return { bg: 'rgba(59,130,246,0.06)', color: '#60A5FA', border: 'rgba(59,130,246,0.12)' };
    case "Machine Learning": return { bg: 'rgba(168,85,247,0.06)', color: '#C084FC', border: 'rgba(168,85,247,0.12)' };
    case "Power BI":         return { bg: 'rgba(234,179,8,0.06)', color: '#FACC15', border: 'rgba(234,179,8,0.12)' };
    case "Excel":            return { bg: 'rgba(34,197,94,0.06)', color: '#4ADE80', border: 'rgba(34,197,94,0.12)' };
    case "Tableau":          return { bg: 'rgba(99,102,241,0.06)', color: '#818CF8', border: 'rgba(99,102,241,0.12)' };
    case "Looker Studio":    return { bg: 'rgba(20,184,166,0.06)', color: '#2DD4BF', border: 'rgba(20,184,166,0.12)' };
    default:                 return { bg: 'rgba(255,255,255,0.04)', color: '#9CA3AF', border: 'rgba(255,255,255,0.08)' };
  }
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [, setLocation] = useLocation();
  const accent = getCategoryAccent(project.category);

  const handleViewProject = () => { setLocation(`/project/${project.slug}`); };

  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden cursor-pointer flex flex-col h-full transition-all duration-300"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      whileTap={{ scale: 0.98 }}
      onClick={handleViewProject}
      layout
    >
      {/* Top glow line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent)' }} />
      {/* Thumbnail */}
      {project.thumbhnailUrl && (
        <div className="relative h-40 overflow-hidden" style={{ background: '#0a0a0a' }}>
          <img
            src={project.thumbhnailUrl}
            alt={project.title + ' preview'}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="rounded-full p-2.5" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <FaEye className="text-white text-sm" />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category badge */}
        <span
          className="self-start px-2 py-0.5 text-[10px] font-semibold rounded uppercase tracking-wide mb-3"
          style={{ background: accent.bg, color: accent.color, border: `1px solid ${accent.border}` }}
        >
          {project.category}
        </span>

        {/* Title */}
        <h3 className="text-[15px] font-bold text-white group-hover:text-red-400 transition-colors duration-200 line-clamp-2 mb-2 leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[12px] text-gray-500 line-clamp-2 leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Impact metric */}
        {project.resultsAndImpact && (
          <div className="flex items-start gap-2 mb-4 p-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <TrendingUp className="w-3 h-3 text-red-400/70 mt-0.5 flex-shrink-0" />
            <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{project.resultsAndImpact}</p>
          </div>
        )}

        {/* Skills */}
        {project.skills && project.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {project.skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="px-2 py-0.5 text-[10px] font-medium text-gray-500 rounded" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                {skill}
              </span>
            ))}
            {project.skills.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] font-medium text-gray-600 rounded" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>+{project.skills.length - 3}</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={(e) => { e.stopPropagation(); handleViewProject(); }}
            className="flex-1 flex items-center justify-center gap-2 h-[34px] rounded-lg text-[12px] font-medium text-white transition-all duration-200"
            style={{ background: '#DC2626' }}
          >
            <FaEye className="text-[10px]" /> View Project
          </button>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[34px] h-[34px] rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
            aria-label="GitHub repository"
            onClick={(e) => e.stopPropagation()}
          >
            <FaGithub className="text-sm" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

