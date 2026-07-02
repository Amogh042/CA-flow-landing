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
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setErrorMessage("Waitlist is not configured yet.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const { error } = await supabase.from("waitlist").insert({ email, source });
      if (error) {
        console.error("Waitlist insert error:", error.message, error.code, error.details);
        if (error.code === UNIQUE_VIOLATION) {
          setStatus("duplicate");
        } else {
          setErrorMessage(error.message);
          setStatus("error");
        }
        return;
      }
      setStatus("success");
      setEmail("");
      onJoined();
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
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
            "h-12 rounded-xl px-5",
            isOnBrand
              ? "border-white/30 bg-white/15 text-white placeholder:text-white/70"
              : "border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
          )}
        />
        <Button
          type="submit"
          size="lg"
          disabled={status === "loading"}
          className={cn(
            "h-12 shrink-0 rounded-xl border-0 px-7",
            isOnBrand ? "bg-white text-[var(--color-primary)] hover:bg-white/90" : "btn-gradient text-white",
          )}
        >
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Join Waitlist"}
        </Button>
      </form>

      {status === "success" && (
        <p className="mt-3 text-sm text-emerald-600">You&apos;re in! We&apos;ll notify you when CA-flow is ready.</p>
      )}
      {status === "duplicate" && (
        <p className="mt-3 text-sm text-amber-600">You&apos;re already on the waitlist!</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">
          {errorMessage ? `Error: ${errorMessage}` : "Something went wrong. Please try again in a moment."}
        </p>
      )}

      {showCounter && count !== null && (
        <div
          className={cn(
            "mt-4 flex items-center gap-2 text-sm",
            isOnBrand ? "text-white/85" : "text-[var(--text-tertiary)]",
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
