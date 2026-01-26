import { motion } from "framer-motion";
import ContactForm from "@/components/forms/ContactForm";
import { FaEnvelope, FaMapMarkerAlt, FaClock, FaLinkedin, FaGithub, FaTwitter, FaWhatsapp } from "react-icons/fa";

const ContactSection = () => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50/15 to-purple-50/10 dark:from-gray-900 dark:via-blue-950/10 dark:to-purple-950/5 transition-colors duration-300 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-l from-purple-400/8 to-pink-400/8 rounded-full blur-3xl"></div>
      <motion.div 
        className="container mx-auto max-w-5xl relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">Get In Touch</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            Have a project in mind or interested in working together? Feel free to reach out
            through the form below or connect with me directly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 transition-colors duration-300"
            variants={itemVariants}
          >
            <ContactForm />
          </motion.div>

          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Contact Information</h3>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary dark:text-blue-400 transition-colors duration-300">
                  <FaEnvelope />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Email</p>
                  <a
                    href="mailto:zeyamosharraf999@gmail.com"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300"
                  >
                    zeyamosharraf999@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary dark:text-blue-400 transition-colors duration-300">
                  <FaMapMarkerAlt />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Location</p>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">New Delhi, India</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary dark:text-blue-400 transition-colors duration-300">
                  <FaClock />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Working Hours</p>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Monday - Friday, 9AM - 5PM IST</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Connect With Me</h3>
              <div className="flex space-x-5">
                <motion.a
                  href="https://www.linkedin.com/in/zeya-mosharraf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group h-14 w-14 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                  aria-label="LinkedIn"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin className="text-xl group-hover:scale-110 transition-transform" />
                </motion.a>
                <motion.a
                  href="https://github.com/ZeyaMosharraf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group h-14 w-14 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 dark:from-white dark:to-gray-100 flex items-center justify-center text-white dark:text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                  aria-label="GitHub"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="text-xl group-hover:scale-110 transition-transform" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
