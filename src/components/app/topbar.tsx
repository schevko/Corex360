import { useTranslations } from "next-intl";
import { Search, ChevronDown } from "lucide-react";

export function Topbar() {
  const t = useTranslations("app");

  return (
    <header className="sticky top-0 z-20 hidden items-center gap-4 border-b border-border bg-background/70 px-6 py-3.5 backdrop-blur-xl lg:flex">
      <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-border bg-surface/50 px-3.5 py-2.5">
        <Search className="size-4 text-muted-2" />
        <input
          type="text"
          placeholder={t("search")}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-2"
        />
        <kbd className="rounded border border-border bg-surface-2 px-1.5 py-0.5 text-[10px] text-muted-2">⌘K</kbd>
      </div>

      <button className="flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-3.5 py-2.5 text-sm text-muted transition-colors hover:text-foreground">
        {t("period")}
        <ChevronDown className="size-4" />
      </button>

      <div className="flex items-center gap-2.5">
        <div className="text-end">
          <p className="text-xs text-muted-2">Corex360</p>
        </div>
        <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-sm font-medium text-on-accent">
          C
        </span>
      </div>
    </header>
  );
}
