/* ---------------------------------------------------------------------------
   Lightweight dependency-free SVG charts. Pure server components (no client JS)
   — used by both the marketing dashboard preview and the app skeleton.
--------------------------------------------------------------------------- */

import { cn } from "@/lib/utils";

/** Smooth area/line chart with a gradient fill. */
export function AreaChart({
  data,
  className,
  height = 160,
  stroke = "var(--accent)",
}: {
  data: number[];
  className?: string;
  height?: number;
  stroke?: string;
}) {
  const w = 600;
  const h = height;
  const pad = 6;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1);

  const pts = data.map((d, i) => {
    const x = pad + i * step;
    const y = pad + (h - pad * 2) * (1 - (d - min) / range);
    return [x, y] as const;
  });

  // Catmull-Rom → cubic Bézier for a smooth line.
  const line = pts
    .map((p, i, a) => {
      if (i === 0) return `M ${p[0]},${p[1]}`;
      const prev = a[i - 1];
      const cx = (prev[0] + p[0]) / 2;
      return `C ${cx},${prev[1]} ${cx},${p[1]} ${p[0]},${p[1]}`;
    })
    .join(" ");
  const area = `${line} L ${pts[pts.length - 1][0]},${h - pad} L ${pts[0][0]},${h - pad} Z`;
  const gid = `area-${stroke.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={stroke} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Vertical bar chart. */
export function BarChart({
  data,
  className,
  height = 160,
}: {
  data: number[];
  className?: string;
  height?: number;
}) {
  const w = 600;
  const h = height;
  const max = Math.max(...data) || 1;
  const gap = 10;
  const bw = (w - gap * (data.length - 1)) / data.length;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={cn("h-full w-full", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="bar-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-2)" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {data.map((d, i) => {
        const bh = (h - 4) * (d / max);
        return (
          <rect
            key={i}
            x={i * (bw + gap)}
            y={h - bh}
            width={bw}
            height={bh}
            rx="4"
            fill="url(#bar-g)"
          />
        );
      })}
    </svg>
  );
}

/** Compact sparkline (no axes). */
export function Sparkline({
  data,
  stroke = "var(--accent)",
  className,
}: {
  data: number[];
  stroke?: string;
  className?: string;
}) {
  const w = 120;
  const h = 36;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const d = data
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * step},${h - (h - 4) * ((v - min) / range) - 2}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-9 w-full", className)} aria-hidden>
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Donut / radial progress. */
export function Donut({
  value,
  size = 92,
  className,
}: {
  value: number; // 0–100
  size?: number;
  className?: string;
}) {
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value / 100);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden>
      <defs>
        <linearGradient id="donut-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-3)" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth="8" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#donut-g)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={off}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}
