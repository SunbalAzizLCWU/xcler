function required(name: string, fallbackNames: string[] = []) {
  const value = [name, ...fallbackNames]
    .map((key) => process.env[key]?.trim())
    .find(Boolean);
  if (!value) {
    throw new Error(`Missing environment variable ${name}`);
  }
  return value;
}

export function getGroqApiKey() {
  return process.env.GROQ_API_KEY?.trim() || "";
}

export function getJinaApiKey() {
  return process.env.JINA_API_KEY?.trim() || "";
}

export function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.trim();
  const serviceKey =
    process.env.SUPABASE_SERVICE_KEY?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !serviceKey) return null;
  return { url, serviceKey };
}

export function getRagEnv() {
  const supabase = getSupabaseConfig();
  return {
    groqApiKey: getGroqApiKey(),
    jinaApiKey: getJinaApiKey(),
    supabaseUrl: supabase?.url || "",
    supabaseServiceKey: supabase?.serviceKey || "",
  };
}

export function getSessionSecret() {
  return (
    process.env.ASSISTANT_SESSION_SECRET?.trim() ||
    process.env.SUPABASE_SERVICE_KEY?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.GROQ_API_KEY?.trim() ||
    "xcler-assistant-dev-secret"
  );
}

export function useRemoteSupabaseRag() {
  return process.env.RAG_USE_SUPABASE === "1";
}
