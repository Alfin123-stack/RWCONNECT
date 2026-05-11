"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { User } from "../types";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      setLoading(true);

      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        setUser(null);
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .single();

      setUser(profile ?? null);
      setIsLoggedIn(true);
      setLoading(false);
    }

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUser(null);
        setIsLoggedIn(false);
      } else {
        getUser();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAdmin = user?.role === "admin" || user?.role === "ketua_rw";

  return {
    user,
    isLoggedIn,
    loading,
    isAdmin,
  };
}
