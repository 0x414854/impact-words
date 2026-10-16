import "./globals.css";
import Head from "next/head";
// import { Analytics } from "@vercel/analytics/next";
// import { SpeedInsights } from "@vercel/speed-insights/next";

import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import Header from "../components/header/header";
import Footer from "../components/footer/footer";

export const metadata = {
  metadataBase: new URL("https://impact-words.com"),

  title: {
    default: "Impact Words | SEO et rédaction web",
    template: "%s | Impact Words",
  },

  description:
    "Impact Words vous accompagne en référencement naturel (SEO), rédaction web et stratégie éditoriale pour améliorer votre visibilité en ligne et attirer une audience qualifiée.",

  icons: {
    icon: "/favicon.ico",
  },

  keywords: [
    "Impact Words",
    "SEO",
    "référencement naturel",
    "rédaction web SEO",
    "rédaction de contenu web",
    "stratégie éditoriale",
    "optimisation SEO",
    "audit SEO",
    "visibilité en ligne",
    "contenu optimisé pour les moteurs de recherche",
  ],

  authors: [{ name: "Impact Words" }],
  creator: "Impact Words",
  publisher: "Impact Words",

  openGraph: {
    title: "Impact Words | SEO et rédaction web",
    description:
      "Développez votre visibilité en ligne grâce au référencement naturel, à la rédaction web SEO et à une stratégie éditoriale adaptée à vos objectifs.",
    url: "https://impact-words.com",
    siteName: "Impact Words",
    // images: [
    //   {
    //     url: "/ogImage.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Impact Words — SEO, rédaction web et stratégie éditoriale",
    //   },
    // ],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Impact Words | SEO et rédaction web",
    description:
      "Améliorez votre visibilité en ligne avec Impact Words : SEO, rédaction web et stratégie éditoriale.",
    // images: ["/ogImage.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
          {/* <Analytics />
          <SpeedInsights /> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
