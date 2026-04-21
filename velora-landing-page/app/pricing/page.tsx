import type { Metadata } from 'next'
import { CallToAction } from '@/components/CallToAction';
import { Compare } from '@/components/Compare';
import { Faq } from '@/components/Faq';
import { Footer } from '@/components/Footer';
import { HelpCenter } from '@/components/HelpCenter';
import Navigation from '@/components/Navigation';
import { Pricing } from '@/components/Pricing';
import { SectionIntro } from '@/components/SectionIntro';
import React from 'react'

export const metadata: Metadata = {
  title: "Fiyatlandırma",
  description:
    "Salon büyüklüğünüze uygun, tamamen şeffaf fiyatlandırma. Tüm özellikler tek pakette | gizli ücret yok, ek modül yok. Hemen inceleyin.",
  alternates: {
    canonical: "https://veloraappy.com/pricing",
  },
  openGraph: {
    title: "Fiyatlandırma | Velora",
    description:
      "Salon büyüklüğünüze uygun, tamamen şeffaf fiyatlandırma. Tüm özellikler tek pakette | gizli ücret yok, ek modül yok.",
    url: "https://veloraappy.com/pricing",
  },
};

const page = () => {
  return (
    <div className="overflow-x-hidden bg-background">
      <div className="p-3">
        <Navigation />
      </div>
      <div>
        <section className="px-4 pt-20 pb-6 sm:px-6 lg:px-8">
          <SectionIntro
            title="Herhangi bir sınırlama olmadan sadece tek bir fiyat, tek bir plan. İlk iki hafta ücretsiz."
            description={
              <>
                Velora'ya kayıt olduktan sonra kartınızı girmeden iki hafta ücretsiz kullanabilirsiniz. Davet ettiğiniz kişi başına 1 aylık ücretsiz üyelik kazanırsınız.{" "}
                <br />
                <span className='text-zinc-600 text-sm'>*Abonelik fiyatına KDV dahildir.</span>
              </>
            }
          />
        </section>
        <Pricing />
        <Compare />
        <CallToAction />
        <HelpCenter />
        <Faq />
        <Footer />
      </div>
    </div>
  )
}

export default page
