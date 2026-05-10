import React from "react";
import { getIconByName } from "./SocialLinks";

interface ContactCardProps {
  iconName: string;
  label: string;
  value: string;
  href?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  iconName,
  label,
  value,
  href,
}) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-red-400/70 bg-red-900/10 border border-red-900/20">
        {getIconByName(iconName, "text-[13px]")}
      </div>
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
