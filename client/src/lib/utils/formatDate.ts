/**
 * Utility to format dates consistently across the portfolio
 * @param dateString - ISO date string or null
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string or fallback
 */
export const formatDate = (
  dateString: string | null | undefined, 
  options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
): string => {
  if (!dateString) return 'Recently Published';
  
  try {
    const date = new Date(dateString);
    // Check for invalid date
    if (isNaN(date.getTime())) return 'Recently Published';
    
    return date.toLocaleDateString('en-US', options);
  } catch (e) {
    console.error("Error formatting date:", e);
    return 'Recently Published';
  }
};
