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

/**
 * Get all available project categories with their counts
 */
export const getProjectCategories = (projects: Project[]): ProjectCategory[] => {
  const categoryNames = ["SQL", "Python", "Machine Learning", "Power BI", "Excel", "Tableau", "Looker Studio"];
  
  return [
    { id: "all", name: "All Projects", count: projects.length },
    ...categoryNames.map(name => ({
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      count: projects.filter(p => p.category === name).length
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
  if (categoryId === "all") return projects;
  
  const categories = getProjectCategories(projects);
  const selectedCategory = categories.find(cat => cat.id === categoryId);
  
  if (!selectedCategory) return projects;
  return projects.filter(project => project.category === selectedCategory.name);
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
    acc[project.category] = (acc[project.category] || 0) + 1;
    return acc;
  }, {} as TechnologyStats);
};

/**
 * Select featured projects based on the 'featured' flag and 'sort_order' from Supabase
 */
export const selectFeaturedProjects = (
  projects: Project[]
): Project[] => {
  return projects
    .filter(p => p.featured)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
};

/**
 * Generic data transformation helpers
 */

/**
 * Convert URL slug to category display name (e.g., "machine-learning" -> "Machine Learning")
 */
export const slugToCategoryName = (slug: string): string => {
  const specialCases: Record<string, string> = {
    "sql": "SQL",
    "python": "Python",
    "power-bi": "Power BI",
    "machine-learning": "Machine Learning",
    "excel": "Excel",
    "tableau": "Tableau",
    "looker-studio": "Looker Studio"
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
  return projects.filter(project => project.category === categoryName);
};

