import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { queryClient } from "@/lib/queryClient";

interface OrderBy {
  column: string;
  ascending: boolean;
}

interface UseSupabaseTableResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export const fetchSupabaseTable = async <T>(table: string, orderBy?: OrderBy): Promise<T[]> => {
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
};

export function prefetchSupabaseTable(table: string, orderBy?: OrderBy) {
  return queryClient.prefetchQuery({
    queryKey: ['supabase', table, orderBy?.column, orderBy?.ascending],
    queryFn: () => fetchSupabaseTable(table, orderBy),
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Reusable hook for fetching and subscribing to real-time updates from Supabase tables
 * 
 * @template T - Type of data items in the table
 * @param table - Supabase table name
 * @param orderBy - Optional ordering configuration
 * @returns Object with data array, loading state, and error state
 */
export function useSupabaseTable<T>(
  table: string,
  orderBy?: OrderBy
): UseSupabaseTableResult<T> {
  const { data, isLoading, error } = useQuery({
    queryKey: ['supabase', table, orderBy?.column, orderBy?.ascending],
    queryFn: () => fetchSupabaseTable<T>(table, orderBy),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 1
  });

  return { 
    data: data || [], 
    loading: isLoading, 
    error: error ? error.message : null 
  };
}
