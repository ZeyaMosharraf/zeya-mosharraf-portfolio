/**
 * SectionBackground Component
 * Reusable dark background with radial gradient for all section containers
 * Eliminates duplication across 7+ section components
 */
import React from "react";

interface SectionBackgroundProps {
  /** Position of gradient center (e.g., "60% 40%") */
  gradientPosition?: string;
  /** Size of gradient (e.g., "60% 50%") */
  gradientSize?: string;
  /** Optional custom gradient */
  customGradient?: string;
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({
  gradientPosition = "50% 50%",
  gradientSize = "60% 50%",
  customGradient,
}) => {
  const gradient = customGradient || 
    `radial-gradient(ellipse ${gradientSize} at ${gradientPosition}, rgba(220,38,38,0.03) 0%, transparent 60%)`;

  return (
    <>
      {/* Dark background */}
      <div 
        className="absolute inset-0" 
        style={{ background: "#0d0d0d" }} 
      />
      
      {/* Radial gradient accent */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: gradient }} 
      />
    </>
  );
};

export default SectionBackground;
