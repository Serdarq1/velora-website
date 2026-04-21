import type { Metadata } from 'next'
import { About } from '@/components/About'
import { CallToAction } from '@/components/CallToAction'
import { Faq } from '@/components/Faq'
import { Footer } from '@/components/Footer'
import { HelpCenter } from '@/components/HelpCenter'
import Navigation from '@/components/Navigation'
import { getWaitlistUrl } from '@/lib/waitlist-url'
import React from 'react'

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Velora, kuaför ve güzellik salonu işletmecilerinin günlük operasyonlarını kolaylaştırmak için kuruldu. Ekibimizi, misyonumuzu ve sizi neden seçmemiz gerektiğini keşfedin.",
  alternates: {
    canonical: "https://veloraappy.com/about",
  },
  openGraph: {
    title: "Hakkımızda | Velora",
    description:
      "Velora, kuaför ve güzellik salonu işletmecilerinin günlük operasyonlarını kolaylaştırmak için kuruldu. Ekibimizi ve misyonumuzu keşfedin.",
    url: "https://veloraappy.com/about",
  },
};

const waitlistUrl = getWaitlistUrl();

const page = () => {
  return (
    <div className="overflow-x-hidden bg-background">
      <div className="px-4 pt-4 sm:px-6 sm:pt-5">
        <Navigation />
      </div>
      <div className="w-full">
        <About
          containerClassName="px-4 sm:px-6"
          achievementsFullBleed
          title="Hakkımızda"
          mainImage={{
            src: "/dashboard.png",
            alt: "Velora özet paneli.",
          }}
          breakout={{
            title: "Birkaç tık ile kullanmaya başlayın.",
            description:
              "Kurulum, ekip daveti ve veri aktarımları da dahil olmak üzere sadece birkaç tıkta panelinizi hazır hale getirin.",
            buttonText: "Hesap oluştur",
            buttonUrl: waitlistUrl,
          }}
        />
      </div>
      <CallToAction />
      <HelpCenter />
      <Faq />
      <Footer className="ml-0" />
    </div>
  )
}

export default page
