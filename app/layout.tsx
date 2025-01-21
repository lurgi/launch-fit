import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Launch Fit - 출시 전에 시장 반응을 확인하세요!",
  description:
    "아이디어만으로는 부족해요! Launch Fit으로 출시 전에 소비자의 관심을 모으고, 진짜 팔릴 제품인지 미리 확인하세요.",
  openGraph: {
    title: "Launch Fit - 출시 전에 시장 반응을 확인하세요!",
    description:
      "아이디어만으로는 부족해요! Launch Fit으로 출시 전에 소비자의 관심을 모으고, 진짜 팔릴 제품인지 미리 확인하세요.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster />
        {children}
      </body>

      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-Z4JSE6QQ71`}></Script>
      <Script
        strategy="afterInteractive"
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z4JSE6QQ71');
          `,
        }}
      />
    </html>
  );
}
