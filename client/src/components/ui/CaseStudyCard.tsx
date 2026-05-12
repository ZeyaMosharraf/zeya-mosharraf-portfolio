import { ArrowRight, Calendar, Target } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

import { CaseStudy } from "@/types/supabase";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

const getCategoryColor = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('marketing')) return '#f97316';
  if (cat.includes('automation')) return '#a78bfa';
  if (cat.includes('data analytics') || cat.includes('business intelligence')) return '#22d3ee';
  return '#34d399';
};

const CaseStudyCard = ({ caseStudy }: CaseStudyCardProps) => {
  const [, setLocation] = useLocation();
  const catColor = getCategoryColor(caseStudy.category);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => setLocation(`/case-study/${caseStudy.slug}`)}
      className="group relative flex flex-col h-full cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 border border-white/5 bg-white/[0.015] hover:border-white/10"
    >
      <div className="p-6 lg:p-8 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: catColor, boxShadow: `0 0 8px ${catColor}` }} />
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: catColor }}>
              {caseStudy.category.split('|')[0].trim()}
            </span>
          </div>
          <span className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">
            {new Date(caseStudy.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-red-50 transition-colors">
          {caseStudy.title}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-gray-500 leading-relaxed mb-6 line-clamp-3">
          {caseStudy.summary}
        </p>

        {/* Outcome Snippet */}
        <div 
          className="mt-auto p-4 rounded-xl relative overflow-hidden"
          style={{ background: "rgba(220,38,38,0.02)", border: "1px solid rgba(220,38,38,0.06)" }}
        >
          <div className="flex items-center gap-2 text-red-500/60 mb-2">
            <Target className="w-3 h-3" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Impact</span>
          </div>
          <p className="text-[11px] text-gray-500 leading-relaxed italic line-clamp-2">
            "{(caseStudy.results || '').split('.')[0]}."
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(caseStudy.tools) ? caseStudy.tools : (caseStudy.tools?.split(',') || [])).slice(0, 2).map((tool, idx) => (
              <span key={idx} className="text-[9px] font-bold uppercase tracking-widest text-gray-600">
                {tool.trim()}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-red-500 text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            Read Study
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default CaseStudyCard;