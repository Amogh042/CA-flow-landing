import { Workflow } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = ({ to = "/" }: { to?: string }) => (
  <Link to={to} className="group flex items-center gap-2">
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-[0_0_24px_hsl(197_90%_58%/0.3)]">
      <Workflow className="h-5 w-5 text-white" />
    </div>
    <span className="text-xl font-semibold tracking-tight gradient-text">CA-flow</span>
  </Link>
);

export default Logo;
