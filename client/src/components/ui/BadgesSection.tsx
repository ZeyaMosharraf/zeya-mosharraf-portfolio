import { Badge } from './badge';

interface SkillBadge {
  name: string;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  level: 'Expert' | 'Advanced' | 'Intermediate';
}

interface BadgesSectionProps {
  badges?: SkillBadge[];
  title?: string;
  className?: string;
}

const defaultBadges: SkillBadge[] = [
  { name: 'Python', icon: '🐍', color: 'blue', level: 'Expert' },
  { name: 'SQL', icon: '🗃️', color: 'green', level: 'Expert' },
  { name: 'Power BI', icon: '📊', color: 'orange', level: 'Advanced' },
  { name: 'Tableau', icon: '📈', color: 'purple', level: 'Advanced' },
  { name: 'Machine Learning', icon: '🤖', color: 'red', level: 'Advanced' }
];

const BadgesSection = ({ badges = defaultBadges, title = "Core Skills", className = '' }: BadgesSectionProps) => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300',
      green: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300',
      purple: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-300',
      orange: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-300',
      red: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className={`py-12 px-4 sm:px-6 lg:px-8 ${className}`} data-aos="fade-up">
      <div className="container mx-auto text-center">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            {title}
          </h2>
        )}
        
        {/* Horizontal scrolling container */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 pb-4 min-w-max justify-center lg:justify-center">
            {badges.map((badge, index) => (
              <div
                key={badge.name}
                className="flex-shrink-0 group cursor-pointer transition-transform duration-300 hover:scale-105"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className={`
                  flex flex-col items-center p-6 rounded-2xl border-2 min-w-[120px] sm:min-w-[140px]
                  ${getColorClasses(badge.color)}
                  transition-all duration-300 hover:shadow-lg hover:-translate-y-1
                `}>
                  {/* Icon */}
                  <div className="text-3xl sm:text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {badge.icon}
                  </div>
                  
                  {/* Skill Name */}
                  <h3 className="font-semibold text-sm sm:text-base mb-1">
                    {badge.name}
                  </h3>
                  
                  {/* Level Badge */}
                  <Badge 
                    variant="secondary" 
                    className="text-xs px-2 py-1 opacity-80"
                  >
                    {badge.level}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      

    </section>
  );
};

export default BadgesSection;