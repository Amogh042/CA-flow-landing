const LineChart = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 300 150" className={className} fill="none">
    <defs>
      <linearGradient id="lg1" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="hsl(22 100% 55%)" stopOpacity="0.5" />
        <stop offset="100%" stopColor="hsl(22 100% 55%)" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0,120 L40,110 L80,95 L120,80 L160,70 L200,50 L240,35 L300,15 L300,150 L0,150 Z" fill="url(#lg1)" />
    <path
      className="anim-line"
      d="M0,120 L40,110 L80,95 L120,80 L160,70 L200,50 L240,35 L300,15"
      stroke="hsl(22 100% 60%)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BarChart = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 240 150" className={className} fill="none">
    {[20, 45, 70, 95, 120, 145, 170, 195].map((x, i) => {
      const h = 30 + ((i * 13) % 90);
      return (
        <rect
          key={i}
          x={x}
          y={150 - h}
          width="18"
          height={h}
          rx="3"
          fill="hsl(22 100% 55%)"
          opacity="0.85"
          className="anim-bar"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      );
    })}
  </svg>
);

const CandleChart = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 240 150" className={className} fill="none">
    {Array.from({ length: 12 }).map((_, i) => {
      const x = 12 + i * 19;
      const cy = 75 + Math.sin(i * 0.9) * 25;
      const h = 22 + ((i * 7) % 18);
      const up = i % 2 === 0;
      return (
        <g key={i} className="anim-bar" style={{ animationDelay: `${i * 0.15}s`, transformOrigin: `${x}px ${cy}px` }}>
          <line x1={x} y1={cy - h - 8} x2={x} y2={cy + h + 8} stroke="hsl(38 100% 65%)" strokeWidth="1" />
          <rect
            x={x - 5}
            y={cy - h}
            width="10"
            height={h * 2}
            fill={up ? "hsl(22 100% 55%)" : "hsl(14 100% 50%)"}
          />
        </g>
      );
    })}
  </svg>
);

const AreaChart = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 300 150" className={className} fill="none">
    <defs>
      <linearGradient id="lg2" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="hsl(38 100% 60%)" stopOpacity="0.55" />
        <stop offset="100%" stopColor="hsl(38 100% 60%)" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0,110 C50,90 90,120 140,85 C190,55 230,90 300,40 L300,150 L0,150 Z" fill="url(#lg2)" />
    <path
      className="anim-line delay-b"
      d="M0,110 C50,90 90,120 140,85 C190,55 230,90 300,40"
      stroke="hsl(38 100% 65%)"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const StepChart = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 300 150" className={className} fill="none">
    <path
      className="anim-line delay-c"
      d="M0,130 L40,130 L40,110 L90,110 L90,88 L140,88 L140,70 L190,70 L190,52 L240,52 L240,30 L300,30"
      stroke="hsl(22 100% 60%)"
      strokeWidth="2.5"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const ChartsBackground = () => (
  <div className="charts-bg" aria-hidden="true">
    <LineChart className="chart-float" />
    <BarChart className="chart-float c2" />
    <CandleChart className="chart-float c3" />
    <AreaChart className="chart-float c4" />
    <StepChart className="chart-float c5" />

    <style>{`
      .charts-bg > svg:nth-child(1) { top: 8%; left: 4%; width: 360px; }
      .charts-bg > svg:nth-child(2) { top: 14%; right: 5%; width: 300px; }
      .charts-bg > svg:nth-child(3) { bottom: 20%; left: 8%; width: 300px; }
      .charts-bg > svg:nth-child(4) { bottom: 8%; right: 4%; width: 380px; }
      .charts-bg > svg:nth-child(5) { top: 48%; left: 40%; width: 340px; }
      @media (max-width: 768px) {
        .charts-bg > svg:nth-child(2),
        .charts-bg > svg:nth-child(5) { display: none; }
        .charts-bg > svg { width: 220px !important; }
      }
    `}</style>
  </div>
);

export default ChartsBackground;
