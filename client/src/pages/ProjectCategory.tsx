import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { projects, Project } from "@/data/projectsData";
import ProjectCard from "@/components/ui/ProjectCard";

interface ProjectCategoryProps {
  params: {
    category: string;
  };
}

type CategoryType = "SQL" | "Python" | "Machine Learning" | "Power BI" | "Excel" | "Tableau" | "Looker Studio";

const getDisplayName = (category: string): string => {
  switch (category) {
    case "SQL":
      return "SQL Projects";
    case "Python":
      return "Python Projects";
    case "Machine Learning":
      return "Machine Learning Projects";
    case "Power BI":
      return "Power BI Dashboards";
    case "Excel":
      return "Excel Projects";
    case "Tableau":
      return "Tableau Dashboards";
    case "Looker Studio":
      return "Looker Studio Reports";
    default:
      return "Projects";
  }
};

const getCategoryDescription = (category: string): string => {
  switch (category) {
    case "SQL":
      return "Advanced database projects using SQL to extract, transform, and analyze data for business insights.";
    case "Python":
      return "A curated portfolio of Python-driven solutions that solve real business or technical problems — from automating repetitive tasks and integrating external systems via APIs to processing and transforming data efficiently. Each project includes clear objectives, the technologies used, and measurable outcomes to show exactly how Python delivered value for each task.";
    case "Machine Learning":
      return "Projects implementing machine learning algorithms for predictive analytics and pattern recognition.";
    case "Power BI":
      return "Interactive dashboards and visualizations created with Microsoft Power BI.";
    case "Excel":
      return "Advanced Excel projects demonstrating data analysis, modeling, and visualization techniques.";
    case "Tableau":
      return "Interactive data visualizations and dashboards created with Tableau for comprehensive business intelligence.";
    case "Looker Studio":
      return "Dynamic reports and dashboards built with Looker Studio to monitor marketing performance and web analytics.";
    default:
      return "Collection of data analysis projects.";
  }
};

const ProjectCategory = ({ params }: ProjectCategoryProps) => {
  const [categoryProjects, setCategoryProjects] = useState<Project[]>([]);
  const [, setLocation] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Normalize category for comparison
    const normalizedCategory = params.category
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
      
    const filtered = projects.filter(project => 
      project.category.toLowerCase() === normalizedCategory.toLowerCase() ||
      // Special cases for categories with spaces which might be formatted with dashes in URL
      (normalizedCategory === "Machine Learning" && project.category === "Machine Learning") ||
      (normalizedCategory === "Looker Studio" && project.category === "Looker Studio") ||
      // Handle potential variations in URL
      (params.category === "looker-studio" && project.category === "Looker Studio")
    );
    
    setCategoryProjects(filtered);
  }, [params.category]);

  const displayName = getDisplayName(params.category
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" "));

  const description = getCategoryDescription(params.category
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" "));

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
    <div className="pt-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30">
      <div className="container mx-auto py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={() => setLocation("/projects")}
            className="mb-8 inline-flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-white bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
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
              {categoryProjects.map((project) => (
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