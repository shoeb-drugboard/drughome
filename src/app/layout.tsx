"use client";

import "./globals.css";
// import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AnimatePresence } from 'framer-motion';
import ClientProviders from "./providers";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Drughome</title>
      </head>
      <body className={`${poppins.style} font-poppins antialiased scroll-smooth w-full h-full light bg-background text-foreground`}>
        <ClientProviders>
          <AnimatePresence mode="wait" initial={false}>
            {children}
          </AnimatePresence>
        </ClientProviders>
      </body>
    </html>
  );
}
