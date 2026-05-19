import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { ArrowLeft, ArrowUpRight, ExternalLink, TrendingUp, Code2, Wrench, CheckCircle2 } from "lucide-react";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";
import { Project } from "@/types/supabase";
import { SEO } from "@/components/SEO";
import { getProjectSchema, getBreadcrumbSchema } from "@/lib/schema";
import { optimizeImage } from "@/lib/utils/cloudinary";
import { DashboardEmbed } from "@/components/ui/DashboardEmbed";
import { getCategoryAccent } from "@/lib/utils/categoryAccent";
import { fadeUp } from "@/lib/animations";
import { parseBullets } from "@/lib/utils/highlightText";
import { PageLoading, PageNotFound } from "@/components/ui/PageStates";

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

  if (loading && !project) return <PageLoading label="Loading Project..." />;
  if (!project) return <PageNotFound label="Project not found." backLabel="Back to Projects" onBack={() => setLocation("/projects")} />;

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

              {/* Cinematic frame via DashboardEmbed */}
              <DashboardEmbed
                url={embedUrl || ""}
                title={project.title}
                isPowerBI={project.category === "Power BI"}
              />
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
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">

            {/* LEFT — narrative content */}
            <div className="space-y-16">

              {/* Overview */}
              <motion.div {...fadeUp(0.15)}>
                <h2 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: accent.color, boxShadow: `0 0 10px ${accent.color}` }} />
                  Project Overview
                </h2>
                <p className="text-[15px] leading-[1.8] text-gray-400 font-medium">
                  {project.description}
                </p>
              </motion.div>

              {/* Methodology */}
              {methodBullets.length > 0 && (
                <motion.div {...fadeUp(0.2)}>
                  <h2 className="text-2xl font-bold text-white mb-8 tracking-tight flex items-center gap-3">
                    <Code2 className="w-5 h-5" style={{ color: accent.color }} />
                    Technical Methodology
                  </h2>
                  <div className="space-y-4">
                    {methodBullets.map((bullet, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-5 rounded-xl border relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01]"
                        style={{ background: accent.glow, borderColor: `${accent.color}40` }}
                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 8px 32px ${accent.color}22`; }}
                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 blur-[50px] opacity-10 pointer-events-none" style={{ background: accent.color }} />
                        <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center z-10" style={{ borderColor: accent.color }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent.color }} />
                        </div>
                        <p className="text-[14px] leading-[1.7] text-gray-200 font-medium relative z-10">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Results & Impact */}
              {impactBullets.length > 0 && (
                <motion.div {...fadeUp(0.25)}>
                  <h2 className="text-2xl font-bold text-white mb-8 tracking-tight flex items-center gap-3">
                    <TrendingUp className="w-5 h-5" style={{ color: accent.color }} />
                    Business Impact & Results
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {impactBullets.map((bullet, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-5 rounded-xl border relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01]"
                        style={{ background: accent.glow, borderColor: `${accent.color}40` }}
                        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 8px 32px ${accent.color}22`; }}
                        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 blur-[50px] opacity-10 pointer-events-none" style={{ background: accent.color }} />
                        <CheckCircle2
                          className="flex-shrink-0 mt-0.5 relative z-10"
                          style={{ width: "18px", height: "18px", color: accent.color }}
                        />
                        <span className="text-[14px] leading-[1.7] font-medium relative z-10 text-gray-200">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

          {/* RIGHT — sidebar */}
          <div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-8 sticky top-24">

              {/* Skills Applied */}
              {project.tools && project.tools.length > 0 && (
                <motion.div {...fadeUp(0.2)}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: "#4B5563" }}>
                    Skills Applied
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-3 py-1.5 rounded-lg"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          color: "#9CA3AF",
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />

              {/* Tools Used */}
              {project.tools && project.tools.length > 0 && (
                <motion.div {...fadeUp(0.25)}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: "#4B5563" }}>
                    <Wrench className="w-3 h-3" />
                    Tools Used
                  </p>
                  <div className="space-y-3">
                    {project.tools.map((tool, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: accent.color, opacity: 0.8, boxShadow: `0 0 6px ${accent.color}` }}
                        />
                        <span className="text-[13px] font-medium" style={{ color: "#D1D5DB" }}>
                          {tool}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />

              {/* Links */}
              <motion.div className="space-y-2" {...fadeUp(0.3)}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: "#4B5563" }}>
                  Project Links
                </p>
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-[12px] font-bold uppercase tracking-wider transition-all duration-300 group"
                    style={{ background: accent.glow, border: "1px solid rgba(255,255,255,0.05)", color: "#fff" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `color-mix(in srgb, ${accent.color} 20%, transparent)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = accent.glow;
                    }}
                  >
                    <span className="flex items-center gap-3">
                      <FaGithub className="text-base" />
                      Source code
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div >
    </>
  );
};

export default ProjectDetails;