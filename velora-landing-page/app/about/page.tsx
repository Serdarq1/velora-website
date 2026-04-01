import { About } from '@/components/About'
import { CallToAction } from '@/components/CallToAction'
import { Faq } from '@/components/Faq'
import { Footer } from '@/components/Footer'
import { HelpCenter } from '@/components/HelpCenter'
import Navigation from '@/components/Navigation'
import React from 'react'

const waitlistUrl =
  process.env.NEXT_PUBLIC_WAITLIST_URL || "http://localhost:3001";

const page = () => {
  return (
    <div className="overflow-x-hidden bg-background">
      <div>
        <Navigation />
      </div>
      <div className="w-full">
        <About
          containerClassName="px-0"
          achievementsFullBleed
          title="Hakkımızda"
          mainImage={{
            src: "/dashboard.png",
            alt: "Salon Landing yönetim paneli",
          }}
          breakout={{
            title: "Birkaç tık ile kullanmaya başlayın.",
            description:
              "Kurulum, ekip daveti ve veri aktarımları da dahil olmak üzere sadece birkaç tıkta panelinizi hazır hale getirin.",
            buttonText: "Demo planla",
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
