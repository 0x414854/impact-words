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
  title: "NextJS Starter - 0x414854", // TODO: Change this
  description:
    "A modern, ready-to-use Next.js boilerplate with built-in i18n support, clear structure for styles and components, and essential tools preconfigured to kickstart your web projects quickly.", // TODO: Change this
  icons: [{ url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" }], // TODO: Change this
  keywords: [
    // TODO: Change All keywords
    "KeyWord_1",
    "KeyWord_2",
    "KeyWord_3",
    "KeyWord_4",
    "KeyWord_5",
    "KeyWord_6",
    "KeyWord_7",
    "KeyWord_8",
    "KeyWord_9",
    "KeyWord_10",
  ],
  authors: [{ name: "0x414854 – Arthur BARRAUD" }], // TODO: Change this
  openGraph: {
    title: "NextJS Starter - 0x414854", // TODO: Change this
    description:
      "A modern, ready-to-use Next.js boilerplate with built-in i18n support, clear structure for styles and components, and essential tools preconfigured to kickstart your web projects quickly.", // TODO: Change this
    url: "https://www.arthurbarraud.me", // TODO: Change this
    siteName: "NextJS Starter - 0x414854", // TODO: Change this
    images: [
      {
        url: "/ogImage.png", // TODO: Add 'ogImage.png (1200 x 630) in 'public' folder
        width: 1200,
        height: 630,
        alt: "Aperçu portfolio", // TODO: Change this
      },
    ],
    locale: "fr_FR", // TODO: Change this
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextJS Starter - 0x414854", // TODO: Change this
    description:
      "A modern, ready-to-use Next.js boilerplate with built-in i18n support, clear structure for styles and components, and essential tools preconfigured to kickstart your web projects quickly.", // TODO: Change this
    images: ["/ogImage.png"],
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
