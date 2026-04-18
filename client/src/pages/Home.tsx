import Hero from "@/components/sections/Hero";
import FeaturedCaseStudySection from "@/components/sections/FeaturedCaseStudySection";
import AnalyticsDashboard from "@/components/sections/AnalyticsDashboard";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import CertificatesScrolling from "@/components/ui/CertificatesScrolling";
import { RevealSection } from "@/components/ui/common";
import { SEO } from "@/components/SEO";

const Home = () => {
  return (
    <>
      <SEO
        title="Zeya Mosharraf | Data Analyst & Analytics Engineer"
        description="Welcome to Zeya Mosharraf's portfolio — a Data Analyst skilled in Python, SQL, Power BI, Google Cloud, and Machine Learning. View projects, certifications, and experience."
        keywords="Zeya Mosharraf, Data Analyst, Analytics Engineer, Python, SQL, Power BI, Google Cloud, Machine Learning, BigQuery, Tableau, portfolio"
        canonicalUrl="https://zeyamosharraf.com"
      />

      <div style={{ background: "#0B0F14" }}>
        {/* Hero — no wrapper needed, it animates itself */}
        <Hero />

        {/* Each section gets a scroll-triggered upward reveal */}
        <RevealSection><FeaturedCaseStudySection /></RevealSection>
        <RevealSection><AnalyticsDashboard /></RevealSection>
        <RevealSection><ExperienceSection /></RevealSection>
        <RevealSection><ProjectsSection showFeaturedOnly={true} /></RevealSection>
        <RevealSection><SkillsSection /></RevealSection>
        <RevealSection><CertificatesScrolling /></RevealSection>
        <RevealSection><AboutSection /></RevealSection>
        <RevealSection><ContactSection /></RevealSection>
      </div>
    </>
  );
};

export default Home;
