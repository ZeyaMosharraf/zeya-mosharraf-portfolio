import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useLocation } from "wouter";
import { ArrowLeft, FileText, Calendar, Award, ExternalLink, Search, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/data/CaseStudiesdata";
import { Helmet } from "react-helmet-async";

// Case study type definition
type CaseStudy = {
  id: number;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  bulletPoints?: string[];
  date: string;
  toolsUsed: string[];
  imageUrl?: string;
  results: string;
  slug: string;
};

interface CaseStudiesProps {
  viewMode?: "list" | "detail";
  params?: { slug: string };
}

const CaseStudies = ({ viewMode = "list", params: routeParams }: CaseStudiesProps) => {
  const hookParams = useParams<{ slug: string }>();
  // Use passed params if available, otherwise use hook params
  const params = routeParams || hookParams;
  const [, setLocation] = useLocation();
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardViewMode, setCardViewMode] = useState<"grid" | "list">("grid");

  const filteredCaseStudies = caseStudies.filter(cs =>
    cs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cs.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cs.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cs.toolsUsed.some(tool => tool.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If viewing a detailed case study, find the case study by ID
    if (viewMode === "detail" && params?.slug) {
      const caseStudy = caseStudies.find(cs => cs.slug === params.slug);
      setSelectedCaseStudy(caseStudy || null);
    }
  }, [viewMode, params?.slug]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Detail view rendering function
  const renderDetailView = () => {
    if (!selectedCaseStudy) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Case Study Not Found</h2>
            <Button 
              onClick={() => setLocation("/case-studies")} 
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 to-blue-700/95">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.button
                onClick={() => setLocation("/case-studies")}
                className="mb-8 inline-flex items-center px-6 py-3 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ArrowLeft className="mr-3" /> Back to Case Studies
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 text-white bg-white/20 backdrop-blur-sm">
                  {selectedCaseStudy.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {selectedCaseStudy.title}
                </h1>
                <div className="flex items-center justify-center text-white/90 mb-6">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="text-lg">{selectedCaseStudy.date}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative px-4 sm:px-6 lg:px-8 py-16">
          {/* Floating background elements */}
          <div className="absolute top-20 right-10 w-24 h-24 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-40 left-10 w-32 h-32 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                >
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Case Study Overview</h2>
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {selectedCaseStudy.fullDescription}
                    </p>
                  </div>
                </motion.div>

                {selectedCaseStudy.bulletPoints && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
                  >
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Key Activities</h2>
                    <div className="space-y-4">
                      {selectedCaseStudy.bulletPoints.map((point, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                          className="flex items-start"
                        >
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                            ✓
                          </div>
                          <span className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{point}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 shadow-lg"
                >
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Award className="h-8 w-8 mr-3 text-green-600 dark:text-green-400" />
                    Results & Impact
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{selectedCaseStudy.results}</p>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    Tools & Technologies
                  </h3>
                  <div className="space-y-2">
                    {selectedCaseStudy.toolsUsed.map((tool, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 + idx * 0.1 }}
                        className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{tool}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Duration</span>
                      <span className="font-semibold text-gray-900 dark:text-white">2-4 weeks</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Impact</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">High</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Complexity</span>
                      <span className="font-semibold text-purple-600 dark:text-purple-400">Advanced</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // List view rendering function
  const renderListView = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 to-blue-700/95">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                Case Studies
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-white/90 max-w-3xl mx-auto"
              >
                Detailed analyses of real-world data challenges and their innovative solutions
              </motion.p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg -mt-8 relative z-10 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-row gap-4 items-center justify-between w-full">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search case studies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-gray-200 dark:bg-gray-600 rounded-lg p-1 shrink-0">
                  <button
                    onClick={() => setCardViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${
                      cardViewMode === "grid"
                        ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm"
                        : "text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCardViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${
                      cardViewMode === "list"
                        ? "bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm"
                        : "text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative px-4 sm:px-6 lg:px-8 py-16">
          {/* Floating background elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className={cardViewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8" : "flex flex-col gap-4"}
            >
              {filteredCaseStudies.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-2 text-center py-16 text-gray-500 dark:text-gray-400"
                >
                  <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">No case studies found for "{searchTerm}"</p>
                  <p className="text-sm mt-1">Try a different keyword</p>
                </motion.div>
              ) : filteredCaseStudies.map((caseStudy, index) => (
                <motion.div 
                  key={caseStudy.slug}
                  variants={item} 
                  className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer ${
                    cardViewMode === "list" ? "flex flex-row" : ""
                  }`}
                  whileHover={{ y: cardViewMode === "grid" ? -6 : 0, x: cardViewMode === "list" ? 4 : 0 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setLocation(`/case-study/${caseStudy.slug}`)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Header with gradient */}
                  <div className={`relative p-6 pb-4 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 ${
                    cardViewMode === "list" ? "w-48 shrink-0 flex flex-col justify-center pb-6" : ""
                  }`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-2xl"></div>
                    <motion.div 
                      className="inline-flex items-center px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      Case Study
                    </motion.div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight line-clamp-2">
                      {caseStudy.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <div className="p-4 lg:p-6 pt-0">
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 lg:mb-6 line-clamp-3">
                      {caseStudy.shortDescription}
                    </p>

                    {/* Tools preview */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {caseStudy.toolsUsed.slice(0, 3).map((tool, toolIndex) => (
                          <motion.span 
                            key={toolIndex}
                            className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 + toolIndex * 0.1 }}
                          >
                            {tool}
                          </motion.span>
                        ))}
                        {caseStudy.toolsUsed.length > 3 && (
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md">
                            +{caseStudy.toolsUsed.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {caseStudy.date}
                      </div>
                      <motion.div
                        className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300"
                        whileHover={{ x: 4 }}
                      >
                        Read Study
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        {viewMode === "detail" && selectedCaseStudy ? (
          <>
            <title>{selectedCaseStudy.title} | Case Study | Zeya Mosharraf</title>
            <meta name="description" content={selectedCaseStudy.shortDescription} />
            <meta name="keywords" content={`case study, ${selectedCaseStudy.category}, ${selectedCaseStudy.toolsUsed.join(', ')}`} />
            <meta property="og:title" content={`${selectedCaseStudy.title} | Case Study`} />
            <meta property="og:description" content={selectedCaseStudy.shortDescription} />
            {selectedCaseStudy.imageUrl && <meta property="og:image" content={selectedCaseStudy.imageUrl} />}
            <meta property="og:type" content="article" />
          </>
        ) : (
          <>
            <title>Case Studies | Zeya Mosharraf</title>
            <meta name="description" content="Detailed analyses of real-world data challenges and their solutions" />
            <meta name="keywords" content="case studies, data analysis, projects, portfolio" />
            <meta property="og:title" content="Case Studies | Zeya Mosharraf" />
            <meta property="og:description" content="Detailed analyses of real-world data challenges and their solutions" />
            <meta property="og:type" content="website" />
          </>
        )}
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={viewMode === "detail" ? "" : ""}
      >
        {viewMode === "detail" ? renderDetailView() : renderListView()}
      </motion.div>
    </>
  );
};

export default CaseStudies;