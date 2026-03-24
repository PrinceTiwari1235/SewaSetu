import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sewa Setu - Nepal",
    short_name: "Sewa Setu",
    description:
      "SewaSetu helps people in Nepal access government forms, applications, and public service portals in one easy place.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#D41212",
    icons: [
      {
        src: "/logo-sewa-setu.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
