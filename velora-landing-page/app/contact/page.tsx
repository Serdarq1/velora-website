import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ContactPage from "@/components/ContactPage";
import { Referrals } from "@/components/Referrals";
import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { CallToAction } from "@/components/CallToAction";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Demo planlamak, fiyat teklifi almak veya destek için Velora ekibiyle iletişime geçin. Sorularınızı yanıtlamak için buradayız.",
  alternates: {
    canonical: "https://veloraappy.com/contact",
  },
  openGraph: {
    title: "İletişim | Velora",
    description:
      "Demo planlamak, fiyat teklifi almak veya destek için Velora ekibiyle iletişime geçin.",
    url: "https://veloraappy.com/contact",
  },
};

const page = () => {
  return (
    <div className="overflow-x-hidden bg-background">
      <div className="p-3">
        <Navigation />
      </div>
      <div className="mt-16 space-y-16">
        <ContactPage />
        <div className="w-full">
          <div className="mb-20">
            <Referrals />
            <Faq />
            <CallToAction />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default page;
