import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import Orbs from "@/components/Orbs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.68 4.1-5.5 4.1-3.3 0-6-2.73-6-6.1s2.7-6.1 6-6.1c1.88 0 3.14.8 3.86 1.48l2.64-2.54C16.8 3.4 14.6 2.4 12 2.4 6.8 2.4 2.6 6.6 2.6 12S6.8 21.6 12 21.6c6.9 0 9.4-4.85 9.4-7.37 0-.5-.06-.88-.14-1.23H12z"/>
    <path fill="#34A853" d="M3.88 7.6l3.2 2.35C7.9 8.1 9.77 6.9 12 6.9c1.88 0 3.14.8 3.86 1.48l2.64-2.54C16.8 3.4 14.6 2.4 12 2.4 8.25 2.4 5.04 4.55 3.88 7.6z" opacity="0"/>
  </svg>
);

const Login = () => (
  <div className="relative min-h-screen flex items-center justify-center px-4">
    <Orbs />
    <Link to="/" className="absolute top-6 left-6 z-10 text-sm text-white/60 hover:text-white flex items-center gap-1">
      <ArrowLeft className="h-4 w-4" /> Back
    </Link>

    <div className="relative z-10 glass p-10 w-full max-w-md animate-scale-in">
      <div className="flex justify-center mb-8"><Logo /></div>
      <h1 className="text-3xl font-bold text-center">Welcome back</h1>
      <p className="mt-2 text-center text-white/60 text-sm">Sign in to access your calculators and history.</p>

      <Button className="mt-8 w-full rounded-full bg-white text-black hover:bg-white/90 h-12 text-base font-medium flex items-center justify-center gap-3">
        <GoogleIcon />
        Sign in with Google
      </Button>

      <p className="mt-6 text-center text-xs text-white/50 leading-relaxed">
        No account needed — Google login creates yours automatically.
      </p>

      <div className="mt-8 pt-6 border-t border-white/5 text-center">
        <Link to="/dashboard" className="text-sm text-primary hover:underline">Skip to dashboard demo →</Link>
      </div>
    </div>
  </div>
);

export default Login;
