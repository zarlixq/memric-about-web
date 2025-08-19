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
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    url: "https://memric.app",
    title: "Memric – Sosyal Bağ & Kişisel Gelişim",
    description:
      "Günlük sorularla düşün, tematik sohbetlerle bağ kur. Memric ile farklı hayatlara dokun.",
    siteName: "Memric",
    images: [
      {
        url: "/images/memriclogo.png",
        width: 512,
        height: 512,
        alt: "Memric Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Memric – Sosyal Bağ & Kişisel Gelişim",
    description: "Günlük sorular ve tematik sohbetlerle keşfet.",
    images: ["/images/memriclogo.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* eklentilerin enjekte ettiği bis_* attribute’larını temizle */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var clean = function(el){
                    if (!el || !el.getAttributeNames) return;
                    el.getAttributeNames().forEach(function(n){
                      if (/^bis_/i.test(n)) el.removeAttribute(n);
                    });
                  };
                  clean(document.documentElement);
                  clean(document.body);
                } catch(e){}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
