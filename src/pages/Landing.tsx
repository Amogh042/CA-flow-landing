import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  Sparkles,
  Users,
} from "lucide-react";
import Logo from "@/components/Logo";
import Orbs from "@/components/Orbs";
import WaitlistForm from "@/components/WaitlistForm";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

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

const Stat = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => (
  <div className="glass glass-hover p-6 text-center">
    <div className="text-4xl font-bold gradient-text">{value.toLocaleString()}{suffix}</div>
    <div className="mt-2 text-sm text-white/60">{label}</div>
  </div>
);

const ScreenMockup = ({ title, subtitle, accent }: { title: string; subtitle: string; accent: string }) => (
  <div className="glass p-5 shadow-[0_20px_80px_rgba(8,15,36,0.35)]">
    <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
      </div>
      <div className="grid gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-white">{title}</div>
              <div className="text-xs text-white/50">{subtitle}</div>
            </div>
            <div className="rounded-full px-2.5 py-1 text-[10px] font-semibold text-white" style={{ background: accent }}>
              Live
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">
              <div className="mb-3 h-2.5 w-24 rounded-full bg-white/15" />
              <div className="space-y-2">
                <div className="h-2.5 w-full rounded-full bg-white/10" />
                <div className="h-2.5 w-4/5 rounded-full bg-white/10" />
                <div className="h-2.5 w-3/5 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="h-2.5 w-16 rounded-full bg-white/15" />
              <div className="h-16 rounded-2xl" style={{ background: accent }} />
              <div className="h-2.5 w-20 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Landing = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .then(({ count }) => setWaitlistCount(count ?? 0));
  }, []);

  const handleJoined = () => setWaitlistCount((prev) => (prev ?? 0) + 1);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Orbs />
      <div className="relative z-10">
        <header className="container flex items-center justify-between py-6">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#why" className="transition hover:text-white">Why CA-flow</a>
            <a href="#pricing" className="transition hover:text-white">Pricing</a>
            <Link to="/login" className="transition hover:text-white">Login</Link>
          </nav>
          <a href="#waitlist">
            <Button className="btn-gradient rounded-full border-0 px-5 text-white">Join Waitlist</Button>
          </a>
        </header>

        <section className="container grid gap-12 px-4 pb-24 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-0">
          <div className="animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Built for Indian CAs, tax professionals and accounting firms
            </div>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              India&apos;s modern practice management platform for <span className="gradient-text">Chartered Accountants</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
              Manage clients, organize filings, track GST, ITR, TDS and ROC due dates, and access 98 built-in professional calculators—all from one powerful desktop application built exclusively for India.
            </p>
            <div id="waitlist" className="mt-8 max-w-md scroll-mt-24">
              <h2 className="text-lg font-semibold text-white">Join the waitlist</h2>
              <p className="mt-1 text-sm text-white/60">Be the first to get access when we launch.</p>
              <WaitlistForm source="hero" count={waitlistCount} onJoined={handleJoined} className="mt-4" />
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 shadow-[0_40px_120px_rgba(8,15,36,0.45)] backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">CA-flow Desktop</div>
                  <div className="text-xs text-white/50">Practice management dashboard</div>
                </div>
                <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">Synced</div>
              </div>
              <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-sm font-semibold text-white">Today&apos;s focus</div>
                    <div className="rounded-full bg-gradient-brand px-2.5 py-1 text-[10px] font-semibold text-white">3 tasks due today</div>
                  </div>
                  <div className="space-y-2">
                    {[
                      "Prepare GSTR-3B — Orion Foods",
                      "Collect TDS certificates — Apex Clinics",
                      "Review ITR draft — Sharma & Co",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white/70">
                        <Check className="h-4 w-4 text-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs uppercase tracking-[0.24em] text-white/40">Due dates</div>
                    <div className="mt-3 space-y-2 text-sm text-white/70">
                      <div className="flex items-center justify-between rounded-xl bg-slate-900/70 px-3 py-2"><span>GSTR-3B</span><span className="font-semibold text-white">20 Jul</span></div>
                      <div className="flex items-center justify-between rounded-xl bg-slate-900/70 px-3 py-2"><span>ITR</span><span className="font-semibold text-white">31 Jul</span></div>
                      <div className="flex items-center justify-between rounded-xl bg-slate-900/70 px-3 py-2"><span>TDS</span><span className="font-semibold text-white">07 Aug</span></div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-gradient-brand p-4 text-white">
                    <div className="text-sm font-semibold">98 built-in calculators</div>
                    <div className="mt-2 text-sm text-white/80">Purpose-built for Indian compliance and advisory work.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container px-4 pb-24 lg:px-0">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70">
              <Globe2 className="h-4 w-4 text-primary" />
              Built for India&apos;s compliance workflow
            </div>
            <h2 className="text-3xl font-semibold sm:text-4xl">A premium desktop experience for modern CA practices</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">From client onboarding to filing reminders, every workflow is designed to feel calm, secure and fast.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="glass glass-hover p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-brand">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="screenshots" className="container px-4 pb-24 lg:px-0">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">Desktop app screens that feel premium from the first click</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">Built with a clean, focused interface designed for daily use by CA professionals.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <ScreenMockup title="Client workspace" subtitle="Organize clients and documents" accent="linear-gradient(135deg, #0ea5e9, #6366f1)" />
            <ScreenMockup title="Compliance hub" subtitle="Track due dates in one place" accent="linear-gradient(135deg, #8b5cf6, #ec4899)" />
          </div>
        </section>

        <section id="why" className="container px-4 pb-24 lg:px-0">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_100px_rgba(8,15,36,0.35)] lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Why CA-flow
                </div>
                <h2 className="text-3xl font-semibold sm:text-4xl">Replace scattered tools with one elegant practice command center</h2>
                <p className="mt-4 text-white/60">Instead of juggling Excel sheets, sticky notes and multiple software, CA-flow gives you a focused desktop workspace built for Indian compliance and advisory work.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {reasons.map((reason) => (
                  <div key={reason} className="glass p-4 text-sm text-white/75">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-brand">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    {reason}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container px-4 pb-24 lg:px-0">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">How it works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">A simple flow from sign-up to daily practice management.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="glass glass-hover p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-brand text-sm font-semibold text-white">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="container px-4 pb-24 lg:px-0">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">Pricing</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">Simple, transparent pricing built for individual CAs and growing firms.</p>
            <div className="mx-auto mt-6 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => setBilling("monthly")}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm transition",
                  billing === "monthly" ? "bg-gradient-brand text-white" : "text-white/60 hover:text-white",
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm transition",
                  billing === "annual" ? "bg-gradient-brand text-white" : "text-white/60 hover:text-white",
                )}
              >
                Annual · Save 10%
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glass p-8">
              <div className="text-sm text-white/60">Solo</div>
              <div className="mt-2 text-4xl font-semibold">
                {billing === "monthly" ? "₹199" : "₹2,149"}
                <span className="text-base font-normal text-white/50">/{billing === "monthly" ? "month" : "year"}</span>
              </div>
              {billing === "annual" && <div className="mt-1 text-sm text-emerald-400">Save ₹239</div>}
              <p className="mt-3 text-sm text-white/60">For individual CAs.</p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Unlimited clients",
                  "All 98 calculators",
                  "Compliance tracker",
                  "Task management",
                  "PDF export",
                ].map((item) => (
                  <li key={item} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />{item}</li>
                ))}
              </ul>
              <a href="#waitlist">
                <Button className="btn-gradient mt-8 w-full rounded-full border-0 text-white">Join Waitlist</Button>
              </a>
            </div>
            <div className="relative glass border-primary/30 p-8" style={{ boxShadow: "var(--glow-purple)" }}>
              <div className="absolute -top-3 left-6 text-xs rounded-full bg-gradient-brand px-3 py-1 text-white">Most Popular</div>
              <div className="text-sm text-white/60">Firm</div>
              <div className="mt-2 text-4xl font-semibold">
                {billing === "monthly" ? "₹999" : "₹10,789"}
                <span className="text-base font-normal text-white/50">/{billing === "monthly" ? "month" : "year"}</span>
              </div>
              {billing === "annual" && <div className="mt-1 text-sm text-emerald-400">Save ₹1,199</div>}
              <p className="mt-3 text-sm text-white/60">For CA firms with teams.</p>
              <p className="mt-1 text-xs text-white/50">Includes up to 10 members, +₹99 per additional.</p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Everything in Solo",
                  "Team management",
                  "Role assignment",
                  "Dedicated support",
                ].map((item) => (
                  <li key={item} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />{item}</li>
                ))}
              </ul>
              <a href="#waitlist">
                <Button className="btn-gradient mt-8 w-full rounded-full border-0 text-white">Join Waitlist</Button>
              </a>
            </div>
          </div>
        </section>

        <section className="container px-4 pb-24 lg:px-0">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-brand p-8 shadow-[0_30px_100px_rgba(8,15,36,0.45)] lg:p-12">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/80">
                <Users className="h-4 w-4" />
                Get early access
              </div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">Get early access to CA-flow</h2>
              <p className="mt-4 max-w-2xl text-white/80">
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
            <h2 className="text-3xl font-semibold sm:text-4xl">Frequently asked questions</h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={item.question} className="glass p-4">
                  <button className="flex w-full items-center justify-between gap-4 text-left" onClick={() => setOpenFaq(isOpen ? null : index)}>
                    <span className="font-medium text-white">{item.question}</span>
                    <ChevronRight className={cn("h-4 w-4 text-white/60 transition", isOpen && "rotate-90")} />
                  </button>
                  {isOpen && <p className="mt-3 text-sm leading-7 text-white/60">{item.answer}</p>}
                </div>
              );
            })}
          </div>
        </section>

        <footer className="container border-t border-white/10 px-4 py-10 lg:px-0">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <Logo />
              <p className="mt-3 max-w-md text-sm text-white/55">Made for Indian Chartered Accountants, Tax Professionals and Accounting Firms.</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              <a href="mailto:hello@ca-flow.in?subject=Privacy%20Policy%20Request" className="transition hover:text-white">Privacy Policy</a>
              <a href="mailto:hello@ca-flow.in?subject=Terms%20Request" className="transition hover:text-white">Terms & Conditions</a>
              <a href="mailto:hello@ca-flow.in" className="transition hover:text-white">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
