import React from "react";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaHackerrank, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { SiGooglecloud } from "react-icons/si";
import { Wifi } from "lucide-react";
import { motion } from "framer-motion";

export const getIconByName = (name: string, className?: string) => {
  switch (name) {
    case 'github': return <FaGithub className={className} />;
    case 'linkedin': return <FaLinkedinIn className={className} />;
    case 'envelope': 
    case 'mail': return <FaEnvelope className={className} />;
    case 'cloud': return <SiGooglecloud className={className} />;
    case 'hackerrank': return <FaHackerrank className={className} />;
    case 'map-pin': return <FaMapMarkerAlt className={className} />;
    case 'clock': return <FaClock className={className} />;
    default: return <Wifi className={className} />;
  }
};

interface SocialLinksProps {
  containerClassName?: string;
  linkClassName?: string;
  iconClassName?: string;
  style?: React.CSSProperties;
  animated?: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  containerClassName = "flex gap-3",
  linkClassName = "flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 transition-all duration-300 hover:text-white hover:border-red-500 bg-white/2 border border-white/6",
  iconClassName = "text-[15px]",
  style,
  animated = false
}) => {
  const { data: allData, loading } = useSupabaseTable<any>("portfolio_info", { column: "sort_order", ascending: true });
  if (loading) return <div className="text-xs text-gray-600">Loading...</div>;
  const socialLinks = allData.filter(item => item.category === "social_link");

  return (
    <div className={containerClassName}>
      {socialLinks.map(link => {
        const href = link.link_url || (link.label.toLowerCase() === 'email' || link.icon_name === 'mail' ? `https://mail.google.com/mail/?view=cm&fs=1&to=${link.display_value || link.value}` : (link.display_value || link.value));
        const child = getIconByName(link.icon_name || '', iconClassName);
        
        if (animated) {
          return (
            <motion.a
              key={link.id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
              style={style}
              aria-label={link.label}
              whileHover={{ y: -3, borderColor: 'rgba(220,38,38,0.2)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {child}
            </motion.a>
          );
        }

        return (
          <a
            key={link.id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
            style={style}
            aria-label={link.label}
          >
            {child}
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
