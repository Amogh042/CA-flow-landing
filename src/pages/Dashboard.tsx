import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Lock, Menu, Search, ArrowRight } from "lucide-react";
import Orbs from "@/components/Orbs";
import AppSidebar from "@/components/AppSidebar";
import { calculators, categories } from "@/data/calculators";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const filtered = calculators.filter((c) => {
    const matchQ = c.name.toLowerCase().includes(query.toLowerCase());
    const matchC = activeCat ? c.category === activeCat : true;
    return matchQ && matchC;
  });

  return (
    <div className="relative min-h-screen">
      <Orbs />
      <div className="relative z-10 flex">
        <AppSidebar mobileOpen={mobileNav} onClose={() => setMobileNav(false)} />

        <main className="flex-1 min-w-0">
          {/* Topbar */}
          <header className="sticky top-0 z-20 bg-background/60 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center gap-3 px-4 lg:px-8 h-16">
              <button
                onClick={() => setMobileNav(true)}
                className="lg:hidden text-white/70 hover:text-white"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="flex-1 max-w-xl relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search 100+ calculators…"
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm outline-none focus:border-primary/50 focus:bg-white/[0.07] transition"
                />
              </div>

              <div className="ml-auto flex items-center gap-3">
                <button className="relative h-9 w-9 rounded-full glass glass-hover flex items-center justify-center">
                  <Bell className="h-4 w-4 text-white/80" />
                  <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" />
                </button>
                <span className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-gradient-brand text-white">PRO</span>
                <div className="h-9 w-9 rounded-full bg-gradient-brand flex items-center justify-center text-sm font-semibold">
                  AR
                </div>
              </div>
            </div>
          </header>

          <div className="p-4 lg:p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Your calculators</h1>
              <p className="mt-1 text-white/60 text-sm">Pick a tool to get started. Pro unlocks every calculator.</p>
            </div>

            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-1 px-1">
              <button
                onClick={() => setActiveCat(null)}
                className={cn(
                  "shrink-0 px-4 py-1.5 rounded-full text-xs border transition",
                  activeCat === null
                    ? "bg-gradient-brand border-transparent text-white"
                    : "border-white/10 text-white/70 hover:text-white hover:border-white/20"
                )}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCat(c.id)}
                  className={cn(
                    "shrink-0 px-4 py-1.5 rounded-full text-xs border transition",
                    activeCat === c.id
                      ? "bg-gradient-brand border-transparent text-white"
                      : "border-white/10 text-white/70 hover:text-white hover:border-white/20"
                  )}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((c) => (
                <div key={c.id} className="glass glass-hover p-6 relative group">
                  {c.pro && (
                    <div className="absolute inset-0 rounded-2xl backdrop-blur-[3px] bg-black/30 flex flex-col items-center justify-center gap-2 z-10 opacity-100">
                      <div className="h-10 w-10 rounded-full bg-gradient-brand flex items-center justify-center">
                        <Lock className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-sm font-semibold">Upgrade to Pro</div>
                      <div className="text-xs text-white/60">Unlock this calculator</div>
                    </div>
                  )}
                  <div className="flex items-start justify-between">
                    <div className="h-11 w-11 rounded-xl bg-gradient-brand flex items-center justify-center">
                      <c.icon className="h-5 w-5 text-white" />
                    </div>
                    {c.pro && <span className="text-[10px] px-2 py-0.5 rounded-full border border-primary/40 text-primary">PRO</span>}
                  </div>
                  <h3 className="mt-4 font-semibold">{c.name}</h3>
                  <p className="mt-1 text-sm text-white/60 leading-relaxed line-clamp-2">{c.description}</p>
                  <Link to={`/calculator/${c.id}`} className="block mt-5">
                    <Button variant="ghost" className="w-full rounded-full border border-white/10 hover:bg-white/5 hover:border-white/20">
                      Open <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full glass p-10 text-center text-white/60">
                  No calculators match your search.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
