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

      <div className="min-h-screen bg-[#0a0a0a]">
        <PageHero
          variant="editorial"
          center={true}
          accentLabel="Technical Repository"
          title="All Projects"
          subtitle="Explore a complete portfolio of data analysis projects showcasing expertise across multiple technologies and domains."
        />

        {/* ── Search / Filters ── */}
        <div className="container mx-auto px-4 mb-12">
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-700 group-focus-within:text-red-500 transition-colors">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search tech, category, or project name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.01] border border-white/5 rounded-2xl py-4 pl-14 pr-12 text-[12px] text-white placeholder-gray-700 focus:outline-none focus:border-red-500/30 focus:bg-white/[0.02] transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-red-500 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Results count (Subtle & Centered) */}
          <motion.p
            key={filteredProjects.length + searchTerm}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[10px] uppercase tracking-widest text-gray-800 mt-6"
          >
            {filteredProjects.length === (projects?.length || 0)
              ? `Cataloging ${projects?.length || 0} engineering entries`
              : `Found ${filteredProjects.length} of ${projects?.length || 0} matching entries`}
          </motion.p>
        </div>

        {/* ── Main Content ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">

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