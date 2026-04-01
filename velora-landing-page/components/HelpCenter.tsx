"use client";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface HelpCenterProps {
  className?: string;
}

const SUPPORT_CARDS = [
  {
    title: "Yardım Merkezi",
    description: "Tüm sık sorulan sorulara kolaylıkla ulaşın.",
    cta: "Yardım merkezine git",
    href: "contact",
  },
  {
    title: "Bizimle iletişime geçin",
    description: "E-posta ile ekibimize ulaşın, 7/24 yanınızdayız.",
    cta: "İletişime geç",
    href: "mailto:iletisim@veloraappy.com",
  },
];

const HelpCenter = ({ className }: HelpCenterProps) => {
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="container max-w-6xl">
        <div className="mb-10 md:mb-14">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-pretty sm:text-4xl md:text-5xl">
            Asla yalnız değilsiniz, müşteri desteği 7/24 yanınızda
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {SUPPORT_CARDS.map((card) => (
            <Card
              key={card.title}
              className="h-full rounded-2xl border border-black/5 bg-white shadow-sm transition hover:shadow-md  hover:bg-secondary"
            >
              <CardContent className="flex h-full flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-base text-muted-foreground">
                    {card.description}
                  </p>
                </div>
                <Button
                  asChild
                  variant="link"
                  className="mt-8 inline-flex items-center gap-2 px-0 text-base font-semibold text-gray-900 cursor-pointer"
                >
                  <a href={card.href}>
                    {card.cta}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* <Faq /> */}
    </section>
  );
};

export { HelpCenter };
