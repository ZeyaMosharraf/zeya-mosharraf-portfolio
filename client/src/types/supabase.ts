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
  created_at: string;
  github_url: string | null;
  embed_url: string | null;
  sort_order: number | string | null;
  cover_image: string | null;
  thumbnail: string | null;
  live_url: string | null;
  tags: string[] | null;
  tools_array: string[] | null;
  company_context: string | null;
  project_type: string | null;
  architecture: any | null;
  workflow: any | null;
  gallery: any | null;
  impact_metrics: any | null;
  technical_learnings: any | null;
  challenges: any | null;
  tech_stack: any | null;
  seo: any | null;
  published: boolean | null;
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

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  short_description: string | null;
  full_content: string;
  image_url: string | null;
  tags: string[] | null;
  published_date: string | null;
  featured: boolean;
  sort_order: number | null;
  created_at: string;
  updated_at: string;
}
