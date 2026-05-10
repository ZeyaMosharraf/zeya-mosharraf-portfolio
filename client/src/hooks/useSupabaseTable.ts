import { useQuery } from "@tanstack/react-query";
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
  const { data, isLoading, error } = useQuery({
    queryKey: ['supabase', table, orderBy?.column, orderBy?.ascending],
    queryFn: async () => {
      let query = supabase.from(table).select("*");

      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending });
      }

      const { data: result, error: fetchError } = await query;

      if (fetchError) {
        console.error(`Error fetching ${table}:`, {
          code: fetchError.code,
          message: fetchError.message,
        });
        throw fetchError;
      }
      
      return (result || []) as T[];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 1
  });

  return { 
    data: data || [], 
    loading: isLoading, 
    error: error ? error.message : null 
  };
}
