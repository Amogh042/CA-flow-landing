import { Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = ({ to = "/" }: { to?: string }) => (
  <Link to={to} className="flex items-center gap-2 group">
    <div className="h-9 w-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-[0_0_20px_hsl(262_83%_58%/0.4)]">
      <Calculator className="h-5 w-5 text-white" />
    </div>
    <span className="text-xl font-bold tracking-tight gradient-text">CalcOS</span>
  </Link>
);

export default Logo;
