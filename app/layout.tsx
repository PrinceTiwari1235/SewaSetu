import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "SewaSetu — Nepal Government Services Portal",
  description:
    "Access all Nepal government forms and services from one place. Simplified e-governance for every Nepali citizen.",
  keywords:
    "Nepal government forms, Lok Sewa, passport, NID, driving license, tax, PSC, nepal eservices",
  openGraph: {
    title: "SewaSetu | सेवासेतु",
    description: "Nepal's unified government services portal",
    locale: "en_NP",
  },
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
