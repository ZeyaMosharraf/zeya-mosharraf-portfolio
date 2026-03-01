import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { FaGithub, FaArrowLeft, FaExternalLinkAlt, FaTags, FaTools } from "react-icons/fa";
import { Calendar, Target, Zap, Award, Clock, User } from "lucide-react";
import { projects, Project } from "@/data/projectsData";
import { Helmet } from "react-helmet-async";

interface ProjectDetailsProps {
  params: {
    slug: string;
  };
}

const ProjectDetails = ({ params }: ProjectDetailsProps) => {
  const [project, setProject] = useState<Project | null>(null);
  const [, setLocation] = useLocation();
  const { slug } = useParams<{ slug: string }>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProject = projects.find(p => p.slug === slug);
    if (foundProject) setProject(foundProject);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Project Not Found</h2>
          <button 
            onClick={() => setLocation("/")}
            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | {project.category} | Zeya Mosharraf</title>
        <meta name="description" content={project.description} />
        <meta name="keywords" content={project.skills?.join(", ") || ""} />
        <meta property="og:title" content={`${project.title} | Data Analysis Project`} />
        <meta property="og:description" content={project.description} />
        {project.imageUrl && <meta property="og:image" content={project.imageUrl} />}
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50/30 dark:from-[#0d0d0d] dark:to-[#1a0a0a]">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-red-700 to-red-900 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-700/95 to-red-900/95">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.button
                onClick={() => setLocation("/projects")}
                className="mb-8 inline-flex items-center px-6 py-3 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FaArrowLeft className="mr-3" /> Back to Projects
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 text-white bg-white/20 backdrop-blur-sm`}>
                  {project.category}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {project.title}
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  {project.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-4 mt-8"
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <FaGithub className="mr-2" /> View Source Code
                </a>
                {(project.powerBiEmbedUrl || project.lookerstudioEmbedUrl || project.tableauEmbedUrl) && (
                  <button className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-medium hover:bg-white/20 transition-all duration-300">
                    <FaExternalLinkAlt className="mr-2" /> Live Demo
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative px-4 sm:px-6 lg:px-8 py-16">
          {/* Floating background elements */}
          <div className="absolute top-20 right-10 w-24 h-24 bg-red-200/20 dark:bg-red-900/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-40 left-10 w-32 h-32 bg-orange-200/20 dark:bg-orange-900/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Project Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 -mt-8 relative z-10"
            >
              {[
                { icon: Calendar, label: "Duration", value: "2-3 weeks", color: "from-red-500 to-orange-500" },
                { icon: Target, label: "Impact", value: "High", color: "from-green-500 to-emerald-500" },
                { icon: Zap, label: "Complexity", value: "Advanced", color: "from-orange-500 to-red-500" },
                { icon: Award, label: "Status", value: "Complete", color: "from-red-600 to-red-500" }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    y: -5,
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                >
                  <motion.div 
                    className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      transition: { 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Project Image/Dashboard */}
            {project.imageUrl && !['Power BI', 'Looker Studio', 'Tableau'].includes(project.category) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-16"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <img
                    src={project.imageUrl}
                    alt={project.title + ' preview'}
                    className="w-full rounded-xl aspect-[16/9] object-cover"
                  />
                </div>
              </motion.div>
            )}

            {/* Interactive Dashboards */}
            {project.category === "Power BI" && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-16"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Interactive Power BI Dashboard</h2>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                    <div className="aspect-video w-full">
                      <iframe
                        title="Power BI Report"
                        width="100%"
                        height="100%"
                        className="w-full h-full border-0 rounded-lg"
                        src={project.powerBiEmbedUrl}
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {project.category === "Looker Studio" && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-16"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Interactive Looker Studio Report</h2>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                    <div className="relative w-full aspect-[16/9]">
                      <iframe
                        title="Looker Studio Report"
                        src={project.lookerstudioEmbedUrl}
                        className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
                        allowFullScreen
                        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {project.category === "Tableau" && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-16"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Interactive Tableau Dashboard</h2>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                    <div className="aspect-video w-full">
                      <iframe
                        title="Tableau Report"
                        width="100%"
                        height="100%"
                        className="w-full h-full border-0 rounded-lg"
                        src={project.tableauEmbedUrl}
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                >
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Project Overview</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {project.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                >
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Methodology</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {project.methodology}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                >
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Results & Impact</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {project.resultsAndImpact}
                  </p>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <FaTags className="text-red-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Skills Applied</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.skills?.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <FaTools className="text-red-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Tools Used</h3>
                  </div>
                  <div className="space-y-2">
                    {project.tools?.map((tool, idx) => (
                      <div key={idx} className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                        <span className="text-gray-700 dark:text-gray-300">{tool}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Project Links</h3>
                  <div className="space-y-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center w-full p-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
                    >
                      <FaGithub className="mr-3" />
                      <span>View Source Code</span>
                      <FaExternalLinkAlt className="ml-auto text-sm" />
                    </a>
                    
                    {/* Dashboard View Button for Excel projects */}
                    {project.excelDashboardUrl && (
                      <a
                        href={project.excelDashboardUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        <FaExternalLinkAlt className="mr-3" />
                        <span>View Dashboard</span>
                        <FaExternalLinkAlt className="ml-auto text-sm" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;