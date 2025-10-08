
import './globals.css'

import { ReduxProvider } from "@/providers/ReduxProvider";
import InitialStateManager from "@/components/common/InitialStateManager";
import { NotificationProvider } from "@/components/common/NotificationProvider";

// Load Google Fonts

export const metadata = {
  title: "Inspire Academy CRM",
  description: "Internal CRM system for Inspire Academy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        {/* Redux Provider ensures global state is available */}
        <ReduxProvider>
          {/* 🔑 Hydrates auth + axios headers ONCE at app load */}
          <InitialStateManager />
          <NotificationProvider>

            {/* Render the actual page */}
            {children}
          </NotificationProvider>

        </ReduxProvider>
      </body>
    </html>
  );
}
