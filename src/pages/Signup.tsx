import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { GoogleIcon } from "./Login";

const Signup = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);
    try {
      await signUp(email, password);
      // If email confirmation is enabled in Supabase there is no session yet
      setNotice("Account created. If prompted, confirm your email, then sign in.");
      const returnTo = sessionStorage.getItem("returnTo") || "/";
      sessionStorage.removeItem("returnTo");
      navigate(returnTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[var(--bg-base)] px-4">
      <Link to="/" className="absolute left-6 top-6 z-10 flex items-center gap-1 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="w-full max-w-[400px] rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-8" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="mb-6 flex justify-center"><Logo /></div>
        <h1 className="font-display text-center text-2xl font-bold text-[var(--text-primary)]">Create your account</h1>

        <Button
          type="button"
          onClick={handleGoogle}
          className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[var(--border-color)] bg-white text-base font-medium text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
        >
          <GoogleIcon />
          Continue with Google
        </Button>

        <div className="my-5 flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
          <div className="h-px flex-1 bg-[var(--border-color)]" />
          or
          <div className="h-px flex-1 bg-[var(--border-color)]" />
        </div>

        <form onSubmit={handleEmailSignup} className="space-y-3">
          <Input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-xl border-[var(--border-color)] bg-[var(--bg-base)] px-4 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
          />
          <Input
            type="password"
            required
            minLength={6}
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 rounded-xl border-[var(--border-color)] bg-[var(--bg-base)] px-4 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
          />
          <Button type="submit" disabled={loading} className="btn-gradient h-12 w-full rounded-xl border-0 text-white">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign up"}
          </Button>
        </form>

        {error && <p className="mt-3 text-center text-sm text-red-600">{error}</p>}
        {notice && <p className="mt-3 text-center text-sm text-emerald-600">{notice}</p>}

        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-[var(--color-primary)] hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
