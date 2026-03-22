import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://sewasetu.com",
  ),
  title: {
    default: "SewaSetu — Nepal Government Services Portal",
    template: "%s | SewaSetu",
  },
  description:
    "SewaSetu helps people in Nepal access government forms, applications, and public service portals in one easy place.",
  applicationName: "SewaSetu",
  keywords: [
    "Sewasetu",
    "SewaSetu",
    "gov",
    "government",
    "forms",
    "application",
    "nepal",
    "easy form",
    "nepal government forms",
    "nepal online application",
    "e-governance nepal",
    "lok sewa",
    "driving license nepal",
    "passport nepal",
    "nid nepal",
    "tax forms nepal",
    "citizen services nepal",
  ],
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "SewaSetu Team" }],
  creator: "SewaSetu",
  publisher: "SewaSetu",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "SewaSetu | सेवासेतु",
    description:
      "Find Nepal government forms and online application guidance quickly with SewaSetu.",
    url: "/",
    siteName: "SewaSetu",
    type: "website",
    locale: "en_NP",
  },
  twitter: {
    card: "summary_large_image",
    title: "SewaSetu — Nepal Government Services Portal",
    description:
      "Easy access to Nepal government forms and applications in one place.",
  },
  category: "government",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="noise">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
