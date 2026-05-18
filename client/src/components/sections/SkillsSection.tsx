import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { Code2 } from "lucide-react";
import { ease, fadeInLeft, fadeInRight } from "@/lib/animations";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  sort_order: number;
}

const getCategoriesInOrder = (skills: Skill[]): string[] => {
  const seen = new Set<string>();
  return skills
    .filter(skill => !seen.has(skill.category) && seen.add(skill.category), seen)
    .map(skill => skill.category);
};

const getCategoryColor = (index: number): "primary" | "secondary" => {
  return index % 2 === 0 ? "primary" : "secondary";
};

const SkillBarSkeleton = () => (
  <div className="space-y-5">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="space-y-2">
        <div
          className="h-3.5 rounded w-2/3 animate-pulse"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        <div
          className="h-2.5 rounded-full w-full animate-pulse"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
      </div>
    ))}
  </div>
);

const PillsSkeleton = () => (
  <div className="flex flex-wrap justify-center gap-2">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <div
        key={i}
        className="h-8 rounded-lg animate-pulse"
        style={{
          width: `${60 + (i % 4) * 20}px`,
          background: "rgba(255,255,255,0.04)",
        }}
      />
    ))}
  </div>
);

const SkillsSection = () => {
  const { data: skills, loading } = useSupabaseTable<Skill>("skills", {
    column: "sort_order",
    ascending: true
  });

  /* Group skills by category */
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  /* Get categories in order */
  const categoriesInOrder = getCategoriesInOrder(skills);

  return (
    <section
      id="skills"
      className="relative py-12 lg:py-16 overflow-hidden"
      style={{ background: "#0d0d0d" }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 60%, rgba(220,38,38,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          icon={Code2}
          badge="Skills"
          title="Technical"
          highlight="Skills"
          subtitle="My professional toolkit includes programming languages, data analysis tools, and visualization platforms."
        />

        {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <motion.div key={i} className="space-y-6" {...fadeInLeft()}>
                  <div className="h-5 bg-gray-600 rounded w-3/4 animate-pulse mb-6" />
                  <SkillBarSkeleton />
                </motion.div>
              ))}
            </>
          ) : (
            <div className={`grid grid-cols-1 ${categoriesInOrder.length > 2 ? 'lg:grid-cols-3' : 'md:grid-cols-2'} gap-10 lg:gap-16`}>
              {categoriesInOrder.map((category, idx) => {
                const categorySkills = grouped[category] ?? [];
                const color = getCategoryColor(idx);
                const isLeft = idx % 2 === 0;
                
                return (
                  <motion.div 
                    key={category} 
                    className="space-y-6" 
                    {...(isLeft ? fadeInLeft(idx * 0.1) : fadeInRight(idx * 0.1))}
                  >
                    <h3 className="text-[15px] font-semibold text-gray-300 mb-6 uppercase tracking-wider">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {categorySkills.map((skill) => (
                        <div
                          key={skill.id}
                          className="px-3.5 py-2 rounded-lg text-[13px] font-medium text-gray-400 transition-all duration-300"
                          style={{
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

        {/* Additional skills pills - only shown if there's an "additional" category */}
        {Object.keys(grouped).includes("additional") && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
          >
            <h3 className="text-[15px] font-semibold text-gray-300 mb-6 text-center uppercase tracking-wider">
              Additional Skills
            </h3>

            {loading ? (
              <PillsSkeleton />
            ) : (
              <div className="flex flex-wrap justify-center gap-2">
                {(grouped["additional"] ?? []).map((skill, index) => (
                  <motion.span
                    key={skill.id}
                    className="px-4 py-2 rounded-lg text-[13px] font-medium text-gray-400 transition-all duration-200 cursor-default"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    whileHover={{
                      scale: 1.04,
                      y: -2,
                      borderColor: "rgba(220,38,38,0.3)",
                      color: "#e5e7eb",
                    }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03, duration: 0.4 }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
