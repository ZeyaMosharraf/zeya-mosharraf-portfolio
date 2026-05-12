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
