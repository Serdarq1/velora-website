import { HandHelping, Users, Zap } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";
import Image from 'next/image';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProductMainProps {
  heading: string;
  features?: Feature[];
  className?: string;
}

const ProductMain = ({
  heading = "Salon operasyonlarınızı tek panelden yönetin",
  features = [
    {
      icon: <HandHelping className="h-auto w-5" />,
      title: "Müşteri bağlılığı",
      description:
        "Otomatik hatırlatma ve onay mesajlarıyla no-show oranını azaltın.",
    },
    {
      icon: <Users className="h-auto w-5" />,
      title: "Personel ve komisyon",
      description:
        "Çalışan performansını, komisyon hesaplamalarını ve servis bazlı gelirleri tek ekranda izleyin.",
    },
    {
      icon: <Zap className="h-auto w-5" />,
      title: "Gerçek zamanlı randevu",
      description:
        "Anlık takvim durumu ve hızlı randevu oluşturma ile müşteriye saniyeler içinde dönüş yapın.",
    },
  ],
  className,
}: ProductMainProps) => {
  return (
    <section className={cn("py-32", className) }>
      <div className="container overflow-hidden">
        <div className="mb-20 flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-semibold lg:text-5xl">{heading}</h1>
        </div>
        <div className="relative mx-auto max-w-5xl">
          <Image
            src='/calendar.png'
            alt='Velora Takvim'
            width={2880}
            height={1428}
            sizes="(min-width: 1280px) 1024px, (min-width: 768px) 90vw, 100vw"
            className="h-auto w-full rounded-xl object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent"></div>
          <div className="absolute -top-28 -right-28 -z-10 aspect-video h-72 w-96 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] [background-size:12px_12px] opacity-40 sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]"></div>
          <div className="absolute -top-28 -left-28 -z-10 aspect-video h-72 w-96 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] [background-size:12px_12px] opacity-40 sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]"></div>
        </div>
        <div className="mx-auto mt-10 flex max-w-5xl flex-col md:flex-row">
          {features.map((feature, index) => (
            <React.Fragment key={feature.title}>
              {index > 0 && (
                <Separator
                  orientation="vertical"
                  className="mx-6 hidden h-auto w-[2px] bg-linear-to-b from-muted via-transparent to-muted md:block"
                />
              )}
              <div
                key={index}
                className="flex grow basis-0 flex-col rounded-md bg-background p-4"
              >
                <div className="mb-6 flex size-10 items-center justify-center rounded-full bg-background drop-shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ProductMain };
