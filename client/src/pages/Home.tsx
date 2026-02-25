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

const Home = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Hero />
      
      <FeaturedCaseStudySection />
      
      <AnalyticsDashboard />
      
      <ExperienceSection />
      
      <ProjectsSection showFeaturedOnly={true} />
      
      <SkillsSection />
      
      <CertificatesScrolling />
      
      <AboutSection />
      
      <ContactSection />
    </motion.div>
  );
};

export default Home;
