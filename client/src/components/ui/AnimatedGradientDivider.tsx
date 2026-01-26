interface AnimatedGradientDividerProps {
  className?: string;
  height?: 'sm' | 'md' | 'lg';
}

const AnimatedGradientDivider = ({ className = '', height = 'md' }: AnimatedGradientDividerProps) => {
  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className={`relative w-full ${heightClasses[height]} overflow-hidden ${className}`}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 animate-gradient-x"></div>
      
      {/* Animated wave overlay */}
      <div className="absolute inset-0 opacity-70">
        <div className="h-full bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-wave-slide"></div>
      </div>
      
      {/* Additional shimmer effect */}
      <div className="absolute inset-0 opacity-50">
        <div className="h-full bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
      </div>
    </div>
  );
};

export default AnimatedGradientDivider;