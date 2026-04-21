import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  Receipt, Landmark, TrendingDown, PieChart, Users, ShieldCheck,
  ArrowRight, Check, Sparkles, Calculator,
} from "lucide-react";
import Logo from "@/components/Logo";
import Orbs from "@/components/Orbs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const features = [
  { icon: Receipt, title: "Tax Calculators", desc: "Income tax, HRA, capital gains across 10 jurisdictions." },
  { icon: Landmark, title: "Loan & EMI", desc: "Amortization schedules, prepayment impact, balloon loans." },
  { icon: TrendingDown, title: "Depreciation", desc: "SLM, WDV, units-of-production — compliant with IFRS & GAAP." },
  { icon: PieChart, title: "Financial Ratios", desc: "Liquidity, leverage, profitability and activity ratios." },
  { icon: Users, title: "Payroll Tools", desc: "Gross-to-net, PF, ESI, gratuity and bonus computations." },
  { icon: ShieldCheck, title: "Audit Helpers", desc: "Sampling size, materiality thresholds, risk scoring." },
];

const useCounter = (target: number, duration = 1600) => {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setValue(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
};

const Stat = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const n = useCounter(value);
  return (
    <div className="glass glass-hover p-6 text-center">
      <div className="text-4xl font-bold gradient-text">{n.toLocaleString()}{suffix}</div>
      <div className="mt-2 text-sm text-white/60">{label}</div>
    </div>
  );
};

const FloatingPreview = ({ title, value, delay, icon: Icon, className }: any) => (
  <div className={`glass p-5 w-60 animate-float ${delay} ${className}`}>
    <div className="flex items-center gap-2 mb-3">
      <div className="h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center">
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div className="text-sm text-white/70">{title}</div>
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
      <div className="h-full w-2/3 bg-gradient-brand" />
    </div>
  </div>
);

const Landing = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Orbs />
      <div className="relative z-10">
        {/* Nav */}
        <header className="container flex items-center justify-between py-6">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <Link to="/login" className="hover:text-white transition">Login</Link>
          </nav>
          <Link to="/dashboard">
            <Button className="btn-gradient text-white border-0 rounded-full px-5">Get Started Free</Button>
          </Link>
        </header>

        {/* Hero */}
        <section className="container grid lg:grid-cols-2 gap-12 items-center pt-10 pb-24">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 text-xs text-white/70 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              New — 100+ tools, one subscription
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
              Every calculation a <span className="gradient-text">finance professional</span> needs
            </h1>
            <p className="mt-6 text-lg text-white/60 max-w-xl">
              100+ tools. One app. Built for CAs worldwide.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="btn-gradient text-white border-0 rounded-full px-7">
                  Start Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="ghost" className="rounded-full border border-white/10 hover:bg-white/5 hover:border-white/20">
                  See all tools
                </Button>
              </a>
            </div>
          </div>

          <div className="relative h-[420px] hidden lg:block animate-scale-in">
            <FloatingPreview title="Income Tax" value="₹ 2,14,600" delay="" icon={Receipt} className="absolute top-0 left-6" />
            <FloatingPreview title="EMI / month" value="$ 1,842" delay="delay-1" icon={Landmark} className="absolute top-36 right-0" />
            <FloatingPreview title="SIP 10Y" value="₹ 24.6 L" delay="delay-2" icon={PieChart} className="absolute bottom-0 left-16" />
          </div>
        </section>

        {/* Stats */}
        <section className="container grid grid-cols-1 sm:grid-cols-3 gap-6 pb-24">
          <Stat value={100} suffix="+" label="Tools" />
          <Stat value={10} suffix="" label="Countries" />
          <Stat value={50000} suffix="+" label="CAs trust CalcOS" />
        </section>

        {/* Features */}
        <section id="features" className="container pb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-4xl font-bold">Built for every corner of finance</h2>
            <p className="mt-3 text-white/60">Six categories. Dozens of tools. All inside one calm, fast interface.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass glass-hover p-6">
                <div className="h-11 w-11 rounded-xl bg-gradient-brand flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="container pb-24">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">Simple pricing</h2>
            <div className="mt-6 inline-flex items-center gap-3 glass px-4 py-2">
              <span className={`text-sm ${!yearly ? "text-white" : "text-white/50"}`}>Monthly</span>
              <Switch checked={yearly} onCheckedChange={setYearly} />
              <span className={`text-sm ${yearly ? "text-white" : "text-white/50"}`}>Yearly <span className="text-primary">-20%</span></span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="glass glass-hover p-8">
              <div className="text-sm text-white/60">Free</div>
              <div className="mt-2 text-4xl font-bold">$0</div>
              <p className="mt-2 text-sm text-white/60">For students & occasional use.</p>
              <ul className="mt-6 space-y-3 text-sm">
                {["5 core calculators", "Basic tax tools", "EMI & SIP", "Save up to 10 results", "Community support"].map((t) => (
                  <li key={t} className="flex gap-2"><Check className="h-4 w-4 text-secondary mt-0.5" />{t}</li>
                ))}
              </ul>
              <Link to="/dashboard" className="block mt-8">
                <Button variant="ghost" className="w-full rounded-full border border-white/10 hover:bg-white/5">Continue free</Button>
              </Link>
            </div>

            <div className="glass p-8 relative border-primary/40" style={{ boxShadow: "var(--glow-purple)" }}>
              <div className="absolute -top-3 left-6 text-xs px-3 py-1 rounded-full bg-gradient-brand text-white">Most Popular</div>
              <div className="text-sm text-white/60">Pro</div>
              <div className="mt-2 text-4xl font-bold">${yearly ? 15 : 19}<span className="text-base font-normal text-white/50">/mo</span></div>
              <p className="mt-2 text-sm text-white/60">Unlock every calculator.</p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "All 100+ calculators",
                  "Multi-country tax tools",
                  "Advanced DCF & valuation",
                  "Audit sampling suite",
                  "Payroll & HR stack",
                  "Unlimited saved scenarios",
                  "Export to PDF & Excel",
                  "History & version compare",
                  "Priority support",
                  "Early access to new tools",
                ].map((t) => (
                  <li key={t} className="flex gap-2"><Check className="h-4 w-4 text-primary mt-0.5" />{t}</li>
                ))}
              </ul>
              <Link to="/dashboard" className="block mt-8">
                <Button className="w-full btn-gradient text-white border-0 rounded-full">Upgrade to Pro</Button>
              </Link>
            </div>
          </div>
        </section>

        <footer className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5">
          <Logo />
          <div className="text-sm text-white/50">© {new Date().getFullYear()} CalcOS. All rights reserved.</div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
