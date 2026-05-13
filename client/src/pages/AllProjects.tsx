import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Grid3x3, LayoutList, X } from "lucide-react";
import { ProjectCard } from "@/components/ui/common";
import PageHero from "@/components/ui/PageHero";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";
import { Project } from "@/types/supabase";
import { SEO } from "@/components/SEO";
import { getProjectCategories, filterProjects, ProjectCategory } from "@/lib/dataTransforms";

const AllProjects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const orderBy = useMemo(() => ({
    column: "sort_order",
    ascending: true
  }), []);

  const { data: projects, loading } = useSupabaseTable<Project>("projects", orderBy);

  const categories = useMemo(() => {
    if (!projects) return [];
    return getProjectCategories(projects);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return filterProjects(projects, activeCategory, searchTerm);
  }, [projects, activeCategory, searchTerm]);

  return (
    <>
      <SEO
        title="All Projects - Zeya Mosharraf"
        description="Complete collection of data analysis projects showcasing skills in SQL, Python, Power BI, Machine Learning, Excel, Tableau, and Looker Studio."
        keywords="Data Analytics Projects, SQL Projects, Python Projects, Power BI Dashboards, Machine Learning, Excel Analysis, Tableau Visualizations, Looker Studio Reports"
      />

      <div className="min-h-screen" style={{ background: "#0d0d0d" }}>
        {/* Hero */}
        <PageHero
          title="All Projects"
          subtitle="Explore my complete portfolio of data analysis projects showcasing expertise across multiple technologies and domains."
        />

        {/* ── Editorial Command Bar ── */}
        <div
          className="sticky top-[64px] z-30 px-4 sm:px-6 lg:px-8 py-3"
          style={{
            background: "rgba(13,13,13,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.03)",
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Left: Search + Categories */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-grow max-w-4xl">
              {/* Integrated Search */}
              <div className="relative group w-full sm:w-60">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ width: "12px", height: "12px", color: "#374151" }}
                />
                <input
                  type="text"
                  placeholder="Filter projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-8 pl-8 pr-7 text-[11px] text-gray-300 placeholder-gray-700 bg-white/[0.02] border border-white/[0.04] rounded-lg outline-none transition-all duration-300 focus:border-red-500/20 focus:bg-white/[0.04]"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <X style={{ width: "10px", height: "10px" }} />
                  </button>
                )}
              </div>

              {/* Vertical Divider (Desktop) */}
              <div className="hidden sm:block w-px h-4 bg-white/5 mx-1" />

              {/* Category Nav */}
              <div className="flex flex-wrap items-center gap-1">
                {categories.map((cat: ProjectCategory) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className="h-7 px-2.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap"
                      style={{
                        background: isActive ? "rgba(220,38,38,0.08)" : "transparent",
                        color: isActive ? "#DC2626" : "#4B5563",
                      }}
                    >
                      {cat.name}
                      <span className={`ml-1.5 opacity-30 text-[9px] ${isActive ? "text-red-500/60" : ""}`}>{cat.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: View Toggle */}
            <div className="flex items-center gap-1 justify-end">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-700 mr-2 hidden sm:block">View Mode</span>
              <div
                className="flex items-center p-0.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
              >
                {[
                  { mode: "grid" as const, icon: <Grid3x3 style={{ width: "13px", height: "13px" }} /> },
                  { mode: "list" as const, icon: <LayoutList style={{ width: "13px", height: "13px" }} /> },
                ].map(({ mode, icon }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className="w-7 h-7 rounded-md flex items-center justify-center transition-all duration-300"
                    style={{
                      background: viewMode === mode ? "rgba(220,38,38,0.1)" : "transparent",
                      color: viewMode === mode ? "#DC2626" : "#374151",
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">

          {/* Results count */}
          <motion.p
            key={filteredProjects.length + searchTerm}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] mb-7 relative z-10"
            style={{ color: "#374151" }}
          >
            {filteredProjects.length === projects.length
              ? `${projects.length} projects`
              : `${filteredProjects.length} of ${projects.length}`}
            {searchTerm && (
              <span style={{ color: "#4B5563" }}>
                {" "}matching <span style={{ color: "#6B7280" }}>"{searchTerm}"</span>
              </span>
            )}
          </motion.p>

          {/* Grid / List */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {filteredProjects.length > 0 ? (
                <motion.div
                  key={viewMode + activeCategory}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                      : "flex flex-col gap-3 max-w-2xl"
                  }
                >
                  {filteredProjects.map((project: Project, index: number) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-28 text-center"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.1)" }}
                  >
                    <Search style={{ width: "18px", height: "18px", color: "rgba(220,38,38,0.5)" }} />
                  </div>
                  <p className="text-[14px] font-medium text-white mb-1.5">No projects found</p>
                  <p className="text-[12px] mb-6 max-w-xs" style={{ color: "#4B5563" }}>
                    Try a different term or select another category.
                  </p>
                  <button
                    onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}
                    className="h-8 px-4 rounded-lg text-[12px] font-medium text-white transition-all duration-200 hover:brightness-110"
                    style={{ background: "#DC2626" }}
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProjects;