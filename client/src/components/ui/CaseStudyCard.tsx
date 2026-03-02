import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useLocation } from "wouter";

interface CaseStudy {
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
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

const getCategoryColor = (category: string) => {
  if (category.toLowerCase().includes('marketing')) return '#f97316';
  if (category.toLowerCase().includes('automation')) return '#a78bfa';
  if (category.toLowerCase().includes('data analytics') || category.toLowerCase().includes('business intelligence')) return '#22d3ee';
  return '#34d399';
};

const CaseStudyCard = ({ caseStudy }: CaseStudyCardProps) => {
  const [, setLocation] = useLocation();
  const catColor = getCategoryColor(caseStudy.category);

  return (
    <motion.div
      className="group relative rounded-xl p-6 h-full flex flex-col cursor-pointer transition-all duration-250 ease-out hover:-translate-y-1.5 overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
      onClick={() => setLocation(`/case-study/${caseStudy.slug}`)}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = '0 12px 32px -8px rgba(0,0,0,0.3)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Top glow line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent)' }} />
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-medium"
            style={{ background: `${catColor}15`, color: catColor, border: `1px solid ${catColor}25` }}
          >
            {caseStudy.category.split('|')[0].trim()}
          </div>
          <div className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-200 mb-3 leading-tight group-hover:text-white transition-colors duration-300">
          {caseStudy.title}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-gray-500 leading-relaxed mb-5 flex-grow line-clamp-3">
          {caseStudy.shortDescription}
        </p>

        {/* Tools */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1.5">
            {caseStudy.toolsUsed.slice(0, 3).map((tool, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-[11px] font-medium text-gray-400 rounded"
                style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
              >
                {tool}
              </span>
            ))}
            {caseStudy.toolsUsed.length > 3 && (
              <span
                className="px-2 py-0.5 text-[11px] font-medium text-gray-600 rounded"
                style={{ border: '1px solid rgba(255,255,255,0.04)' }}
              >
                +{caseStudy.toolsUsed.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center text-gray-600 text-[12px] mb-4">
          <Calendar className="w-3 h-3 mr-1.5" />
          {caseStudy.date}
        </div>

        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLocation(`/case-study/${caseStudy.slug}`);
          }}
          className="group/btn w-full inline-flex items-center justify-center gap-2 h-[38px] text-[13px] font-medium rounded-lg transition-all duration-250"
          style={{ border: '1px solid rgba(255,255,255,0.08)', color: '#9CA3AF' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(220,38,38,0.35)'; e.currentTarget.style.color = '#e5e7eb'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#9CA3AF'; }}
          data-testid={`button-read-case-study-${caseStudy.slug}`}
        >
          <span>Read Case Study</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};

export default CaseStudyCard;