import { Star } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import Navigation from "@/components/Navigation";

const waitlistUrl =
  process.env.NEXT_PUBLIC_WAITLIST_URL || "http://localhost:3001";

interface Hero {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
    className?: string;
  };
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
  className?: string;
}

const Hero = ({
  heading = "Güzellik salonları için yeni nesil yönetim uygulaması.",
  description = "A'dan Z'ye salon yönetiminiz için gerekli her özelliği içeren yeni nesil yönetim uygulaması ile tüm belgelerinizi tek yerde toplayın, zamandan kazanın ve cironuzu arttırın.  ",
  button = {
    text: "Detayları Gör",
    url: waitlistUrl,
  },
  reviews = {
    count: 200,
    rating: 5.0,
    avatars: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
        alt: "Avatar 1",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
        alt: "Avatar 2",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
        alt: "Avatar 3",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
        alt: "Avatar 4",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
        alt: "Avatar 5",
      },
    ],
  },
  className,
}: Hero) => {
  return (
    <div>
      <div className="p-3">
        <Navigation />
      </div>
      <div
        className="pointer-events-none absolute inset-0 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"
        aria-hidden="true"
      />

      <section className={cn("relative z-10 pb-24 pt-20 sm:pt-28", className)}>
        <div className="container text-center">
          <div className="mx-auto flex max-w-5xl flex-col gap-6">
            <h1 className="text-3xl font-semibold lg:text-6xl">{heading}</h1>
            <p className="text-balance text-muted-foreground lg:text-lg">
              {description}
            </p>
          </div>
          <Button asChild size="lg" className="mt-10">
            <a href={button.url}>{button.text}</a>
          </Button>
        </div>
      </section>

      <section className="relative z-10 -mt-12 pb-24 sm:-mt-16">
        <div className="container">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-4xl border bg-white/90 shadow-xl ring-1 ring-black/5">
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
        </div>
      </section>
    </div>
  );
};

export { Hero };
