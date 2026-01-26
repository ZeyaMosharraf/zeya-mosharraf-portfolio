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
    <section className={`relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/15 dark:from-gray-900 dark:via-blue-950/10 dark:to-purple-950/10 transition-colors duration-300 overflow-hidden ${className}`}>
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-l from-blue-400/8 to-purple-400/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {title && (
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
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
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full p-0 
                         bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-white/20
                         hover:bg-white/30 dark:hover:bg-black/30 hover:scale-110 transition-all duration-300
                         shadow-lg hover:shadow-xl"
              variant="ghost"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </Button>
          )}
          
          {canScrollRight && (
            <Button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full p-0
                         bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-white/20
                         hover:bg-white/30 dark:hover:bg-black/30 hover:scale-110 transition-all duration-300
                         shadow-lg hover:shadow-xl"
              variant="ghost"
            >
              <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </Button>
          )}

          {/* Gradient overlays for scroll indication */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 z-10 pointer-events-none"></div>
          
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
          <p className="text-sm text-gray-500 dark:text-gray-400">
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
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 h-full w-80 cursor-pointer"
      whileHover={{ 
        y: -8, 
        scale: 1.01,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Certificate Image Section */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        {certificate.imageUrl ? (
          <img
            src={certificate.imageUrl}
            alt={certificate.title}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">{certificate.title}</h3>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/90 backdrop-blur-sm text-blue-700 border border-blue-200">
            {certificate.category}
          </span>
        </div>

        {/* Zoom Icon on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3">
            <ZoomIn className="text-white text-xl" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Issuer */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">
            {certificate.title}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium">{certificate.issuer}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{certificate.date}</span>
            </div>
          </div>
        </div>

        {/* Skills Tags */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {certificate.skills.slice(0, 3).map((skill, idx) => (
              <motion.span
                key={idx}
                className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md"
                whileHover={{ 
                  scale: 1.1, 
                  y: -2,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                {skill}
              </motion.span>
            ))}
            {certificate.skills.length > 3 && (
              <motion.span 
                className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                +{certificate.skills.length - 3} more
              </motion.span>
            )}
          </div>
        </div>
        
        {/* View Credential Button */}
        {certificate.credentialLink && (
          <motion.a
            href={certificate.credentialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-xl font-medium flex items-center justify-center transition-all duration-300"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              initial={{ x: -2 }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
            </motion.div>
            View Credential
          </motion.a>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5" />
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
          className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-700"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors duration-200 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{certificate.title}</h2>
                <div className="flex items-center gap-2 text-blue-100">
                  <span className="font-medium">{certificate.issuer}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{certificate.date}</span>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
                {certificate.category}
              </span>
            </div>
          </div>

          {/* Certificate Image */}
          <div className="relative bg-white dark:bg-gray-900 p-8">
            {certificate.imageUrl ? (
              <div className="flex justify-center">
                <img
                  src={certificate.imageUrl}
                  alt={certificate.title}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <span className="text-3xl">🏆</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{certificate.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">Certificate image not available</p>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 border-t border-gray-200 dark:border-gray-700">
            {/* Skills */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Skills & Competencies</h3>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {certificate.credentialLink && (
                <a
                  href={certificate.credentialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Credential
                </a>
              )}
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
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