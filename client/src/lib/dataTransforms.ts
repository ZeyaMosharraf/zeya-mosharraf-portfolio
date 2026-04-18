import { Project } from "@/data/projects";
import { Experience } from "@/data/experience";

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
    project.skills?.some(skill => skill.toLowerCase().includes(lowerSearchTerm))
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
 * Select featured projects with one per category (priority-based)
 */
export const selectFeaturedProjects = (
  projects: Project[],
  limit: number = 6
): Project[] => {
  const featuredProjects: Project[] = [];
  const usedCategories = new Set<string>();
  const priorityCategories = ["SQL", "Power BI", "Python", "Machine Learning", "Excel", "Tableau"];
  
  // First pass: one project per priority category
  for (const category of priorityCategories) {
    const project = projects.find(p => p.category === category && !usedCategories.has(p.category));
    if (project && featuredProjects.length < limit) {
      featuredProjects.push(project);
      usedCategories.add(project.category);
    }
  }
  
  // Second pass: fill remaining slots with any available projects
  if (featuredProjects.length < limit) {
    const remaining = projects.filter(p => !featuredProjects.includes(p));
    featuredProjects.push(...remaining.slice(0, limit - featuredProjects.length));
  }
  
  return featuredProjects;
};

/**
 * Experience sorting and transformation utilities
 */

/**
 * Parse date string from experience to get Date object
 * Handles formats like "Aug 2025 - Present", "Mar 2025 - Apr 2025"
 */
export const parseExperienceDate = (dateString: string): Date => {
  const startDate = dateString.split(/\s*[-–]\s*/)[0] || dateString;
  const monthMap: { [key: string]: number } = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  const parts = startDate.trim().split(' ');
  if (parts.length === 2) {
    const month = monthMap[parts[0]];
    const year = parseInt(parts[1]);
    return new Date(year, month);
  }
  return new Date(startDate);
};

/**
 * Sort experiences by date (newest first)
 */
export const sortExperiencesByDate = (experiences: Experience[]): Experience[] => {
  return [...experiences].sort((a, b) => 
    parseExperienceDate(b.date).getTime() - parseExperienceDate(a.date).getTime()
  );
};

/**
 * Generic data transformation helpers
 */

/**
 * Convert URL slug to category display name (e.g., "machine-learning" -> "Machine Learning")
 */
export const slugToCategoryName = (slug: string): string => {
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

/**
 * Group items by a key function
 */
export const groupBy = <T, K extends string | number>(
  items: T[],
  keyFn: (item: T) => K
): Record<K, T[]> => {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
};

/**
 * Map and filter items in a single operation
 */
export const mapAndFilter = <T, R>(
  items: T[],
  fn: (item: T) => R | null | undefined
): R[] => {
  return items.reduce((acc, item) => {
    const result = fn(item);
    if (result !== null && result !== undefined) {
      acc.push(result);
    }
    return acc;
  }, [] as R[]);
};
