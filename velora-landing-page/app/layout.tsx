import type { Metadata } from "next";
import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ['latin']
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: {
    default: "Velora | Salon Yönetim Yazılımı",
    template: "%s | Velora",
  },
  description:
    "Randevu, personel ve ödeme yönetimini tek platformda birleştiren salon yazılımı. Kuaför, güzellik salonu ve spa işletmelerinin tercih ettiği akıllı çözüm.",
  keywords: [
    "salon yönetim yazılımı",
    "randevu programı",
    "kuaför programı",
    "güzellik salonu yazılımı",
    "online randevu sistemi",
    "berber programı",
    "spa yazılımı",
    "salon uygulaması",
    "personel yönetimi",
    "müşteri takip sistemi",
    "randevu yazılımı",
  ],
  authors: [{ name: "Velora" }],
  creator: "Velora",
  metadataBase: new URL("https://veloraappy.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://veloraappy.com",
    siteName: "Velora",
    title: "Velora | Salon Yönetim Yazılımı",
    description:
      "Randevu, personel ve ödeme yönetimini tek platformda birleştiren salon yazılımı. Kuaför, güzellik salonu ve spa işletmelerinin tercih ettiği akıllı çözüm.",
    images: [
      {
        url: "/Velora.png",
        width: 1200,
        height: 630,
        alt: "Velora Salon Yönetim Yazılımı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velora | Salon Yönetim Yazılımı",
    description:
      "Randevu, personel ve ödeme yönetimini tek platformda birleştiren salon yazılımı.",
    images: ["/Velora.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Velora",
  url: "https://veloraappy.com",
  logo: "https://veloraappy.com/Velora.png",
  description:
    "Velora, kuaför, güzellik salonu ve spa işletmeleri için geliştirilmiş akıllı salon yönetim yazılımıdır.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: "Turkish",
  },
  sameAs: [
    "https://www.instagram.com/appvelora",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Velora",
  url: "https://veloraappy.com",
  description: "Salon yönetim yazılımı | randevu, personel ve ödeme tek platformda.",
  inLanguage: "tr-TR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <Analytics />
      <head>
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${plusJakartaSans.className} ${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
