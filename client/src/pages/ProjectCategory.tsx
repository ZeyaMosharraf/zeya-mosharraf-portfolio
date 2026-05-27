import { useEffect, useState, useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";
import { Project } from "@/types/supabase";
import { ProjectCard } from "@/components/ui/common";
import { slugToCategoryName, filterProjectsByExactCategory } from "@/lib/dataTransforms";

interface ProjectCategoryProps {
  params: {
    category: string;
  };
}

type CategoryType = "Data Infrastructure" | "Automation & ETL" | "Machine Learning" | "BI & Reporting" | "Operational Analytics";

const getDisplayName = (category: string): string => {
  switch (category) {
    case "Data Infrastructure":
      return "Data Infrastructure Systems";
    case "Automation & ETL":
      return "Automation & ETL Pipelines";
    case "Machine Learning":
      return "Machine Learning Models";
    case "BI & Reporting":
      return "Business Intelligence & Reporting";
    case "Operational Analytics":
      return "Operational Analytics Systems";
    default:
      return "Projects";
  }
};

const getCategoryDescription = (category: string): string => {
  switch (category) {
    case "Data Infrastructure":
      return "Scalable analytical databases, dimensional data modeling (star schemas), cloud data warehouses, and clean storage frameworks built for operational efficiency.";
    case "Automation & ETL":
      return "A curated workspace of custom Python-driven data integrations, robust API extraction scripts, and automated event syncing workflows built to keep analytics platforms accurate.";
    case "Machine Learning":
      return "Advanced analytical applications implementing statistical forecasting and machine learning algorithms for automated predictive logic.";
    case "BI & Reporting":
      return "High-performance enterprise dashboards and automated reporting systems built using advanced data modeling and visual intelligence engines.";
    case "Operational Analytics":
      return "End-to-end analytical engines designed to capture, transform, and sync core operational metrics to automate recurring business reporting.";
    default:
      return "A curated collection of technical data systems and operational intelligence assets.";
  }
};

const ProjectCategory = ({ params }: ProjectCategoryProps) => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.category]);

  const orderBy = useMemo(() => ({
    column: "sort_order",
    ascending: true
  }), []);

  const { data: allProjects, loading } = useSupabaseTable<Project>("projects", orderBy);

  const categoryProjects = useMemo(() => {
    if (!allProjects) return [];
    const categoryName = slugToCategoryName(params.category);
    return filterProjectsByExactCategory(allProjects, categoryName);
  }, [allProjects, params.category]);

  const categoryName = slugToCategoryName(params.category);
  const displayName = getDisplayName(categoryName);
  const description = getCategoryDescription(categoryName);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-orange-50/40 dark:from-[#0d0d0d] dark:via-red-950/20 dark:to-orange-950/30">
      <div className="container mx-auto py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={() => setLocation("/projects")}
            className="mb-8 inline-flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-white bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-600 border border-gray-200 dark:border-red-900/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaArrowLeft className="mr-2" /> Back to All Projects
          </motion.button>

          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">{displayName}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              {description}
            </p>
          </motion.div>

          {categoryProjects.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              {categoryProjects.map((project: Project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 transition-colors duration-300">No projects found in this category</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400 transition-colors duration-300">Check back later for updates or explore other categories</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectCategory;