import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ThemeProvider } from "./components/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { prefetchSupabaseTable } from "./hooks/useSupabaseTable";

// Prefetch critical data immediately outside React tree!
prefetchSupabaseTable("portfolio_info", { column: "sort_order", ascending: true });
prefetchSupabaseTable("hero_metrics", { column: "sort_order", ascending: true });
prefetchSupabaseTable("experience", { column: "sort_order", ascending: true });
prefetchSupabaseTable("skills", { column: "sort_order", ascending: true });
prefetchSupabaseTable("certifications", { column: "sort_order", ascending: true });
prefetchSupabaseTable("portfolio_content");

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);
