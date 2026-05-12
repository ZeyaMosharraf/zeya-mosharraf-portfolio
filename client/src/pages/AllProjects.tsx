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

        {/* ── Sticky Controls ── */}
        <div
          className="sticky top-14 z-30 px-4 sm:px-6 lg:px-8 py-2.5"
          style={{
            background: "rgba(10,10,10,0.95)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-2.5 sm:items-center">

            {/* Search */}
            <div className="relative w-full sm:w-64 shrink-0">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ width: "13px", height: "13px", color: "#4B5563" }}
              />
              <input
                type="text"
                placeholder="Search projects…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-8 pl-8 pr-7 text-[12px] text-gray-300 placeholder-gray-600 rounded-lg outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  // focus handled via onFocus/onBlur
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(220,38,38,0.35)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  <X style={{ width: "11px", height: "11px" }} />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5 flex-1">
              {categories.map((cat: ProjectCategory) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="h-7 px-2.5 rounded-md text-[11px] font-medium transition-all duration-200 whitespace-nowrap"
                    style={{
                      background: isActive ? "rgba(220,38,38,0.12)" : "transparent",
                      color: isActive ? "#DC2626" : "#4B5563",
                      border: isActive ? "1px solid rgba(220,38,38,0.25)" : "1px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = "#9CA3AF";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = "#4B5563";
                    }}
                  >
                    {cat.name}
                    <span className="ml-1 opacity-40 text-[10px]">{cat.count}</span>
                  </button>
                );
              })}
            </div>

            {/* View toggle */}
            <div
              className="flex items-center gap-0.5 shrink-0 rounded-lg p-0.5"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {[
                { mode: "grid" as const, icon: <Grid3x3 style={{ width: "14px", height: "14px" }} />, label: "Grid view" },
                { mode: "list" as const, icon: <LayoutList style={{ width: "14px", height: "14px" }} />, label: "List view" },
              ].map(({ mode, icon, label }) => (
                <button
                  key={mode}
                  aria-label={label}
                  onClick={() => setViewMode(mode)}
                  className="w-7 h-7 rounded-md flex items-center justify-center transition-all duration-200"
                  style={{
                    background: viewMode === mode ? "rgba(220,38,38,0.12)" : "transparent",
                    color: viewMode === mode ? "#DC2626" : "#4B5563",
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Ambient glow — subtle atmospheric depth */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(220,38,38,0.03) 0%, transparent 65%)",
              zIndex: 0,
            }}
          />

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