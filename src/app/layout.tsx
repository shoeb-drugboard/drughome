import "./globals.css";
import { Poppins } from "next/font/google";
import ClientProviders from "./providers";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "DrugBoard - Pharmaceutical Information Platform",
  description: "Comprehensive platform for pharmaceutical information and management",
};

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
      <body className={`${poppins.style} font-poppins antialiased scroll-smooth w-full h-full light bg-background text-foreground bg-gradient-to-r from-blue-50 to-indigo-100 overflow-x-hidden`}>
        <ClientProviders>
          <Navbar />
          <main className="w-screen h-full flex items-center gap-3 px-4 bg-gradient-to-r from-blue-50 to-indigo-100">
            <div className="md:min-w-[100px] min-w-[50px] h-full flex flex-col items-center justify-center gap-4">
              <div className="fixed top-1/2 left-2 md:left-8 transform -translate-y-1/3">
                <Sidebar />
              </div>
            </div>
            {children}
          </main>
        </ClientProviders>
      </body>
    </html>
  );
}
