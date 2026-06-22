import type { ReactNode } from "react";
import { SidebarContent } from "./sidebar-content";
import { MobileNav } from "./mobile-nav";
import { WhatsAppButton } from "./whatsapp-button";
import { CertBand } from "./cert-band";
import { Footer } from "@/components/marketing/footer";

/**
 * DK-shell layout: fixed left sidebar (340px) on desktop, top bar + slide-in
 * drawer on mobile. The content column hosts the cinematic sections + footer.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 hidden h-screen w-[340px] shrink-0 overflow-y-auto border-e border-border lg:block">
        <SidebarContent />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileNav />
        <main className="flex-1">{children}</main>
        <CertBand />
        <Footer />
      </div>

      <WhatsAppButton />
    </div>
  );
}
