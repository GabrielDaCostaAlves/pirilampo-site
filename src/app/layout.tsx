import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { SITE } from "@/lib/constants";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Educação que acolhe em ${SITE.city}, ${SITE.district}-${SITE.state}`,
    template: `%s · ${SITE.shortName}`,
  },
  description:
    "Escola e Creche Pirilampo em Itabatã, Mucuri-BA. Creche, Maternal, Educação Infantil e Ensino Fundamental (1º ao 9º ano) com ensino de excelência e muito acolhimento.",
  keywords: [
    "escola em Itabatã",
    "creche em Itabatã",
    "escola particular Mucuri BA",
    "educação infantil Itabatã",
    "ensino fundamental Itabatã",
    "Escola Pirilampo",
  ],
  authors: [{ name: SITE.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name}`,
    description:
      "Educação acolhedora e de excelência em Itabatã, Mucuri-BA. Da creche ao 9º ano.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}`,
    description:
      "Educação acolhedora e de excelência em Itabatã, Mucuri-BA. Da creche ao 9º ano.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#6EB7E8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
