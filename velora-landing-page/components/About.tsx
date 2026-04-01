"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface AboutProps {
  className?: string;
  containerClassName?: string;
  achievementsFullBleed?: boolean;
  title: string;
  description?: string;
  story?: string;
  mainImage: {
    src: string;
    alt: string;
  };
  breakout: {
    src?: string;
    alt?: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{
    src: string;
    alt: string;
  }> | null;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
}>;
}

const AchievementCounter = ({ value }: { value: string }) => {
  const match = value.match(/(\d+)/);
  const target = match ? parseInt(match[1], 10) : 0;
  const prefix = match ? value.slice(0, match.index ?? 0) : "";
  const suffix = match
    ? value.slice((match.index ?? 0) + match[1].length)
    : "";
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!target) {
      setCount(0);
      return;
    }
    let frame: number;
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.round(target * progress);
      setCount(current);
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  if (!target) {
    return <span className="text-4xl font-semibold md:text-5xl">{value}</span>;
  }

  return (
    <span className="text-4xl font-semibold md:text-5xl">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const About = ({ className, containerClassName, achievementsFullBleed, ...props }: AboutProps) => {
  const {
    title,
    description,
    story,
    mainImage,
    breakout,
    companiesTitle,
    companies,
    achievementsTitle,
    achievementsDescription,
    achievements,
  } = { ...defaultProps, ...props };
  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="mb-12 max-w-4xl">
          <p className="text-lg leading-8 text-muted-foreground md:text-xl">
            {story}
          </p>
        </div>
        <div className="grid gap-7 lg:grid-cols-3">
          <img
            src={mainImage.src}
            alt={mainImage.alt}
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto h-103">
              <div>
                <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                <p className="text-muted-foreground">{breakout.description}</p>
              </div>
              <Button variant="outline" className="mr-auto" asChild>
                <a href={breakout.buttonUrl} target="_blank">
                  {breakout.buttonText}
                </a>
              </Button>
            </div>
          </div>
        </div>
        {companies && (
          <div className="py-32">
            <p className="text-center">{companiesTitle} </p>
            <div className="mt-8 flex flex-wrap justify-center gap-8">
              {companies.map((company, idx) => (
                <div
                  className="flex items-center gap-3"
                  key={company.src + idx}
                >
                  <img
                    src={company.src}
                    alt={company.alt}
                    className="h-6 w-auto md:h-8 dark:invert"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div
          className={cn(
            "relative overflow-hidden bg-muted mt-16",
            achievementsFullBleed
              ? "left-1/2 right-1/2 w-screen -translate-x-1/2 rounded-none"
              : "rounded-xl",
          )}
        >
          <div className={cn(achievementsFullBleed ? "mx-auto w-full max-w-7xl px-4 py-7 md:px-6 md:py-16 lg:px-8" : "p-7 md:p-16")}>
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-3xl font-semibold md:text-4xl">
                {achievementsTitle}
              </h2>
              <p className="max-w-xl text-muted-foreground">
                {achievementsDescription}
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 text-center lg:grid-cols-4">
              {achievements.map((item, idx) => (
                <div className="flex flex-col gap-2" key={item.label + idx}>
                  <AchievementCounter value={item.value} />
                  <p className="text-sm md:text-base">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About };

const defaultProps = {
  title: "Salon Uygulama hakkında",
  story:
    "Velora, salonunuzun yönetimi için A'dan Z'ye yeni nesil dönüşümler sunmak için çıktı. Modern arayüzü ve kolay kullanımı ile işlerinizi kolaylaştıracak ve kazançlarınızı artıracak çözümler geliştiriyoruz.",
  mainImage: {
    src: "/dashboard.png",
    alt: "Salon Uygulama yönetim paneli",
  },
  companiesTitle: "Salonlar bize güveniyor",
  companies: null,
  achievementsTitle: "Velora'nın başarıları",
  achievementsDescription:
    "Gerçek zamanlı randevu, stok ve gelir takibiyle ekip verimliliğini artırın. İptalleri azaltıp müşteri memnuniyetini yükseltin.",
  achievements: [
    { label: "Yönetilen randevu", value: "1K+" },
    { label: "İptal/No-show azaltma", value: "%95" },
    { label: "Aktif salon", value: "35+" },
    { label: "Destek", value: "7/24" },
  ],
};
