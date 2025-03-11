import "./globals.css";
import { Poppins } from "next/font/google";
import ClientProviders from "./providers";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

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
      <body className={`${poppins.style} font-poppins antialiased scroll-smooth w-full h-full light bg-background text-foreground bg-gradient-to-t from-pink-300 to-purple-300 overflow-x-hidden`}>
        <ClientProviders>
          <Navbar />
          <div className="w-screen h-screen flex items-center gap-3 px-4">
            <Sidebar />
            {children}
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
