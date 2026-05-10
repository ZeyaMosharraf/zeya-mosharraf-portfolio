import { motion } from "framer-motion";
import ContactForm from "@/components/forms/ContactForm";
import SectionHeader from "@/components/ui/SectionHeader";
import { FaEnvelope, FaMapMarkerAlt, FaClock, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaHackerrank } from "react-icons/fa6";
import { SiGooglecloud } from "react-icons/si";
import { Mail, AlertCircle } from "lucide-react";
import { whileInViewFadeUp } from "@/lib/animations";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";

interface PortfolioInfo {
  id: string;
  category: string;
  label: string;
  display_value?: string;
  link_url?: string | null;
  icon_name?: string;
  sort_order?: number;
}

const ContactSection = () => {
  const { data: allData, loading } = useSupabaseTable<PortfolioInfo>("portfolio_info", { column: "sort_order", ascending: true });

  const contactInfo = allData.filter(item => item.category === "contact_info");
  const socialLinks = allData.filter(item => item.category === "social_link");

  const iconMap: Record<string, React.ReactNode> = {
    envelope: <FaEnvelope className="text-[13px]" />,
    "map-pin": <FaMapMarkerAlt className="text-[13px]" />,
    clock: <FaClock className="text-[13px]" />,
    linkedin: <FaLinkedin className="text-[15px]" />,
    github: <FaGithub className="text-[15px]" />,
    cloud: <SiGooglecloud className="text-[13px]" />,
    mail: <FaEnvelope className="text-[13px]" />,
    hackerrank: <FaHackerrank className="text-[15px]" />,
  };

  return (
    <section id="contact" className="relative py-12 lg:py-16 overflow-hidden" style={{ background: '#0d0d0d' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 30%, rgba(220,38,38,0.03) 0%, transparent 60%)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          icon={Mail}
          badge="Contact"
          title="Get In"
          highlight="Touch"
          subtitle="Have a project in mind or interested in working together? Feel free to reach out through the form below or connect with me directly."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form card */}
          <motion.div
            className="rounded-xl p-6 lg:p-8 bg-white/2 border border-white/6 backdrop-blur-sm"
            {...whileInViewFadeUp()}
          >
            <ContactForm />
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="space-y-8"
            {...whileInViewFadeUp(0.1)}
          >
            <div className="space-y-5">
              <h3 className="text-[15px] font-semibold text-gray-300 uppercase tracking-wider">Contact Information</h3>

              {loading ? (
                <div className="text-xs text-gray-600">Loading...</div>
              ) : (
                contactInfo.map((item) => (
                  <div key={item.id} className="flex items-start">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-red-400/70 bg-red-900/10 border border-red-900/20">
                      {iconMap[item.icon_name || ''] || <AlertCircle className="text-[13px]" />}
                    </div>
                    <div className="ml-3">
                      <p className="text-[13px] font-medium text-gray-300">{item.label}</p>
                      {item.link_url ? (
                        <a href={item.link_url} className="text-[13px] text-gray-500 hover:text-red-400 transition-colors duration-200">{item.display_value || item.value}</a>
                      ) : (
                        <p className="text-[13px] text-gray-500">{item.display_value || item.value}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-3">
              <h3 className="text-[15px] font-semibold text-gray-300 uppercase tracking-wider">Connect With Me</h3>
              <div className="flex gap-3">
                {loading ? (
                  <div className="text-xs text-gray-600">Loading...</div>
                ) : (
                  socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.link_url || (social.label.toLowerCase() === 'email' || social.icon_name === 'mail' ? `https://mail.google.com/mail/?view=cm&fs=1&to=${social.display_value || social.value}` : (social.display_value || social.value))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200 bg-white/2 border border-white/6"
                      aria-label={social.label}
                    >
                      {iconMap[social.icon_name || ''] || <AlertCircle className="w-4 h-4" />}
                    </a>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
