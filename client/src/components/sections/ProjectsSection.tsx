import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion, useInView } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projectsData";
import { FaGithub, FaFilter } from "react-icons/fa";
import { FolderGit2, ArrowRight } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const categories = [
  { id: "all", name: "All Projects" },
  { id: "sql", name: "SQL" },
  { id: "python", name: "Python" },
  { id: "machine-learning", name: "Machine Learning" },
  { id: "power-bi", name: "Power BI" },
  { id: "excel", name: "Excel" },
  { id: "tableau", name: "Tableau" },
  { id: "looker-studio", name: "Looker Studio" }
];

interface ProjectsSectionProps {
  showFeaturedOnly?: boolean;
}

const ProjectsSection = ({ showFeaturedOnly = false }: ProjectsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [, setLocation] = useLocation();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  const selectFeaturedProjects = (): typeof projects => {
    if (!showFeaturedOnly) return projects;
    const featuredProjects: typeof projects = [];
    const usedCategories = new Set<string>();
    const priorityCategories = ["SQL", "Power BI", "Python", "Machine Learning", "Excel", "Tableau"];
    for (const category of priorityCategories) {
      const project = projects.find(p => p.category === category && !usedCategories.has(p.category));
      if (project && featuredProjects.length < 6) { featuredProjects.push(project); usedCategories.add(project.category); }
    }
    if (featuredProjects.length < 6) {
      const remaining = projects.filter(p => !featuredProjects.includes(p));
      featuredProjects.push(...remaining.slice(0, 6 - featuredProjects.length));
    }
    return featuredProjects;
  };

  const projectsToShow = selectFeaturedProjects();
  const [projectsData, setProjectsData] = useState(projectsToShow || []);

  useEffect(() => { setProjectsData(selectFeaturedProjects() || []); }, [showFeaturedOnly]);

  const filteredProjects = activeCategory === "all"
    ? projectsData
    : projectsData.filter(project => project.category.toLowerCase().replace(/\s+/g, "-") === activeCategory);

  const navigateToCategory = (categoryId: string) => { if (categoryId !== "all") setLocation(`/projects/${categoryId}`); };

  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden" style={{ background: '#0B0F14' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 60% 40%, rgba(220,38,38,0.03) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase mb-5 relative overflow-hidden"
            style={{ background: 'rgba(239,68,68,0.08)', color: 'rgba(239,68,68,0.8)', border: '1px solid rgba(239,68,68,0.12)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.1) 50%, transparent 100%)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
            />
            <FolderGit2 className="w-3 h-3 relative z-10" />
            <span className="relative z-10">Projects</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.06 }}
          >
            {showFeaturedOnly ? (
              <>Featured{" "}<span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)' }}>Projects</span></>
            ) : (
              <>All{" "}<span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)' }}>Projects</span></>
            )}
          </motion.h2>

          <motion.p
            className="text-[15px] text-gray-500 max-w-xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
          >
            {showFeaturedOnly
              ? "End-to-end data solutions spanning SQL pipelines, Python automation, Power BI dashboards, and machine learning models."
              : "A curated collection of data engineering and analytics projects — each with measurable impact."}
          </motion.p>

          {/* Category Filter Pills */}
          {!showFeaturedOnly && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {categories.map(category => (
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
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden">
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                className="flex-none w-80"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 lg:gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06, ease }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-[14px]">No projects found in this category.</p>
          </div>
        )}

        {/* CTA Buttons */}
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
              View All {categories.find(c => c.id === activeCategory)?.name} Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;