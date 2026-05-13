import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import Navigation from "@/components/Navigation";
import Link from "next/link";
import { AppStore } from "./AppStore";

const appSignUpURL = "https://dashboard.veloraappy.com/sign-up"


interface Hero {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
    className?: string;
  };
  className?: string;
}

const Hero = ({
  heading = "Güzellik salonları için yeni nesil yönetim uygulaması.",
  description = "A'dan Z'ye salon yönetiminiz için gerekli her özelliği içeren yeni nesil yönetim uygulaması ile tüm belgelerinizi tek yerde toplayın, zamandan kazanın ve cironuzu arttırın.  ",
  button = {
    text: "Detayları Gör",
    url: appSignUpURL,
  },
  className,
}: Hero) => {
  return (
    <div>
      <div className="px-4 pt-4 sm:px-6 sm:pt-5">
        <Navigation />
      </div>
      <div
        className="pointer-events-none absolute inset-0 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"
        aria-hidden="true"
      />

      <section className={cn("relative z-10 pb-20 pt-14 sm:pb-24 sm:pt-20 lg:pt-28", className)}>
        <div className="container text-center">
          <div className="mx-auto flex max-w-5xl flex-col gap-5 sm:gap-6">
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-6xl">{heading}</h1>
            <p className="mx-auto max-w-3xl text-pretty text-sm text-muted-foreground sm:text-base lg:text-lg">
              {description}
            </p>
          </div>
          <Button asChild size="lg" className="mt-8 w-full max-w-xs sm:mt-10 sm:w-auto">
            <a href={button.url}>{button.text}</a>
          </Button>
        </div>
      </section>

      <section className="relative z-10 -mt-6 pb-20 sm:-mt-12 sm:pb-24 lg:-mt-16">
        <div className="container">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border bg-white/90 shadow-xl ring-1 ring-black/5 sm:rounded-4xl">
            <div className="w-full">
              <Image
                src="/dashboard.png"
                alt="Uygulama ekranı"
                width={2880}
                height={1422}
                className="h-auto w-full"
                sizes="(min-width: 1280px) 1152px, (min-width: 768px) 90vw, 100vw"
              />
            </div>
          </div>
            <AppStore />
        </div>
      </section>
    </div>
  );
};

export { Hero };
