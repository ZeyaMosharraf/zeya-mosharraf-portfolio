import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { projects } from "@/data/projectsData";
import { FaGithub, FaFilter } from "react-icons/fa";
import { FolderGit2, ArrowRight } from "lucide-react";
import { ease } from "@/lib/animations";

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
    <section id="projects" className="relative py-12 lg:py-16 overflow-hidden" style={{ background: '#0B0F14' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 60% 40%, rgba(220,38,38,0.03) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <SectionHeader
          icon={FolderGit2}
          badge="Projects"
          title={showFeaturedOnly ? "Featured" : "All"}
          highlight="Projects"
          subtitle={
            showFeaturedOnly
              ? "End-to-end data solutions spanning SQL pipelines, Python automation, Power BI dashboards, and machine learning models."
              : "A curated collection of data engineering and analytics projects — each with measurable impact."
          }
        >
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
        </SectionHeader>

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