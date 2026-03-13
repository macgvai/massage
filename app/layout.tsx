import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { Header } from "@/components/header";
import React from "react";
import { getSiteConfig } from "@/app/api/services/mainServices";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://массажвсимферополе.рф';
  return {
    title: siteConfig.name,
    description: siteConfig.description,
    keywords: siteConfig.seo.keywords.join(', '),
    authors: [{ name: siteConfig.about.name }],
    creator: siteConfig.about.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: siteConfig.fullName,
      description: siteConfig.description,
      url: new URL('/', baseUrl).toString(),
      siteName: siteConfig.name,
      images: [
        {
          url: new URL(siteConfig.seo.ogImage || '/og-image.jpg', baseUrl).toString(),
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      locale: 'ru_RU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.fullName,
      description: siteConfig.description,
      images: [new URL(siteConfig.seo.ogImage || '/og-image.jpg', baseUrl).toString()],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
  };
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig();

  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <h1 className="visually-hidden">{siteConfig.name}</h1>
        <Providers>
          <Header siteConfig={siteConfig} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
