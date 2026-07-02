import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("URL:", url);
console.log("KEY EXISTS:", !!key);

export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null;

export function isSupabaseConfigured() {
  return !!supabase;
}