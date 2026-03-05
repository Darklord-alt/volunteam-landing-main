import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Volunteam | Where Skills Meets Purpose",
  description: "SaaS platform for Nonprofit subscriptions and Volunteer matching",
  // FORCE REFRESH: Added versioning (?v=4) to bypass browser cache
  icons: {
    icon: "/logo.png?v=4",
    shortcut: "/logo.png?v=4",
    apple: "/logo.png?v=4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-[#01121C] text-white`}
      >
        {children}
      </body>
    </html>
  );
}