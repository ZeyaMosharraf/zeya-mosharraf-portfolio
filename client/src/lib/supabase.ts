import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    `Missing Supabase environment variables. Ensure .env has:\n` +
    `VITE_SUPABASE_URL=${supabaseUrl ? "✓" : "✗"}\n` +
    `VITE_SUPABASE_ANON_KEY=${supabaseAnonKey ? "✓" : "✗"}`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
