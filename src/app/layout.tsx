import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/providers";

const poppins = Poppins({
  subsets: ["devanagari"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://litarchive.com",
    title: "Literature Archive",
    description: "Literature Archive",
    images: [
      {
        url: "./og-image.png",
        width: 1200,
        height: 630,
        alt: "Literature Archive",
      },
    ],
  },
  twitter: {
    title: "Literature Archive",
    description: "Literature Archive",
    card: "summary_large_image",
    siteId: "https://twitter.com/Mushegh_M",
    creator: "Mushegh Movsisyan",
    creatorId: "@Mushegh_M",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Literature Archive",
      },
    ],
  },
  title: "Literature Archive",
  description: "Literature Archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <Providers>
          <div className="flex w-screen flex-col bg-background font-sans">
            <Header />
            {children}
            <Analytics />
            <SpeedInsights />
          </div>
        </Providers>
      </body>
    </html>
  );
}
