import { useState } from "react";
import { BadgeCheck, Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { redeemCoupon, type UserPlan } from "@/services/coupons";

export type PlanKey = "solo" | "firm";

const planDetails: Record<PlanKey, { name: string; price: string; blurb: string; features: string[] }> = {
  solo: {
    name: "Solo",
    price: "₹199/month",
    blurb: "For individual CAs.",
    features: ["Unlimited clients", "All 98 calculators", "Compliance tracker", "Task management", "PDF export"],
  },
  firm: {
    name: "Firm",
    price: "₹999/month",
    blurb: "For CA firms with teams.",
    features: ["Everything in Solo", "Team management", "Role assignment", "Dedicated support"],
  },
};

// TODO: Replace the coupon input below with Razorpay checkout.
// On successful payment webhook, run the same logic as redeemCoupon()
// but triggered by payment confirmation instead of a coupon code:
// insert/update user_plans with plan='pro' or 'firm',
// expires_at = payment period end. The Razorpay webhook should hit a
// Supabase Edge Function that performs this update server-side
// (not client-side) for security.
const UpgradeModal = ({
  plan,
  currentPlan,
  onClose,
  onActivated,
}: {
  plan: PlanKey;
  currentPlan: UserPlan | null;
  onClose: () => void;
  onActivated: () => void;
}) => {
  const { user } = useAuth();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const details = planDetails[plan];
  const isPaid = currentPlan && (currentPlan.plan === "pro" || currentPlan.plan === "firm");

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError("");
    setLoading(true);
    const result = await redeemCoupon(code, user.id);
    setLoading(false);
    if (result.valid) {
      setSuccess(result.message ?? "Plan activated!");
      onActivated();
    } else {
      setError(result.error ?? "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h3 className="font-display text-lg font-bold text-[var(--text-primary)]">
            {isPaid ? "Your subscription" : `Upgrade to ${details.name}`}
          </h3>
          <button onClick={onClose} aria-label="Close" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
            <X className="h-5 w-5" />
          </button>
        </div>

        {isPaid && !success ? (
          <div className="mt-4">
            <div className="flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <BadgeCheck className="h-4 w-4 shrink-0" />
              You&apos;re on the {currentPlan!.plan} plan
              {currentPlan!.expiresAt &&
                ` until ${new Date(currentPlan!.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`}
              .
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              Plan changes and billing management are coming soon. Contact{" "}
              <a href="mailto:hello@ca-flow.in" className="text-[var(--color-primary)] hover:underline">hello@ca-flow.in</a>{" "}
              for help with your subscription.
            </p>
          </div>
        ) : success ? (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <BadgeCheck className="h-4 w-4 shrink-0" /> {success}
          </div>
        ) : (
          <>
            <div className="mt-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-base)] p-4">
              <div className="font-display text-xl font-bold text-[var(--text-primary)]">{details.price}</div>
              <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{details.blurb}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-[var(--text-secondary)]">
                {details.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
              Payment integration is launching soon. In the meantime, join our waitlist for early access, or if
              you have a coupon code, enter it below to activate your plan.
            </p>

            <form onSubmit={handleActivate} className="mt-4 flex gap-2">
              <Input
                required
                placeholder="Coupon code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="h-11 rounded-xl border-[var(--border-color)] bg-[var(--bg-base)] px-4 uppercase text-[var(--text-primary)] placeholder:normal-case placeholder:text-[var(--text-tertiary)]"
              />
              <Button type="submit" disabled={loading} className="btn-gradient h-11 shrink-0 rounded-xl border-0 px-5 text-white">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Activate"}
              </Button>
            </form>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default UpgradeModal;
