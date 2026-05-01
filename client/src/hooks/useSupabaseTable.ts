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
        console.error(`❌ Error fetching ${table}:`, {
          code: fetchError.code,
          message: fetchError.message,
          status: fetchError.status,
        });
        setError(fetchError.message);
        setData([]);
      } else if (!result || result.length === 0) {
        console.warn(`⚠️ No data returned from ${table} table`);
        setData([]);
      } else {
        console.log(`✅ Fetched ${result.length} rows from ${table}`);
        setData(result as T[]);
      }
    } catch (err: any) {
      console.error(`❌ Unexpected error fetching ${table}:`, err?.message);
      setError(err?.message || "Unknown error");
      setData([]);
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    
    // Initial fetch
    fetchData();

    // Set up real-time subscription
    const channel = supabase
      .channel(`${table}-changes`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: table,
        },
        (payload) => {
          // Async refetch but don't return the promise (fire and forget)
          if (mountedRef.current) {
            fetchData();
          }
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      mountedRef.current = false;
      supabase.removeChannel(channel);
    };
  }, [table]);

  return { data, loading, error };
}
