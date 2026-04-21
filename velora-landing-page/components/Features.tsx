import {
  CalendarClock,
  CreditCard,
  Instagram,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature {
  heading: string;
  description: string;
  icon: React.ReactNode;
}

interface FeaturesProps {
  title?: string;
  features?: Feature[];
  buttonText?: string;
  buttonUrl?: string;
  className?: string;
}

const Features = ({
  title = "İşletmenizi yönetmek için gerekli olan her şey",
  features = [
    {
      heading: "Randevu Takibi",
      description:
        "Modern ve kolay kullanılabilir tasarımıyla randevu yönetiminiz hiç olmadığı kadar kolay.",
      icon: <CalendarClock className="size-6" />,
    },
    {
      heading: "Ciro Yönetimi",
      description:
        "Kasanıza giren ve kasanızdan çıkan her parayı kolayca takip edip kolayca analiz yapın.",
      icon: <CreditCard className="size-6" />,
    },
    {
      heading: "Personel Analizi",
      description: "Personellerinizin performansını gerçek zamanlı görün.",
      icon: <Users className="size-6" />,
    },
    {
      heading: "Stok Takibi",
      description:
        "Sadece bir tık ile tüm stok takibinizi yönetin, salonunuzda eksik mal bırakmayın.",
      icon: <ShieldCheck className="size-6" />,
    },
    {
      heading: "Otomatik Mesajlar",
      description:
        "Müşterilerinize otomatik hatırlatma mesajları gönderin, yaklaşan randevuları takip edin ve indirim mesajlarıyla yeni randevular alın.",
      icon: <MessageCircle className="size-6" />,
    },
    {
      heading: "Entegrasyonlar",
      description:
        "Instagram ve Whatsapp entegrasyonları sayesinde tüm mesajlaşma araçlarınızı tek bir uygulamada toplayın, hiçbir mesajı kaçırmayın.",
      icon: <Instagram className="size-6" />,
    },
  ],
  buttonText = "Tüm Özellikler",
  buttonUrl = "/pricing",
  className,
}: FeaturesProps) => {
  return (
    <section className={cn("bg-[oklch(0.965_0.02_270)] py-20 dark:bg-slate-950 sm:py-24 lg:py-32", className)}>
      <div className="container p-2">
        {title && (
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <h2 className="text-3xl font-medium text-pretty sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          </div>
        )}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col">
              <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.heading}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        {buttonUrl && (
          <div className="mt-16 flex justify-center">
            <Button size="lg" asChild>
              <a href={buttonUrl}>{buttonText}</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export { Features };
