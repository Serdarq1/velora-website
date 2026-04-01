import type { Metadata } from "next";
import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

const inter = Inter({
  subsets: ['latin']
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin']
});


export const metadata: Metadata = {
  title: "Velora",
  description: "A'dan Z'ye salon yönetimi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.className} ${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
