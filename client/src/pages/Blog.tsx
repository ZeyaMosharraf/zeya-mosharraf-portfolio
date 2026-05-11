import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useLocation } from "wouter";
import { ArrowLeft, Calendar, Tag, User, ArrowUpRight, BookOpen, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Helmet } from "react-helmet-async";
import AnimatedBackButton from "@/components/ui/AnimatedBackButton";
import { SEO } from "@/components/SEO";

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
  const params = routeParams || hookParams;
  const [, setLocation] = useLocation();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(() => {
    if (viewMode === "detail" && params?.slug) {
      return blogPosts.find(p => p.slug === params.slug) ?? null;
    }
    return null;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (viewMode === "detail" && params?.slug) {
      const post = blogPosts.find(p => p.slug === params.slug);
      setSelectedPost(post || null);
    }
  }, [viewMode, params?.slug]);

  const renderDetailView = () => {
    if (!selectedPost) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Entry Not Found</h2>
            <button
              onClick={() => setLocation("/blog")}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all"
            >
              Back to Journal
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#0d0d0d] selection:bg-red-500/30">
        <SEO 
          title={`${selectedPost.title} | Engineering Journal`}
          description={selectedPost.shortDescription}
        />

        {/* ── ATMOSPHERIC DEPTH ── */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(220,38,38,0.02) 0%, transparent 65%)",
            zIndex: 0,
          }}
        />

        {/* ── LEFT-ALIGNED EDITORIAL HERO ── */}
        <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 border-b border-white/[0.03]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-start max-w-3xl">
              <AnimatedBackButton onClick={() => setLocation("/blog")} label="Back to Journal" />
              
              {/* Contextual Label */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="mt-8 mb-5 flex items-center gap-2"
              >
                <div className="w-1 h-1 rounded-full bg-red-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500/70">
                  Engineering Journal Entry
                </span>
              </motion.div>

              {/* Title — restrained 24/32/38/42px */}
              <motion.h1 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-[24px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-bold text-white tracking-tight leading-[1.2] mb-6 max-w-[700px]"
              >
                {selectedPost.title}
              </motion.h1>

              {/* Metadata Row */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="flex flex-wrap items-center gap-5 text-[11px] text-gray-600 font-medium"
              >
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 opacity-40" />
                  <span>{selectedPost.author}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/5" />
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 opacity-40" />
                  <span>{selectedPost.date}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/5" />
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 opacity-40" />
                  <span className="text-red-500 font-medium">{selectedPost.category}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/5" />
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 opacity-40" />
                  <span>5 min read</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Editorial Content */}
            <div className="lg:col-span-8">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="prose prose-invert prose-red max-w-none"
              >
                <div 
                  className="text-gray-400 leading-[1.8] text-[14px] md:text-[15px] space-y-8"
                  dangerouslySetInnerHTML={{ __html: selectedPost.fullContent }} 
                />
              </motion.article>

              {/* Tags Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-20 pt-10 border-t border-white/[0.05]"
              >
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-6 flex items-center gap-2">
                  <Tag className="h-3.5 w-3.5" />
                  Indexed Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/[0.03] border border-white/[0.05] rounded-lg text-[11px] text-gray-500 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar Meta */}
            <aside className="lg:col-span-4 space-y-10 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-8 rounded-2xl bg-white/[0.015] border border-white/[0.04] space-y-8"
              >
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-4">About this entry</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    This entry documents a technical challenge and implementation strategy used in an operational production environment.
                  </p>
                </div>

                <div className="pt-8 border-t border-white/[0.05]">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-4">Engagement</h4>
                  <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                    Have questions about the technical approach discussed here?
                  </p>
                  <button 
                    onClick={() => setLocation('/contact')}
                    className="flex items-center gap-2 text-red-500 text-[12px] font-bold hover:gap-3 transition-all"
                  >
                    Start a technical thread
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </aside>
          </div>
        </main>
      </div>
    );
  };

  const renderListView = () => {
    return (
      <div className="min-h-screen bg-[#0d0d0d] selection:bg-red-500/30">
        <SEO 
          title="Engineering Journal | Technical Insights"
          description="A collection of technical articles, engineering insights, and data analysis tutorials."
        />

        {/* ── ATMOSPHERIC DEPTH ── */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(220,38,38,0.02) 0%, transparent 65%)",
            zIndex: 0,
          }}
        />

        {/* ── JOURNAL HERO ── */}
        <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 flex items-center gap-2"
              >
                <div className="w-1 h-1 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500/80">
                  Technical Repository
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8"
              >
                Engineering Journal
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-[16px] md:text-[18px] text-gray-500 leading-relaxed"
              >
                Documenting technical discoveries, engineering patterns, and data-driven insights.
              </motion.p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setLocation(`/blog/${post.slug}`)}
                className="group relative flex flex-col cursor-pointer"
              >
                {/* Cinematic Card Layout */}
                <div 
                  className="relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-500 border border-white/[0.04] group-hover:border-white/[0.08]"
                  style={{ background: "rgba(255,255,255,0.01)" }}
                >
                  <div className="p-8 flex flex-col h-full">
                    {/* Header Meta */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-red-500/60">
                          {post.category}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-600 font-medium">
                        {post.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 leading-tight transition-colors group-hover:text-red-50">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[14px] text-gray-500 leading-relaxed mb-8 line-clamp-3 flex-grow">
                      {post.shortDescription}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/[0.05]">
                      <div className="flex items-center gap-2 text-gray-600 text-[12px]">
                        <User className="w-3.5 h-3.5 opacity-40" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-red-500 text-[12px] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                        Read Entry
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Ambient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {viewMode === "detail" ? renderDetailView() : renderListView()}
      </AnimatePresence>
    </div>
  );
};

export default Blog;