import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recruitments | dBug Labs",
  description: "dBug Labs Recruitment 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <Analytics />
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <div className="bg-foreground min-h-screen">{children}</div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
