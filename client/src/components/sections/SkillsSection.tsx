import { motion, useInView } from "framer-motion";
import SkillBar from "@/components/ui/SkillBar";
import { programmingSkills, visualizationSkills, additionalSkills } from "@/data/skillsData";
import { Code2 } from "lucide-react";
import { useRef } from "react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SkillsSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section id="skills" className="relative py-24 lg:py-32 overflow-hidden" style={{ background: '#0d0d0d' }}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 60%, rgba(220,38,38,0.03) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase mb-5 relative overflow-hidden"
            style={{ background: 'rgba(239,68,68,0.08)', color: 'rgba(239,68,68,0.8)', border: '1px solid rgba(239,68,68,0.12)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.1) 50%, transparent 100%)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
            />
            <Code2 className="w-3 h-3 relative z-10" />
            <span className="relative z-10">Skills</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.06 }}
          >
            Technical{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)' }}>Skills</span>
          </motion.h2>

          <motion.p
            className="text-[15px] text-gray-500 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
          >
            My professional toolkit includes programming languages, data analysis tools, and visualization platforms.
          </motion.p>
        </div>

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
