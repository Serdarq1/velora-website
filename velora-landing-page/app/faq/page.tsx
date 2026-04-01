import { CallToAction } from '@/components/CallToAction'
import { Faq } from '@/components/Faq'
import { Footer } from '@/components/Footer'
import { HelpCenter } from '@/components/HelpCenter'
import Navigation from '@/components/Navigation'
import { SectionIntro } from '@/components/SectionIntro'
import React from 'react'

const page = () => {
  return (
   <div className='overflow-x-hidden bg-background'>
    <div className='p-3'>
        <Navigation />
    </div>
    <div>
        <section className="px-4 pt-20 pb-6 sm:px-6 lg:px-8">
          <SectionIntro
            title="Sıkça Sorulan Sorular"
            description="Velora ile ilgili sıkça sorulan tüm soruların cevaplarını aşağıda bulabilir, daha fazla destek için dilediğiniz zaman bizimle iletişime geçebilirsiniz."
          />
        </section>
        <Faq />
        <CallToAction />
        <HelpCenter />
        <Footer />
    </div>
   </div>
  )
}

export default page
