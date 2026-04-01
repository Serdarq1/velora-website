'use client'

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem = ({ question, answer, isOpen, onClick }: FaqItemProps) => {
  return (
    <div className={cn("bg-gray-100 mb-4 px-3 rounded-md cursor-pointer")}>
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-5 text-left transition-all"
      >
        <span className="text-base font-medium md:text-lg">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden text-sm text-muted-foreground leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

interface FaqProps {
  classname?: string;
}

const Faq = ({ classname }: FaqProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    {
      question: "Velora işletmemin büyümesine nasıl katkı sağlar?",
      answer:
        "Velora yalnızca randevu takibi için değil, işletmenizi daha iyi analiz edebilmeniz için geliştirilmiştir. Gelir, müşteri ve personel performansı gibi verileri detaylı şekilde görüntüleyerek hangi hizmetlerin daha fazla kazandırdığını, hangi müşterilerin tekrar geldiğini ve hangi saatlerin daha verimli olduğunu kolayca analiz edebilirsiniz.",
    },
    {
      question: "Herhangi bir gizli ücret bulunuyor mu?",
      answer:
        "Hayır. Velora’da tek bir paket bulunmaktadır ve tüm özellikler bu pakete dahildir. Ekstra modül, ek lisans ücreti veya gizli maliyet bulunmaz.",
    },
    {
      question: "Velora hangi işletmeler için uygundur?",
      answer:
        "Velora; kuaförler, berberler, brow ve lash stüdyoları, nail salonları ve benzeri güzellik işletmeleri için uygundur. Özellikle 1-5 personelli küçük ve orta ölçekli işletmelerin ihtiyaçlarına göre tasarlanmıştır.",
    },
    {
      question: "Velora no-show (randevuya gelmeme) sorununu azaltır mı?",
      answer:
        "Evet. Velora sayesinde müşterilerinize kolayca randevu linki göndererek onların doğrudan randevu oluşturmasını sağlayabilirsiniz. Ayrıca SMS hatırlatma özelliği ile randevu öncesinde otomatik bildirim gönderilerek gelmeme oranı önemli ölçüde azaltılabilir.",
    },
    {
      question: "Salonda olmadığım zamanlarda bilgilere erişebilir miyim?",
      answer:
        "Evet. Velora tamamen online bir sistemdir. Telefonunuzdan, tabletinizden veya bilgisayarınızdan istediğiniz zaman giriş yaparak randevularınızı, müşterilerinizi ve gelir bilgilerinizi görüntüleyebilirsiniz.",
    },
    {
      question: "Personellerim tüm bilgilere erişebilir mi?",
      answer:
        "Hayır. Velora’da kullanıcı yetkilendirme sistemi bulunmaktadır. Her personelin hangi bilgilere erişebileceğini siz belirleyebilirsiniz. Böylece yalnızca gerekli bilgilere erişim sağlanır.",
    },
    {
      question: "Verilerim güvende mi?",
      answer:
        "Evet. Velora’da tüm veriler güvenli sunucularda saklanmaktadır. Sistem, veri güvenliği ve sürekliliği sağlamak üzere yapılandırılmıştır.",
    },
    {
      question: "Verilerim kaybolur mu?",
      answer:
        "Hayır. Tüm veriler sistem üzerinde güvenli şekilde saklanır ve korunur. Manuel yedekleme yapmanıza gerek yoktur.",
    },
    {
      question: "Verilerimi istediğim zaman indirebilir miyim?",
      answer:
        "Evet. Velora’da verileriniz üzerinde tam kontrol sahibi olursunuz. İhtiyaç duyduğunuzda verilerinizi dışa aktarabilirsiniz.",
    },
    {
      question: "Başka bir sistem kullanıyordum, verilerimi Velora’ya aktarabilir miyim?",
      answer:
        "Evet. Mevcut müşteri verileriniz ve temel bilgileriniz Velora’ya aktarılabilir. Bu süreç, iş akışınızı aksatmadan planlı şekilde gerçekleştirilebilir.",
    },
    {
      question: "Velora’yı kullanmak zor mu?",
      answer:
        "Hayır. Velora, teknik bilgi gerektirmeden kolayca kullanılabilecek şekilde tasarlanmıştır. Sade ve anlaşılır arayüzü sayesinde kısa sürede adapte olabilirsiniz.",
    },
    {
      question: "Müşterilerim online olarak randevu oluşturabilir mi?",
      answer:
        "Evet. Velora’da oluşturulan özel randevu linkini müşterilerinizle paylaşabilirsiniz. Müşterileriniz bu link üzerinden uygun saatleri görüntüleyerek randevu oluşturabilir.",
    },
    {
      question: "WhatsApp ve Instagram üzerinden randevu alabilir miyim?",
      answer:
        "Evet, Velora’da WhatsApp ve Instagram entegrasyonu bulunmaktadır. Bu özellik sayesinde müşteri mesajlarını tek panelden yönetebilir ve randevu süreçlerini daha hızlı şekilde ilerletebilirsiniz.",
    },
    {
      question: "Velora internet olmadan çalışır mı?",
      answer:
        "Hayır. Velora online bir sistemdir ve kullanımı için internet bağlantısı gereklidir. Bu sayede her yerden erişim imkânı sunar.",
    },
    {
      question: "Velora’yı kullanmadan önce deneme imkânı var mı?",
      answer:
        "Evet. Velora’yı deneyerek işletmenize uygun olup olmadığını değerlendirebilirsiniz. Bu sayede kararınızı daha sağlıklı şekilde verebilirsiniz.",
    },
    {
      question: "Randevularım karışır mı?",
      answer:
        "Hayır. Velora’nın takvim sistemi sayesinde tüm randevular düzenli şekilde görüntülenir, çakışmalar önlenir ve müsait saatler net şekilde takip edilebilir.",
    },
  ];

  return (
    <section className={cn("py-24 px-4", classname)}>
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-3xl font-bold tracking-tight">Sıkça Sorulan Sorular</h2>
        <div className="divide-y divide-gray-200">
          {items.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Faq };
