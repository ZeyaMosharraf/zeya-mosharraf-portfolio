import { useEffect } from "react";
import ContactSection from "@/components/sections/ContactSection";

const Contact = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30">
      <ContactSection />
    </div>
  );
};

export default Contact;
