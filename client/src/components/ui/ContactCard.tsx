/**
 * ContactCard Component
 * Reusable contact information card
 * Used in ContactSection to display contact details with icons
 */
import React from "react";
import type { IconType } from "react-icons";

interface ContactCardProps {
  icon: IconType;
  label: string;
  value: string;
  href?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon: Icon,
  label,
  value,
  href,
}) => {
  return (
    <div className="flex items-start">
      {/* Icon box */}
      <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-red-400/70 bg-red-900/10 border border-red-900/20">
        <Icon className="text-[13px]" />
      </div>

      {/* Text content */}
      <div className="ml-3">
        <p className="text-[13px] font-medium text-gray-300">{label}</p>
        {href ? (
          <a
            href={href}
            className="text-[13px] text-gray-500 hover:text-red-400 transition-colors duration-200"
          >
            {value}
          </a>
        ) : (
          <p className="text-[13px] text-gray-500">{value}</p>
        )}
      </div>
    </div>
  );
};

export default ContactCard;
