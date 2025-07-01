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
  title: "VC Spec Lens - Credential Standards Comparison",
  description:
    "Compare and generate credentials in W3C VC Data Model, ISO mDOC, and IETF SD-JWT formats. An interactive tool for understanding different verifiable credential standards.",
  keywords:
    "verifiable credentials, W3C VC, ISO mDOC, IETF SD-JWT, credential comparison, digital identity",
  authors: [{ name: "VC Spec Lens" }],
  openGraph: {
    title: "VC Spec Lens - Credential Standards Comparison",
    description:
      "Compare and generate credentials in W3C VC, ISO mDOC, and SD-JWT formats",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
