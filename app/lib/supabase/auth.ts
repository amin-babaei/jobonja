import { createSupabaseServerClient } from "@lib/supabase/createServerClient";

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (user) return user;

  const { data: { session } } = await supabase.auth.refreshSession();

  return session?.user ?? null;
}