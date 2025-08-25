import { createClient } from "@supabase/supabase-js";

let cached = null;

export function getSupabaseServerClient() {
  if (cached) return cached;
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || 
              process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    console.log("Supabase environment variables not configured");
    return null;
  }
  
  try {
    cached = createClient(url, key, { 
      auth: { persistSession: false } 
    });
    return cached;
  } catch (error) {
    console.error("Error creating Supabase client:", error);
    return null;
  }
}