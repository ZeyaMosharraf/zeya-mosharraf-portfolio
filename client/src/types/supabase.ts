/**
 * Centralized Type Definitions for Supabase Tables
 */

export interface Project {
  id: string;
  title: string;
  slug: string;
  category:
    | "SQL"
    | "Python"
    | "Machine Learning"
    | "Power BI"
    | "Excel"
    | "Tableau"
    | "Looker Studio";
  description: string;
  methodology: string;
  results: string;
  tools: string[];
  embed_url?: string;
  thumbnail_url: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
  github_url: string;
  skills?: string[];
}

export interface HeroMetric {
  id: number;
  label: string;
  value: string;
  icon: string;
  sort_order: number;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  suffix?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string | null;
  problem: string | null;
  solution: string | null;
  results: string | null;
  metrics: CaseStudyMetric[] | null;
  featured: boolean;
  github_url: string | null;
  embed_url: string | null;
  tools: string[] | string | null;
  sort_order: number | string | null;
  created_at: string;
}

export interface PortfolioInfo {
  id: string;
  category: string;
  label: string;
  value: string;
  display_value?: string;
  link_url?: string | null;
  icon_name?: string;
  sort_order?: number;
}
