import { useLocation } from "wouter";
import { FaGithub } from "react-icons/fa";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Project } from "@/types/supabase";

interface ProjectCardProps {
  project: Project;
}

const getCategoryAccent = (category: string) => {
  switch (category) {
    case "SQL":              return { color: "#FBBF24", dot: "rgba(251,191,36,0.7)" };
    case "Python":           return { color: "#60A5FA", dot: "rgba(59,130,246,0.7)"  };
    case "Machine Learning": return { color: "#C084FC", dot: "rgba(168,85,247,0.7)" };
    case "Power BI":         return { color: "#FACC15", dot: "rgba(234,179,8,0.7)"   };
    case "Excel":            return { color: "#4ADE80", dot: "rgba(34,197,94,0.7)"   };
    case "Tableau":          return { color: "#818CF8", dot: "rgba(99,102,241,0.7)"  };
    case "Looker Studio":    return { color: "#2DD4BF", dot: "rgba(20,184,166,0.7)"  };
    default:                 return { color: "#9CA3AF", dot: "rgba(156,163,175,0.5)" };
  }
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [, setLocation] = useLocation();
  const accent = getCategoryAccent(project.category);

  const handleView = () => setLocation(`/project/${project.slug}`);

  return (
    <div
      className="group relative flex flex-col overflow-hidden cursor-pointer rounded-xl transition-all duration-500"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
      }}
      onClick={handleView}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.10)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(220,38,38,0.08)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)";
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.4)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* ── Thumbnail ── */}
      {project.thumbnail_url && (
        <div className="relative overflow-hidden" style={{ height: "168px", background: "#080808" }}>
          <img
            src={project.thumbnail_url}
            alt={(project.title || "Project") + " preview"}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            style={{ opacity: 0.65, filter: "saturate(0.8) brightness(0.9)" }}
          />
          {/* Cinematic layered overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 40%, rgba(10,10,10,0.85) 100%)",
            }}
          />
          {/* Subtle color tint from category */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${accent.dot}08 0%, transparent 70%)` }}
          />
          {/* Category dot — top left, minimal */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: accent.dot, boxShadow: `0 0 6px ${accent.dot}` }}
            />
            <span
              className="text-[9px] font-semibold uppercase tracking-widest"
              style={{ color: accent.color, textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
            >
              {project.category}
            </span>
          </div>
          {/* GitHub icon — top right, ghost on hover */}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              onClick={(e) => e.stopPropagation()}
              className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white"
              style={{
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <FaGithub className="text-xs" />
            </a>
          )}
        </div>
      )}

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">

        {/* Title */}
        <h3
          className="text-[14px] font-semibold leading-snug line-clamp-2 transition-colors duration-200"
          style={{ color: "#E5E7EB", letterSpacing: "-0.01em" }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#fff"; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "#E5E7EB"; }}
        >
          {project.title}
        </h3>

        {/* Description — 2 lines max, muted */}
        <p className="text-[12px] leading-relaxed line-clamp-2 flex-1" style={{ color: "#6B7280" }}>
          {project.description}
        </p>

        {/* Impact — the most valuable line */}
        {project.results && (
          <div
            className="flex items-start gap-2 px-3 py-2 rounded-lg"
            style={{ background: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.08)" }}
          >
            <TrendingUp
              className="flex-shrink-0 mt-0.5"
              style={{ width: "11px", height: "11px", color: "rgba(220,38,38,0.55)" }}
            />
            <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: "#6B7280" }}>
              {project.results}
            </p>
          </div>
        )}

        {/* Skills/Tools — minimal, 3 max, no borders */}
        {project.tools && project.tools.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tools.slice(0, 3).map((tool, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium"
                style={{ color: "#4B5563" }}
              >
                {tool}{idx < Math.min(project.tools.length, 3) - 1 && <span className="ml-1.5 opacity-40">·</span>}
              </span>
            ))}
            {project.tools.length > 3 && (
              <span className="text-[10px]" style={{ color: "#374151" }}>
                +{project.tools.length - 3}
              </span>
            )}
          </div>
        )}

        {/* CTA — ghost link, not a big red button */}
        <div
          className="flex items-center justify-between pt-2 mt-auto"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); handleView(); }}
            className="group/cta flex items-center gap-1.5 text-[12px] font-medium transition-all duration-200"
            style={{ color: "#6B7280" }}
            onMouseEnter={(e) => { (e.currentTarget).style.color = "#DC2626"; }}
            onMouseLeave={(e) => { (e.currentTarget).style.color = "#6B7280"; }}
          >
            View case study
            <ArrowUpRight
              className="transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              style={{ width: "12px", height: "12px" }}
            />
          </button>

          {/* Year or a subtle indicator */}
          <span className="text-[10px]" style={{ color: "#374151" }}>
            {project.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
