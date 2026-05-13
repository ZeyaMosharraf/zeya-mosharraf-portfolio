import { motion } from "framer-motion";
import { User2 } from "lucide-react";
import { fadeInRight } from "@/lib/animations";
import SectionHeader from "@/components/ui/SectionHeader";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";

interface PortfolioContent {
  id: string;
  section: string;
  content: string;
  updated_at?: string;
  sort_order?: number;
}

const AboutSection = () => {
  const { data: contentData, loading } = useSupabaseTable<PortfolioContent>("portfolio_content");
  
  const aboutContent = contentData.find(item => item.section?.toLowerCase() === "about");
  const displayContent = aboutContent?.content || "";
  
  console.log("About section data:", { contentData, aboutContent, displayContent });

  return (
    <section id="about" className="relative py-12 lg:py-16 overflow-hidden" style={{ background: '#0d0d0d' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 50% at 25% 50%, rgba(220,38,38,0.03) 0%, transparent 60%)' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Content */}
        <motion.div
          className="space-y-5"
          {...fadeInRight(0.1)}
        >
          <SectionHeader
            icon={User2}
            badge="About Me"
            title="About"
            highlight="Me"
          />

          {loading ? (
            <div className="text-gray-500 text-[13px] text-center">Loading content...</div>
          ) : displayContent ? (
            displayContent.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-[15px] text-gray-400 leading-relaxed">
                {paragraph}
              </p>
            ))
          ) : (
            <div className="text-gray-500 text-[13px] text-center italic">
              Please add a row to your Supabase "portfolio_content" table with section "about" to display your content here.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
