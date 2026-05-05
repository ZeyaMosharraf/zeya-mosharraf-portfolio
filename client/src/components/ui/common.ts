/**
 * common - Barrel export for reusable UI components
 * 
 * Usage:
 *   import { ProjectCard, sectionBackground, shimmerBadge } from '@/components/ui/common';
 *   import { sectionBackground, shimmerBadge } from '@/components/ui/common'; // new lowercase files
 */

// PascalCase components (existing)
export { default as ProjectCard } from './ProjectCard';
export { default as CaseStudyCard } from './CaseStudyCard';
export { default as SkillBar } from './SkillBar';
export { default as RevealSection } from './RevealSection';
export { default as SectionHeader } from './SectionHeader';
export { default as SectionBackground } from './SectionBackground';
export { default as ShimmerBadge } from './ShimmerBadge';
export { default as CarouselDots } from './CarouselDots';
export { default as ContactCard } from './ContactCard';
export { default as SocialLinks } from './SocialLinks';

// lowercase components (new reusable files)
export { default as sectionBackground } from './sectionBackground';
export { default as shimmerBadge } from './shimmerBadge';
export { default as carouselDots } from './carouselDots';
export { default as contactCard } from './contactCard';
export { default as socialLinks } from './socialLinks';

// Skeleton utilities
export * from './skeletons';
