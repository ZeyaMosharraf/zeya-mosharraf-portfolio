import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

interface OrderBy {
  column: string;
  ascending: boolean;
}

interface UseSupabaseTableResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

/**
 * Reusable hook for fetching and subscribing to real-time updates from Supabase tables
 * 
 * @template T - Type of data items in the table
 * @param table - Supabase table name
 * @param orderBy - Optional ordering configuration
 * @returns Object with data array, loading state, and error state
 * 
 * @example
 * const { data: skills, loading, error } = useSupabaseTable<Skill>("skills", { 
 *   column: "sort_order", 
 *   ascending: true 
 * })
 */
export function useSupabaseTable<T>(
  table: string,
  orderBy?: OrderBy
): UseSupabaseTableResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const fallbackData: Record<string, any[]> = {
    portfolio_info: [
      { id: "1", category: "social_link", label: "GitHub", value: "https://github.com/ZeyaMosharraf", display_value: "github.com/ZeyaMosharraf", link_url: "https://github.com/ZeyaMosharraf", icon_name: "github", sort_order: 1 },
      { id: "2", category: "social_link", label: "LinkedIn", value: "https://www.linkedin.com/in/zeya-mosharraf/", display_value: "linkedin.com/in/zeyamosharraf", link_url: "https://www.linkedin.com/in/zeya-mosharraf/", icon_name: "linkedin", sort_order: 2 },
      { id: "3", category: "social_link", label: "Email", value: "zeyamosharraf999@gmail.com", display_value: "zeyamosharraf999@gmail.com", icon_name: "mail", sort_order: 3 },
      { id: "4", category: "social_link", label: "Google Cloud Skills", value: "https://www.skills.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0", display_value: "skills.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0", link_url: "https://www.skills.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0", icon_name: "cloud", sort_order: 4 },
      { id: "5", category: "social_link", label: "HackerRank", value: "https://www.hackerrank.com/profile/zeyamosharraf", display_value: "hackerrank.com/profile/zeyamosharraf", link_url: "https://www.hackerrank.com/profile/zeyamosharraf", icon_name: "hackerrank", sort_order: 5 },
      { id: "6", category: "contact_info", label: "Email", value: "zeyamosharraf999@gmail.com", display_value: "zeyamosharraf999@gmail.com", icon_name: "mail", sort_order: 1 },
      { id: "7", category: "contact_info", label: "Location", value: "Delhi NCR, India", display_value: "Delhi NCR, India", icon_name: "map-pin", sort_order: 2 },
    ],
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase.from(table).select("*");

      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending });
      }

      const { data: result, error: fetchError } = await query;

      if (!mountedRef.current) return;

      if (fetchError) {
        console.error(`Error fetching ${table}:`, {
          code: fetchError.code,
          message: fetchError.message,
        });
        setError(fetchError.message);
        setData((fallbackData[table] as T[]) || []);
      } else if (!result || result.length === 0) {
        console.warn(`No data returned from ${table} table, using fallback`);
        console.log("Fallback data:", fallbackData[table]);
        setData((fallbackData[table] as T[]) || []);
      } else {
        console.log(`Fetched ${result.length} rows from ${table}`);
        setData(result as T[]);
      }
    } catch (err: any) {
      console.error(`Unexpected error fetching ${table}:`, err?.message);
      setError(err?.message || "Unknown error");
      setData((fallbackData[table] as T[]) || []);
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    fetchData();

    return () => {
      mountedRef.current = false;
    };
  }, [table]);

  return { data, loading, error };
}
