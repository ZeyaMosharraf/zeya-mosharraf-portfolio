import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ArrowLeft, ArrowUpRight, ExternalLink, TrendingUp, Code2, Wrench, CheckCircle2, Circle } from "lucide-react";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";
import { Project } from "@/types/supabase";
import { SEO } from "@/components/SEO";
import { getProjectSchema, getBreadcrumbSchema } from "@/lib/schema";
import { optimizeImage } from "@/lib/utils/cloudinary";

const getCategoryAccent = (category: string) => {
  switch (category) {
    case "SQL":              return { color: "#FBBF24", glow: "rgba(251,191,36,0.12)" };
    case "Python":           return { color: "#60A5FA", glow: "rgba(59,130,246,0.12)"  };
    case "Machine Learning": return { color: "#C084FC", glow: "rgba(168,85,247,0.12)" };
    case "Power BI":         return { color: "#FACC15", glow: "rgba(234,179,8,0.12)"   };
    case "Excel":            return { color: "#4ADE80", glow: "rgba(34,197,94,0.12)"   };
    case "Tableau":          return { color: "#818CF8", glow: "rgba(99,102,241,0.12)"  };
    case "Looker Studio":    return { color: "#2DD4BF", glow: "rgba(20,184,166,0.12)"  };
    default:                 return { color: "#9CA3AF", glow: "rgba(156,163,175,0.08)" };
  }
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

const parseBullets = (text: string): string[] =>
  text
    .split(/\n|•/)
    .map((s) => s.replace(/^\s+|\s+$/g, "").replace(/^\s*•\s*/, ""))
    .filter((s) => s.length > 4);

const ProjectDetails = ({ params }: { params: { slug: string } }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [, setLocation] = useLocation();
  const { slug } = useParams<{ slug: string }>();

  const { data: allProjects, loading } = useSupabaseTable<Project>("projects");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (allProjects && allProjects.length > 0) {
      const found = allProjects.find((p) => p.slug === slug);
      if (found) setProject(found);
    }
  }, [allProjects, slug]);

  if (loading && !project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0d0d0d" }}>
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-2 border-red-600/20 border-t-red-600 animate-spin mb-4" />
          <p className="text-[11px] uppercase tracking-widest text-gray-600">Loading Case Study...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0d0d0d" }}>
        <div className="text-center">
          <p className="text-[13px] text-gray-600 mb-4">Project not found.</p>
          <button
            onClick={() => setLocation("/projects")}
            className="h-9 px-5 rounded-lg text-[12px] font-medium text-white"
            style={{ background: "#DC2626" }}
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const accent = getCategoryAccent(project.category);
  const methodBullets = parseBullets(project.methodology || "");
  const impactBullets = parseBullets(project.results || "");
  const hasEmbed = !!project.embed_url;
  const embedUrl = project.embed_url;
  const embedLabel = project.category === "Power BI" ? "Power BI" : project.category === "Looker Studio" ? "Looker Studio" : "Interactive Report";

  // Dynamic Alt Text for SEO
  const descriptiveAlt = `Analytics dashboard for ${project.title} showing ${project.category} implementation by Zeya Mosharraf`;

  return (
    <>
      <SEO
        title={`${project.title} | ${project.category} Case Study`}
        description={project.description.slice(0, 160)}
        keywords={`${project.title}, ${project.category}, ${project.tools?.join(", ")}, Analytics Engineering`}
        image={project.thumbnail_url}
        schemaData={[
          getProjectSchema(project),
          getBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Projects", item: "/projects" },
            { name: project.title, item: `/project/${project.slug}` }
          ])
        ]}
      />

      <div className="min-h-screen" style={{ background: "#0d0d0d" }}>

        {/* ── CINEMATIC HERO ── */}
        <div className="relative overflow-hidden" style={{ minHeight: "clamp(380px, 52vh, 520px)" }}>

          {/* Background image with cinematic treatment */}
          {project.thumbnail_url && (
            <div className="absolute inset-0">
              <img
                src={optimizeImage(project.thumbnail_url, 1200)}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
                style={{ opacity: 0.12, filter: "saturate(0.4) blur(2px)", transform: "scale(1.06)" }}
              />
            </div>
          )}

          {/* Atmospheric depth layers */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0d0d0d 0%, rgba(13,13,13,0.6) 40%, rgba(13,13,13,0.92) 80%, #0d0d0d 100%)" }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 80%, ${accent.glow} 0%, transparent 65%)` }} />

          {/* Grid texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
              backgroundSize: "52px 52px",
            }}
          />

          {/* Top scan line */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(220,38,38,0.4) 40%, rgba(249,115,22,0.35) 60%, transparent)" }} />

          {/* Content */}
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

            {/* Back nav */}
            <motion.button
              onClick={() => setLocation("/projects")}
              className="mb-10 flex items-center gap-2 text-[12px] font-medium transition-colors duration-200"
              style={{ color: "#4B5563" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#9CA3AF"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#4B5563"; }}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ArrowLeft style={{ width: "13px", height: "13px" }} />
              All Projects
            </motion.button>

            {/* Category dot label */}
            <motion.div className="flex items-center gap-2 mb-5" {...fadeUp(0.05)}>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: accent.color, boxShadow: `0 0 8px ${accent.color}` }}
              />
              <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: accent.color }}>
                {project.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-[1.1] tracking-tight mb-5 max-w-3xl"
              style={{ letterSpacing: "-0.02em" }}
              {...fadeUp(0.1)}
            >
              {project.title}
            </motion.h1>

            {/* Lead paragraph */}
            <motion.p
              className="text-[14px] leading-relaxed max-w-2xl mb-9"
              style={{ color: "#6B7280" }}
              {...fadeUp(0.18)}
            >
              {project.description.split(".")[0]}.
            </motion.p>

            {/* CTA row */}
            <motion.div className="flex flex-wrap items-center gap-3" {...fadeUp(0.25)}>
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 h-9 px-4 rounded-lg text-[12px] font-medium text-white transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                >
                  <FaGithub className="text-xs" />
                  Source code
                  <ArrowUpRight style={{ width: "11px", height: "11px", opacity: 0.5 }} />
                </a>
              )}
              {hasEmbed && (
                <a
                  href={embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 h-9 px-4 rounded-lg text-[12px] font-medium text-white transition-all duration-200 hover:brightness-110"
                  style={{ background: "#DC2626" }}
                >
                  <ExternalLink style={{ width: "11px", height: "11px" }} />
                  Live {embedLabel}
                </a>
              )}
            </motion.div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

          {/* ── DASHBOARD EMBED — centerpiece ── */}
          {hasEmbed && (
            <motion.div className="mb-16" {...fadeUp(0.1)}>
              {/* Section label */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#374151" }}>
                  Interactive {embedLabel}
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
              </div>

              {/* Cinematic frame */}
              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  background: "#080808",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.02), 0 32px 64px rgba(0,0,0,0.6)",
                }}
              >
                {/* Title bar chrome */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5"
                  style={{ background: "#111", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28CA40" }} />
                  </div>
                  <span className="text-[10px] ml-2" style={{ color: "#374151", fontFamily: "'JetBrains Mono', monospace" }}>
                    {project.title} — Live Preview
                  </span>
                </div>
                <div className="aspect-video w-full">
                  <iframe
                    title={`${embedLabel} Report — ${project.title}`}
                    width="100%"
                    height="100%"
                    className="w-full h-full border-0"
                    src={embedUrl}
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; unload"
                    sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Static image for non-embed projects */}
          {project.thumbnail_url && !hasEmbed && (
            <motion.div className="mb-16" {...fadeUp(0.1)}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#374151" }}>
                  Dashboard Preview
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
              </div>
              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  background: "#080808",
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.02), 0 32px 64px rgba(0,0,0,0.6)",
                }}
              >
                <div
                  className="flex items-center gap-2 px-4 py-2.5"
                  style={{ background: "#111", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28CA40" }} />
                  </div>
                </div>
                <img
                  src={optimizeImage(project.thumbnail_url, 1200)}
                  alt={descriptiveAlt}
                  className="w-full"
                  style={{ opacity: 0.9 }}
                />
              </div>
            </motion.div>
          )}

          {/* ── TWO-COLUMN: Main + Sidebar ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* LEFT — narrative content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Overview */}
              <motion.div {...fadeUp(0.15)}>
                <SectionLabel icon={<Circle style={{ width: "10px", height: "10px" }} />} label="Overview" />
                <p className="text-[14px] leading-[1.85]" style={{ color: "#6B7280" }}>
                  {project.description}
                </p>
              </motion.div>

              {/* Methodology */}
              {methodBullets.length > 0 && (
                <motion.div {...fadeUp(0.2)}>
                  <SectionLabel icon={<Code2 style={{ width: "10px", height: "10px" }} />} label="Methodology" />
                  <ul className="space-y-3">
                    {methodBullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-[6px] w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: accent.color, opacity: 0.6 }}
                        />
                        <span className="text-[13px] leading-relaxed" style={{ color: "#6B7280" }}>
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Results & Impact */}
              {impactBullets.length > 0 && (
                <motion.div {...fadeUp(0.25)}>
                  <SectionLabel icon={<TrendingUp style={{ width: "10px", height: "10px" }} />} label="Results & Impact" accent />
                  <ul className="space-y-3">
                    {impactBullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 px-4 py-3 rounded-lg"
                        style={{
                          background: i === 0 ? "rgba(220,38,38,0.04)" : "transparent",
                          border: i === 0 ? "1px solid rgba(220,38,38,0.08)" : "none",
                        }}
                      >
                        <CheckCircle2
                          className="flex-shrink-0 mt-0.5"
                          style={{ width: "13px", height: "13px", color: i === 0 ? "#DC2626" : "rgba(220,38,38,0.4)", opacity: 0.7 }}
                        />
                        <span
                          className="text-[13px] leading-relaxed"
                          style={{ color: i === 0 ? "#9CA3AF" : "#6B7280" }}
                        >
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* RIGHT — sidebar */}
            <div className="space-y-6">

              {/* Skills/Tools */}
              {project.tools && project.tools.length > 0 && (
                <motion.div {...fadeUp(0.2)}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#374151" }}>
                    Skills Applied
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          color: "#6B7280",
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Divider */}
              <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />

              {/* Tools */}
              {project.tools && project.tools.length > 0 && (
                <motion.div {...fadeUp(0.25)}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#374151" }}>
                    <Wrench style={{ width: "10px", height: "10px", display: "inline", marginRight: "6px" }} />
                    Tools Used
                  </p>
                  <div className="space-y-1.5">
                    {project.tools.map((tool, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: accent.color, opacity: 0.5 }}
                        />
                        <span className="text-[12px]" style={{ color: "#6B7280" }}>
                          {tool}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Divider */}
              <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />

              {/* Links */}
              <motion.div className="space-y-2" {...fadeUp(0.3)}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#374151" }}>
                  Project Links
                </p>
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-[12px] font-medium transition-all duration-200 group"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#6B7280" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.color = "#9CA3AF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      e.currentTarget.style.color = "#6B7280";
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <FaGithub className="text-sm opacity-50" />
                      View source code
                    </span>
                    <ArrowUpRight style={{ width: "11px", height: "11px", opacity: 0.3 }} />
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ── Section label helper ──────────────────────────────────────────────────────
const SectionLabel = ({
  icon,
  label,
  accent = false,
}: {
  icon?: React.ReactNode;
  label: string;
  accent?: boolean;
}) => (
  <div className="flex items-center gap-3 mb-5">
    {icon && (
      <span style={{ color: accent ? "#DC2626" : "#374151" }}>
        {icon}
      </span>
    )}
    <span
      className="text-[10px] font-semibold uppercase tracking-widest"
      style={{ color: accent ? "rgba(220,38,38,0.7)" : "#374151" }}
    >
      {label}
    </span>
    <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
  </div>
);

export default ProjectDetails;