import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";
import { CaseStudy } from "@/types/supabase";
import CaseStudyCard from "@/components/ui/CaseStudyCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { Layers, Search, Sparkles } from "lucide-react";

const CaseStudies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const orderBy = useMemo(() => ({ column: "sort_order", ascending: true }), []);
  const { data: caseStudies, loading } = useSupabaseTable<CaseStudy>("case_studies", orderBy);

  const filteredStudies = useMemo(() => {
    if (!caseStudies) return [];
    return caseStudies.filter(cs => 
      cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.tools_array?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [caseStudies, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <SEO 
        title="Case Studies | Engineering & Analytics Editorial"
        description="Deep dives into complex engineering challenges, technical architecture, and measurable business outcomes."
      />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/5 border border-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-8">
            <Sparkles className="w-3 h-3" />
            Engineering Archive
          </div>
          <h1 className="text-[40px] md:text-[56px] font-bold text-white mb-6 tracking-tighter">
            Strategic Case Studies
          </h1>
          <p className="text-gray-500 text-[14px] md:text-[16px] max-w-2xl mx-auto leading-relaxed opacity-70">
            Deep dives into technical architecture, operational intelligence, and high-impact engineering solutions.
          </p>
        </div>

        {/* Search / Filters */}
        <div className="mb-12 relative group max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-700 group-focus-within:text-red-500 transition-colors">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search tech, category, or challenge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.01] border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-[12px] text-white placeholder-gray-700 focus:outline-none focus:border-red-500/30 focus:bg-white/[0.02] transition-all"
          />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-[400px] rounded-3xl bg-white/[0.02] animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredStudies.map((cs, idx) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <CaseStudyCard caseStudy={cs} />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredStudies.length === 0 && (
          <div className="text-center py-20">
            <Layers className="w-12 h-12 text-gray-800 mx-auto mb-4 opacity-20" />
            <p className="text-gray-500 text-[13px]">No matching case studies found in the hangar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseStudies;
