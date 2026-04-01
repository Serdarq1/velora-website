"use client";

import { CircleCheck } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const waitlistUrl =
  process.env.NEXT_PUBLIC_WAITLIST_URL || "http://localhost:3001";

interface PricingFeature {
  text: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: PricingFeature[];
  button: {
    text: string;
    url: string;
  };
}

interface PricingProps {
  heading?: string;
  description?: string;
  plans?: PricingPlan[];
  className?: string;
}

const Pricing = ({
  heading = "Fiyatlandırma",
  description = "Tüm özellikleri kapsayan sadece tek bir paket.",
  plans = [
    {
      id: "plus",
      name: "",
      description: "Tüm özellikleri tek pakette sunan kapsamlı plan",
      monthlyPrice: "1200₺",
      yearlyPrice: "12000₺",
      features: [
        { text: "Randevu yönetimi" },
        { text: "Online randevu alma" },
        { text: "Ekip takvimi" },
        { text: "Google takvim entegrasyonu" },
        { text: "Hizmet yönetimi" },
        { text: "Kasa yönetimi" },
        { text: "Kasa takibi" },
        { text: "Ekip yönetimi" },
        { text: "Sınırsız ekip üyesi ekleme" },
        { text: "Ekip ödemesi takibi" },
        { text: "Ürün satışı yönetimi" },
        { text: "Ürün yönetimi" },
        { text: "Envanter takibi" },
        { text: "Whatsapp entegrasyonu" },
        { text: "Instagram entegrasyonu" },
        { text: "Detaylı personel analizi" },
        { text: "Detaylı müşteri analizi" },
      ],
      button: {
        text: "Abone ol",
        url: waitlistUrl,
      },
    },
  ],
  className,
}: PricingProps) => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <>
      <section className={cn("py-20 sm:py-24 lg:py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-semibold text-pretty sm:text-4xl lg:text-6xl">
            {heading}
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base lg:text-xl">{description}</p>
          <div className="inline-flex w-full max-w-md items-center overflow-hidden rounded-lg text-base shadow-md shadow-black/10 ring-1 ring-black/10 sm:w-auto sm:text-lg">
            <Button
              size="sm"
              variant="ghost"
              className={cn(
                "min-h-11 flex-1 rounded-none border-0 px-4 py-2 text-sm font-semibold bg-transparent text-muted-foreground shadow-none transition-colors duration-150 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:px-6 sm:text-base",
                !isYearly &&
                  "cursor-pointer bg-primary text-white hover:text-white focus-visible:text-white shadow-md shadow-black/10 ring-0 hover:bg-primary"
              )}
              type="button"
              onClick={() => setIsYearly(false)}
            >
              Aylık ödeme
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className={cn(
                "min-h-11 flex-1 rounded-none border-0 border-l border-black/5 px-4 py-2 text-sm font-semibold bg-transparent text-muted-foreground shadow-none transition-colors duration-150 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:px-6 sm:text-base",
                isYearly &&
                  "cursor-pointer bg-primary text-white hover:text-white focus-visible:text-white shadow-md shadow-black/10 ring-0 hover:bg-primary"
              )}
              type="button"
              onClick={() => setIsYearly(true)}
            >
              Yıllık ödeme
            </Button>
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-6 md:flex-row md:items-start md:justify-center">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className="relative flex min-h-[560px] w-full max-w-md flex-col justify-between text-left shadow-lg"
              >
                <CardHeader className="relative z-20">
                  <CardTitle>
                    <p>{plan.name}</p>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <div className="flex items-end">
                    <span className="text-4xl font-semibold">
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-2xl font-semibold text-muted-foreground">
                      {isYearly ? "/yıllık" : "/aylık"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="relative z-20">
                  <Separator className="mb-6" />
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CircleCheck className="size-4" />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="relative z-20 mt-auto">
                  <Button
                    asChild
                    className="min-h-11 w-full border border-primary bg-white text-primary transition hover:bg-primary hover:text-white"
                  >
                    <a href={plan.button.url} target="_blank">
                      {plan.button.text}
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export { Pricing };
