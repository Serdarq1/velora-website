import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { ProductLayout } from "@/components/ProductLayout";
import { ProductMain } from "@/components/ProductMain";
import { ProductSection } from "@/components/ProductSection";
import { Referrals } from "@/components/Referrals";
import Section  from "@/components/Section";
import { HelpCenter }  from "@/components/HelpCenter";
import { Footer } from "@/components/Footer";
import { CallToAction } from "@/components/CallToAction";
import { Faq } from "@/components/Faq";

export const metadata: Metadata = {
  title: "Velora | Akıllı Salon Yönetim Yazılımı",
  description:
    "Randevu al, personelini yönet, gelirini takip et | hepsi tek uygulamada. Kuaför, güzellik salonu ve spa işletmelerinin tercih ettiği modern salon yazılımı.",
  alternates: {
    canonical: "https://veloraappy.com",
  },
  openGraph: {
    title: "Velora | Akıllı Salon Yönetim Yazılımı",
    description:
      "Randevu al, personelini yönet, gelirini takip et | hepsi tek uygulamada. Kuaför, güzellik salonu ve spa işletmelerinin tercih ettiği modern salon yazılımı.",
    url: "https://veloraappy.com",
  },
};

export default function Home() {
  return (
    <div>
      <Hero />
      <Section />
      <ProductSection />
      <ProductMain heading={"Salon operasyonlarınızı yönetmenin en kolay yolu."} />
      <Referrals />
      <ProductLayout title="Tüm ihtiyaçlarınız için tek bir uygulama." description="Tek tıkla tüm salonunuzu yönetin, cironuzu katlayın." />
      <Pricing />
      <CallToAction />
      <HelpCenter />
      <Faq />
      <Footer />
    </div>
  );
}
