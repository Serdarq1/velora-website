import type { Metadata } from 'next'
import Script from 'next/script'
import { CallToAction } from '@/components/CallToAction'
import { Faq } from '@/components/Faq'
import { Footer } from '@/components/Footer'
import { HelpCenter } from '@/components/HelpCenter'
import Navigation from '@/components/Navigation'
import { SectionIntro } from '@/components/SectionIntro'
import React from 'react'

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular",
  description:
    "Velora salon yazılımı hakkında merak ettiğiniz her şeyin cevabı. Randevu yönetimi, ödeme takibi, veri güvenliği ve entegrasyonlar hakkında bilgi alın.",
  alternates: {
    canonical: "https://veloraappy.com/faq",
  },
  openGraph: {
    title: "Sıkça Sorulan Sorular | Velora",
    description:
      "Velora salon yazılımı hakkında merak ettiğiniz her şeyin cevabı. Randevu, ödeme, güvenlik ve entegrasyon hakkında bilgi alın.",
    url: "https://veloraappy.com/faq",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Velora işletmemin büyümesine nasıl katkı sağlar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Velora yalnızca randevu takibi için değil, işletmenizi daha iyi analiz edebilmeniz için geliştirilmiştir. Gelir, müşteri ve personel performansı gibi verileri detaylı şekilde görüntüleyerek hangi hizmetlerin daha fazla kazandırdığını, hangi müşterilerin tekrar geldiğini ve hangi saatlerin daha verimli olduğunu kolayca analiz edebilirsiniz.",
      },
    },
    {
      "@type": "Question",
      name: "Herhangi bir gizli ücret bulunuyor mu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hayır. Velora'da tek bir paket bulunmaktadır ve tüm özellikler bu pakete dahildir. Ekstra modül, ek lisans ücreti veya gizli maliyet bulunmaz.",
      },
    },
    {
      "@type": "Question",
      name: "Velora hangi işletmeler için uygundur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Velora; kuaförler, berberler, brow ve lash stüdyoları, nail salonları ve benzeri güzellik işletmeleri için uygundur. Özellikle 1-5 personelli küçük ve orta ölçekli işletmelerin ihtiyaçlarına göre tasarlanmıştır.",
      },
    },
    {
      "@type": "Question",
      name: "Velora no-show (randevuya gelmeme) sorununu azaltır mı?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet. Velora sayesinde müşterilerinize kolayca randevu linki göndererek onların doğrudan randevu oluşturmasını sağlayabilirsiniz. Ayrıca SMS hatırlatma özelliği ile randevu öncesinde otomatik bildirim gönderilerek gelmeme oranı önemli ölçüde azaltılabilir.",
      },
    },
    {
      "@type": "Question",
      name: "Salonda olmadığım zamanlarda bilgilere erişebilir miyim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet. Velora tamamen online bir sistemdir. Telefonunuzdan, tabletinizden veya bilgisayarınızdan istediğiniz zaman giriş yaparak randevularınızı, müşterilerinizi ve gelir bilgilerinizi görüntüleyebilirsiniz.",
      },
    },
    {
      "@type": "Question",
      name: "Müşterilerim online olarak randevu oluşturabilir mi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet. Velora'da oluşturulan özel randevu linkini müşterilerinizle paylaşabilirsiniz. Müşterileriniz bu link üzerinden uygun saatleri görüntüleyerek randevu oluşturabilir.",
      },
    },
    {
      "@type": "Question",
      name: "WhatsApp ve Instagram üzerinden randevu alabilir miyim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet, Velora'da WhatsApp ve Instagram entegrasyonu bulunmaktadır. Bu özellik sayesinde müşteri mesajlarını tek panelden yönetebilir ve randevu süreçlerini daha hızlı şekilde ilerletebilirsiniz.",
      },
    },
    {
      "@type": "Question",
      name: "Verilerim güvende mi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet. Velora'da tüm veriler güvenli sunucularda saklanmaktadır. Sistem, veri güvenliği ve sürekliliği sağlamak üzere yapılandırılmıştır.",
      },
    },
    {
      "@type": "Question",
      name: "Velora'yı kullanmak zor mu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hayır. Velora, teknik bilgi gerektirmeden kolayca kullanılabilecek şekilde tasarlanmıştır. Sade ve anlaşılır arayüzü sayesinde kısa sürede adapte olabilirsiniz.",
      },
    },
    {
      "@type": "Question",
      name: "Velora'yı kullanmadan önce deneme imkânı var mı?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet. Velora'yı deneyerek işletmenize uygun olup olmadığını değerlendirebilirsiniz. Bu sayede kararınızı daha sağlıklı şekilde verebilirsiniz.",
      },
    },
  ],
};

const page = () => {
  return (
   <div className='overflow-x-hidden bg-background'>
    <Script
      id="schema-faq"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
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
