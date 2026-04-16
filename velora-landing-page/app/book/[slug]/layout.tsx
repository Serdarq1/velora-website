import type { Metadata } from "next";

type BookingLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BookingLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const bookingUrl = `https://veloraappy.com/book/${slug}`;

  return {
    title: "Online Randevu",
    description: "Velora ile online randevunuzu oluşturun.",
    alternates: {
      canonical: bookingUrl,
    },
    openGraph: {
      title: "Velora Online Randevu",
      description: "Velora ile online randevunuzu oluşturun.",
      url: bookingUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Velora Online Randevu",
      description: "Velora ile online randevunuzu oluşturun.",
    },
  };
}

export default function BookingLayout({ children }: BookingLayoutProps) {
  return children;
}
