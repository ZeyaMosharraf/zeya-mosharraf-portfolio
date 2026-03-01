import Hero from "@/components/sections/Hero";
import FeaturedCaseStudySection from "@/components/sections/FeaturedCaseStudySection";
import AnalyticsDashboard from "@/components/sections/AnalyticsDashboard";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import CertificatesScrolling from "@/components/ui/CertificatesScrolling";
import { motion } from "framer-motion";

/* Staggered section reveal — each section slides up as it enters the viewport */
const sectionReveal = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const Home = () => {
  return (
    <div style={{ background: "#0B0F14" }}>
      {/* Hero — no wrapper needed, it animates itself */}
      <Hero />

      {/* Each section gets a scroll-triggered upward reveal */}
      <motion.div variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}>
        <FeaturedCaseStudySection />
      </motion.div>

      <motion.div variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}>
        <AnalyticsDashboard />
      </motion.div>

      <motion.div variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}>
        <ExperienceSection />
      </motion.div>

      <motion.div variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}>
        <ProjectsSection showFeaturedOnly={true} />
      </motion.div>

      <motion.div variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}>
        <SkillsSection />
      </motion.div>

      <motion.div variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}>
        <CertificatesScrolling />
      </motion.div>

      <motion.div variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}>
        <AboutSection />
      </motion.div>

      <motion.div variants={sectionReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}>
        <ContactSection />
      </motion.div>
    </div>
  );
};

export default Home;
