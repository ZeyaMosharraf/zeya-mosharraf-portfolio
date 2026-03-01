import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, FileText, BookOpen, Home, FolderOpen, Users, Mail, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const projectsDropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsMobileProjectsOpen(false);
  };

  // Check if we're on the home page
  const isHomePage = location === "/";

  const goToHomePage = () => {
    closeMenu();
    setLocation("/");
    // After navigation completes, scroll to top
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 100);
  };

  const handleSectionClick = (sectionId: string) => {
    if (!isHomePage) {
      // If not on home page, navigate to home page first
      goToHomePage();
      // Then scroll to section after a brief delay to ensure the home page has loaded
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          setActiveSection(sectionId);
          const offsetTop = element.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
          });
        }
      }, 300);
    } else {
      // If already on home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        closeMenu();
        setActiveSection(sectionId);
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    }
  };

  const handleProjectCategoryClick = (category: string) => {
    setIsProjectsDropdownOpen(false);
    closeMenu();
    setLocation(`/category/${category.toLowerCase().replace(' ', '-')}`);
  };
  
  const navigateToPage = (path: string) => {
    closeMenu();
    setLocation(path);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (projectsDropdownRef.current && !projectsDropdownRef.current.contains(event.target as Node)) {
        setIsProjectsDropdownOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update active section based on current location
  useEffect(() => {
    if (location.startsWith("/case-stud")) {
      setActiveSection("case-studies");
    } else if (location.startsWith("/blog")) {
      setActiveSection("blog");
    } else if (location.startsWith("/project") || location.startsWith("/category")) {
      setActiveSection("projects");
    } else if (location === "/") {
      // If on home page, we'll let the scroll handler determine the active section
      const handleScroll = () => {
        const sections = ["home", "projects", "about", "contact"];
        const scrollPosition = window.scrollY + 100;
  
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;
  
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      // Initial check
      handleScroll();
      
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [location]);

  const NavItem = ({ section, label }: { section: string; label: string }) => (
    <button
      onClick={() => handleSectionClick(section)}
      className={cn(
        "relative px-2.5 py-1 text-[13px] font-medium transition-colors duration-300",
        activeSection === section
          ? "text-gray-100"
          : "text-gray-400/60 hover:text-gray-200"
      )}
    >
      {label}
      {activeSection === section && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[2px]" style={{ background: 'var(--accent-primary)' }} />
      )}
    </button>
  );

  const categories = ["SQL", "Python", "Machine Learning", "Power BI", "Excel", "Tableau", "Looker Studio"];

  return (
    <motion.header 
      className="fixed w-full top-0 z-50 transition-all duration-300"
      style={{ background: 'rgba(11,15,20,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center">
        <button
          onClick={goToHomePage}
          className="flex items-center gap-2.5 mr-8 shrink-0"
        >
          <span 
            className="w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-bold tracking-tight"
            style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--accent-primary)', border: '1px solid rgba(239,68,68,0.25)' }}
          >
            ZM
          </span>
          <span className="flex items-center gap-0 text-[13px] leading-none">
            <span className="font-semibold text-gray-100">Zeya Mosharraf</span>
            <span className="text-gray-600 mx-1.5">·</span>
            <span className="text-[11px] text-gray-500 font-normal">Analytics Engineer</span>
          </span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-0.5 ml-auto">
          <NavItem section="home" label="Home" />
          
          {/* Projects dropdown */}
          <div className="relative" ref={projectsDropdownRef}>
            <button
              onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
              className={cn(
                "relative px-2.5 py-1 text-[13px] font-medium transition-colors duration-300 flex items-center gap-1",
                activeSection === "projects"
                  ? "text-gray-100"
                  : "text-gray-400/60 hover:text-gray-200"
              )}
            >
              Projects
              <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", isProjectsDropdownOpen && "rotate-180")} />
              {activeSection === "projects" && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[2px]" style={{ background: 'var(--accent-primary)' }} />
              )}
            </button>
            
            {/* Dropdown menu */}
            <AnimatePresence>
              {isProjectsDropdownOpen && (
                <motion.div 
                  className="absolute left-0 mt-2 w-48 rounded-lg py-1.5 z-50"
                  style={{ background: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.06)' }}
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                >
                  <button
                    onClick={() => navigateToPage("/projects")}
                    className="w-full text-left px-3.5 py-2 text-[12px] text-gray-300 hover:text-[var(--accent-primary)] hover:bg-white/[0.03] transition-colors duration-150 font-medium"
                  >
                    All Projects
                  </button>
                  
                  <div className="h-px mx-2.5 my-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleProjectCategoryClick(category)}
                      className="w-full text-left px-3.5 py-1.5 text-[12px] text-gray-500 hover:text-gray-200 hover:bg-white/[0.03] transition-colors duration-150"
                    >
                      {category}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Case Studies */}
          <button
            onClick={() => navigateToPage("/case-studies")}
            className={cn(
              "relative px-2.5 py-1 text-[13px] font-medium transition-colors duration-300",
              activeSection === "case-studies"
                ? "text-gray-100"
                : "text-gray-400/60 hover:text-gray-200"
            )}
          >
            Case Studies
            {activeSection === "case-studies" && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[2px]" style={{ background: 'var(--accent-primary)' }} />
            )}
          </button>
          
          {/* Blog */}
          <button
            onClick={() => navigateToPage("/blog")}
            className={cn(
              "relative px-2.5 py-1 text-[13px] font-medium transition-colors duration-300",
              activeSection === "blog"
                ? "text-gray-100"
                : "text-gray-400/60 hover:text-gray-200"
            )}
          >
            Blog
            {activeSection === "blog" && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[2px]" style={{ background: 'var(--accent-primary)' }} />
            )}
          </button>
          
          <NavItem section="about" label="About" />
          
          <NavItem section="contact" label="Contact" />
          
          {/* Separator */}
          <div className="w-px h-3.5 mx-2" style={{ background: 'rgba(255,255,255,0.06)' }} />
          
          {/* Resume button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded transition-all duration-300 text-gray-400/60 hover:text-[var(--accent-primary)] hover:shadow-[0_0_8px_rgba(239,68,68,0.15)]"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            <Download className="h-2.5 w-2.5" />
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-200 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            style={{ background: 'rgba(11,15,20,0.95)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="px-4 py-3 space-y-1">
              {[
                { label: "Home", action: () => { goToHomePage(); }, section: "home" },
              ].map(item => (
                <button
                  key={item.section}
                  onClick={item.action}
                  className={cn(
                    "block w-full text-left py-2 text-[13px] font-medium transition-colors duration-150",
                    activeSection === item.section ? "text-[var(--accent-primary)]" : "text-gray-500 hover:text-gray-200"
                  )}
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Projects Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileProjectsOpen(!isMobileProjectsOpen)}
                  className={cn(
                    "flex items-center justify-between w-full text-left py-2 text-[13px] font-medium transition-colors duration-150",
                    activeSection === "projects" ? "text-[var(--accent-primary)]" : "text-gray-500 hover:text-gray-200"
                  )}
                >
                  Projects
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", isMobileProjectsOpen && "rotate-180")} />
                </button>
                
                <div className={`overflow-hidden transition-all duration-200 ${isMobileProjectsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pl-3 py-1">
                    <button
                      onClick={() => navigateToPage("/projects")}
                      className="block w-full text-left py-1.5 text-[12px] text-gray-400 hover:text-[var(--accent-primary)] transition-colors"
                    >
                      All Projects
                    </button>
                    <div className="h-px my-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleProjectCategoryClick(category)}
                        className="block w-full text-left py-1.5 text-[12px] text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {[
                { label: "Case Studies", action: () => navigateToPage("/case-studies"), section: "case-studies" },
                { label: "Blog", action: () => navigateToPage("/blog"), section: "blog" },
                { label: "About", action: () => handleSectionClick("about"), section: "about" },
                { label: "Contact", action: () => handleSectionClick("contact"), section: "contact" },
              ].map(item => (
                <button
                  key={item.section}
                  onClick={item.action}
                  className={cn(
                    "block w-full text-left py-2 text-[13px] font-medium transition-colors duration-150",
                    activeSection === item.section ? "text-[var(--accent-primary)]" : "text-gray-500 hover:text-gray-200"
                  )}
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Resume */}
              <div className="pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded text-gray-400/60 transition-all duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Download className="h-2.5 w-2.5" />
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
