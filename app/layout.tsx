import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/providers";
import {Header} from "@/components/header";
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
    title: "Массаж в Симферополе — профессиональный массаж и запись онлайн",
    description:
        "Профессиональный массаж в Симферополе: классический, релакс, спортивный, антистресс. Онлайн-запись, удобное время, комфортная атмосфера.",

    keywords: [
        "массаж",
        "массаж в Симферополе",
        "классический массаж",
        "релакс массаж",
        "спортивный массаж",
        "антистресс массаж",
        "массаж спины",
        "запись на массаж",
    ],

    openGraph: {
        title: "Профессиональный массаж в Симферополе",
        description:
            "Классический, релакс и спортивный массаж. Онлайн-запись и индивидуальный подход.",
        url: "https://your-site.ru",
        siteName: "Массаж в Симферополе",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Массаж в Симферополе",
            },
        ],
        locale: "ru_RU",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Массаж в Симферополе — запись онлайн",
        description:
            "Профессиональный массаж: расслабление, восстановление, здоровье.",
        images: ["/og-image.jpg"],
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
      <h1 className="visually-hidden">Массаж в Симферополе.</h1>
      <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
        <Header />
        {children}
      </Providers>
      </body>
    </html>
  );
}
