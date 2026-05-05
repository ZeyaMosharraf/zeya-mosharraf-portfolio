/**
 * Social Links Data
 * Centralized social media links for reuse across components
 */
import { FaLinkedin, FaGithub } from "react-icons/fa";
import type { IconType } from "react-icons";

export interface SocialLink {
  label: string;
  url: string;
  icon: IconType;
}

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/zeya-mosharraf/",
    icon: FaLinkedin,
  },
  {
    label: "GitHub",
    url: "https://github.com/ZeyaMosharraf",
    icon: FaGithub,
  },
];
