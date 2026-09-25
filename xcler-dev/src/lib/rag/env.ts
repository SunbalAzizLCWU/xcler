function required(name: string, fallbackNames: string[] = []) {
  const value = [name, ...fallbackNames]
    .map((key) => process.env[key]?.trim())
    .find(Boolean);
  if (!value) {
    throw new Error(`Missing environment variable ${name}`);
  }
  return value;
}

export function getRagEnv() {
  return {
    groqApiKey: required("GROQ_API_KEY"),
    jinaApiKey: required("JINA_API_KEY"),
    supabaseUrl: required("SUPABASE_URL"),
    supabaseServiceKey: required("SUPABASE_SERVICE_KEY", ["SUPABASE_SERVICE_ROLE_KEY"]),
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
