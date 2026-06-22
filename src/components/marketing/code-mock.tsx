import { cn } from "@/lib/utils";

/** Representative code-editor window for the docs page — a monochrome SDK
 *  snippet. Pure markup, no asset needed. */
export function CodeMock({ className }: { className?: string }) {
  const kw = "text-foreground";
  const str = "text-accent";
  const dim = "text-muted-2";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-[var(--shadow-soft)]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="ms-3 font-mono text-[11px] text-muted-2">corex.js</span>
      </div>
      <pre
        dir="ltr"
        className="overflow-x-auto p-5 font-mono text-[12.5px] leading-[1.75] text-muted sm:p-6"
      >
        <code>
          <span className={dim}>{"// canlı siparişleri çek"}</span>
          {"\n"}
          <span className={kw}>import</span>
          {" { Corex } "}
          <span className={kw}>from</span> <span className={str}>{'"@corex360/sdk"'}</span>;
          {"\n\n"}
          <span className={kw}>const</span> cx = <span className={kw}>new</span>{" "}
          <span className="text-foreground">Corex</span>(<span className={str}>COREX_KEY</span>);
          {"\n\n"}
          <span className={kw}>const</span> orders = <span className={kw}>await</span>{" "}
          cx.orders.<span className="text-foreground">list</span>({"{"}
          {"\n"}
          {"  "}status: <span className={str}>{'"open"'}</span>,
          {"\n"}
          {"  "}limit: <span className={str}>20</span>,
          {"\n"}
          {"}"});
        </code>
      </pre>
    </div>
  );
}
