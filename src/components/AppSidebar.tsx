import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";
import Logo from "@/components/Logo";
import { categories, countries } from "@/data/calculators";
import { cn } from "@/lib/utils";

interface Props {
  mobileOpen: boolean;
  onClose: () => void;
}

const AppSidebar = ({ mobileOpen, onClose }: Props) => {
  const [country, setCountry] = useState(countries[0]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-[240px] z-50 lg:z-10 shrink-0 transition-transform",
          "bg-[hsl(225_46%_9%)]/80 backdrop-blur-xl border-r border-white/5",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-5">
          <Logo />
          <button onClick={onClose} className="lg:hidden text-white/60 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Country */}
        <div className="px-4 relative">
          <button
            onClick={() => setPickerOpen((v) => !v)}
            className="w-full glass px-3 py-2.5 text-sm flex items-center justify-between hover:border-white/15"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg leading-none">{country.flag}</span>
              <span>{country.name}</span>
            </span>
            <ChevronDown className={cn("h-4 w-4 transition", pickerOpen && "rotate-180")} />
          </button>
          {pickerOpen && (
            <div className="absolute left-4 right-4 mt-2 glass p-1 z-20 animate-fade-in">
              {countries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => { setCountry(c); setPickerOpen(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-white/5"
                >
                  <span className="text-lg leading-none">{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="mt-5 px-2 pb-6 space-y-0.5 overflow-y-auto max-h-[calc(100vh-180px)]">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-white/40">Categories</div>
          {categories.map((cat) => {
            const active = location.pathname === `/dashboard` && location.hash === `#${cat.id}`;
            return (
              <Link
                key={cat.id}
                to={`/dashboard#${cat.id}`}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition group",
                  active
                    ? "bg-white/5 text-white border border-white/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                <cat.icon className="h-4 w-4 text-primary/80 group-hover:text-primary transition" />
                <span className="flex-1 truncate">{cat.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-white/60 border border-white/5">
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default AppSidebar;
