import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./env";

let cached: SupabaseClient | null = null;

export function getServiceSupabase() {
  if (cached) return cached;
  const config = getSupabaseConfig();
  if (!config) {
    throw new Error("Missing environment variable SUPABASE_URL");
  }
  cached = createClient(config.url, config.serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
