import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs'

import { ModalProvider } from "@/providers/modal-provider";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from '@/components/ui/sonner';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Dashboard for your store",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider afterSignOutUrl={'/'}>
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <Toaster/>
          <ModalProvider />
            {children}
        </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}