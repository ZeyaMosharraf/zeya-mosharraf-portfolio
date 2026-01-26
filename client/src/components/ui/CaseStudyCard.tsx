import { motion } from "framer-motion";
import { ArrowRight, Calendar, Zap, TrendingUp } from "lucide-react";
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

const CaseStudyCard = ({ caseStudy }: CaseStudyCardProps) => {
  const [, setLocation] = useLocation();

  // Get category color
  const getCategoryColor = (category: string) => {
    if (category.toLowerCase().includes('data analytics')) return 'from-blue-500 to-cyan-500';
    if (category.toLowerCase().includes('automation')) return 'from-purple-500 to-violet-500';
    if (category.toLowerCase().includes('marketing')) return 'from-orange-500 to-red-500';
    return 'from-green-500 to-emerald-500';
  };

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('data analytics')) return TrendingUp;
    if (category.toLowerCase().includes('automation')) return Zap;
    if (category.toLowerCase().includes('marketing')) return TrendingUp;
    return Zap;
  };

  const CategoryIcon = getCategoryIcon(caseStudy.category);

  return (
    <motion.div
      className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 p-6 h-full flex flex-col overflow-hidden cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setLocation(`/case-study/${caseStudy.slug}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${getCategoryColor(caseStudy.category)} text-white shadow-lg`}>
            <CategoryIcon className="w-3 h-3 mr-1.5" />
            {caseStudy.category.split('|')[0].trim()}
          </div>
          <motion.div
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ rotate: 45 }}
          >
            <ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {caseStudy.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {caseStudy.shortDescription}
        </p>

        {/* Tools Preview */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {caseStudy.toolsUsed.slice(0, 3).map((tool, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md"
              >
                {tool}
              </span>
            ))}
            {caseStudy.toolsUsed.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md">
                +{caseStudy.toolsUsed.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer with date */}
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
          <Calendar className="w-3 h-3 mr-1.5" />
          {caseStudy.date}
        </div>

        {/* Action Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setLocation(`/case-study/${caseStudy.slug}`);
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg mt-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-testid={`button-read-case-study-${caseStudy.slug}`}
        >
          <span>Read Case Study</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Hover effect border */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${getCategoryColor(caseStudy.category)} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
    </motion.div>
  );
};

export default CaseStudyCard;