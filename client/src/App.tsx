import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortfolioAssistant from "@/components/PortfolioAssistant";
import React, { useEffect, useState, Suspense } from "react";

import Home from "@/pages/Home";

const NotFound = React.lazy(() => import("@/pages/not-found"));
const AllProjects = React.lazy(() => import("@/pages/AllProjects"));
const ProjectDetails = React.lazy(() => import("@/pages/ProjectDetails"));
const ProjectCategory = React.lazy(() => import("@/pages/ProjectCategory"));
const CaseStudies = React.lazy(() => import("@/pages/CaseStudies"));
const Blog = React.lazy(() => import("@/pages/Blog"));
const CaseStudyDetails = React.lazy(() => import("@/pages/CaseStudyDetails"));

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<div className="flex-grow flex items-center justify-center min-h-[60vh]"><div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div></div>}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/projects" component={AllProjects} />
            <Route path="/project/:slug" component={ProjectDetails} />
            <Route path="/projects/:category" component={ProjectCategory} />
            <Route path="/case-studies">
              {() => <CaseStudies />}
            </Route>
            <Route path="/case-study/:slug" component={CaseStudyDetails} />
            <Route path="/blog">
              {() => <Blog />}
            </Route>
            <Route path="/blog/:slug">
              {(params) => <Blog viewMode="detail" params={params} />}
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
      
      {/* Scroll to top button */}
      
      {/* Portfolio Assistant Chatbot */}
      <PortfolioAssistant />
      
      <Toaster />
    </div>
  );
}

export default App;
