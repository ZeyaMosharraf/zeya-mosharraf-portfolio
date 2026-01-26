interface BadgeItem {
  name: string;
  filename: string;
  alt: string;
}

interface ImageBadgesSectionProps {
  badges?: BadgeItem[];
  title?: string;
  className?: string;
  badgesPath?: string;
}

const defaultBadges: BadgeItem[] = [
  { name: 'Python', filename: 'python.svg', alt: 'Python Programming' },
  { name: 'SQL', filename: 'sql.svg', alt: 'SQL Database' },
  { name: 'Power BI', filename: 'powerbi.svg', alt: 'Power BI Analytics' },
  { name: 'Tableau', filename: 'tableau.svg', alt: 'Tableau Visualization' },
  { name: 'Machine Learning', filename: 'ml.svg', alt: 'Machine Learning' },
];

const ImageBadgesSection = ({ 
  badges = defaultBadges, 
  title = "My Skill Badges",
  className = '',
  badgesPath = '/badges/'
}: ImageBadgesSectionProps) => {
  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 ${className}`} data-aos="fade-up">
      <div className="container mx-auto">
        {/* Title */}
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
          </div>
        )}

        {/* Badges Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop: Centered flex layout */}
          <div className="hidden md:flex justify-center items-center gap-8 flex-wrap">
            {badges.map((badge, index) => (
              <div
                key={badge.name}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-110 hover:-translate-y-2"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
                      <img
                        src={`${badgesPath}${badge.filename}`}
                        alt={badge.alt}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          // Fallback if image doesn't exist
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">${badge.name.charAt(0)}</div>`;
                          }
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                      {badge.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Horizontal scroll */}
          <div className="md:hidden">
            <div className="overflow-x-auto scrollbar-hide pb-4">
              <div className="flex space-x-4 px-4" style={{ width: 'max-content' }}>
                {badges.map((badge, index) => (
                  <div
                    key={badge.name}
                    className="flex-shrink-0 group cursor-pointer transform transition-all duration-300 hover:scale-105"
                    data-aos="fade-right"
                    data-aos-delay={index * 100}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 w-24">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                          <img
                            src={`${badgesPath}${badge.filename}`}
                            alt={badge.alt}
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              // Fallback if image doesn't exist
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">${badge.name.charAt(0)}</div>`;
                              }
                            }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                          {badge.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Swipe to see more skills
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageBadgesSection;