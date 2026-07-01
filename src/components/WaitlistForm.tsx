import { useState } from "react";
import { Loader2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

const UNIQUE_VIOLATION = "23505";

const WaitlistForm = ({
  source,
  count,
  onJoined,
  showCounter = true,
  variant = "default",
  className,
}: {
  source: "hero" | "footer";
  count: number | null;
  onJoined: () => void;
  showCounter?: boolean;
  variant?: "default" | "on-brand";
  className?: string;
}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    const { error } = await supabase.from("waitlist").insert({ email, source });
    if (error) {
      setStatus(error.code === UNIQUE_VIOLATION ? "duplicate" : "error");
      return;
    }
    setStatus("success");
    setEmail("");
    onJoined();
  };

  const isOnBrand = variant === "on-brand";

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className={cn(
            "h-12 rounded-full px-5",
            isOnBrand
              ? "border-white/30 bg-white/10 text-white placeholder:text-white/60"
              : "border-white/10 bg-white/5 text-white placeholder:text-white/40",
          )}
        />
        <Button
          type="submit"
          size="lg"
          disabled={status === "loading"}
          className={cn(
            "h-12 shrink-0 rounded-full border-0 px-7",
            isOnBrand ? "bg-white text-slate-950 hover:bg-white/90" : "btn-gradient text-white",
          )}
        >
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join Waitlist"}
        </Button>
      </form>

      {status === "success" && (
        <p className="mt-3 text-sm text-emerald-400">You&apos;re in! We&apos;ll notify you when CA-flow is ready.</p>
      )}
      {status === "duplicate" && (
        <p className="mt-3 text-sm text-amber-400">You&apos;re already on the waitlist!</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-400">Something went wrong. Please try again in a moment.</p>
      )}

      {showCounter && count !== null && (
        <div
          className={cn(
            "mt-4 flex items-center gap-2 text-sm",
            isOnBrand ? "text-white/80" : "text-white/60",
          )}
        >
          <Users className="h-4 w-4" />
          {count.toLocaleString()} people on the waitlist
        </div>
      )}
    </div>
  );
};

export default WaitlistForm;
