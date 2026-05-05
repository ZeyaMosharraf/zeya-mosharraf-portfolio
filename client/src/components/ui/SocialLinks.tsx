/**
 * SocialLinks Component
 * Reusable social media links display component
 * Can be used in multiple places: footer, contact section, navbar, etc.
 */
import React from "react";
import { socialLinks, type SocialLink } from "@/data/socialLinks";

interface SocialLinksProps {
  /** Custom links (defaults to socialLinks from data) */
  links?: SocialLink[];
  /** Custom className for container */
  containerClassName?: string;
  /** Custom className for each link button */
  linkClassName?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  links = socialLinks,
  containerClassName = "flex gap-3",
  linkClassName = "w-10 h-10 rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200 bg-white/2 border border-white/6",
}) => {
  return (
    <div className={containerClassName}>
      {links.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            aria-label={social.label}
            title={social.label}
          >
            <Icon className="text-[15px]" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
