import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  CalendarClock,
  Check,
  ChevronRight,
  ClipboardList,
  Cloud,
  Globe2,
  Laptop2,
  ShieldCheck,
  Users,
} from "lucide-react";
import AvatarMenu from "@/components/AvatarMenu";
import Logo from "@/components/Logo";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import UpgradeModal, { type PlanKey } from "@/components/UpgradeModal";
import WaitlistForm from "@/components/WaitlistForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { getUserPlan, type UserPlan } from "@/services/coupons";

const features = [
  { icon: Users, title: "Client Management", desc: "Store and organize every client securely in one streamlined workspace." },
  { icon: ClipboardList, title: "Task Management", desc: "Create tasks, assign work and monitor progress across your practice." },
  { icon: CalendarClock, title: "Due Date Tracking", desc: "Never miss GST, ITR, TDS or ROC filing deadlines again." },
  { icon: Building2, title: "98 Professional Calculators", desc: "Built specifically for Indian Chartered Accountants and tax professionals." },
  { icon: Cloud, title: "Secure Cloud Sync", desc: "Keep your data synchronized and accessible across your trusted devices." },
  { icon: Laptop2, title: "Fast Desktop Experience", desc: "Enjoy native desktop performance with a distraction-free workflow." },
];

const reasons = [
  "One centralized dashboard",
  "Organized client records",
  "Smart due date tracking",
  "Faster workflow",
  "Built-in calculators",
  "Cloud synchronization",
];

const steps = [
  {
    title: "Join the waitlist",
    desc: "Enter your email to get early access. We'll notify you as soon as CA-flow is ready.",
  },
  {
    title: "Sign in using Google or Email",
    desc: "One-click Google login or use your email. Your data is private and encrypted.",
  },
  {
    title: "Add your clients",
    desc: "Add client details like PAN, GSTIN, and entity type. We auto-create their compliance deadlines.",
  },
  {
    title: "Manage your practice effortlessly",
    desc: "Track filings, manage tasks, run calculations, and never miss a deadline again.",
  },
];

const faqs = [
  {
    question: "Is CA-flow available only in India?",
    answer: "Yes. CA-flow is designed for Indian Chartered Accountants, tax professionals and accounting firms working in the Indian compliance ecosystem.",
  },
  {
    question: "Does CA-flow work offline?",
    answer: "CA-flow requires an internet connection to sync your data. Your calculations work offline, but client data and compliance tracking need connectivity.",
  },
  {
    question: "How are subscriptions synced?",
    answer: "Your subscription is linked to your account. Log in on any device and your plan is automatically active.",
  },
  {
    question: "Can I sign in using Google?",
    answer: "Yes. CA-flow supports Google login and email/password authentication.",
  },
  {
    question: "Do the calculators work offline?",
    answer: "Calculator formulas run locally in your browser. You can compute income tax, GST, TDS, and more without an internet connection. Saving results to a client requires connectivity.",
  },
  {
    question: "Can I use CA-flow on multiple devices?",
    answer: "Yes. Log in with the same account on any device and your data syncs automatically.",
  },
];

const ScreenMockup = ({ title, subtitle, accent }: { title: string; subtitle: string; accent: string }) => (
  <div className="rounded-[20px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-5" style={{ boxShadow: "var(--shadow-card)" }}>
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-elevated)] p-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--text-tertiary)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--text-tertiary)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--text-tertiary)]" />
      </div>
      <div className="grid gap-3">
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-base)] p-3">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-[var(--text-primary)]">{title}</div>
              <div className="text-xs text-[var(--text-tertiary)]">{subtitle}</div>
            </div>
            <div className="rounded-full px-2.5 py-1 text-[10px] font-semibold text-white" style={{ background: accent }}>
              Live
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-3">
              <div className="mb-3 h-2.5 w-24 rounded-full bg-[var(--bg-elevated)]" />
              <div className="space-y-2">
                <div className="h-2.5 w-full rounded-full bg-[var(--bg-elevated)]" />
                <div className="h-2.5 w-4/5 rounded-full bg-[var(--bg-elevated)]" />
                <div className="h-2.5 w-3/5 rounded-full bg-[var(--bg-elevated)]" />
              </div>
            </div>
            <div className="space-y-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-3">
              <div className="h-2.5 w-16 rounded-full bg-[var(--bg-elevated)]" />
              <div className="h-16 rounded-2xl" style={{ background: accent }} />
              <div className="h-2.5 w-20 rounded-full bg-[var(--bg-elevated)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Landing = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [plan, setPlan] = useState<UserPlan | null>(null);
  const [upgradePlan, setUpgradePlan] = useState<PlanKey | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .then(({ count }) => setWaitlistCount(count ?? 0));
  }, []);

  const loadPlan = useCallback(() => {
    if (!user) {
      setPlan(null);
      return;
    }
    getUserPlan(user.id).then(setPlan);
  }, [user]);

  useEffect(() => {
    loadPlan();
  }, [loadPlan]);

  // Resume an upgrade the user started while logged out: they clicked
  // Upgrade → went to /login → came back here with pendingPlan intact.
  useEffect(() => {
    if (authLoading || !user) return;
    const pendingPlan = sessionStorage.getItem("pendingPlan");
    if (pendingPlan === "solo" || pendingPlan === "firm") {
      sessionStorage.removeItem("pendingPlan");
      setUpgradePlan(pendingPlan);
    }
  }, [authLoading, user]);

  const handleUpgradeClick = (planId: PlanKey) => {
    if (!user) {
      sessionStorage.setItem("returnTo", "/#pricing");
      sessionStorage.setItem("pendingPlan", planId);
      navigate("/login");
      return;
    }
    setUpgradePlan(planId);
  };

  const handleJoined = () => setWaitlistCount((prev) => (prev ?? 0) + 1);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg-base)]">
      <div className="relative z-10">
        <header className="sticky top-0 z-20 border-b border-[var(--border-color)] bg-[var(--bg-base)]">
          <div className="container flex h-16 items-center justify-between px-4 lg:px-0">
            <Logo />
            <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--text-secondary)]">
              <a href="#features" className="transition hover:text-[var(--text-primary)]">Features</a>
              <a href="#why" className="transition hover:text-[var(--text-primary)]">Why CA-flow</a>
              <a href="#pricing" className="transition hover:text-[var(--text-primary)]">Pricing</a>
            </nav>
            <div className="flex items-center gap-4">
              {user ? (
                <AvatarMenu
                  user={user}
                  plan={plan}
                  onUpgrade={() => setUpgradePlan(plan?.plan === "firm" ? "firm" : "solo")}
                />
              ) : (
                <Link to="/login" className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]">
                  Sign in
                </Link>
              )}
              <a href="#waitlist">
                <Button className="btn-gradient h-9 rounded-full border-0 px-5 text-sm text-white">Join Waitlist</Button>
              </a>
            </div>
          </div>
        </header>

        <section className="container grid gap-12 px-4 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-0">
          <div className="animate-fade-in">
            <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
              Built for Indian CAs
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              India&apos;s modern practice management platform for <span className="gradient-text">Chartered Accountants</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
              Manage clients, organize filings, track GST, ITR, TDS and ROC due dates, and access 98 built-in professional calculators—all from one powerful desktop application built exclusively for India.
            </p>
            <div id="waitlist" className="mt-8 max-w-md scroll-mt-24">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Join the waitlist</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">Be the first to get access when we launch.</p>
              <WaitlistForm source="hero" count={waitlistCount} onJoined={handleJoined} className="mt-4" />
            </div>
          </div>

          <div
            className="rounded-[20px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-4"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-base)] p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">CA-flow Desktop</div>
                  <div className="text-xs text-[var(--text-tertiary)]">Practice management dashboard</div>
                </div>
                <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">Synced</div>
              </div>
              <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-sm font-semibold text-[var(--text-primary)]">Today&apos;s focus</div>
                    <div className="btn-gradient rounded-full px-2.5 py-1 text-[10px] font-semibold text-white">3 tasks due today</div>
                  </div>
                  <div className="space-y-2">
                    {[
                      "Prepare GSTR-3B — Orion Foods",
                      "Collect TDS certificates — Apex Clinics",
                      "Review ITR draft — Sharma & Co",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-base)] px-3 py-2 text-sm text-[var(--text-secondary)]">
                        <Check className="h-4 w-4 text-[var(--color-primary)]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4">
                    <div className="text-xs uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Due dates</div>
                    <div className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                      <div className="flex items-center justify-between rounded-xl bg-[var(--bg-base)] px-3 py-2"><span>GSTR-3B</span><span className="font-semibold text-[var(--text-primary)]">20 Jul</span></div>
                      <div className="flex items-center justify-between rounded-xl bg-[var(--bg-base)] px-3 py-2"><span>ITR</span><span className="font-semibold text-[var(--text-primary)]">31 Jul</span></div>
                      <div className="flex items-center justify-between rounded-xl bg-[var(--bg-base)] px-3 py-2"><span>TDS</span><span className="font-semibold text-[var(--text-primary)]">07 Aug</span></div>
                    </div>
                  </div>
                  <div className="btn-gradient rounded-2xl p-4 text-white">
                    <div className="text-sm font-semibold">98 built-in calculators</div>
                    <div className="mt-2 text-sm text-white/85">Purpose-built for Indian compliance and advisory work.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="container px-4 pb-24 lg:px-0">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] px-3 py-1 text-sm text-[var(--text-secondary)]">
              <Globe2 className="h-4 w-4 text-[var(--color-primary)]" />
              Built for India&apos;s compliance workflow
            </div>
            <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">A premium desktop experience for modern CA practices</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">From client onboarding to filing reminders, every workflow is designed to feel calm, secure and fast.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, index) => (
              <RevealOnScroll key={feature.title} delay={index * 100}>
                <div className="card-surface card-surface-hover h-full p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: "rgba(249,115,22,0.1)" }}>
                    <feature.icon className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{feature.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <section id="screenshots" className="container px-4 pb-24 lg:px-0">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">Desktop app screens that feel premium from the first click</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">Built with a clean, focused interface designed for daily use by CA professionals.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <ScreenMockup title="Client workspace" subtitle="Organize clients and documents" accent="linear-gradient(135deg, #f97316, #f59e0b)" />
            <ScreenMockup title="Compliance hub" subtitle="Track due dates in one place" accent="linear-gradient(135deg, #fb923c, #ea580c)" />
          </div>
        </section>

        <section id="why" className="container px-4 pb-24 lg:px-0">
          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-8 lg:p-12" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-base)] px-3 py-1 text-sm text-[var(--text-secondary)]">
                  <ShieldCheck className="h-4 w-4 text-[var(--color-primary)]" />
                  Why CA-flow
                </div>
                <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">Replace scattered tools with one elegant practice command center</h2>
                <p className="mt-4 text-[var(--text-secondary)]">Instead of juggling Excel sheets, sticky notes and multiple software, CA-flow gives you a focused desktop workspace built for Indian compliance and advisory work.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {reasons.map((reason, index) => (
                  <RevealOnScroll key={reason} delay={index * 100}>
                    <div className="h-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-base)] p-4 text-sm text-[var(--text-secondary)]">
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "rgba(249,115,22,0.1)" }}>
                        <Check className="h-4 w-4 text-[var(--color-primary)]" />
                      </div>
                      {reason}
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container px-4 pb-24 lg:px-0">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">How it works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">A simple flow from sign-up to daily practice management.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <RevealOnScroll key={step.title} delay={index * 150}>
                <div className="card-surface card-surface-hover h-full p-6">
                  <div className="btn-gradient mb-4 flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold text-white">
                    0{index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{step.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <section id="pricing" className="container px-4 pb-24 lg:px-0">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">Pricing</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[var(--text-secondary)]">Simple, transparent pricing built for individual CAs and growing firms.</p>
            <div className="mx-auto mt-6 inline-flex items-center gap-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] p-1">
              <button
                onClick={() => setBilling("monthly")}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm transition",
                  billing === "monthly" ? "btn-gradient text-white" : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]",
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm transition",
                  billing === "annual" ? "btn-gradient text-white" : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]",
                )}
              >
                Annual · Save 10%
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card-surface p-8">
              <div className="text-sm text-[var(--text-tertiary)]">Solo</div>
              <div className="font-display mt-2 text-4xl font-bold text-[var(--text-primary)]">
                {billing === "monthly" ? "₹199" : "₹2,149"}
                <span className="text-base font-normal text-[var(--text-tertiary)]">/{billing === "monthly" ? "month" : "year"}</span>
              </div>
              {billing === "annual" && <div className="mt-1 text-sm text-emerald-600">Save ₹239</div>}
              <p className="mt-3 text-sm text-[var(--text-secondary)]">For individual CAs.</p>
              <ul className="mt-6 space-y-3 text-sm text-[var(--text-secondary)]">
                {[
                  "Unlimited clients",
                  "All 98 calculators",
                  "Compliance tracker",
                  "Task management",
                  "PDF export",
                ].map((item) => (
                  <li key={item} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />{item}</li>
                ))}
              </ul>
              <Button onClick={() => handleUpgradeClick("solo")} className="btn-gradient mt-8 w-full rounded-xl border-0 text-white">
                Upgrade to Solo
              </Button>
            </div>
            <div
              className="relative rounded-2xl border-2 border-[var(--color-primary)]/40 bg-[var(--bg-surface)] p-8"
              style={{ boxShadow: "0 4px 20px rgba(249,115,22,0.12)" }}
            >
              <div className="btn-gradient absolute -top-3 left-6 rounded-full px-3 py-1 text-xs text-white">Most Popular</div>
              <div className="text-sm text-[var(--text-tertiary)]">Firm</div>
              <div className="font-display mt-2 text-4xl font-bold text-[var(--text-primary)]">
                {billing === "monthly" ? "₹999" : "₹10,789"}
                <span className="text-base font-normal text-[var(--text-tertiary)]">/{billing === "monthly" ? "month" : "year"}</span>
              </div>
              {billing === "annual" && <div className="mt-1 text-sm text-emerald-600">Save ₹1,199</div>}
              <p className="mt-3 text-sm text-[var(--text-secondary)]">For CA firms with teams.</p>
              <p className="mt-1 text-xs text-[var(--text-tertiary)]">Includes up to 10 members, +₹99 per additional.</p>
              <ul className="mt-6 space-y-3 text-sm text-[var(--text-secondary)]">
                {[
                  "Everything in Solo",
                  "Team management",
                  "Role assignment",
                  "Dedicated support",
                ].map((item) => (
                  <li key={item} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />{item}</li>
                ))}
              </ul>
              <Button onClick={() => handleUpgradeClick("firm")} className="btn-gradient mt-8 w-full rounded-xl border-0 text-white">
                Upgrade to Firm
              </Button>
            </div>
          </div>
        </section>

        <section className="container px-4 pb-24 lg:px-0">
          <div className="rounded-3xl p-8 lg:p-12" style={{ background: "var(--gradient-primary)" }}>
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-sm text-white/90">
                <Users className="h-4 w-4" />
                Get early access
              </div>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Get early access to CA-flow</h2>
              <p className="mt-4 max-w-2xl text-white/85">
                Join {(waitlistCount ?? 0).toLocaleString()}+ professionals waiting for launch.
              </p>
              <WaitlistForm
                source="footer"
                count={waitlistCount}
                onJoined={handleJoined}
                variant="on-brand"
                showCounter={false}
                className="mt-8 max-w-md"
              />
            </div>
          </div>
        </section>

        <section className="container px-4 pb-24 lg:px-0">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold text-[var(--text-primary)] sm:text-4xl">Frequently asked questions</h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={item.question} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4">
                  <button className="flex w-full items-center justify-between gap-4 text-left" onClick={() => setOpenFaq(isOpen ? null : index)}>
                    <span className="font-medium text-[var(--text-primary)]">{item.question}</span>
                    <ChevronRight className={cn("h-4 w-4 text-[var(--text-tertiary)] transition", isOpen && "rotate-90")} />
                  </button>
                  {isOpen && <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.answer}</p>}
                </div>
              );
            })}
          </div>
        </section>

        <footer className="border-t border-[var(--border-color)] bg-[var(--bg-elevated)]">
          <div className="container flex flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between lg:px-0">
            <div>
              <Logo />
              <p className="mt-3 max-w-md text-sm text-[var(--text-secondary)]">Made for Indian Chartered Accountants, Tax Professionals and Accounting Firms.</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-[var(--text-tertiary)]">
              <a href="mailto:hello@ca-flow.in?subject=Privacy%20Policy%20Request" className="transition hover:text-[var(--color-primary)]">Privacy Policy</a>
              <a href="mailto:hello@ca-flow.in?subject=Terms%20Request" className="transition hover:text-[var(--color-primary)]">Terms & Conditions</a>
              <a href="mailto:hello@ca-flow.in" className="transition hover:text-[var(--color-primary)]">Contact</a>
            </div>
          </div>
        </footer>
      </div>

      {upgradePlan && (
        <UpgradeModal
          plan={upgradePlan}
          currentPlan={plan}
          onClose={() => setUpgradePlan(null)}
          onActivated={loadPlan}
        />
      )}
    </div>
  );
};

export default Landing;
