import { Geist, Geist_Mono } from "next/font/google";
import './globals.css'

import { ReduxProvider } from "@/providers/ReduxProvider";
import InitialStateManager from "@/components/common/InitialStateManager";

// Load Google Fonts
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = {
  title: "Inspire Academy CRM",
  description: "Internal CRM system for Inspire Academy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Redux Provider ensures global state is available */}
        <ReduxProvider>
          {/* 🔑 Hydrates auth + axios headers ONCE at app load */}
          <InitialStateManager />

          {/* Render the actual page */}
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
