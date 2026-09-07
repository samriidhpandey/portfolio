import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Samridh Pandey — AI/ML Engineer × Full-Stack Developer",
  description: "Personal portfolio of Samridh Pandey. Architecting intelligent systems, distributed AI pipelines, autonomous agents, and resilient full-stack web products.",
  keywords: [
    "Samridh Pandey",
    "AI Engineer",
    "Machine Learning Engineer",
    "Full-Stack Developer",
    "PyTorch",
    "Next.js",
    "Autonomous Agents",
    "Computer Vision",
    "NLP",
    "Three.js"
  ],
  authors: [{ name: "Samridh Pandey" }],
  openGraph: {
    title: "Samridh Pandey — AI/ML Engineer × Full-Stack Developer",
    description: "Architecting intelligent systems, distributed AI pipelines, and resilient full-stack web experiences.",
    url: "https://samridhpandey.dev",
    siteName: "Samridh Pandey Portfolio",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "Samridh Pandey — SP Logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    shortcut: "/favicon.svg",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  }
};

import AmbientBackground from "@/components/AmbientBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FAFAFB] text-zinc-900 font-sans selection:bg-orange-500/20 selection:text-orange-700 relative">
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
