import { Project } from "@/types/supabase";

/**
 * Project filtering and transformation utilities
 */

export interface ProjectCategory {
  id: string;
  name: string;
  count?: number;
}

export interface TechnologyStats {
  [key: string]: number;
}

// Frontend category translation adapter to enforce believable, professional engineering concepts
export const CATEGORY_MAP: Record<string, string> = {
  "SQL": "Data Infrastructure",
  "Python": "Automation & ETL",
  "Machine Learning": "Machine Learning",
  "Power BI": "BI & Reporting",
  "Excel": "Operational Analytics",
  "Tableau": "BI & Reporting",
  "Looker Studio": "BI & Reporting"
};

/**
 * Get all available project categories with their counts
 */
export const getProjectCategories = (projects: Project[]): ProjectCategory[] => {
  // Pre-defined preferred order for system categories
  const preferredOrder = [
    "Operational Analytics",
    "Automation & ETL",
    "Data Infrastructure",
    "BI & Reporting",
    "Machine Learning"
  ];

  // Dynamically extract unique categories from DB through our translation adapter
  const uniqueCategories = Array.from(
    new Set(projects.map(p => CATEGORY_MAP[p.category] || p.category))
  ).filter(Boolean);
  
  // Sort based on preferred order if it exists, otherwise alphabetical
  uniqueCategories.sort((a, b) => {
    const idxA = preferredOrder.indexOf(a);
    const idxB = preferredOrder.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  return [
    { id: "all", name: "All Systems", count: projects.length },
    ...uniqueCategories.map(name => ({
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name,
      count: projects.filter(p => (CATEGORY_MAP[p.category] || p.category) === name).length
    }))
  ];
};

/**
 * Filter projects by category
 */
export const filterProjectsByCategory = (
  projects: Project[],
  categoryId: string
): Project[] => {
  if (categoryId === "all") {
    return projects.map(p => ({
      ...p,
      category: CATEGORY_MAP[p.category] || p.category
    })) as Project[];
  }
  
  const categories = getProjectCategories(projects);
  const selectedCategory = categories.find(cat => cat.id === categoryId);
  
  if (!selectedCategory) return projects;

  const mappedProjects = projects.map(p => ({
    ...p,
    category: CATEGORY_MAP[p.category] || p.category
  }));

  return mappedProjects.filter(project => project.category === selectedCategory.name) as Project[];
};

/**
 * Filter projects by search term
 */
export const filterProjectsBySearch = (
  projects: Project[],
  searchTerm: string
): Project[] => {
  if (!searchTerm.trim()) return projects;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  return projects.filter(project =>
    project.title.toLowerCase().includes(lowerSearchTerm) ||
    project.description.toLowerCase().includes(lowerSearchTerm) ||
    project.tools?.some(tool => tool.toLowerCase().includes(lowerSearchTerm))
  );
};

/**
 * Filter projects by both category and search term
 */
export const filterProjects = (
  projects: Project[],
  categoryId: string = "all",
  searchTerm: string = ""
): Project[] => {
  let filtered = filterProjectsByCategory(projects, categoryId);
  filtered = filterProjectsBySearch(filtered, searchTerm);
  return filtered;
};

/**
 * Calculate technology statistics from projects
 */
export const calculateTechnologyStats = (projects: Project[]): TechnologyStats => {
  return projects.reduce((acc, project) => {
    const cat = CATEGORY_MAP[project.category] || project.category;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as TechnologyStats);
};

/**
 * Select featured projects based on the 'featured' flag and 'sort_order' from Supabase
 */
export const selectFeaturedProjects = (
  projects: Project[]
): Project[] => {
  const mapped = projects.map(p => ({
    ...p,
    category: CATEGORY_MAP[p.category] || p.category
  }));

  return mapped
    .filter(p => p.featured)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) as Project[];
};

/**
 * Convert URL slug to category display name (e.g., "automation-etl" -> "Automation & ETL")
 */
export const slugToCategoryName = (slug: string): string => {
  const specialCases: Record<string, string> = {
    "data-infrastructure": "Data Infrastructure",
    "automation-etl": "Automation & ETL",
    "machine-learning": "Machine Learning",
    "bi-reporting": "BI & Reporting",
    "operational-analytics": "Operational Analytics"
  };
  
  if (specialCases[slug]) {
    return specialCases[slug];
  }
  
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/**
 * Filter projects by exact category name
 */
export const filterProjectsByExactCategory = (projects: Project[], categoryName: string): Project[] => {
  const mapped = projects.map(p => ({
    ...p,
    category: CATEGORY_MAP[p.category] || p.category
  }));
  return mapped.filter(project => project.category === categoryName) as Project[];
};
