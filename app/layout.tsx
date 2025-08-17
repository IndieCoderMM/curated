import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { ToastProvider } from "@/components/providers/toaster-provider";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const mainFont = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CuratEd | Self-taught Learning Platform",
  description:
    "CuratEd is a self-taught learning platform that helps you learn anything, anytime, anywhere.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mainFont.className}>
        <ConfettiProvider />
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
