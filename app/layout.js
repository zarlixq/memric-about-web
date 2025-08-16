// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://memric.app"),
  title: {
    default: "Memric",
    template: "%s | Memric",
  },
  description:
    "Memric; günlük sorular ve tematik sohbetlerle yeni insanlarla bağ kurmanı ve kendini keşfetmeni sağlar.",
  icons: {
    icon: "/images/memriclogo.png",      // favicon (public/images/memriclogo.png)
    apple: "/images/memriclogo.png",     // iOS kısayol ikonu
  },
  openGraph: {
    type: "website",
    url: "https://memric.app",
    title: "Memric – Sosyal Bağ & Kişisel Gelişim",
    description:
      "Günlük sorularla düşün, tematik sohbetlerle bağ kur. Memric ile farklı hayatlara dokun.",
    siteName: "Memric",
    images: ["/images/memriclogo.png"],  // OG görseli
  },
  twitter: {
    card: "summary_large_image",
    title: "Memric – Sosyal Bağ & Kişisel Gelişim",
    description:
      "Günlük sorular ve tematik sohbetlerle keşfet.",
    images: ["/images/memriclogo.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
