import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — CRM · ERP · Business Intelligence`,
    short_name: SITE.name,
    description:
      "Unify CRM, ERP and business intelligence in one real-time, AI-powered platform.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f1ea",
    theme_color: "#f3f1ea",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
