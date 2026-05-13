import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useLocation } from "wouter";
import {
  Calendar,
  Search,
  Zap,
  Target,
  CheckCircle2,
  Activity,
  ArrowRight,
  Shield,
  Cpu,
  BarChart3,
  Layers,
  Clock,
  X
} from "lucide-react";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";
import { CaseStudy } from "@/types/supabase";
import { useMemo } from "react";
import PageHero from "@/components/ui/PageHero";
import AnimatedBackButton from "@/components/ui/AnimatedBackButton";
import { SEO } from "@/components/SEO";
import { getProjectSchema, getBreadcrumbSchema, getWebsiteSchema } from "@/lib/schema";
import { formatDate } from "@/lib/utils/formatDate";

const CaseStudies = ({ viewMode = "list", params: routeParams }: { viewMode?: "list" | "detail", params?: { slug: string } }) => {
  const hookParams = useParams<{ slug: string }>();
  const params = routeParams || hookParams;
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const orderBy = useMemo(() => ({ column: "sort_order", ascending: true }), []);
  const { data: allCaseStudies, loading } = useSupabaseTable<CaseStudy>("case_studies", orderBy);

  const selectedCaseStudy = useMemo(() => {
    if (viewMode === "detail" && params?.slug && allCaseStudies) {
      return allCaseStudies.find(cs => cs.slug === params.slug) ?? null;
    }
    return null;
  }, [viewMode, params?.slug, allCaseStudies]);

  const filteredCaseStudies = useMemo(() => {
    if (!allCaseStudies) return [];
    return allCaseStudies.filter(cs => {
      const search = searchTerm.toLowerCase();
      const tools = typeof cs.tools === 'string' ? cs.tools : (Array.isArray(cs.tools) ? cs.tools.join(' ') : '');

      return (cs.title || '').toLowerCase().includes(search) ||
        (cs.summary || '').toLowerCase().includes(search) ||
        (cs.category || '').toLowerCase().includes(search) ||
        tools.toLowerCase().includes(search);
    });
  }, [allCaseStudies, searchTerm]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewMode, params?.slug]);

  const renderDetailView = () => {
    if (!selectedCaseStudy) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Study Not Found</h2>
            <button
              onClick={() => setLocation("/case-studies")}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all"
            >
              Back to Operations
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#0d0d0d] selection:bg-red-500/30">
        <SEO
          title={`${selectedCaseStudy.title} | Engineering Case Study`}
          description={selectedCaseStudy.summary ?? undefined}
          article={true}
          schemaData={[
            getProjectSchema({
              title: selectedCaseStudy.title,
              description: selectedCaseStudy.summary || "",
              category: selectedCaseStudy.category,
              slug: selectedCaseStudy.slug,
              tools: Array.isArray(selectedCaseStudy.tools) ? selectedCaseStudy.tools : (selectedCaseStudy.tools?.split(',') || [])
            }),
            getBreadcrumbSchema([
              { name: "Home", item: "/" },
              { name: "Operations", item: "/case-studies" },
              { name: selectedCaseStudy.title, item: `/case-study/${selectedCaseStudy.slug}` }
            ])
          ]}
        />

        {/* ── ATMOSPHERIC DEPTH (aligned with Projects section) ── */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(220,38,38,0.02) 0%, transparent 65%)",
            zIndex: 0,
          }}
        />

        {/* ── HERO SECTION (LEFT ALIGNED) ── */}
        <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 border-b border-white/[0.03]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-start max-w-3xl">
              <AnimatedBackButton onClick={() => setLocation("/case-studies")} label="Back to Case Studies" />

              {/* Contextual Label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="mt-8 mb-5 flex items-center gap-2"
              >
                <div className="w-1 h-1 rounded-full bg-red-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500/70">
                  Engineering Case Study
                </span>
              </motion.div>

              {/* Title — restrained 24/32/38/42px */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-[24px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-bold text-white tracking-tight leading-[1.2] mb-6 max-w-[700px]"
              >
                {selectedCaseStudy.title}
              </motion.h1>

              {/* Metadata Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="flex flex-wrap items-center gap-5 text-[11px] text-gray-600 font-medium mb-8"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 opacity-40" />
                  <span>{formatDate(selectedCaseStudy.created_at)}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/5" />
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 opacity-40" />
                  <span>{selectedCaseStudy.category.split('|')[0].trim()}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/5" />
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 opacity-40" />
                  <span>Operational System</span>
                </div>
              </motion.div>

              {/* Outcome Statement */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-600/40" />
                <p className="text-[14px] md:text-[15px] text-gray-400 leading-relaxed font-medium">
                  {selectedCaseStudy.summary}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT (WIDER LAYOUT) ── */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

            {/* Storytelling Column */}
            <div className="lg:col-span-8 space-y-24">

              {/* Editorial Summary */}
              <motion.section
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500/40 mb-8 flex items-center gap-3">
                  <Layers className="w-3.5 h-3.5" />
                  Context & Overview
                </h2>
                <div className="prose prose-invert prose-red max-w-none">
                  <p className="text-[15px] md:text-[17px] text-gray-200 leading-[1.7] font-medium mb-8">
                    {selectedCaseStudy.problem}
                  </p>
                  <p className="text-[13px] md:text-[14px] text-gray-500 leading-[1.8] whitespace-pre-line">
                    {selectedCaseStudy.solution}
                  </p>
                </div>
              </motion.section>

              {/* Execution Flow (Refined) */}
              {selectedCaseStudy.results && (
                <motion.section
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500/40 mb-10 flex items-center gap-3">
                    <Cpu className="w-3.5 h-3.5" />
                    Technical Execution
                  </h2>

                  <div className="grid grid-cols-1 gap-3">
                    {typeof selectedCaseStudy.results === 'string' && selectedCaseStudy.results.includes('\n') ? (
                      selectedCaseStudy.results.split('\n').map((point, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05, duration: 0.4 }}
                          className="group flex items-center gap-5 p-5 rounded-xl bg-white/[0.015] border border-white/[0.04] hover:bg-white/[0.025] hover:border-white/[0.08] transition-all duration-300"
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-red-500/20 group-hover:bg-red-500/[0.02] transition-colors duration-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gray-700 group-hover:text-red-500 transition-colors" />
                          </div>
                          <span className="text-[14px] text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors duration-300">
                            {point.trim()}
                          </span>
                        </motion.div>
                      ))
                    ) : (
                      <div className="p-5 rounded-xl bg-white/[0.015] border border-white/[0.04] text-[14px] text-gray-500">
                        {selectedCaseStudy.results}
                      </div>
                    )}
                  </div>
                </motion.section>
              )}

              {/* Operational Impact (Refined Centerpiece) */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="relative p-10 md:p-14 rounded-3xl overflow-hidden group bg-[#0f0f0f] border border-white/[0.04]"
              >
                {/* Atmospheric depth */}
                <div className="absolute inset-0 bg-red-600/[0.01] pointer-events-none" />
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/[0.03] blur-[80px] rounded-full" />

                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 mb-10 flex items-center gap-3">
                  <BarChart3 className="w-4 h-4" />
                  Measurable Impact
                </h2>

                <div className="relative z-10">
                  <p className="text-[16px] md:text-[18px] lg:text-[20px] text-white leading-[1.6] font-medium italic mb-10 tracking-tight">
                    "{selectedCaseStudy.results}"
                  </p>

                  <div className="flex items-center gap-4 pt-8 border-t border-white/[0.05]">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-[13px]">Engineering Success</h4>
                      <p className="text-gray-600 text-[10px] uppercase tracking-widest mt-1">Verified Operational Outcome</p>
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Sidebar (Integrated Meta) */}
            <aside className="lg:col-span-4 space-y-10 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-10"
              >
                {/* Tech Stack */}
                <div className="p-7 rounded-2xl bg-white/[0.015] border border-white/[0.04]">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-6 flex items-center gap-2">
                    <Layers className="w-3 h-3" />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(Array.isArray(selectedCaseStudy.tools) ? selectedCaseStudy.tools : (selectedCaseStudy.tools?.split(',') || [])).map((tool, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-md text-[11px] text-gray-500 font-medium">
                        {tool.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Parameters */}
                <div className="p-7 rounded-2xl bg-white/[0.015] border border-white/[0.04]">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 mb-6 flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    Project Metadata
                  </h4>
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-gray-600">Cycle Duration</span>
                      <span className="text-[12px] text-gray-300 font-bold">2-4 Weeks</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-gray-600">Platform Scope</span>
                      <span className="text-[12px] text-gray-300 font-bold">Production</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-gray-600">Impact Score</span>
                      <span className="text-[12px] text-red-600 font-bold uppercase">High</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div
                  className="p-7 rounded-2xl relative overflow-hidden group cursor-pointer"
                  style={{ background: "rgba(220,38,38,0.02)", border: "1px solid rgba(220,38,38,0.08)" }}
                  onClick={() => setLocation('/contact')}
                >
                  <h4 className="text-white font-bold text-[14px] mb-2">Technical Deep-Dive?</h4>
                  <p className="text-[12px] text-gray-500 leading-relaxed mb-5">
                    Interested in how I automated these workflows? Let's discuss the engineering details.
                  </p>
                  <div className="flex items-center gap-2 text-red-500 text-[12px] font-bold group-hover:gap-3 transition-all">
                    Reach out
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
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
      <div className="min-h-screen bg-[#0d0d0d]">
        <SEO
          title="Case Studies | Operational Engineering"
          description="Detailed analyses of real-world operational challenges and measurable engineering solutions by Zeya Mosharraf."
          schemaData={getWebsiteSchema()}
        />

        <PageHero
          title="Case Studies"
          subtitle="How data engineering and automation solve real-world business bottlenecks."
        />

        {/* Atmospheric Depth refined */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(220,38,38,0.02) 0%, transparent 65%)",
            zIndex: 0,
          }}
        />

        {/* ── Editorial Command Bar ── */}
        <div
          className="sticky top-[64px] z-30 px-4 sm:px-6 lg:px-8 py-3"
          style={{
            background: "rgba(13,13,13,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.03)",
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Search */}
            <div className="relative group w-full max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                style={{ width: "12px", height: "12px", color: "#374151" }}
              />
              <input
                type="text"
                placeholder="Filter operational stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-8 pl-8 pr-7 text-[11px] text-gray-300 placeholder-gray-700 bg-white/[0.02] border border-white/[0.04] rounded-lg outline-none transition-all duration-300 focus:border-red-500/20 focus:bg-white/[0.04]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <X style={{ width: "10px", height: "10px" }} />
                </button>
              )}
            </div>

            {/* Right: Breadcrumb/Context */}
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700 hidden sm:block">Archive</span>
               <div className="w-1 h-1 rounded-full bg-white/5 hidden sm:block" />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500/50">Operational Engineering</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 relative z-10">

          <div className="grid grid-cols-1 gap-12 lg:gap-20">
            {filteredCaseStudies.map((cs: CaseStudy, index: number) => (
              <motion.article
                key={cs.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start cursor-pointer"
                onClick={() => setLocation(`/case-study/${cs.slug}`)}
              >
                {/* Visual Accent */}
                <div className="hidden lg:block lg:col-span-1 pt-2">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center transition-colors group-hover:border-red-500/20 group-hover:bg-red-500/[0.02]">
                    <span className="text-[12px] font-bold text-gray-700 group-hover:text-red-500/50">0{index + 1}</span>
                  </div>
                </div>

                {/* Content Story */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-500/80">
                      {cs.category.split('|')[0]}
                    </span>
                    <span className="text-gray-700 text-[10px]">•</span>
                    <span className="text-[11px] text-gray-600 font-medium">{new Date(cs.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-red-50 transition-colors leading-tight">
                    {cs.title}
                  </h3>

                  <p className="text-[14px] text-gray-500 leading-relaxed max-w-2xl">
                    {cs.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {(Array.isArray(cs.tools) ? cs.tools : (cs.tools?.split(',') || [])).slice(0, 4).map((tool, j, arr) => (
                      <span key={j} className="text-[10px] text-gray-700 font-medium uppercase tracking-wider">
                        {tool.trim()}{j < arr.length - 1 ? ' • ' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcome Highlight */}
                <div className="lg:col-span-4 lg:pl-8">
                  <div className="relative p-6 lg:p-8 rounded-2xl bg-white/[0.01] border border-white/[0.04] overflow-hidden group-hover:bg-red-500/[0.01] group-hover:border-red-500/10 transition-all duration-500">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Zap className="w-10 h-10 text-red-500" />
                    </div>

                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-red-500/60 mb-4 flex items-center gap-2">
                      <Target className="w-3.5 h-3.5" />
                      Key Outcome
                    </h4>

                    <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-4 italic">
                      "{(cs.results || '').split('.')[0]}."
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-[12px] font-bold text-red-500 group-hover:gap-4 transition-all">
                      Read full study
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="absolute -bottom-8 lg:-bottom-12 left-0 right-0 h-px bg-white/5 group-last:hidden" />
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

export default CaseStudies;