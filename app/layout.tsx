import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/providers";
import {Header} from "@/components/header";
import { siteConfig } from "@/config/site";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: `${siteConfig.name} — профессиональный массаж и запись онлайн`,
    description: siteConfig.description,

    keywords: siteConfig.seo.keywords,

    openGraph: {
        title: siteConfig.name,
        description: siteConfig.description,
        url: "https://your-site.ru",
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.seo.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
        locale: "ru_RU",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: `${siteConfig.name} — запись онлайн`,
        description: siteConfig.description,
        images: [siteConfig.seo.ogImage],
    },

    robots: {
        index: true,
        follow: true,
    },

    alternates: {
        canonical: "https://your-site.ru",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <h1 className="visually-hidden">{siteConfig.name}</h1>
      <Providers>
        <Header />
        {children}
      </Providers>
      </body>
    </html>
  );
}
