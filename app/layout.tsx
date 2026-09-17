import type { Metadata } from "next";
import { Inter, Manrope, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-noto",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lightofthecity.church"),
  title: {
    default: "光之城行道會｜Light of the City Church",
    template: "%s｜光之城行道會"
  },
  description: "歡迎來到光之城行道會。一起認識神、經歷愛，找到屬於你的家。",
  openGraph: {
    title: "光之城行道會｜Light of the City Church",
    description: "歡迎來到光之城行道會。一起認識神、經歷愛，找到屬於你的家。",
    locale: "zh_TW",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant-TW" className={`${inter.variable} ${manrope.variable} ${notoSansTC.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
