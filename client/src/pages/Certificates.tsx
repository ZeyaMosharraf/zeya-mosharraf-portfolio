import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useLocation, useSearch } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Download, ExternalLink, Clock, Tag, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { certificates } from "@/data/Certificatedata";
import { Helmet } from "react-helmet-async";

// Certificate type definition
type Certificate = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialLink?: string;
  category: "course" | "achievement" | "experience" | "extracurricular";
  imageUrl?: string;
  pdfUrl?: string;
  skills: string[];
  duration?: string;
  slug: string;
};

interface CertificatesProps {
  viewMode?: "list" | "detail";
  params?: { slug: string };
}

const Certificates = ({ viewMode = "list", params: routeParams }: CertificatesProps) => {
  const hookParams = useParams<{ slug: string }>();
  const params = routeParams || hookParams;
  const [, setLocation] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  const tabFromUrl = searchParams.get("tab");
  
  const [activeTab, setActiveTab] = useState<string>(tabFromUrl || "courses");
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (viewMode === "detail" && params?.slug) {
      const certificate = certificates.find(c => c.slug === params.slug);
      setSelectedCertificate(certificate || null);
    } else {
      if (tabFromUrl) {
        setActiveTab(tabFromUrl);
      }
    }
  }, [viewMode, params?.slug, tabFromUrl]);

  const filteredCertificates = certificates.filter(cert => {
    if (activeTab === "courses") return cert.category === "course";
    if (activeTab === "achievements") return cert.category === "achievement";
    if (activeTab === "experience") return cert.category === "experience";
    return true;
  });

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
    if (!selectedCertificate) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Certificate Not Found</h2>
            <Button 
              onClick={() => setLocation("/certificates")} 
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Certificates
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white dark:from-[#0d0d0d] dark:to-[#1a0a0a]">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-red-700 to-red-900 overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
          
          <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.button
                onClick={() => setLocation("/certificates")}
                className="mb-8 inline-flex items-center px-6 py-3 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ArrowLeft className="mr-3" /> Back to Certificates
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 text-white bg-white/20 backdrop-blur-sm">
                  {selectedCertificate.category === 'course' ? 'Course' : 
                   selectedCertificate.category === 'achievement' ? 'Achievement' : 
                   selectedCertificate.category === 'experience' ? 'Experience' : 'Extracurricular'}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {selectedCertificate.title}
                </h1>
                <div className="flex items-center justify-center text-white/90 mb-6">
                  <Award className="h-5 w-5 mr-2" />
                  <span className="text-lg mr-6">{selectedCertificate.issuer}</span>
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="text-lg">{selectedCertificate.date}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Description</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {selectedCertificate.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" />
                  Skills Learned
                </h3>
                <div className="space-y-2">
                  {selectedCertificate.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 + idx * 0.1 }}
                      className="flex items-center p-3 bg-red-50 dark:bg-red-900/30 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Certificate Details</h3>
                <div className="space-y-4">
                  {selectedCertificate.duration && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <span className="text-gray-600 dark:text-gray-400">Duration</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{selectedCertificate.duration}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">Type</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      {selectedCertificate.category === 'course' ? 'Online Course' : 
                       selectedCertificate.category === 'achievement' ? 'Achievement' : 
                       selectedCertificate.category === 'experience' ? 'Professional Experience' : 'Extracurricular Activity'}
                    </span>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    {selectedCertificate.credentialLink && selectedCertificate.credentialLink !== "#" && (
                      <a 
                        href={selectedCertificate.credentialLink} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-full inline-flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Credential
                      </a>
                    )}
                    
                    {selectedCertificate.pdfUrl && selectedCertificate.pdfUrl !== "#" && (
                      <a 
                        href={selectedCertificate.pdfUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // List view rendering function
  const renderListView = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white dark:from-[#0d0d0d] dark:to-[#1a0a0a]">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-red-700 to-red-900 overflow-hidden">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
          
          <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                Certificates & Credentials
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-white/90 max-w-3xl mx-auto"
              >
                Qualifications, achievements, and professional experience
              </motion.p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 mb-8 bg-gray-100 dark:bg-gray-800 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-2xl p-1 shadow-lg">
                <TabsTrigger 
                  value="courses" 
                  className="relative rounded-xl px-2 py-2 sm:px-4 sm:py-3 font-semibold text-xs sm:text-sm transition-all duration-300 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 border-0"
                >
                  <motion.span
                    className="relative z-10 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Award className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Courses</span>
                    <span className="sm:hidden">Study</span>
                  </motion.span>
                </TabsTrigger>
                <TabsTrigger 
                  value="achievements" 
                  className="relative rounded-xl px-2 py-2 sm:px-4 sm:py-3 font-semibold text-xs sm:text-sm transition-all duration-300 data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:shadow-lg bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 border-0"
                >
                  <motion.span
                    className="relative z-10 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Award className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Achievements</span>
                    <span className="sm:hidden">Awards</span>
                  </motion.span>
                </TabsTrigger>
                <TabsTrigger 
                  value="experience" 
                  className="relative rounded-xl px-2 py-2 sm:px-4 sm:py-3 font-semibold text-xs sm:text-sm transition-all duration-300 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 border-0"
                >
                  <motion.span
                    className="relative z-10 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Award className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Experience</span>
                    <span className="sm:hidden">Work</span>
                  </motion.span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="courses" className="mt-0">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 gap-6"
                >
                  {filteredCertificates.map((cert, index) => (
                    <motion.div 
                      key={cert.slug} 
                      variants={item}
                      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setLocation(`/certificate/${cert.slug}`)}
                      data-aos="fade-up"
                      data-aos-delay={index * 80}
                    >
                      {/* Header */}
                      <div className="relative p-6 pb-4 bg-gradient-to-br from-red-50/50 to-red-100/30 dark:from-red-900/20 dark:to-red-800/20">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 h-1 top-0"></div>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <motion.div 
                              className="inline-flex items-center px-3 py-1 text-xs font-semibold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/50 rounded-full mb-3"
                              whileHover={{ scale: 1.05 }}
                            >
                              <Award className="w-3 h-3 mr-1" />
                              Course
                            </motion.div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 leading-tight">
                              {cert.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{cert.issuer}</p>
                          </div>
                          <div className="text-right ml-4">
                            <motion.span 
                              className="inline-flex items-center px-3 py-1 text-sm font-medium bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 rounded-lg"
                              whileHover={{ scale: 1.05 }}
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                              {cert.date}
                            </motion.span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 pt-0">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-2">
                          {cert.description}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          {cert.credentialLink && cert.credentialLink !== "#" ? (
                            <motion.a 
                              href={cert.credentialLink} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="inline-flex items-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium text-sm transition-colors duration-300"
                              whileHover={{ x: 2 }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View Certificate
                            </motion.a>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500 text-sm">Certificate Available</span>
                          )}
                          <motion.div
                            className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 font-medium text-sm transition-colors duration-300"
                            whileHover={{ x: 4 }}
                          >
                            View Details
                            <ExternalLink className="w-4 h-4 ml-1" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
              
              <TabsContent value="achievements" className="mt-0">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 gap-6"
                >
                  {filteredCertificates.map((cert, index) => (
                    <motion.div 
                      key={cert.slug} 
                      variants={item}
                      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setLocation(`/certificate/${cert.slug}`)}
                    >
                      <div className="relative p-6 pb-4 bg-gradient-to-br from-amber-50/50 to-amber-100/30 dark:from-amber-900/20 dark:to-amber-800/20">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 h-1 top-0"></div>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <motion.div 
                              className="inline-flex items-center px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/50 rounded-full mb-3"
                              whileHover={{ scale: 1.05 }}
                            >
                              <Award className="w-3 h-3 mr-1" />
                              Achievement
                            </motion.div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300 leading-tight">
                              {cert.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{cert.issuer}</p>
                          </div>
                          <div className="text-right ml-4">
                            <motion.span 
                              className="inline-flex items-center px-3 py-1 text-sm font-medium bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 rounded-lg"
                              whileHover={{ scale: 1.05 }}
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                              {cert.date}
                            </motion.span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 pt-0">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-2">
                          {cert.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          {cert.credentialLink && cert.credentialLink !== "#" ? (
                            <motion.a 
                              href={cert.credentialLink} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="inline-flex items-center text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium text-sm transition-colors duration-300"
                              whileHover={{ x: 2 }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View Certificate
                            </motion.a>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500 text-sm">Certificate Available</span>
                          )}
                          <motion.div
                            className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 font-medium text-sm transition-colors duration-300"
                            whileHover={{ x: 4 }}
                          >
                            View Details
                            <ExternalLink className="w-4 h-4 ml-1" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
              
              <TabsContent value="experience" className="mt-0">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 gap-6"
                >
                  {filteredCertificates.map((cert, index) => (
                    <motion.div 
                      key={cert.slug} 
                      variants={item}
                      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setLocation(`/certificate/${cert.slug}`)}
                    >
                      <div className="relative p-6 pb-4 bg-gradient-to-br from-green-50/50 to-green-100/30 dark:from-green-900/20 dark:to-green-800/20">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 h-1 top-0"></div>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <motion.div 
                              className="inline-flex items-center px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50 rounded-full mb-3"
                              whileHover={{ scale: 1.05 }}
                            >
                              <Award className="w-3 h-3 mr-1" />
                              Experience
                            </motion.div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300 leading-tight">
                              {cert.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{cert.issuer}</p>
                          </div>
                          <div className="text-right ml-4">
                            <motion.span 
                              className="inline-flex items-center px-3 py-1 text-sm font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-lg"
                              whileHover={{ scale: 1.05 }}
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                              {cert.date}
                            </motion.span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 pt-0">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-2">
                          {cert.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          {cert.credentialLink && cert.credentialLink !== "#" ? (
                            <motion.a 
                              href={cert.credentialLink} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium text-sm transition-colors duration-300"
                              whileHover={{ x: 2 }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View Certificate
                            </motion.a>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500 text-sm">Certificate Available</span>
                          )}
                          <motion.div
                            className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 font-medium text-sm transition-colors duration-300"
                            whileHover={{ x: 4 }}
                          >
                            View Details
                            <ExternalLink className="w-4 h-4 ml-1" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
              
            </Tabs>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        {viewMode === "detail" && selectedCertificate ? (
          <>
            <title>{selectedCertificate.title} | Certificate | Zeya Mosharraf</title>
            <meta name="description" content={selectedCertificate.description} />
            <meta name="keywords" content={`certificate, ${selectedCertificate.category}, ${selectedCertificate.issuer}, ${selectedCertificate.skills.join(', ')}`} />
            <meta property="og:title" content={`${selectedCertificate.title} | ${selectedCertificate.issuer}`} />
            <meta property="og:description" content={selectedCertificate.description} />
            {selectedCertificate.imageUrl && <meta property="og:image" content={selectedCertificate.imageUrl} />}
            <meta property="og:type" content="article" />
          </>
        ) : (
          <>
            <title>Certificates & Credentials | Zeya Mosharraf</title>
            <meta name="description" content="Qualifications, achievements, and professional experience in data analysis and related fields" />
            <meta name="keywords" content="certificates, credentials, courses, achievements, qualifications, data analysis" />
            <meta property="og:title" content="Certificates & Credentials | Zeya Mosharraf" />
            <meta property="og:description" content="Qualifications, achievements, and professional experience in data analysis and related fields" />
            <meta property="og:type" content="website" />
          </>
        )}
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=""
      >
        {viewMode === "detail" ? renderDetailView() : renderListView()}
      </motion.div>
    </>
  );
};

export default Certificates;