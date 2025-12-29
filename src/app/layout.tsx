import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-cabinet",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-satoshi",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Developer Playground | Next.js 14 Demo",
  description:
    "A comprehensive Next.js 14 playground showcasing components, SSR, SSG, ISR, API routes, and best practices.",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Components"],
  openGraph: {
    title: "Developer Playground",
    description: "Next.js 14 feature showcase and component library",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body className="font-body min-h-screen">
        <Navigation />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
