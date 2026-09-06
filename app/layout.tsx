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
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

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
      <body className="min-h-screen bg-[#FAFAFB] text-zinc-900 font-sans selection:bg-orange-500/20 selection:text-orange-700">
        {children}
      </body>
    </html>
  );
}
