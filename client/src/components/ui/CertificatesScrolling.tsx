import { Button } from './button';
import { ChevronLeft, ChevronRight, Calendar, ExternalLink, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useSupabaseTable } from '@/hooks/useSupabaseTable';
import { COLORS, FONTS, BG_GRADIENTS } from '@/lib/constants';

interface Certificate {
  id?: number;
  title: string;
  issuer: string;
  issued_date: string;
  image_url?: string;
  credential_url?: string;
  tags: string[];
  category?: string;
  sort_order: number;
}

interface CertificatesScrollingProps {
  title?: string;
  className?: string;
}

const CertificatesScrolling = ({
  title = "Certifications & Achievements",
  className = ''
}: CertificatesScrollingProps) => {
  const { data: certificates, loading } = useSupabaseTable<Certificate>("certifications", {
    column: "sort_order",
    ascending: true
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

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
      checkScrollPosition();
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
    <section className={`relative py-12 lg:py-16 overflow-hidden ${className}`} style={{ background: BG_GRADIENTS.sectionDark }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: BG_GRADIENTS.radialRed60 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {title && (
          <motion.div
            className="text-center mb-10"
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
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full p-0 hover:scale-110 transition-all duration-300 bg-white/5 border border-white/8 backdrop-blur-sm"
              variant="ghost"
            >
              <ChevronLeft className="h-5 w-5 text-gray-400" />
            </Button>
          )}

          {canScrollRight && (
            <Button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full p-0 hover:scale-110 transition-all duration-300 bg-white/5 border border-white/8 backdrop-blur-sm"
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
              {loading ? (
                // Loading skeleton
                <>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={`skeleton-${i}`}
                      className="flex-shrink-0 w-80 h-96 rounded-xl animate-pulse"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                    />
                  ))}
                </>
              ) : (
                certificates.map((cert, index) => (
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
                ))
              )}
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
        {certificate.image_url ? (
          <img src={certificate.image_url} alt={certificate.title} className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
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
            {certificate.category || 'Certificate'}
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
              <span>{certificate.issued_date}</span>
            </div>
          </div>
        </div>

        {/* Skills/Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {certificate.tags && certificate.tags.length > 0 && (
              <>
                {certificate.tags.slice(0, 3).map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-[10px] font-medium text-gray-500 rounded" style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                    {tag}
                  </span>
                ))}
                {certificate.tags.length > 3 && (
                  <span className="px-2 py-0.5 text-[10px] font-medium text-gray-600 rounded" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
                    +{certificate.tags.length - 3}
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* View Link */}
        {certificate.credential_url && (
          <a
            href={certificate.credential_url}
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
                    <span>{certificate.issued_date}</span>
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded uppercase tracking-wide" style={{ background: 'rgba(220,38,38,0.08)', color: 'rgba(220,38,38,0.8)', border: '1px solid rgba(220,38,38,0.12)' }}>
                {certificate.category || 'Certificate'}
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="relative p-6" style={{ background: 'rgba(255,255,255,0.01)' }}>
            {certificate.image_url ? (
              <div className="flex justify-center">
                <img src={certificate.image_url} alt={certificate.title} className="max-w-full max-h-[60vh] object-contain rounded-lg" />
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
                {certificate.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-[11px] font-medium text-gray-400 rounded" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              {certificate.credential_url && (
                <a
                  href={certificate.credential_url}
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