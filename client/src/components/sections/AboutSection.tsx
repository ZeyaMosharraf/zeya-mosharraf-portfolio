import { motion, useInView } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaDownload } from "react-icons/fa";
import { User2 } from "lucide-react";
import { useRef } from "react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const AboutSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden" style={{ background: '#0d0d0d' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 50% at 25% 50%, rgba(220,38,38,0.03) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Portrait */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="relative">
              <svg
                className="rounded-xl w-full h-auto"
                viewBox="0 0 400 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <rect width="400" height="500" rx="12" fill="rgba(255,255,255,0.01)" />
                <rect x="100" y="80" width="200" height="200" rx="100" fill="rgba(255,255,255,0.03)" />
                <circle cx="200" cy="150" r="70" fill="rgba(255,255,255,0.06)" />
                <path d="M200,180 Q240,180 240,220 T200,260 Q160,260 160,220 T200,180 z" fill="rgba(255,255,255,0.06)" />
                <rect x="100" y="300" width="200" height="30" rx="6" fill="rgba(255,255,255,0.04)" />
                <rect x="130" y="350" width="140" height="20" rx="4" fill="rgba(255,255,255,0.03)" />
                <rect x="150" y="390" width="100" height="20" rx="4" fill="rgba(255,255,255,0.03)" />
                <circle cx="70" cy="450" r="20" fill="#DC2626" opacity="0.08" />
                <circle cx="330" cy="450" r="20" fill="#DC2626" opacity="0.08" />
                <circle cx="50" cy="50" r="15" fill="#DC2626" opacity="0.06" />
                <circle cx="350" cy="50" r="15" fill="#DC2626" opacity="0.06" />
                <path d="M70,100 Q90,80 110,100 T150,100" stroke="#DC2626" strokeWidth="2" opacity="0.15" />
                <path d="M250,100 Q270,80 290,100 T330,100" stroke="#DC2626" strokeWidth="2" opacity="0.15" />
              </svg>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="lg:col-span-7 space-y-5"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <div ref={headerRef}>
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase mb-5 relative overflow-hidden"
                style={{ background: 'rgba(239,68,68,0.08)', color: 'rgba(239,68,68,0.8)', border: '1px solid rgba(239,68,68,0.12)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(239,68,68,0.1) 50%, transparent 100%)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
                />
                <User2 className="w-3 h-3 relative z-10" />
                <span className="relative z-10">About Me</span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-6">
                About{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #DC2626 0%, #F97316 100%)' }}>Me</span>
              </h2>
            </div>

            <p className="text-[15px] text-gray-400 leading-relaxed">
              I'm a passionate Data Analyst with hands-on experience in SQL, Python, Power BI, and data visualization.
              I specialize in transforming raw data into meaningful insights that help businesses make smarter decisions.
            </p>
            <p className="text-[15px] text-gray-400 leading-relaxed">
              I've worked on real-world projects across healthcare and retail domains, including analyzing pathology lab data and optimizing sales campaigns.
              I enjoy solving business problems through data exploration, trend analysis, and building interactive dashboards that drive impact.
            </p>
            <p className="text-[15px] text-gray-400 leading-relaxed">
              Currently, I'm focused on sharpening my database development and advanced SQL skills while preparing for full-time opportunities in data analytics and business intelligence.
            </p>

            <div className="space-y-6 pt-4">
              {/* Education */}
              <div>
                <h3 className="text-[15px] font-semibold text-gray-300 mb-3 uppercase tracking-wider text-center lg:text-left">Education</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <div className="flex-shrink-0 h-4 w-4 text-red-400/70 mt-1"><FaGraduationCap /></div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-300 text-[14px]">BSc in Industrial Chemistry</p>
                      <p className="text-gray-500 text-[13px]">Delhi University, Deshbandhu College · Dec 2020 - May 2023</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-[15px] font-semibold text-gray-300 mb-3 uppercase tracking-wider text-center lg:text-left">Experience</h3>
                <div className="space-y-3">
                  <div className="flex">
                    <div className="flex-shrink-0 h-4 w-4 text-red-400/70 mt-1"><FaBriefcase /></div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-300 text-[14px]">SQL Developer / Database Consultant Intern</p>
                      <p className="text-gray-500 text-[13px]">Nirjai Technologies · March 2025 - May 2025</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 h-4 w-4 text-red-400/70 mt-1"><FaBriefcase /></div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-300 text-[14px]">Data Analytics & Operations Intern</p>
                      <p className="text-gray-500 text-[13px]">The Design Cart · Nov 2024 - Feb 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 text-center lg:text-left">
              <a
                href="https://drive.google.com/uc?export=download&id=1Mon66Yw1K6FgRXC6NYJbUZopdefqNRqH"
                className="inline-flex items-center gap-2 h-[38px] px-5 text-[13px] font-medium rounded-lg text-gray-400 transition-all duration-200 hover:text-white hover:border-red-500/40"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                Download Resume <FaDownload className="text-[11px]" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
