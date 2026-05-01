// ============================================================
// RWCONNECT - Supabase Server Client (READ ONLY - SAFE)
// ============================================================
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createServerSupabaseClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },

        // ❌ DISABLE SET
        set() {
          // no-op biar nggak error
        },

        remove() {
          // no-op
        },
      },
    },
  );
}
