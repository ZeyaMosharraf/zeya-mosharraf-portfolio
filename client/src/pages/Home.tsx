import Hero from "@/components/sections/Hero";
import FeaturedCaseStudySection from "@/components/sections/FeaturedCaseStudySection";
import MedallionArchitectureUI from "@/components/sections/medallion-architecture-ui";
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

      <div style={{ background: "#0d0d0d" }}>
        {/* Hero — no wrapper needed, it animates itself */}
        <Hero />

        {/* Each section gets a scroll-triggered upward reveal */}
        <RevealSection><FeaturedCaseStudySection /></RevealSection>
        
        {/* Medallion Architecture Section */}
        <section className="relative py-12 lg:py-16 overflow-hidden" style={{ background: '#0d0d0d' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(220,38,38,0.03) 0%, transparent 60%)' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <RevealSection><MedallionArchitectureUI /></RevealSection>
          </div>
        </section>

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
