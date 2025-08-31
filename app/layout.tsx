import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { getMetadata, metaTexts } from "@/config/meta";
import { Outfit } from "next/font/google";
import "./globals.css";

const mainFont = Outfit({ subsets: ["latin"] });

export const metadata = getMetadata({
  title: metaTexts.landing.title,
  description: metaTexts.landing.description,
});

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
