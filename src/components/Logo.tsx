import { Link } from "react-router-dom";

const Logo = ({ to = "/" }: { to?: string }) => (
  <Link
    to={to}
    style={{
      fontFamily: "'Space Grotesk', sans-serif",
      display: "inline-flex",
      alignItems: "baseline",
      gap: "1px",
      userSelect: "none",
    }}
  >
    <span
      style={{
        fontWeight: 700,
        fontSize: "19px",
        color: "var(--text-primary)",
        letterSpacing: "-0.5px",
      }}
    >
      CA
    </span>
    <span
      style={{
        fontWeight: 500,
        fontSize: "19px",
        color: "#c4b5fd",
        letterSpacing: "-0.3px",
      }}
    >
      -flow
    </span>
  </Link>
);

export default Logo;
