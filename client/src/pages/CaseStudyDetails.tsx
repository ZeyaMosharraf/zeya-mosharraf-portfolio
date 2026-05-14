import { useRoute } from "wouter";
import { useEffect, useState } from "react";
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
  Clock
} from "lucide-react";
import AnimatedBackButton from "@/components/ui/AnimatedBackButton";
import { Link } from "wouter";
import { supabase } from "@/lib/supabase";
import { CaseStudy } from "@/types/supabase";

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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-red-500/30 pb-32">
      <SEO title={`${data.title} | Case Study`} description={data.summary ?? ""} />

      {/* ── AMBIENT DEPTH ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/[0.03] blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-500/[0.02] blur-[150px]" />
      </div>

      <div className="max-w-[1100px] mx-auto px-6 sm:px-10 py-20 relative z-10">
        <div className="mb-16">
          <AnimatedBackButton label="Engineering Archive" onClick={() => window.history.back()} />
        </div>

        {/* ── HERO ── */}
        <header className="pt-32 pb-24 border-b border-white/5">
          <div className="flex items-center gap-4 mb-10">
            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest border border-red-500/20">
              {data.category}
            </span>
            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest opacity-50">Project ID: {data.id.slice(0, 5)}</span>
          </div>

          <h1 className="text-[40px] md:text-[56px] font-bold text-white mb-8 tracking-tighter leading-tight">
            {data.title}
          </h1>

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mb-16 opacity-80">
            {data.summary}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5">
            {[
              { l: "ROLE", v: data.project_type || "Senior Analytics Engineer" },
              { l: "TIMELINE", v: data.sort_order ? "8 Weeks" : "Active" },
              { l: "STACK", v: Array.isArray(data.tools_array) ? data.tools_array.join(" + ") : "Enterprise BI" },
              { l: "IMPACT", v: data.impact_metrics?.headline || "Significant", c: "text-red-500" }
            ].map((m, i) => (
              <div key={i}>
                <span className="block text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] mb-3">{m.l}</span>
                <span className={`text-[13px] font-bold uppercase tracking-widest ${m.c || "text-white"}`}>{m.v}</span>
              </div>
            ))}
          </div>
        </header>

        {/* ── CONTENT FLOW ── */}
        <div className="py-24 space-y-32">
          
          {/* Executive Summary */}
          {data.problem && (
            <section className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-10 tracking-tight">Executive Summary</h2>
              <div className="space-y-6">
                <p className="text-gray-400 text-[16px] leading-[1.8] font-medium opacity-80">
                  {data.problem}
                </p>
                {data.solution && (
                  <p className="text-gray-400 text-[16px] leading-[1.8] font-medium opacity-80">
                    {data.solution}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Business Comparison */}
          {data.workflow && (
            <section className="grid md:grid-cols-2 gap-8">
              <div className="p-10 rounded-3xl bg-white/[0.01] border border-white/5">
                <span className="block text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] mb-8">THE LEGACY STATE</span>
                <div className="space-y-8">
                  {data.workflow.legacy?.map((item: any, i: number) => (
                    <div key={i}>
                      <h4 className="text-white text-sm font-bold mb-1">{item.t}</h4>
                      <p className="text-gray-500 text-[13px] leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-10 rounded-3xl bg-red-500/[0.02] border border-red-500/10">
                <span className="block text-[10px] text-red-500/60 font-black uppercase tracking-[0.2em] mb-8">THE SYSTEM STATE</span>
                <div className="space-y-8">
                  {data.workflow.improved?.map((item: any, i: number) => (
                    <div key={i}>
                      <h4 className="text-white text-sm font-bold mb-1">{item.t}</h4>
                      <p className="text-gray-500 text-[13px] leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Architecture Diagram */}
          {data.architecture && (
            <section className="text-center py-10">
              <h2 className="text-2xl font-bold text-white mb-16 tracking-tight">Solution Architecture</h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                {[
                  { icon: Database, label: "Ingestion" },
                  { icon: Cpu, label: "Middleware", active: true },
                  { icon: Layout, label: "Interface" }
                ].map((node, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    <div className="flex flex-col items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${node.active ? "bg-red-500/20 text-red-500 border border-red-500/30" : "bg-white/[0.03] text-gray-600 border border-white/5"}`}>
                        <node.icon className="w-7 h-7" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{node.label}</span>
                    </div>
                    {i < 2 && (
                      <div className="hidden md:block">
                        <ArrowRight className="w-5 h-5 text-gray-800" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Challenges / Decisions */}
          {data.challenges && (
            <section className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-12 tracking-tight">Engineering Decisions</h2>
              <div className="space-y-12">
                {data.challenges.map((d: any, i: number) => (
                  <div key={i} className="pl-8 border-l border-red-500/30 relative">
                     <div className="absolute top-0 left-[-1px] w-[1px] h-full bg-red-500" />
                     <h4 className="text-white text-[18px] font-bold mb-4">{d.title}</h4>
                     <div className="space-y-3">
                       <p className="text-gray-500 text-[14px] leading-relaxed"><span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mr-2">Problem:</span> {d.problem}</p>
                       <p className="text-gray-400 text-[14px] leading-relaxed"><span className="text-red-500/60 font-bold uppercase text-[10px] tracking-widest mr-2">Solution:</span> {d.solution}</p>
                     </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── DASHBOARD EMBED — centerpiece ── */}
          {(data.live_url || data.cover_image) && (
            <section className="text-center">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
                  Interactive Operational Intelligence
                </span>
                <div className="flex-1 h-px bg-white/[0.03]" />
              </div>

              <div className="relative group max-w-5xl mx-auto">
                <div 
                  className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[#080808]"
                  style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.6)" }}
                >
                  {/* Title bar chrome */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-[#111] border-b border-white/[0.05]">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28CA40]" />
                    </div>
                    <span className="text-[10px] ml-2 text-gray-700 font-mono">
                      {data.title} — Live System
                    </span>
                  </div>

                  <div className="aspect-video w-full">
                    {data.live_url ? (
                    <iframe
                      title="Ops Performance"
                      width="100%"
                      height="100%"
                      src={data.live_url}
                      frameBorder="0"
                      allowFullScreen={true}
                      className="w-full h-full border-0"
                      sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                    />
                    ) : (
                      <img src={data.cover_image || ""} alt="System Preview" className="w-full object-cover" />
                    )}
                  </div>
                </div>
                
                {data.github_url && (
                  <div className="mt-10 flex justify-center">
                    <a href={data.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-gray-400 text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                      View Source Code <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Impact Metrics */}
          {data.impact_metrics?.stats && (
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {data.impact_metrics.stats.map((m: any, i: number) => (
                <div key={i} className="p-8 rounded-3xl bg-white/[0.01] border border-white/[0.03] text-center">
                  <span className="block text-2xl md:text-3xl font-bold text-white mb-2">{m.v}</span>
                  <span className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em]">{m.l}</span>
                </div>
              ))}
            </section>
          )}

          {/* Technical Learnings */}
          {data.technical_learnings && (
            <section className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-10 tracking-tight">Technical Learnings</h2>
              <div className="grid gap-4">
                {data.technical_learnings.map((l: string, i: number) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/[0.01] border border-white/5 text-gray-400 text-[14px] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    {l}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Results / Reflection */}
          {data.results && (
            <section className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-10 tracking-tight">Engineering Reflection</h2>
              <p className="text-gray-400 text-[16px] leading-[1.8] font-medium opacity-80">
                {data.results}
              </p>
            </section>
          )}

          {/* Footer CTA */}
          <footer className="pt-24 border-t border-white/5 flex flex-col items-center">
            <span className="text-[10px] text-gray-800 font-black uppercase tracking-[0.4em] mb-10">Explore more engineering narratives.</span>
            <Link href="/case-studies">
              <span className="group flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full text-[12px] font-black uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer">
                View All Case Studies
                <ArrowRightCircle className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetails;
