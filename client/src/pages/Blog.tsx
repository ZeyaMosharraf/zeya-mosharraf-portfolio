import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useLocation } from "wouter";
import { ArrowLeft, Calendar, Tag, User, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogdata";
import { Helmet } from "react-helmet-async";

type BlogPost = {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  shortDescription: string;
  fullContent: string;
  imageUrl?: string;
  tags: string[];
  slug: string;
}

interface BlogProps {
  viewMode?: "list" | "detail";
  params?: { slug: string };
}

const Blog = ({ viewMode = "list", params: routeParams }: BlogProps) => {
  const hookParams = useParams<{ slug: string }>();
  // Use passed params if available, otherwise use hook params
  const params = routeParams || hookParams;
  const [, setLocation] = useLocation();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  


  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If viewing a detailed blog post, find the post by ID
    if (viewMode === "detail" && params?.slug) {
      const post = blogPosts.find(p => p.slug === params.slug);
      setSelectedPost(post || null);
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
    if (!selectedPost) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Blog Post Not Found</h2>
            <Button 
              onClick={() => setLocation("/blog")} 
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
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
                onClick={() => setLocation("/blog")}
                className="mb-8 inline-flex items-center px-6 py-3 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ArrowLeft className="mr-3" /> Back to Blog
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 text-white bg-white/20 backdrop-blur-sm">
                  {selectedPost.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center justify-center text-white/90 mb-6 space-x-6">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    <span className="text-lg">{selectedPost.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span className="text-lg">{selectedPost.date}</span>
                  </div>
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
              className="bg-white dark:bg-gray-900/80 rounded-2xl p-8 shadow-lg mb-8 border border-gray-200 dark:border-red-900/20"
            >
              <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: selectedPost.fullContent }}>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white dark:bg-gray-900/80 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-red-900/20"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900 dark:text-gray-100">
                <Tag className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" />
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((tag, index) => (
                  <motion.span 
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  };
  
  // List view rendering function
  const renderListView = () => {
    // Define a mapping of categories to gradients
    const categoryGradients: Record<string, string> = {
      "DATA SCIENCE": "from-red-600 to-red-700",
      "VISUALIZATION": "from-orange-500 to-orange-600",
      "SQL": "from-red-700 to-red-800",
      "PYTHON": "from-orange-600 to-red-600"
    };
    
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
                Data Insights Blog
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-white/90 max-w-3xl mx-auto"
              >
                Thoughts, tutorials, and insights on data analysis, visualization, and modern techniques
              </motion.p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {blogPosts.map((post, index) => (
                <motion.article 
                  key={post.slug}
                  variants={item} 
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setLocation(`/blog/${post.slug}`)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Header with category gradient */}
                  <div className={`relative p-6 pb-4 bg-gradient-to-r ${categoryGradients[post.category] || "from-red-600 to-red-700"} text-white`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                    <motion.div 
                      className="inline-flex items-center px-3 py-1 text-xs font-semibold text-white bg-white/20 rounded-full mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {post.category}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 leading-tight line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-white/90 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.shortDescription}
                    </p>

                    {/* Tags */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <motion.span 
                            key={tagIndex}
                            className="px-2 py-1 text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200 rounded-md"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 + tagIndex * 0.1 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <motion.div
                        className="flex items-center text-red-600 font-medium text-sm group-hover:text-red-700 transition-colors duration-300"
                        whileHover={{ x: 4 }}
                      >
                        Read Article
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.article>
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
        {viewMode === "detail" && selectedPost ? (
          <>
            <title>{selectedPost.title} | Blog | Zeya Mosharraf</title>
            <meta name="description" content={selectedPost.shortDescription} />
            <meta name="keywords" content={`blog, ${selectedPost.category.toLowerCase()}, ${selectedPost.tags.join(', ')}`} />
            <meta property="og:title" content={selectedPost.title} />
            <meta property="og:description" content={selectedPost.shortDescription} />
            {selectedPost.imageUrl && <meta property="og:image" content={selectedPost.imageUrl} />}
            <meta property="og:type" content="article" />
            <meta name="author" content={selectedPost.author} />
          </>
        ) : (
          <>
            <title>Data Insights Blog | Zeya Mosharraf</title>
            <meta name="description" content="Thoughts, tutorials, and insights on data analysis, visualization, and modern techniques" />
            <meta name="keywords" content="data analysis, blog, data science, visualization, python, SQL" />
            <meta property="og:title" content="Data Insights Blog | Zeya Mosharraf" />
            <meta property="og:description" content="Thoughts, tutorials, and insights on data analysis, visualization, and modern techniques" />
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

export default Blog;