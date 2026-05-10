import { motion } from "framer-motion";
import ContactForm from "@/components/forms/ContactForm";
import SectionHeader from "@/components/ui/SectionHeader";
import { Mail } from "lucide-react";
import { whileInViewFadeUp } from "@/lib/animations";
import { useSupabaseTable } from "@/hooks/useSupabaseTable";
import ContactCard from "@/components/ui/ContactCard";

interface PortfolioInfo {
  id: string;
  category: string;
  label: string;
  value: string;
  display_value?: string;
  link_url?: string | null;
  icon_name?: string;
  sort_order?: number;
}

const ContactSection = () => {
  const { data: allData, loading } = useSupabaseTable<PortfolioInfo>("portfolio_info", { column: "sort_order", ascending: true });

  const contactInfo = allData.filter(item => item.category === "contact_info");

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
                  <div key={item.id}>
                    <ContactCard
                      iconName={item.icon_name || ''}
                      label={item.label}
                      value={item.display_value || item.value}
                      href={item.link_url || undefined}
                    />
                  </div>
                ))
              )}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
