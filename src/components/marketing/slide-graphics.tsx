/* Minimal monochrome SVG graphics, one per slider slide — channel/flow themed.
   Pure SVG (no assets); colors via currentColor + opacity so they adapt to the
   theme. Subtle motion is auto-disabled under reduced-motion (globals.css). */

const VB = "0 0 360 360";

/** 360° unify — orbit/hub: outer nodes converging into one core. */
function UnifyGraphic() {
  const nodes = [
    [180, 52],
    [308, 180],
    [180, 308],
    [52, 180],
  ];
  return (
    <svg viewBox={VB} fill="none" className="h-full w-full text-foreground">
      <circle cx="180" cy="180" r="130" stroke="currentColor" strokeOpacity="0.1" />
      <ellipse cx="180" cy="180" rx="130" ry="50" stroke="currentColor" strokeOpacity="0.16" className="svg-pulse" />
      <ellipse cx="180" cy="180" rx="50" ry="130" stroke="currentColor" strokeOpacity="0.12" />
      {nodes.map(([x, y], idx) => (
        <g key={idx}>
          <line x1="180" y1="180" x2={x} y2={y} stroke="currentColor" strokeOpacity="0.14" />
          <circle cx={x} cy={y} r="5" fill="currentColor" fillOpacity="0.55" />
        </g>
      ))}
      <circle cx="180" cy="180" r="26" stroke="currentColor" strokeOpacity="0.3" className="svg-pulse" />
      <circle cx="180" cy="180" r="13" fill="currentColor" />
    </svg>
  );
}

/** Channels → one inbox: curved flows converging to a single node. */
function InboxGraphic() {
  const ys = [86, 146, 214, 274];
  return (
    <svg viewBox={VB} fill="none" className="h-full w-full text-foreground">
      {ys.map((y, idx) => (
        <g key={idx}>
          <path
            d={`M 70 ${y} C 170 ${y}, 200 180, 286 180`}
            stroke="currentColor"
            strokeOpacity="0.22"
            className="dash-flow"
          />
          <circle cx="62" cy={y} r="7" fill="currentColor" fillOpacity="0.5" />
        </g>
      ))}
      <circle cx="296" cy="180" r="30" stroke="currentColor" strokeOpacity="0.28" className="svg-pulse" />
      <circle cx="296" cy="180" r="16" fill="currentColor" />
    </svg>
  );
}

/** Decide — data: faint bars + a rising area line with a live point. */
function DecideGraphic() {
  const bars = [70, 120, 170, 220, 270];
  const line = "M 50 250 C 110 240, 150 170, 200 160 S 290 110, 320 70";
  return (
    <svg viewBox={VB} fill="none" className="h-full w-full text-foreground">
      <defs>
        <linearGradient id="sg-decide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="40" y1="284" x2="320" y2="284" stroke="currentColor" strokeOpacity="0.12" />
      {bars.map((x, i) => (
        <rect
          key={x}
          x={x}
          y={200 - i * 18}
          width="22"
          height={84 + i * 18}
          rx="4"
          fill="currentColor"
          fillOpacity="0.06"
        />
      ))}
      <path d={`${line} L 320 284 L 50 284 Z`} fill="url(#sg-decide)" />
      <path d={line} stroke="currentColor" strokeOpacity="0.6" strokeWidth="2" />
      <circle cx="320" cy="70" r="22" stroke="currentColor" strokeOpacity="0.3" className="svg-pulse" />
      <circle cx="320" cy="70" r="6" fill="currentColor" />
    </svg>
  );
}

/** Field — network/route: connected nodes with a flowing route path. */
function FieldGraphic() {
  const nodes: [number, number][] = [
    [70, 96],
    [186, 60],
    [300, 118],
    [120, 206],
    [256, 232],
    [180, 306],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [2, 4],
    [4, 5],
    [3, 5],
  ];
  const route = "M 70 96 C 150 70, 170 70, 186 60 S 270 90, 300 118 S 270 210, 256 232 S 200 290, 180 306";
  return (
    <svg viewBox={VB} fill="none" className="h-full w-full text-foreground">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="currentColor"
          strokeOpacity="0.13"
        />
      ))}
      <path d={route} stroke="currentColor" strokeOpacity="0.4" className="dash-flow" />
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 1 ? 8 : 5} fill="currentColor" fillOpacity={i === 1 ? 1 : 0.5} />
      ))}
      <circle cx={nodes[1][0]} cy={nodes[1][1]} r="18" stroke="currentColor" strokeOpacity="0.3" className="svg-pulse" />
    </svg>
  );
}

export function SlideGraphic({ id }: { id: string }) {
  if (id === "inbox") return <InboxGraphic />;
  if (id === "decide") return <DecideGraphic />;
  if (id === "field") return <FieldGraphic />;
  return <UnifyGraphic />;
}
