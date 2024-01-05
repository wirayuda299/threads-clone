import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL!),
  title: {
    template: "%s  |  Thread",
    default: "Thread",
    absolute: "",
  },
  alternates: {
    canonical: process.env.SITE_URL!
  },
  description: "Thread clone with Nextjs 14",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="h-full w-full">
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
