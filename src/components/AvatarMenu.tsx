import { useEffect, useRef, useState } from "react";
import { ExternalLink, LogOut, Sparkles } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { useAuth } from "@/contexts/AuthContext";
import type { UserPlan } from "@/services/coupons";

const initialsOf = (user: User) => {
  const name = (user.user_metadata?.full_name as string) || "";
  if (name.trim()) {
    const parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
  }
  return (user.email?.[0] ?? "?").toUpperCase();
};

const AvatarMenu = ({
  user,
  plan,
  onUpgrade,
}: {
  user: User;
  plan: UserPlan | null;
  onUpgrade: () => void;
}) => {
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const isPaid = plan && (plan.plan === "pro" || plan.plan === "firm");
  const displayName = (user.user_metadata?.full_name as string) || user.email;

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white transition hover:brightness-105"
        style={{ background: "var(--gradient-primary)" }}
      >
        {initialsOf(user)}
      </button>

      {open && (
        <div
          className="absolute right-0 top-10 z-40 w-64 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] py-2"
          style={{ boxShadow: "var(--shadow-card-hover)" }}
        >
          <div className="px-4 py-2">
            <div className="truncate text-sm text-[var(--text-secondary)]">{displayName}</div>
            <span
              className="mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize text-white"
              style={{ background: isPaid ? "var(--gradient-primary)" : "var(--text-tertiary)" }}
            >
              {plan?.plan ?? "free"}
            </span>
          </div>

          <div className="my-1 h-px bg-[var(--border-color)]" />

          <button
            onClick={() => {
              setOpen(false);
              onUpgrade();
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
          >
            <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
            {isPaid ? "Manage Subscription" : "Upgrade to Pro"}
          </button>

          <a
            href="https://ca-flow-ten.vercel.app/dashboard"
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
          >
            <ExternalLink className="h-4 w-4 text-[var(--text-tertiary)]" />
            Open CA-flow App
          </a>

          <div className="my-1 h-px bg-[var(--border-color)]" />

          <button
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-[var(--bg-elevated)]"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;
