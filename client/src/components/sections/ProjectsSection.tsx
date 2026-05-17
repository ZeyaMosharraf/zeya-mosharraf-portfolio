import React, { useState, useEffect, useRef, useMemo } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ui/common";
import SectionHeader from "@/components/ui/SectionHeader";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";
import { Project } from "@/types/supabase";
import { FaGithub, FaFilter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { 
  FolderGit2, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Terminal, 
  Cpu, 
  TrendingUp, 
  ArrowUpRight 
} from "lucide-react";
import { ease } from "@/lib/animations";
import { 
  getProjectCategories, 
  selectFeaturedProjects, 
  filterProjectsByCategory, 
  ProjectCategory 
} from "@/lib/dataTransforms";
import { optimizeImage } from "@/lib/utils/cloudinary";
import { CATEGORY_CONFIGS } from "@/lib/constants";

interface ProjectsSectionProps {
  showFeaturedOnly?: boolean;
}

// ── Cinematic Featured Project Card (100% Architecture-First) ──
const FeaturedProjectCard = ({ project }: { project: Project }) => {
  const [, setLocation] = useLocation();
  const handleView = () => setLocation(`/project/${project.slug}`);

  // Dynamic tags to communicate operational and system architecture depth
  const getSubBadge = (category: string) => {
    return CATEGORY_CONFIGS[category]?.subBadge || "ENGINEERING SOLUTION";
  };

  return (
    <div
      onClick={handleView}
      className="group relative flex flex-col w-[320px] sm:w-[350px] md:w-[380px] xl:w-[400px] h-[510px] rounded-xl overflow-hidden cursor-pointer border border-white/5 bg-[#0f0f0f]/90 transition-all duration-500 hover:border-red-500/25"
      style={{
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 10px 40px rgba(239, 68, 68, 0.04)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.4)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Cinematic Blueprint / Architecture Thumbnail Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070707] border-b border-white/5">
        
        {/* Technical Blueprint Mesh Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-10" />
        
        {/* Abstract Tech Overlay Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/5 rounded-full blur-[80px] group-hover:bg-red-500/10 transition-colors duration-500 pointer-events-none z-10" />

        {project.thumbnail_url ? (
          <img
            src={optimizeImage(project.thumbnail_url, 800)}
            alt={`System architecture visual: ${project.title}`}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#0d0d0d] text-gray-700">
            <Cpu className="w-8 h-8 animate-pulse text-red-500/20" />
          </div>
        )}

        {/* Tech tags and Telemetry Indicators */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f0f0f] to-transparent h-16 pointer-events-none z-10" />
        
        <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span className="px-2.5 py-0.5 rounded text-[9px] font-mono tracking-wider bg-red-500/10 border border-red-500/20 text-red-400 uppercase">
            {getSubBadge(project.category)}
          </span>
        </div>

        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 bg-black/60 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 text-gray-400 hover:text-white"
          >
            <FaGithub className="text-sm" />
          </a>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-5 justify-between bg-gradient-to-b from-transparent to-black/20">
        
        <div className="space-y-3">
          {/* Project Title */}
          <h3 className="text-sm sm:text-base font-bold leading-snug text-white group-hover:text-red-400 transition-colors duration-300 line-clamp-1">
            {project.title}
          </h3>

          {/* Muted 2-line Description */}
          <p className="text-[12px] text-gray-400 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Operational Impact Highlight */}
          {project.results && (
            <div className="flex items-start gap-2 px-2.5 py-2 rounded-lg bg-[#dc2626]/[0.015] border border-red-500/5 group-hover:border-red-500/10 transition-colors duration-500">
              <TrendingUp className="w-3 h-3 mt-0.5 text-red-500/60 flex-shrink-0" />
              <p className="text-[10.5px] leading-relaxed text-gray-400 line-clamp-2">
                <span className="font-semibold text-gray-300">Telemetry:</span> {project.results}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3.5 pt-4 mt-auto">
          {/* Compact Tech Stack Pills (Terminal Style) */}
          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <Terminal className="w-3 h-3 text-gray-600 flex-shrink-0" />
              {project.tools.slice(0, 3).map((tool, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[9px] text-gray-500"
                >
                  {tool}{idx < Math.min(project.tools.length, 3) - 1 && <span className="mx-1 text-gray-700">|</span>}
                </span>
              ))}
              {project.tools.length > 3 && (
                <span className="font-mono text-[8.5px] text-gray-600 px-1 border border-white/5 rounded">
                  +{project.tools.length - 3}
                </span>
              )}
            </div>
          )}

          {/* CTA Row */}
          <div className="flex items-center justify-between pt-2.5 border-t border-white/5">
            <button
              onClick={(e) => { e.stopPropagation(); handleView(); }}
              className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 group-hover:text-red-400 transition-colors duration-300"
            >
              View Architecture & Case Study
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
            <span className="text-[9px] font-mono text-gray-600 tracking-wider uppercase">
              {project.category}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

const ProjectsSection = ({ showFeaturedOnly = false }: ProjectsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [, setLocation] = useLocation();

  const orderBy = useMemo(() => ({
    column: "sort_order",
    ascending: true
  }), []);

  const { data: allProjects, loading } = useSupabaseTable<Project>("projects", orderBy);

  const projectsData = useMemo(() => {
    if (!allProjects) return [];
    return showFeaturedOnly ? selectFeaturedProjects(allProjects) : allProjects;
  }, [allProjects, showFeaturedOnly]);

  const categories = useMemo(() => {
    if (!allProjects) return [];
    return getProjectCategories(allProjects);
  }, [allProjects]);

  const filteredProjects = filterProjectsByCategory(projectsData, activeCategory);

  const navigateToCategory = (categoryId: string) => {
    if (categoryId !== "all") setLocation(`/projects/${categoryId}`);
  };

  // Horizontal scroll row refs & state
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
      // Recalculate on mount load finish
      const timer = setTimeout(checkScrollPosition, 500);
      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        clearTimeout(timer);
      };
    }
  }, [filteredProjects, loading]);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -360, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 360, behavior: "smooth" });
  };

  return (
    <section id="projects" className="relative py-16 lg:py-24 overflow-hidden" style={{ background: '#0d0d0d' }}>
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(220,38,38,0.02) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block (Positioned cleanly ABOVE the cards) */}
        <div className="text-center mb-12">
          <SectionHeader
            icon={FolderGit2}
            badge="Featured Projects"
            title={showFeaturedOnly ? "Architecture &" : "All Solutions &"}
            highlight={showFeaturedOnly ? "Engineering Systems" : "Architectures"}
            align="center"
            subtitle={
              showFeaturedOnly
                ? "Enterprise operational engines spanning machine learning pipelines, backend automation systems, and high-performance analytical warehouses."
                : "A curated workspace of technical architecture and enterprise-grade data solutions — each built with operational precision."
            }
          >
            {/* Category Filter Pills (centered beautifully) */}
            {!showFeaturedOnly && (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {categories.map((category: ProjectCategory) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className="px-4 py-2 rounded-lg text-[12px] font-medium transition-all duration-200"
                    style={{
                      background: activeCategory === category.id ? '#DC2626' : 'rgba(255,255,255,0.03)',
                      color: activeCategory === category.id ? '#fff' : '#9CA3AF',
                      border: `1px solid ${activeCategory === category.id ? '#DC2626' : 'rgba(255,255,255,0.06)'}`,
                    }}
                  >
                    {category.id === "all" && <FaFilter className="inline-block mr-1.5 text-[10px]" />}
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </SectionHeader>
        </div>

        {/* ── Featured Horizontal Scrolling View ── */}
        {showFeaturedOnly ? (
          <div className="relative">
            {/* Edge fading gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #0d0d0d, transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #0d0d0d, transparent)' }} />

            {/* Main Scrolling Row */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide pb-6 pt-2 snap-x snap-mandatory scroll-smooth"
              onScroll={checkScrollPosition}
            >
              <div className="flex space-x-6 px-4 py-2" style={{ width: 'max-content' }}>
                {loading ? (
                  <>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={`skeleton-${i}`}
                        className="flex-shrink-0 h-[510px] rounded-xl animate-pulse"
                        style={{ width: 'min(75vw, 380px)', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                      />
                    ))}
                  </>
                ) : (
                  filteredProjects.map((project: Project, index: number) => (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, x: 25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.08, ease: ease }}
                      viewport={{ once: true }}
                      className="flex-shrink-0 snap-start"
                    >
                      <FeaturedProjectCard project={project} />
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {filteredProjects.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-[14px]">No featured projects found.</p>
              </div>
            )}
          </div>
        ) : (
          /* ── General Listing / Archive Grid View ── */
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-2">
              {filteredProjects.map((project: Project, index: number) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease }}
                  viewport={{ once: true }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-600 text-[14px]">No projects found in this category.</p>
              </div>
            )}
          </div>
        )}

        {/* Dynamic CTA Footer Section */}
        <div className="text-center mt-12 flex flex-wrap justify-center gap-3">
          {showFeaturedOnly && (
            <>
              <a
                href="/projects"
                className="inline-flex items-center gap-2 h-[38px] px-5 text-[13px] font-medium rounded-lg transition-all duration-200"
                style={{ background: '#DC2626', color: '#fff' }}
              >
                View All Projects <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/ZeyaMosharraf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-[38px] px-5 text-[13px] font-medium rounded-lg text-gray-400 transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                GitHub <FaGithub className="text-sm" />
              </a>
            </>
          )}
          {!showFeaturedOnly && (
            <a
              href="https://github.com/ZeyaMosharraf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-[38px] px-5 text-[13px] font-medium rounded-lg text-gray-400 transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              View All on GitHub <FaGithub className="text-sm" />
            </a>
          )}
        </div>

        {!showFeaturedOnly && activeCategory !== "all" && (
          <div className="text-center mt-6">
            <button
              onClick={() => navigateToCategory(activeCategory)}
              className="inline-flex items-center gap-2 h-[36px] px-5 text-[12px] font-medium rounded-lg transition-all duration-200"
              style={{ background: '#DC2626', color: '#fff' }}
            >
              View All {categories.find((c: ProjectCategory) => c.id === activeCategory)?.name} Projects
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default ProjectsSection;