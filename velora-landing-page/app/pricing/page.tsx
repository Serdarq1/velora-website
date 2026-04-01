import { CallToAction } from '@/components/CallToAction';
import { Compare } from '@/components/Compare';
import { Faq } from '@/components/Faq';
import { Footer } from '@/components/Footer';
import { HelpCenter } from '@/components/HelpCenter';
import Navigation from '@/components/Navigation';
import { Pricing } from '@/components/Pricing';
import { SectionIntro } from '@/components/SectionIntro';
import React from 'react'

const page = () => {
  return (
    <div className="overflow-x-hidden bg-background">
      <div className="p-3">
        <Navigation />
      </div>
      <div>
        <section className="px-4 pt-20 pb-6 sm:px-6 lg:px-8">
          <SectionIntro
            title="Fiyatlandırma"
            description={
              <>
                Detaylı ödeme planlarını, pakete dahil tüm özellikleri ve daha
                fazlasını inceleyin.{" "}
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
