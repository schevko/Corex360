/**
 * Per-navigation enter animation. A template (not a layout) remounts on every
 * route change, so the CSS keyframe replays. `backwards` fill leaves no
 * lingering transform — safe for position:sticky descendants.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
