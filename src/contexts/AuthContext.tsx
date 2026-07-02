import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    supabase!.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session ?? null);
        setUser(data.session?.user ?? null);
      })
      .finally(() => setLoading(false));

    const {
      data: { subscription },
    } = supabase!.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null);
      setUser(newSession?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signUp(email: string, password: string) {
    if (!isSupabaseConfigured()) throw new Error("Supabase not configured");
    const { data, error } = await supabase!.auth.signUp({ email, password });
    if (error) throw error;
    setSession(data.session ?? null);
    setUser(data.session?.user ?? null);
  }

  async function signIn(email: string, password: string) {
    if (!isSupabaseConfigured()) throw new Error("Supabase not configured");
    const { data, error } = await supabase!.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setSession(data.session ?? null);
    setUser(data.session?.user ?? null);
  }

  async function signInWithGoogle() {
    if (!isSupabaseConfigured()) throw new Error("Supabase not configured");
    // Return to wherever the user was before login; sessionStorage survives
    // the OAuth redirect so pendingPlan intent is picked up on return.
    const returnTo = sessionStorage.getItem("returnTo") || "/";
    const { error } = await supabase!.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + returnTo },
    });
    if (error) throw error;
  }

  async function signOut() {
    if (!isSupabaseConfigured()) return;
    const { error } = await supabase!.auth.signOut();
    if (error) throw error;
    setSession(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
