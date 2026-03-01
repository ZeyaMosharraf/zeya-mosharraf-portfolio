import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AllProjects from "@/pages/AllProjects";
import ProjectDetails from "@/pages/ProjectDetails";
import ProjectCategory from "@/pages/ProjectCategory";
import CaseStudies from "@/pages/CaseStudies";
import Blog from "@/pages/Blog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortfolioAssistant from "@/components/PortfolioAssistant";
import { useEffect, useState } from "react";


function App() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/projects" component={AllProjects} />
          <Route path="/project/:slug" component={ProjectDetails} />
          <Route path="/projects/:category" component={ProjectCategory} />
          <Route path="/case-studies">
            {() => <CaseStudies />}
          </Route>
          <Route path="/case-study/:slug">
            {(params) => <CaseStudies viewMode="detail" params={params} />}
          </Route>
          <Route path="/blog">
            {() => <Blog />}
          </Route>
          <Route path="/blog/:slug">
            {(params) => <Blog viewMode="detail" params={params} />}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      
      {/* Scroll to top button */}
      {showScrollButton && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary p-3 rounded-full text-white shadow-lg hover:bg-blue-600 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
      
      {/* Portfolio Assistant Chatbot */}
      <PortfolioAssistant />
      
      <Toaster />
    </div>
  );
}

export default App;
