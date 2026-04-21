import { Link, useParams } from "react-router-dom";
import { ChevronRight, Download, Share2, Bookmark, Lock, ArrowLeft } from "lucide-react";
import Orbs from "@/components/Orbs";
import Logo from "@/components/Logo";
import { calculators, categories } from "@/data/calculators";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const Calculator = () => {
  const { id } = useParams();
  const calc = calculators.find((c) => c.id === id) ?? calculators[0];
  const category = categories.find((c) => c.id === calc.category);

  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(5);

  return (
    <div className="relative min-h-screen">
      <Orbs />
      <div className="relative z-10 container py-6">
        {/* Top row */}
        <div className="flex items-center justify-between mb-6">
          <Logo />
          <Link to="/dashboard">
            <Button variant="ghost" className="rounded-full border border-white/10 hover:bg-white/5">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to dashboard
            </Button>
          </Link>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/60 mb-6 flex-wrap">
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="hover:text-white">{category?.name}</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white">{calc.name}</span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-gradient-brand flex items-center justify-center">
            <calc.icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{calc.name}</h1>
            <p className="text-sm text-white/60">{calc.description}</p>
          </div>
        </div>

        {calc.pro && (
          <div className="glass p-5 mb-6 border-primary/30 flex items-center gap-4" style={{ boxShadow: "var(--glow-purple)" }}>
            <div className="h-10 w-10 rounded-full bg-gradient-brand flex items-center justify-center">
              <Lock className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">Pro Feature</div>
              <div className="text-sm text-white/60">Upgrade to Pro to unlock this calculator and 60+ more.</div>
            </div>
            <Button className="btn-gradient text-white border-0 rounded-full">Upgrade</Button>
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-3 glass p-6 lg:p-8 relative">
            {calc.pro && <div className="absolute inset-0 rounded-2xl bg-black/20 backdrop-blur-[2px] z-10" />}
            <h2 className="text-lg font-semibold mb-6">Inputs</h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <label className="text-white/70">Amount</label>
                  <span className="font-mono">{amount.toLocaleString()}</span>
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(+e.target.value || 0)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <label className="text-white/70">Interest rate</label>
                  <span className="font-mono">{rate.toFixed(1)}%</span>
                </div>
                <Slider value={[rate]} onValueChange={(v) => setRate(v[0])} min={1} max={20} step={0.1} />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <label className="text-white/70">Tenure</label>
                  <span className="font-mono">{years} years</span>
                </div>
                <Slider value={[years]} onValueChange={(v) => setYears(v[0])} min={1} max={30} step={1} />
              </div>

              <div>
                <label className="text-sm text-white/70 block mb-2">Frequency</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition">
                  <option className="bg-background">Monthly</option>
                  <option className="bg-background">Quarterly</option>
                  <option className="bg-background">Annually</option>
                </select>
              </div>

              <Button className="w-full btn-gradient text-white border-0 rounded-full h-12 text-base font-semibold">
                Calculate
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass p-6 lg:p-8">
              <div className="text-sm text-white/60">Primary result</div>
              <div className="mt-2 text-4xl font-bold gradient-text">₹ 10,263</div>
              <div className="mt-1 text-sm text-white/60">per month</div>

              {/* Chart placeholder */}
              <div className="mt-6 aspect-square rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-6 rounded-full border-[14px] border-primary/60" style={{ borderRightColor: "hsl(173 80% 42% / 0.7)", borderBottomColor: "hsl(173 80% 42% / 0.7)" }} />
                <div className="relative text-center">
                  <div className="text-xs text-white/60">Total</div>
                  <div className="text-xl font-bold">₹ 6.1 L</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm font-semibold mb-3">Breakdown</div>
                <div className="space-y-2 text-sm">
                  {[
                    ["Principal", "₹ 5,00,000"],
                    ["Interest", "₹ 1,15,780"],
                    ["Total payable", "₹ 6,15,780"],
                    ["Monthly EMI", "₹ 10,263"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-white/60">{k}</span>
                      <span className="font-mono">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button variant="ghost" className="glass glass-hover flex-col h-auto py-3 rounded-2xl">
                <Download className="h-4 w-4 mb-1" /> <span className="text-xs">PDF</span>
              </Button>
              <Button variant="ghost" className="glass glass-hover flex-col h-auto py-3 rounded-2xl">
                <Bookmark className="h-4 w-4 mb-1" /> <span className="text-xs">Save</span>
              </Button>
              <Button variant="ghost" className="glass glass-hover flex-col h-auto py-3 rounded-2xl">
                <Share2 className="h-4 w-4 mb-1" /> <span className="text-xs">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
