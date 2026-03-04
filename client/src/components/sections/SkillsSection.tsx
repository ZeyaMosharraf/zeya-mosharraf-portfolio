import { motion } from "framer-motion";
import SkillBar from "@/components/ui/SkillBar";
import SectionHeader from "@/components/ui/SectionHeader";
import { programmingSkills, visualizationSkills, additionalSkills } from "@/data/skillsData";
import { Code2 } from "lucide-react";
import { ease } from "@/lib/animations";

const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-12 lg:py-16 overflow-hidden" style={{ background: '#0d0d0d' }}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 60%, rgba(220,38,38,0.03) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          icon={Code2}
          badge="Skills"
          title="Technical"
          highlight="Skills"
          subtitle="My professional toolkit includes programming languages, data analysis tools, and visualization platforms."
        />

        {/* Skill bars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease }}
          >
            <h3 className="text-[15px] font-semibold text-gray-300 mb-6 uppercase tracking-wider">Data Analysis & Programming</h3>
            <div className="space-y-5">
              {programmingSkills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} color="primary" />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            <h3 className="text-[15px] font-semibold text-gray-300 mb-6 uppercase tracking-wider">Data Visualization & BI Tools</h3>
            <div className="space-y-5">
              {visualizationSkills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} percentage={skill.percentage} color="secondary" />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional skills pills */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
        >
          <h3 className="text-[15px] font-semibold text-gray-300 mb-6 text-center uppercase tracking-wider">Additional Skills</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {additionalSkills.map((skill, index) => (
              <motion.span
                key={skill}
                className="px-4 py-2 rounded-lg text-[13px] font-medium text-gray-400 transition-all duration-200 cursor-default"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                whileHover={{ scale: 1.04, y: -2, borderColor: 'rgba(220,38,38,0.3)', color: '#e5e7eb' }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
