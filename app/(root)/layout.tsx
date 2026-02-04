import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/providers";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shadow Stack",
  description:
    "ShadowStack reveals the real tech stack behind startups and SaaS companies using public signals like GitHub, DNS, and job postings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex items-center justify-center px-4 py-20 sm:px-8 md:px-16 lg:px-32`}
      >
        <Providers>
          <Header />
          {children} <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
