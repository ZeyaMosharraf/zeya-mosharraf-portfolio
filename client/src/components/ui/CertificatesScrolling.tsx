import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { ChevronLeft, ChevronRight, Calendar, ExternalLink, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  imageUrl?: string;
  skills: string[];
  category: string;
  credentialLink?: string;
}

interface CertificatesScrollingProps {
  certificates?: Certificate[];
  title?: string;
  className?: string;
}

const defaultCertificates: Certificate[] = [
  {
    id: 1,
    title: 'Google Data Analytics',
    issuer: 'Google',
    date: '2021',
    skills: ["Data Analysis",
        "Data Cleaning",
        "Data Visualization",
        "Spreadsheets",
        "SQL",
        "R",
        "Data-Driven Decision Making"],
    category: 'Specialization',
    credentialLink: 'https://coursera.org/share/a28feb8c1fe7f8875c235bfdfb9c8f10',
    imageUrl: 'https://github.com/ZeyaMosharraf/zeyamosharraf.github.io/blob/main/Images/Certificate/Google%20Data%20Analytics.jpg?raw=true'
  },
  {
    id: 2,
    title: 'Google Advanced Data Analytics',
    issuer: 'Google',
    date: '2023',
    skills: [
        "Data Science",
        "Python",
        "Statistics",
        "Regression Analysis",
        "Machine Learning",
        "Data Visualization",
        "Predictive Modeling"
    ],
    category: 'Professional',
    credentialLink: 'https://coursera.org/share/d739582bfd61b66840b858675ee291b6',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Google%20Advanced%20Data%20Analytics.jpg'
  },
  {
    id: 3,
    title: 'The Structured Query Language',
    issuer: 'University of Colorado Boulder',
    date: '2023',
    skills: [
        "SQL",
        "Database Querying",
        "Data Manipulation",
        "Data Retrieval"
    ],
    category: 'Certificate',
    credentialLink: 'https://coursera.org/share/8012cdaf4bf6f400f250fa35eecd1f95',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/SQL%20Course.jpg'
  },
  {
    id: 4,
    title: 'Microsoft Excel',
    issuer: 'Udemy',
    date: '2024',
    skills: [
        "Microsoft Excel",
        "Data Analysis",
        "Spreadsheet Modeling",
        "Excel Formulas",
        "Data Visualization"
    ],
    category: 'Certificate',
    credentialLink: 'https://www.udemy.com/certificate/UC-aeff1a93-cde0-41af-8315-af4ebff31b11/',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Microsoft%20Excel.jpg'
  },
  {
    id: 5,
    title: 'Excel for Data Analysis',
    issuer: 'Microsoft',
    date: '2023',
    skills: [
        "Data Preparation",
        "Microsoft Excel",
        "Data Cleaning",
        "Spreadsheet Management",
        "Data Analysis"
    ],
    category: 'Certificate',
    credentialLink: 'https://coursera.org/share/3356449a5215f9fe0c9b1e4c1c4fb019',
    imageUrl: 'https://github.com/ZeyaMosharraf/zeyamosharraf.github.io/blob/main/Images/Certificate/Excel%20for%20Data%20Analysis.jpg?raw=true'
  },
  {
    id: 6,
    title: 'Exploring Data Transformation with Google Cloud',
    issuer: 'Google',
    date: '2023',
    skills: [
        "ETL",
        "Google Cloud",
        "Data Analysis"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/6413982',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Innovating%20with%20Data%20and%20Google%20Cloud.png'
  },
  {
    id: 7,
    title: 'Introduction to Large Language Models',
    issuer: 'Google',
    date: '2023',
    skills: [
        "LLM",
        "Google Cloud",
        "AI",
        "Machine Learning",
        "Data Analysis"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/6414875',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Introdution%20to%20Large%20Language%20Models.png'
 },
 {
    id: 8,
    title: 'Introduction to Generative AI',
    issuer: 'Google',
    date: '2023',
    skills: [
      "Generative AI",
      "Data Analysis"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/6452259',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Introduction%20to%20Generative%20AI.png'
 },
 {
    id: 9,
    title: 'Set Up an App Dev Environment',
    issuer: 'Google',
    date: '2024',
    skills: [
        "Cloud Functions",
        "Cloud Storage",
        "IAM",
        "Monitoring",
        "Pub/sub"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8129633',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Perform%20Foundational%20Infrastructure%20Task%20in%20Google%20cloud.png'
},
 {
    id: 10,
    title: 'Store, Process, and Manage Data',
    issuer: 'Google',
    date: '2024',
    skills: [
        "Cloud Functions",
        "Cloud Storage",
        "Image Processing",
        "Google Cloud Compute",
        "Pub/sub"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8154516',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Store%2C%20Process%2C%20and%20Manage%20Data%20-%20Console.png'
},
{
    id: 11,
    title: 'The Basics of Google Cloud Compute',
    issuer: 'Google',
    date: '2024',
    skills: [
        "Compute Engine",
        "Virtual Machines",
        "Web Servers",
        "Persistent Disks"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8166722',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/The%20basic%20of%20Google%20Cloud%20Compute.png'
  },
  {
    id: 12,
    title: 'Insights from Data with BigQuery',
    issuer: 'Google',
    date: '2024',
    skills: [
        "Google Cloud",
        "Big Query",
        "Data Cleaning",
        "Data Analysis"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8180435',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Insights%20from%20Data%20with%20BigQuery.png'
  },
  {
    id: 13,
    title: 'Perform Foundational Data, ML, and AI Tasks',
    issuer: 'Google',
    date: '2024',
    skills: [
        "Google Cloud",
        "Machine Learning",
        "AI",
        "Data Management"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8224691',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Perform%20Foundational%20Data%2C%20ML%2C%20And%20AI%20Task%20in%20Google%20Cloud.png'
  },
  {
    id: 14,
    title: 'Build Infrastructure with Terraform',
    issuer: 'Google',
    date: '2024',
    skills: [
        "Google Cloud Platform (GCP)",
        "Infrastructure as Code (IaC)",
        "Terraform"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8475299',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Build%20Infrastructure%20with%20Terraform%20on%20Google%20Cloud.png'
  },
  {
    id: 15,
    title: 'Build a Website on Google Cloud',
    issuer: 'Google',
    date: '2024',
    skills: [
        "Cloud Run",
        "Compute Engine",
        "Cloud Build",
        "GKE",
        "Microservice Architecture"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8475032',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Build%20a%20Website%20on%20Google%20Cloud.png'
  },
  {
    id: 16,
    title: 'Build a Data Warehouse with BigQuery',
    issuer: 'Google',
    date: '2024',
    skills: [
        "BigQuery",
        "Data Ingestion",
        "Data Model",
        "Data Warehouse"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8479233',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Build%20a%20Website%20on%20Google%20Cloud.png'
  },
  {
    id: 17,
    title: 'Create ML Models with BigQuery ML',
    issuer: 'Google',
    date: '2024',
    skills: [
        "Dialogflow",
        "BigQuery ML",
        "Forecasting",
        "Machine Learning"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8479270',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Create%20ML%20Models%20with%20BigQuery%20ML.png'
  },
  {
    id: 18,
    title: 'Detect Manufacturing Defects using Visual Inspection AI',
    issuer: 'Google',
    date: '2024',
    skills: [
        "Machine Learning",
        "ML Models",
        "Visual Inspection AI"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8494930',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Detect%20Manufacturing%20Defects%20using%20Visual%20Inspection%20AI.png'
  }
];

const CertificatesScrolling = ({ 
  certificates = defaultCertificates, 
  title = "Certifications & Achievements",
  className = '' 
}: CertificatesScrollingProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Check scroll position to show/hide navigation buttons
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Initial check
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  // Smooth scroll functions
  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <section className={`relative py-24 lg:py-32 overflow-hidden ${className}`} style={{ background: '#0d0d0d' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 40% 50%, rgba(220,38,38,0.03) 0%, transparent 60%)' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {title && (
          <motion.div 
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-4">
              Certifications &{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)' }}>Achievements</span>
            </h2>
            <p className="text-[15px] text-gray-500 max-w-xl mx-auto leading-relaxed">
              Professional certifications and continuous learning achievements showcasing expertise in data analytics
            </p>
          </motion.div>
        )}

        {/* Horizontally scrollable container with navigation */}
        <div className="relative">
          {/* Glassmorphism Navigation Buttons */}
          {canScrollLeft && (
            <Button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full p-0 hover:scale-110 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)' }}
              variant="ghost"
            >
              <ChevronLeft className="h-5 w-5 text-gray-400" />
            </Button>
          )}
          
          {canScrollRight && (
            <Button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full p-0 hover:scale-110 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)' }}
              variant="ghost"
            >
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Button>
          )}

          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #0d0d0d, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #0d0d0d, transparent)' }} />
          
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide pb-4 pt-4"
            onScroll={checkScrollPosition}
          >
            <div className="flex space-x-6 px-4 py-4" style={{ width: 'max-content' }}>
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0"
                >
                  <CertificateCard 
                    certificate={cert} 
                    onClick={() => setSelectedCertificate(cert)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile swipe instruction */}
        <div className="text-center mt-6 lg:hidden">
          <p className="text-[12px] text-gray-600">
            Swipe to see more certificates
          </p>
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal 
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
};

// Modern Certificate Card Component
const CertificateCard = ({ certificate, onClick }: { certificate: Certificate; onClick?: () => void }) => {
  return (
    <motion.div
      className="group rounded-xl overflow-hidden h-full w-80 cursor-pointer transition-all duration-300 relative"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Top glow line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent)' }} />
      {/* Certificate Image */}
      <div className="relative h-48 overflow-hidden" style={{ background: 'rgba(255,255,255,0.01)' }}>
        {certificate.imageUrl ? (
          <img src={certificate.imageUrl} alt={certificate.title} className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-2 rounded-xl flex items-center justify-center" style={{ background: 'rgba(220,38,38,0.08)' }}>
                <span className="text-xl">🏆</span>
              </div>
              <h3 className="font-medium text-gray-300 text-[13px]">{certificate.title}</h3>
            </div>
          </div>
        )}
        
        <div className="absolute top-3 right-3">
          <span className="px-2 py-0.5 text-[10px] font-semibold rounded uppercase tracking-wide" style={{ background: 'rgba(220,38,38,0.08)', color: 'rgba(220,38,38,0.8)', border: '1px solid rgba(220,38,38,0.12)' }}>
            {certificate.category}
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="rounded-full p-2.5" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <ZoomIn className="text-white w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-[15px] font-bold text-white group-hover:text-red-400 transition-colors duration-200 mb-1.5 line-clamp-2">
            {certificate.title}
          </h3>
          <div className="flex items-center gap-2 text-[12px] text-gray-500">
            <span className="font-medium">{certificate.issuer}</span>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{certificate.date}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {certificate.skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="px-2 py-0.5 text-[10px] font-medium text-gray-500 rounded" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                {skill}
              </span>
            ))}
            {certificate.skills.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] font-medium text-gray-600 rounded" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
                +{certificate.skills.length - 3}
              </span>
            )}
          </div>
        </div>
        
        {/* View Link */}
        {certificate.credentialLink && (
          <a
            href={certificate.credentialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 h-[34px] rounded-lg text-[12px] font-medium text-white transition-all duration-200"
            style={{ background: '#DC2626' }}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3 h-3" />
            View Credential
          </a>
        )}
      </div>
    </motion.div>
  );
};

// Certificate Modal Component
const CertificateModal = ({ 
  certificate, 
  onClose 
}: { 
  certificate: Certificate | null; 
  onClose: () => void; 
}) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (certificate) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          className="relative rounded-xl overflow-hidden max-w-4xl max-h-[90vh]"
          style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)' }}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="p-6" style={{ background: 'rgba(220,38,38,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-start justify-between pr-10">
              <div>
                <h2 className="text-xl font-bold text-white mb-1.5">{certificate.title}</h2>
                <div className="flex items-center gap-2 text-[13px] text-gray-500">
                  <span className="font-medium">{certificate.issuer}</span>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{certificate.date}</span>
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded uppercase tracking-wide" style={{ background: 'rgba(220,38,38,0.08)', color: 'rgba(220,38,38,0.8)', border: '1px solid rgba(220,38,38,0.12)' }}>
                {certificate.category}
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="relative p-6" style={{ background: 'rgba(255,255,255,0.01)' }}>
            {certificate.imageUrl ? (
              <div className="flex justify-center">
                <img src={certificate.imageUrl} alt={certificate.title} className="max-w-full max-h-[60vh] object-contain rounded-lg" />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ background: 'rgba(220,38,38,0.08)' }}>
                    <span className="text-2xl">🏆</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{certificate.title}</h3>
                  <p className="text-gray-600 text-[13px]">Certificate image not available</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="mb-5">
              <h3 className="text-[12px] font-semibold text-gray-400 mb-2 uppercase tracking-wider">Skills & Competencies</h3>
              <div className="flex flex-wrap gap-1">
                {certificate.skills.map((skill, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-[11px] font-medium text-gray-400 rounded" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              {certificate.credentialLink && (
                <a
                  href={certificate.credentialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 h-[38px] rounded-lg text-[13px] font-medium text-white transition-all duration-200"
                  style={{ background: '#DC2626' }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Credential
                </a>
              )}
              <button
                onClick={onClose}
                className="h-[38px] px-5 rounded-lg text-[13px] font-medium text-gray-400 transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CertificatesScrolling;