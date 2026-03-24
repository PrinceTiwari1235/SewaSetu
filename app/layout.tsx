import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://sewasetu.com",
  ),
  title: {
    default: "Sewa Setu - Nepal",
    template: "%s | Sewa Setu - Nepal",
  },
  description:
    "SewaSetu helps people in Nepal access government forms, applications, and public service portals in one easy place.",
  applicationName: "Sewa Setu - Nepal",
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
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/logo-sewa-setu.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/logo-sewa-setu.svg",
    apple: "/logo-sewa-setu.svg",
  },
  authors: [{ name: "SewaSetu Team" }],
  creator: "Sewa Setu - Nepal",
  publisher: "Sewa Setu - Nepal",
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
    title: "Sewa Setu - Nepal",
    description:
      "Find Nepal government forms and online application guidance quickly with SewaSetu.",
    url: "/",
    siteName: "Sewa Setu - Nepal",
    type: "website",
    locale: "en_NP",
    images: [
      {
        url: "/logo-sewa-setu.svg",
        width: 512,
        height: 512,
        alt: "Sewa Setu - Nepal logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sewa Setu - Nepal",
    description:
      "Easy access to Nepal government forms and applications in one place.",
    images: ["/logo-sewa-setu.svg"],
  },
  category: "government",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sewasetu.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sewa Setu - Nepal",
  alternateName: "SewaSetu",
  url: siteUrl,
  logo: `${siteUrl}/logo-sewa-setu.svg`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="noise">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
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
