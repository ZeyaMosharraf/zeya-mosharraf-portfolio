interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'gradient';
  className?: string;
  flip?: boolean;
}

const SectionDivider = ({ variant = 'wave', className = '', flip = false }: SectionDividerProps) => {
  const WavePattern = () => (
    <svg 
      className={`w-full h-16 md:h-24 ${flip ? 'rotate-180' : ''}`}
      viewBox="0 0 1200 120" 
      preserveAspectRatio="none"
    >
      <path 
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
        fill="currentColor"
      />
    </svg>
  );

  const CurvePattern = () => (
    <svg 
      className={`w-full h-12 md:h-16 ${flip ? 'rotate-180' : ''}`}
      viewBox="0 0 1200 120" 
      preserveAspectRatio="none"
    >
      <path 
        d="M1200 120L0 16.48 0 0 1200 0 1200 120z" 
        fill="currentColor"
      />
    </svg>
  );

  const GradientDivider = () => (
    <div className={`w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 ${className}`} />
  );

  const renderPattern = () => {
    switch (variant) {
      case 'curve':
        return <CurvePattern />;
      case 'gradient':
        return <GradientDivider />;
      default:
        return <WavePattern />;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="text-gray-100 dark:text-gray-800">
        {renderPattern()}
      </div>
    </div>
  );
};

export default SectionDivider;