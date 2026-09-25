import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getRagEnv } from "./env";

let cached: SupabaseClient | null = null;

export function getServiceSupabase() {
  if (cached) return cached;
  const { supabaseUrl, supabaseServiceKey } = getRagEnv();
  cached = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
