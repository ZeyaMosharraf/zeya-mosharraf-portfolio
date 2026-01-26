import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Award, FileText, BookOpen, Home, FolderOpen, Users, Mail, Zap, Brain } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isCertificatesDropdownOpen, setIsCertificatesDropdownOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
  const [isMobileCertificatesOpen, setIsMobileCertificatesOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const projectsDropdownRef = useRef<HTMLDivElement>(null);
  const certificatesDropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsMobileProjectsOpen(false);
    setIsMobileCertificatesOpen(false);
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
  
  const handleCertificateTabClick = (tab: string) => {
    setIsCertificatesDropdownOpen(false);
    closeMenu();
    setLocation(`/certificates?tab=${tab.toLowerCase()}`);
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
      if (certificatesDropdownRef.current && !certificatesDropdownRef.current.contains(event.target as Node)) {
        setIsCertificatesDropdownOpen(false);
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
    } else if (location.startsWith("/certificate")) {
      setActiveSection("certificates");
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

  const getNavIcon = (section: string) => {
    const iconClassName = cn(
      "h-4 w-4 transition-colors duration-300",
      activeSection === section ? "text-white" : "text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
    );
    
    switch (section) {
      case "home":
        return <Home className={iconClassName} />;

      case "about":
        return <Users className={iconClassName} />;
      case "contact":
        return <Mail className={iconClassName} />;
      default:
        return null;
    }
  };

  const NavItem = ({ section, label }: { section: string; label: string }) => (
    <motion.button
      onClick={() => handleSectionClick(section)}
      className={cn(
        "relative nav-item px-4 py-2.5 flex items-center space-x-2 rounded-xl font-medium transition-all duration-300 group overflow-hidden",
        activeSection === section 
          ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20" 
          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
      )}
      whileHover={{ 
        scale: 1.05, 
        y: -2,
        boxShadow: activeSection === section 
          ? "0 6px 20px -3px rgb(59 130 246 / 0.3), 0 2px 6px -2px rgb(59 130 246 / 0.1)"
          : "0 4px 15px -3px rgb(0 0 0 / 0.1), 0 2px 6px -2px rgb(0 0 0 / 0.05)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        animate={{ 
          rotate: activeSection === section ? [0, 10, -10, 0] : 0,
          scale: activeSection === section ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          "transition-colors duration-300",
          activeSection === section ? "text-white" : ""
        )}
      >
        {getNavIcon(section)}
      </motion.div>
      <span className="relative z-10">{label}</span>
      
      {/* Animated background */}
      {activeSection !== section && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 0.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        />
      )}
    </motion.button>
  );

  const categories = ["SQL", "Python", "Machine Learning", "Power BI", "Excel", "Tableau", "Looker Studio"];

  return (
    <motion.header 
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/30 fixed w-full top-0 z-50 transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <motion.button
          onClick={goToHomePage}
          className="flex items-center group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-lg font-bold mr-3 shadow-lg"
            whileHover={{ 
              scale: 1.1, 
              rotate: [0, -5, 5, 0],
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            ZM
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-bold leading-tight">
              <span className="text-blue-600 dark:text-blue-400">Zeya</span>
              <span className="text-gray-800 dark:text-gray-200">Mosharraf</span>
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Data Analyst</span>
          </div>
        </motion.button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          <NavItem section="home" label="Home" />
          
          {/* Projects dropdown */}
          <div className="relative" ref={projectsDropdownRef}>
            <motion.button
              onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
              className={cn(
                "relative nav-item px-4 py-2.5 flex items-center space-x-2 rounded-xl font-medium transition-all duration-300 group overflow-hidden shadow-none",
                activeSection === "projects" 
                  ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600" 
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              )}
              whileHover={{ 
                scale: 1.05, 
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                animate={{ 
                  rotate: activeSection === "projects" ? [0, 10, -10, 0] : 0,
                  scale: activeSection === "projects" ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "transition-colors duration-300",
                  activeSection === "projects" ? "text-white" : ""
                )}
              >
                <FolderOpen className="h-4 w-4" />
              </motion.div>
              <span className="relative z-10">Projects</span>
              <motion.div
                animate={{ rotate: isProjectsDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "transition-colors duration-300",
                  activeSection === "projects" ? "text-white" : ""
                )}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
              
              {/* Animated background */}
              {activeSection !== "projects" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 0.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                />
              )}
            </motion.button>
            
            {/* Enhanced Dropdown menu */}
            <AnimatePresence>
              {isProjectsDropdownOpen && (
                <motion.div 
                  className="absolute left-0 mt-3 w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl border border-gray-200/20 dark:border-gray-700/30 py-2 z-50"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <motion.button
                    onClick={() => navigateToPage("/projects")}
                    className="block w-full text-left px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium flex items-center"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <FolderOpen className="h-4 w-4 mr-2" />
                    All Projects
                  </motion.button>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-2 mx-2"></div>
                  
                  {categories.map((category, index) => (
                    <motion.button
                      key={category}
                      onClick={() => handleProjectCategoryClick(category)}
                      className="block w-full text-left px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 mr-3"></span>
                      {category}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Case Studies */}
          <motion.button
            onClick={() => navigateToPage("/case-studies")}
            className={cn(
              "relative nav-item px-4 py-2.5 flex items-center space-x-2 rounded-xl font-medium transition-all duration-300 group overflow-hidden",
              activeSection === "case-studies" 
                ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20" 
                : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            )}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: activeSection === "case-studies" 
                ? "0 6px 20px -3px rgb(59 130 246 / 0.3), 0 2px 6px -2px rgb(59 130 246 / 0.1)"
                : "0 4px 15px -3px rgb(0 0 0 / 0.1), 0 2px 6px -2px rgb(0 0 0 / 0.05)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              animate={{ 
                rotate: activeSection === "case-studies" ? [0, 10, -10, 0] : 0,
                scale: activeSection === "case-studies" ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
              className={cn(
                "transition-colors duration-300",
                activeSection === "case-studies" ? "text-white" : ""
              )}
            >
              <FileText className="h-4 w-4" />
            </motion.div>
            <span className="relative z-10">Case Studies</span>
            
            {/* Animated background */}
            {activeSection !== "case-studies" && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              />
            )}
          </motion.button>
          
          {/* Blog */}
          <motion.button
            onClick={() => navigateToPage("/blog")}
            className={cn(
              "relative nav-item px-4 py-2.5 flex items-center space-x-2 rounded-xl font-medium transition-all duration-300 group overflow-hidden",
              activeSection === "blog" 
                ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20" 
                : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            )}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: activeSection === "blog" 
                ? "0 6px 20px -3px rgb(59 130 246 / 0.3), 0 2px 6px -2px rgb(59 130 246 / 0.1)"
                : "0 4px 15px -3px rgb(0 0 0 / 0.1), 0 2px 6px -2px rgb(0 0 0 / 0.05)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              animate={{ 
                rotate: activeSection === "blog" ? [0, 10, -10, 0] : 0,
                scale: activeSection === "blog" ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
              className={cn(
                "transition-colors duration-300",
                activeSection === "blog" ? "text-white" : ""
              )}
            >
              <BookOpen className="h-4 w-4" />
            </motion.div>
            <span className="relative z-10">Blog</span>
            
            {/* Animated background */}
            {activeSection !== "blog" && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              />
            )}
          </motion.button>
          
          <NavItem section="about" label="About" />
          
          {/* Certificates */}
          <motion.button
            onClick={() => navigateToPage("/certificates")}
            className={cn(
              "relative nav-item px-4 py-2.5 flex items-center space-x-2 rounded-xl font-medium transition-all duration-300 group overflow-hidden",
              activeSection === "certificates" 
                ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20" 
                : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            )}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: activeSection === "certificates" 
                ? "0 6px 20px -3px rgb(59 130 246 / 0.3), 0 2px 6px -2px rgb(59 130 246 / 0.1)"
                : "0 4px 15px -3px rgb(0 0 0 / 0.1), 0 2px 6px -2px rgb(0 0 0 / 0.05)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              animate={{ 
                rotate: activeSection === "certificates" ? [0, 10, -10, 0] : 0,
                scale: activeSection === "certificates" ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
              className={cn(
                "transition-colors duration-300",
                activeSection === "certificates" ? "text-white" : ""
              )}
            >
              <Award className="h-4 w-4" />
            </motion.div>
            <span className="relative z-10">Certificates</span>
            
            {/* Animated background */}
            {activeSection !== "certificates" && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              />
            )}
          </motion.button>
          
          <NavItem section="contact" label="Contact" />
          
          {/* Separator */}
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
          
          {/* Theme Toggle */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThemeToggle />
          </motion.div>
          
          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors duration-200"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 180 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 py-3 space-y-2">
        <button
          onClick={goToHomePage}
          className={`flex items-center w-full text-left py-2 ${
            activeSection === "home" ? "text-primary dark:text-primary" : "text-gray-800 dark:text-gray-200"
          } hover:text-primary dark:hover:text-primary transition-colors`}
        >
          <Home className="h-4 w-4 mr-2" />
          Home
        </button>
        
        {/* Mobile Projects Dropdown */}
        <div className="py-2">
          <button
            onClick={() => setIsMobileProjectsOpen(!isMobileProjectsOpen)}
            className={`flex items-center justify-between w-full text-left py-2 ${
              activeSection === "projects" ? "text-primary dark:text-primary" : "text-gray-800 dark:text-gray-200"
            } hover:text-primary dark:hover:text-primary transition-colors font-medium`}
          >
            <span className="flex items-center">
              Projects
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileProjectsOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ${isMobileProjectsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="pl-4 py-1">
              <button
                onClick={() => navigateToPage("/projects")}
                className="block w-full text-left py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                All Projects
              </button>
              
              <div className="h-px bg-gray-200 dark:bg-gray-600 my-1"></div>
              
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleProjectCategoryClick(category)}
                  className="block w-full text-left py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Case Studies */}
        <button
          onClick={() => navigateToPage("/case-studies")}
          className={`flex items-center w-full text-left py-2 ${
            activeSection === "case-studies" ? "text-primary dark:text-primary" : "text-gray-800 dark:text-gray-200"
          } hover:text-primary dark:hover:text-primary transition-colors`}
        >
          <FileText className={`h-4 w-4 mr-2 ${activeSection === "case-studies" ? "text-primary dark:text-primary" : ""}`} />
          Case Studies
        </button>
        
        {/* Blog */}
        <button
          onClick={() => navigateToPage("/blog")}
          className={`flex items-center w-full text-left py-2 ${
            activeSection === "blog" ? "text-primary dark:text-primary" : "text-gray-800 dark:text-gray-200"
          } hover:text-primary dark:hover:text-primary transition-colors`}
        >
          <BookOpen className={`h-4 w-4 mr-2 ${activeSection === "blog" ? "text-primary dark:text-primary" : ""}`} />
          Blog
        </button>
        
        {/* Mobile Certificates Dropdown */}
        <div className="py-2">
          <button
            onClick={() => setIsMobileCertificatesOpen(!isMobileCertificatesOpen)}
            className={`flex items-center justify-between w-full text-left py-2 ${
              activeSection === "certificates" ? "text-primary dark:text-primary" : "text-gray-800 dark:text-gray-200"
            } hover:text-primary dark:hover:text-primary transition-colors font-medium`}
          >
            <span className="flex items-center">
              <Award className={`h-4 w-4 mr-2 ${activeSection === "certificates" ? "text-primary dark:text-primary" : ""}`} />
              Certificates
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileCertificatesOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ${isMobileCertificatesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="pl-4 py-1">
              <button
                onClick={() => navigateToPage("/certificates")}
                className="block w-full text-left py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                All Certificates
              </button>
              
              <div className="h-px bg-gray-200 dark:bg-gray-600 my-1"></div>
              
              <button
                onClick={() => handleCertificateTabClick("courses")}
                className="block w-full text-left py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Courses
              </button>
              <button
                onClick={() => handleCertificateTabClick("achievements")}
                className="block w-full text-left py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Achievements
              </button>
              <button
                onClick={() => handleCertificateTabClick("experience")}
                className="block w-full text-left py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Experience
              </button>
              <button
                onClick={() => handleCertificateTabClick("extracurricular")}
                className="block w-full text-left py-2 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Extracurricular
              </button>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => handleSectionClick("about")}
          className={`block w-full text-left py-2 ${
            activeSection === "about" ? "text-primary dark:text-primary" : "text-gray-800 dark:text-gray-200"
          } hover:text-primary dark:hover:text-primary transition-colors`}
        >
          About
        </button>
        <button
          onClick={() => handleSectionClick("contact")}
          className={`block w-full text-left py-2 ${
            activeSection === "contact" ? "text-primary dark:text-primary" : "text-gray-800 dark:text-gray-200"
          } hover:text-primary dark:hover:text-primary transition-colors`}
        >
          Contact
        </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
