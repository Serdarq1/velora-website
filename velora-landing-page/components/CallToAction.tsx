import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const appSignUpURL = "https://dashboard.veloraappy.com/sign-up" 

interface CallToActionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

const CallToAction = ({
  title = "Ne bekliyorsunuz?",
  subtitle = "Salonunuza özel destek alın ve bugün büyümeye başlayın.",
  buttonText = "Hemen başlayın",
  buttonHref = appSignUpURL,
  className,
}: CallToActionProps) => {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden px-5 py-16 text-white sm:px-10 sm:py-24",
        "bg-[radial-gradient(circle_at_20%_20%,#ff9be0_0%,#d66bff_26%,#9f60ff_52%,#6a63ff_74%,#4b3fff_100%)]",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(90%_100%_at_85%_30%,rgba(255,255,255,0.2),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_120%_at_50%_80%,rgba(0,0,0,0.08),transparent_60%)]"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 text-center sm:gap-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-white/90">
          {subtitle}
        </p>
        <Button
          asChild
          size="lg"
          className="mt-2 min-h-12 w-full max-w-xs rounded-full bg-white px-6 py-6 text-base font-semibold text-foreground shadow-lg transition hover:translate-y-0.5 hover:bg-white sm:w-auto sm:px-8 sm:text-lg"
        >
          <Link href={buttonHref} className="inline-flex items-center gap-2">
            {buttonText}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export { CallToAction };
