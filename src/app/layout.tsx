import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DAKSHH CYBER ROOMS | 3D CTF Platform",
  description:
    "Enter the hacker headquarters. Explore 3D rooms, crack challenges, capture flags. A premium browser-based cyber training facility.",
  keywords: ["CTF", "Capture The Flag", "cybersecurity", "hacking", "3D", "web security"],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistMono.variable} antialiased scanlines bg-grid`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
