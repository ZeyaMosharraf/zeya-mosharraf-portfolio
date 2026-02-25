import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";

import { projects } from "@/data/projectsData";
import { FaGithub, FaFilter } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

// Category options with display information
const categories = [
  { id: "all", name: "All Projects", color: "bg-gray-100 text-gray-800" },
  { id: "sql", name: "SQL", color: "bg-yellow-100 text-yellow-700" },
  { id: "python", name: "Python", color: "bg-blue-100 text-blue-700" },
  { id: "machine-learning", name: "Machine Learning", color: "bg-purple-100 text-purple-700" },
  { id: "power-bi", name: "Power BI", color: "bg-green-100 text-green-700" },
  { id: "excel", name: "Excel", color: "bg-red-100 text-red-700" },
  { id: "tableau", name: "Tableau", color: "bg-purple-100 text-purple-700" },
  { id: "looker-studio", name: "Looker Studio", color: "bg-indigo-100 text-indigo-700" }
];

interface ProjectsSectionProps {
  showFeaturedOnly?: boolean;
}

const ProjectsSection = ({ showFeaturedOnly = false }: ProjectsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [, setLocation] = useLocation();
  
  // Function to select diverse featured projects
  const selectFeaturedProjects = (): typeof projects => {
    if (!showFeaturedOnly) return projects;
    
    const featuredProjects: typeof projects = [];
    const usedCategories = new Set<string>();
    
    // First, try to get one project from each major category
    const priorityCategories = ["SQL", "Power BI", "Python", "Machine Learning", "Excel", "Tableau"];
    
    for (const category of priorityCategories) {
      const project = projects.find(p => p.category === category && !usedCategories.has(p.category));
      if (project && featuredProjects.length < 6) {
        featuredProjects.push(project);
        usedCategories.add(project.category);
      }
    }
    
    // If we still need more projects, add from remaining projects
    if (featuredProjects.length < 6) {
      const remainingProjects = projects.filter(p => !featuredProjects.includes(p));
      featuredProjects.push(...remainingProjects.slice(0, 6 - featuredProjects.length));
    }
    
    return featuredProjects;
  };

  // Get projects to display - either featured (diverse selection) or all
  const projectsToShow = selectFeaturedProjects();
  const [projectsData, setProjectsData] = useState(projectsToShow || []);
  
  // Update projects data when showFeaturedOnly changes
  useEffect(() => {
    const newProjectsToShow = selectFeaturedProjects();
    setProjectsData(newProjectsToShow || []);
  }, [showFeaturedOnly]);

  // Filter projects based on selected category
  const filteredProjects = activeCategory === "all" 
    ? projectsData
    : projectsData.filter(project => {
        // Handle spaces in category names by replacing them with dashes
        const formattedCategory = project.category.toLowerCase().replace(/\s+/g, "-");
        return formattedCategory === activeCategory;
      });

  // Navigate to category page
  const navigateToCategory = (categoryId: string) => {
    if (categoryId === "all") return;
    setLocation(`/category/${categoryId}`);
  };

  const currentCategory = categories.find(cat => cat.id === activeCategory);
  const categoryTitle = currentCategory ? currentCategory.name : "All Projects";

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/15 dark:from-gray-900 dark:via-blue-950/10 dark:to-purple-950/10 transition-colors duration-300 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-l from-blue-400/8 to-purple-400/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-3xl"></div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              {showFeaturedOnly ? "Featured Projects" : "All Projects"}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 transition-colors duration-300">
            {showFeaturedOnly
              ? "End-to-end data solutions spanning SQL pipelines, Python automation, Power BI dashboards, and machine learning models — each built to drive real business decisions."
              : "A curated collection of data engineering and analytics projects across SQL, Python, Power BI, Machine Learning, and more — each with measurable impact."
            }
          </p>

          {/* Category Filter Pills - Only show on All Projects page */}
          {!showFeaturedOnly && (
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border 
                    ${activeCategory === category.id 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-transparent' 
                      : 'bg-white/70 dark:bg-gray-800/70 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-gray-200 dark:border-gray-700 backdrop-blur-sm'}`}
                >
                  {category.id === "all" && <FaFilter className="inline-block mr-2 text-xs" />}
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>



        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="md:hidden">
          {/* Mobile horizontal scroll container */}
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                className="flex-none w-80"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8 max-w-none">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="max-w-sm mx-auto"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300">No projects found in this category.</p>
          </div>
        )}

        <div className="text-center mt-12 flex flex-wrap justify-center gap-4">
          {showFeaturedOnly && (
            <>
              <a
                href="/projects"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-300"
              >
                View All Projects
              </a>
              <a
                href="https://github.com/ZeyaMosharraf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:border-primary hover:text-primary dark:hover:text-primary transition-colors duration-300 font-medium"
              >
                GitHub <FaGithub className="ml-2" />
              </a>
            </>
          )}
          {!showFeaturedOnly && (
            <a
              href="https://github.com/ZeyaMosharraf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:border-primary hover:text-primary dark:hover:text-primary transition-colors duration-300 font-medium"
            >
              View All Projects on GitHub <FaGithub className="ml-2" />
            </a>
          )}
        </div>

        {!showFeaturedOnly && activeCategory !== "all" && (
          <div className="text-center mt-8">
            <button
              onClick={() => navigateToCategory(activeCategory)}
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
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