/**
 * Single source of truth for project category accent colors.
 * Used by ProjectCard, ProjectDetails, and any future component.
 * color  — vibrant foreground / icon color
 * glow   — translucent background tint for cards / glows
 * dot    — slightly transparent version for small dots
 */
export interface CategoryAccent {
  color: string;
  glow: string;
  dot: string;
}

export const getCategoryAccent = (category: string): CategoryAccent => {
  switch (category) {
    case "SQL":
      return { color: "#FBBF24", glow: "rgba(251,191,36,0.10)", dot: "rgba(251,191,36,0.7)" };
    case "Python":
      return { color: "#60A5FA", glow: "rgba(59,130,246,0.10)", dot: "rgba(59,130,246,0.7)" };
    case "Machine Learning":
      return { color: "#C084FC", glow: "rgba(168,85,247,0.10)", dot: "rgba(168,85,247,0.7)" };
    case "Power BI":
      return { color: "#FACC15", glow: "rgba(234,179,8,0.10)", dot: "rgba(234,179,8,0.7)" };
    case "Excel":
      return { color: "#4ADE80", glow: "rgba(34,197,94,0.10)", dot: "rgba(34,197,94,0.7)" };
    case "Tableau":
      return { color: "#818CF8", glow: "rgba(99,102,241,0.10)", dot: "rgba(99,102,241,0.7)" };
    case "Looker Studio":
      return { color: "#2DD4BF", glow: "rgba(20,184,166,0.10)", dot: "rgba(20,184,166,0.7)" };
    default:
      return { color: "#9CA3AF", glow: "rgba(156,163,175,0.08)", dot: "rgba(156,163,175,0.5)" };
  }
};
