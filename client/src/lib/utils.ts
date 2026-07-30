import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format ISO date string into short month & year (e.g., "May 2026")
 */
export function formatMonthYear(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/**
 * Get category theme color for badges and highlights
 */
export function getCategoryThemeColor(cat: string | null | undefined): string {
  if (!cat) return "#34d399";
  const c = cat.toLowerCase();
  if (c.includes("marketing")) return "#f97316";
  if (c.includes("automation") || c.includes("etl")) return "#a78bfa";
  if (c.includes("data analytics") || c.includes("business intelligence") || c.includes("bi")) return "#22d3ee";
  if (c.includes("infrastructure") || c.includes("sql")) return "#fbbf24";
  if (c.includes("machine") || c.includes("ml")) return "#c084fc";
  return "#34d399";
}

/**
 * Extract first sentence from text
 */
export function firstSentence(text: string | null | undefined): string {
  if (!text) return "";
  const sentence = text.split(".")[0];
  return sentence ? sentence + "." : "";
}

