/**
 * Contact Information Data
 * Centralized contact details used in ContactSection
 */

export interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

export const contactData = [
  {
    label: "Email",
    value: "zeyamosharraf999@gmail.com",
    href: "mailto:zeyamosharraf999@gmail.com",
  },
  {
    label: "Location",
    value: "New Delhi, India",
  },
  {
    label: "Working Hours",
    value: "Monday - Friday, 9AM - 5PM IST",
  },
];
