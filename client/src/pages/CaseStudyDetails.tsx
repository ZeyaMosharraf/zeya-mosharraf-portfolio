import { useRoute } from "wouter";
import React, { useRef, useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Cpu,
  Layout,
  ArrowRightCircle,
  ExternalLink,
  Calendar,
  Activity,
  Layers,
  Shield,
  Target,
  BarChart3,
  Zap,
  Clock,
  Globe
} from "lucide-react";
import AnimatedBackButton from "@/components/ui/AnimatedBackButton";
import { Link } from "wouter";
import { supabase } from "@/lib/supabase";
import { CaseStudy } from "@/types/supabase";
import ArchitectureRenderer from "@/components/sections/ArchitectureRenderer";

const SPACING = {
  hero: "pt-32 pb-24",
  section: "py-20 md:py-24",
  sectionTight: "py-12 md:py-16",
  stack: "space-y-20 md:space-y-24",
  content: "max-w-4xl mx-auto",
  container: "max-w-[1200px] mx-auto px-6 sm:px-10"
};

const CaseStudyDetails = () => {
  const [, params] = useRoute("/case-study/:slug");
  const slug = params?.slug;

  const [data, setData] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCaseStudy() {
      if (!slug) return;
      setLoading(true);
      try {
        const { data: study, error } = await supabase
          .from("case_studies")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) throw error;
        setData(study);
      } catch (err) {
        console.error("Error fetching case study:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCaseStudy();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Report Not Found</h2>
          <AnimatedBackButton label="Return to Archives" onClick={() => window.history.back()} />
        </div>
      </div>
    );
  }

  const renderFormattedText = (text: string | undefined | null) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*|==.*?==)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('==') && part.endsWith('==')) {
        return (
          <span key={i} className="text-red-500 font-bold bg-red-500/10 px-1.5 py-0.5 rounded-md border border-red-500/20 mx-0.5 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-red-500/30">
      <SEO 
        title={data.seo_config?.title || `${data.title} | Case Study`}
        description={data.seo_config?.description || data.summary || ""}
        image={data.cover_image ?? undefined}
        keywords={data.seo_config?.keywords || data.tools_array}
        article={true}
      />

      {/* ── AMBIENT DEPTH ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/[0.03] blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-500/[0.02] blur-[150px]" />
      </div>

      <div className={`${SPACING.container} pt-32 relative z-10`}>
        <div className="mb-12">
          <AnimatedBackButton label="Engineering Archive" onClick={() => window.history.back()} />
        </div>

        {/* ── HERO ── */}
        <header className="pb-24 border-b border-white/5">
          <div className="flex items-center gap-4 mb-10">
            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest border border-red-500/20">
              {data.category}
            </span>
          </div>

          <h1 className="text-[40px] md:text-[64px] font-bold text-white mb-8 tracking-tighter leading-[1.05]">
            {data.title}
          </h1>

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-4xl mb-16 opacity-80 whitespace-pre-wrap">
            {renderFormattedText(data.summary)}
          </p>

          <div className="pt-16 border-t border-white/5 space-y-12">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-4 bg-red-500 rounded-full" />
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em]">Engineered With</span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {(data.tools_array || []).map((tool: string, idx: number) => {
                  const ToolIcon = tool.toLowerCase().includes('sql') || tool.toLowerCase().includes('database') ? Database :
                                  tool.toLowerCase().includes('power bi') || tool.toLowerCase().includes('report') ? BarChart3 :
                                  tool.toLowerCase().includes('zap') || tool.toLowerCase().includes('automation') ? Zap :
                                  tool.toLowerCase().includes('script') || tool.toLowerCase().includes('code') ? Cpu :
                                  tool.toLowerCase().includes('architecture') || tool.toLowerCase().includes('layer') ? Layers : 
                                  Activity;
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + (idx * 0.1), duration: 0.5 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(239, 68, 68, 0.05)", borderColor: "rgba(239, 68, 68, 0.2)" }}
                      className="group flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white/[0.02] border border-white/5 transition-all cursor-default"
                    >
                      <ToolIcon className="w-3 h-3 text-gray-600 group-hover:text-red-500 transition-colors" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                        {tool}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Technical Access Links */}
            {(data.github_url || data.live_url) && (
              <div className="flex flex-wrap gap-6 items-center">
                {data.github_url && (
                  <a 
                    href={data.github_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/60 hover:text-white transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/[0.05] transition-all">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">Source Code</span>
                      <span className="text-[11px] font-bold uppercase tracking-widest">GitHub Repository</span>
                    </div>
                  </a>
                )}
                {data.live_url && (
                  <a 
                    href={data.live_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/60 hover:text-white transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:border-red-500/40 group-hover:bg-red-500/20 transition-all">
                      <ExternalLink className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-red-500/60 font-black uppercase tracking-[0.2em]">Live View</span>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-white">Interactive Case</span>
                    </div>
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        {/* ── CONTENT FLOW ── */}
        <div className={`${SPACING.section} ${SPACING.stack}`}>

          {/* Engineering Reflection / Impact Statement */}
          {data.impact && (
            <section className={SPACING.content}>
              <div className="p-12 rounded-[40px] bg-red-500/[0.02] border border-red-500/10 relative overflow-hidden group hover:bg-red-500/[0.04] transition-all duration-700">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/[0.03] blur-[100px] -mr-32 -mt-32" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                      <Target className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="text-[11px] text-red-500 font-black uppercase tracking-[0.3em]">Impact</span>
                  </div>

                  <p className="text-xl md:text-2xl text-gray-300 font-medium leading-relaxed italic opacity-90">
                    "{renderFormattedText(data.impact)}"
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Executive Summary */}
          {data.problem?.trim() && (
            <section className={SPACING.content}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 tracking-tighter">Problem</h2>
              <div className="space-y-8">
                <p className="text-gray-400 text-[16px] leading-[1.8] font-medium opacity-70 whitespace-pre-wrap">
                  {renderFormattedText(data.problem?.trim())}
                </p>
              </div>
            </section>
          )}

          {data.solution?.trim() && (
            <section className={SPACING.content}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 tracking-tighter">Solution</h2>
              <div className="space-y-8">
                <p className="text-gray-400 text-[16px] leading-[1.8] font-medium opacity-70 whitespace-pre-wrap">
                  {renderFormattedText(data.solution?.trim())}
                </p>
              </div>
            </section>
          )}

          {/* Business Comparison */}
          {data.workflow && (
            (data.workflow.legacy && data.workflow.legacy.length > 0) ||
            (data.workflow.system && data.workflow.system.length > 0) ||
            (data.workflow.before && data.workflow.before.length > 0) ||
            (data.workflow.after && data.workflow.after.length > 0)
          ) && (
              <section className={`grid ${(data.workflow.legacy || data.workflow.before)?.length && (data.workflow.system || data.workflow.after)?.length
                ? 'md:grid-cols-2'
                : 'grid-cols-1'
                } gap-8 max-w-6xl mx-auto`}>

                {/* Legacy / Before Section */}
                {(data.workflow.legacy || data.workflow.before)?.filter(Boolean).length > 0 && (
                  <div className="p-10 rounded-3xl bg-white/[0.01] border border-white/5">
                    <span className="block text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] mb-8">THE LEGACY STATE</span>
                    <div className="space-y-5">
                      {(data.workflow.legacy || data.workflow.before).filter(Boolean).map((item: any, i: number) => {
                        const isString = typeof item === 'string';
                        return (
                          <div key={i} className="flex gap-4 items-center group">
                            <div className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/[0.05] transition-colors">
                              <div className="w-1 h-1 rounded-full bg-gray-600" />
                            </div>
                            {isString ? (
                              <p className="text-gray-500 text-sm leading-relaxed">{renderFormattedText(item)}</p>
                            ) : (
                              <div className="space-y-0.5">
                                <h4 className="text-white text-sm font-bold tracking-tight">{item.title}</h4>
                                <p className="text-gray-500 text-[13px] leading-relaxed">{renderFormattedText(item.description)}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* System / After Section */}
                {(data.workflow.system || data.workflow.after)?.filter(Boolean).length > 0 && (
                  <div className="p-10 rounded-3xl bg-red-500/[0.01] border border-red-500/10">
                    <span className="block text-[10px] text-red-500 font-black uppercase tracking-[0.2em] mb-8">THE SYSTEM STATE</span>
                    <div className="space-y-5">
                      {(data.workflow.system || data.workflow.after).filter(Boolean).map((item: any, i: number) => {
                        const isString = typeof item === 'string';
                        return (
                          <div key={i} className="flex gap-4 items-center group">
                            <div className="w-7 h-7 rounded-lg bg-red-500/5 border border-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/10 transition-colors">
                              <Zap className="w-3 h-3 text-red-500" />
                            </div>
                            {isString ? (
                              <p className="text-gray-400 text-sm font-medium leading-relaxed">{renderFormattedText(item)}</p>
                            ) : (
                              <div className="space-y-0.5">
                                <h4 className="text-white text-sm font-bold tracking-tight">{item.title}</h4>
                                <p className="text-gray-400 text-[13px] leading-relaxed">{renderFormattedText(item.description)}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </section>
            )}

          {/* Production Showcase / Gallery - Only shown if no live dashboard exists */}
          {!data.embed_url && data.gallery && data.gallery.length > 0 && (
            <section className={SPACING.section}>
              <div className="flex items-center justify-between mb-12">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-white tracking-tight">Production Showcase</h2>
                  <p className="text-gray-500 text-sm tracking-widest uppercase font-black">Visual Evidence & Interface Walkthrough</p>
                </div>
                <div className="hidden md:flex gap-2">
                  <div className="w-8 h-1 bg-red-500/20 rounded-full" />
                  <div className="w-12 h-1 bg-red-500 rounded-full" />
                </div>
              </div>

              <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory">
                {data.gallery.map((item: any, i: number) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="min-w-[85vw] md:min-w-[700px] aspect-video rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 snap-center relative group"
                  >
                    {item.type === 'video' ? (
                      <video 
                        src={item.url} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src={item.url} 
                        alt={item.caption || "Showcase image"} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-[2px]">
                        <p className="text-white text-sm font-bold tracking-wide uppercase">{item.caption}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Architecture Diagram */}
          {data.architecture && data.architecture.nodes && data.architecture.nodes.length > 0 && (
            <section className={`text-center ${SPACING.sectionTight}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 tracking-tighter">Solution Architecture</h2>
              <ArchitectureRenderer architecture={data.architecture} />
            </section>
          )}

          {/* Challenges / Decisions */}
          {data.challenges && data.challenges.length > 0 && (
            <section className={SPACING.content}>
              <h2 className="text-2xl font-bold text-white mb-12 tracking-tight">Engineering Decisions</h2>
              <div className="space-y-12">
                {data.challenges.map((d: any, i: number) => (
                  <div key={i} className="pl-8 border-l border-red-500/30 relative">
                    <div className="absolute top-0 left-[-1px] w-[1px] h-full bg-red-500" />
                    {d.title && <h4 className="text-white text-[20px] font-bold mb-8 tracking-tight">{d.title}</h4>}
                    <div className="space-y-6">
                      {d.problem && (
                        <div className="grid grid-cols-[100px_1fr] gap-4 items-start">
                          <span className="text-gray-600 font-black uppercase text-[13px] tracking-[0.2em] pt-1">Problem</span>
                          <p className="text-gray-400 text-[16px] leading-[1.7] font-medium">
                            {d.problem}
                          </p>
                        </div>
                      )}
                      {d.solution && (
                        <div className="grid grid-cols-[100px_1fr] gap-4 items-start">
                          <span className="text-red-500 font-black uppercase text-[13px] tracking-[0.2em] pt-1">Solution</span>
                          <p className="text-gray-300 text-[16px] leading-[1.7] font-medium">
                            {d.solution}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── DASHBOARD EMBED — centerpiece ── */}
          {(data.live_url || data.cover_image) && (
            <section className="py-12">
              <div className="max-w-5xl mx-auto px-4 mb-10">
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-px flex-1 bg-white/[0.05]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 whitespace-nowrap">Interactive Operational Intelligence</span>
                  <div className="h-px flex-1 bg-white/[0.05]" />
                </div>
              </div>

              <div className="relative group max-w-[1100px] mx-auto">
                <div
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#080808]"
                  style={{ boxShadow: "0 48px 96px rgba(0,0,0,0.8)" }}
                >
                  {/* Title bar chrome */}
                  <div className="flex items-center gap-2 px-5 py-3 bg-[#111] border-b border-white/[0.05]">
                    <div className="flex gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28CA40]" />
                    </div>
                    <span className="text-[11px] ml-4 text-gray-700 font-mono tracking-widest uppercase opacity-40">
                      {data.title} — System Output
                    </span>
                  </div>

                  <div className="aspect-video w-full bg-black">
                    {data.live_url ? (
                      <iframe
                        title="Ops Performance"
                        width="100%"
                        height="100%"
                        src={data.live_url}
                        frameBorder="0"
                        allowFullScreen={true}
                        className="w-full h-full border-0"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; unload"
                        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                      />
                    ) : (
                      <img src={data.cover_image || ""} alt="System Preview" className="w-full object-cover" />
                    )}
                  </div>
                </div>

                {data.github_url && (
                  <div className="mt-12 flex justify-center">
                    <a href={data.github_url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 px-10 py-5 bg-white/[0.03] border border-white/10 rounded-full text-gray-400 text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all hover:text-white">
                      Inspect Repository <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Technical Learnings */}
          {data.technical_learnings && data.technical_learnings.length > 0 && (
            <section className={SPACING.content}>
              <h2 className="text-2xl font-bold text-white mb-10 tracking-tight">Technical Learnings</h2>
              <div className="grid gap-4">
                {data.technical_learnings.map((l: string, i: number) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white/[0.01] border border-white/5 text-gray-400 text-[15px] font-medium hover:bg-white/[0.02] transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                    {l}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Results / Reflection */}
          {data.results?.trim() && (
            <section className={SPACING.content}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 tracking-tighter">Engineering Reflection</h2>
              <p className="text-gray-400 text-[16px] leading-[1.8] font-medium opacity-70 whitespace-pre-wrap">
                {renderFormattedText(data.results?.trim())}
              </p>
            </section>
          )}

          {/* Footer CTA */}
          <footer className="pt-20 pb-16 border-t border-white/5 flex flex-col items-center">
            <span className="text-[11px] text-gray-800 font-black uppercase tracking-[0.4em] mb-8">Explore more engineering narratives.</span>
            <Link href="/case-studies">
              <span className="group flex items-center gap-5 px-12 py-6 bg-white text-black rounded-full text-[13px] font-black uppercase tracking-widest hover:scale-105 transition-all cursor-pointer shadow-xl hover:shadow-white/5">
                View All Case Studies
                <ArrowRightCircle className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetails;
