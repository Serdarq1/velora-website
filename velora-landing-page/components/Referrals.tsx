import { cn } from "@/lib/utils";

interface Logo {
  name: string;
  logo: string;
  className: string;
}

interface ReferralsProps {
  title?: string;
  subtitle?: string;
  logos?: Logo[];
  className?: string;
}

const Referrals = ({
  title = "Referanslar",
  subtitle = "Memnuniyetle bizi seçen işletmeler",
  logos = [
    {
      name: "Shining Brows",
      logo: "subscriber_logos/shiningbrows.jpg",
      className: "h-20 w-auto",
    },
    {
      name: "Ceren Ayhan Beauty",
      logo: "subscriber_logos/cerenayhanbeauty.jpg",
      className: "h-20 w-auto",
    },
    {
      name: "Eylül Güzellik",
      logo: "subscriber_logos/eylulguzellik.jpg",
      className: "h-20 w-auto",
    },
    {
      name: "Gamze Güven Nail Studio",
      logo: "subscriber_logos/gg.jpg",
      className: "h-20 w-auto",
    },
    {
      name: "Reci",
      logo: "subscriber_logos/Reci.jpg",
      className: "h-20 w-auto",
    },
  ],
  className,
}: ReferralsProps) => {
  const marqueeLogos = [...logos, ...logos];

  return (
    <section className={cn("py-32 bg-[oklch(0.965_0.02_270)]", className)}>
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-1 text-muted-foreground">{subtitle}</p>
          <div className="mt-10 w-full overflow-hidden">
            <div className="relative flex w-full items-center">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16" />

              <div className="relative overflow-hidden">
                <div className="flex w-max animate-logo-marquee items-center gap-12">
                  {marqueeLogos.map((logo, index) => (
                    <img
                      key={`first-${logo.name}-${index}`}
                      src={logo.logo}
                      alt={`${logo.name} logo`}
                      width={120}
                      height={52}
                      className={cn("opacity-80 transition hover:opacity-100", logo.className)}
                    />
                  ))}
                  {marqueeLogos.map((logo, index) => (
                    <img
                      key={`second-${logo.name}-${index}`}
                      src={logo.logo}
                      alt={`${logo.name} logo`}
                      width={120}
                      height={52}
                      className={cn("opacity-80 transition hover:opacity-100", logo.className)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Referrals };
