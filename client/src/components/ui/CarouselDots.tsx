/**
 * CarouselDots Component
 * Reusable pagination dots for carousel/slider components
 * Used in ExperienceSection and can be reused for other carousels
 */
import React from "react";

interface CarouselDotsProps {
  /** Array of items (only length matters for dot count) */
  items: any[];
  /** Currently active/selected index */
  activeIndex: number;
  /** Callback when dot is clicked */
  onDotClick: (index: number) => void;
  /** Optional className for container */
  containerClassName?: string;
}

const CarouselDots: React.FC<CarouselDotsProps> = ({
  items,
  activeIndex,
  onDotClick,
  containerClassName = "flex justify-center gap-1.5 mt-8",
}) => {
  return (
    <div className={containerClassName}>
      {items.map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className="h-[3px] rounded-full transition-all duration-400"
          style={{
            width: index === activeIndex ? 28 : 8,
            background:
              index === activeIndex
                ? "#DC2626"
                : "rgba(255,255,255,0.08)",
          }}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default CarouselDots;
