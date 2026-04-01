"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const waitlistUrl =
  process.env.NEXT_PUBLIC_WAITLIST_URL || "http://localhost:3001";

interface ProductSectionProps {
  className?: string;
}

const ProductSection = ({ className }: ProductSectionProps) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const windowHeight = window.innerHeight;
      const scrollProgress = (windowHeight - sectionTop) / windowHeight;
      const next = Math.min(60, Math.max(-40, (scrollProgress - 0.5) * 100));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrollOffset(next));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn("py-28 dark:bg-slate-950", className)}
    >
      <div className="container grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col gap-6 lg:pr-10">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-black/5 backdrop-blur dark:bg-white/5 dark:text-slate-100">
            Velora  
          </span>
          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Telefonunuzdan <span className="bg-gradient-to-r from-pink-600 via-purple-500 to-pink-400 inline-block text-transparent bg-clip-text">salonunuzu</span> yönetin.
          </h2>
           <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700 dark:text-slate-100/80">
            <span className="rounded-full bg-white/80 px-3 py-1 ring-1 ring-black/5 backdrop-blur dark:bg-white/10">
              Hızlı randevu ekle
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1 ring-1 ring-black/5 backdrop-blur dark:bg-white/10">
              Canlı gelir görünümü
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1 ring-1 ring-black/5 backdrop-blur dark:bg-white/10">
              Müşteri analizi
            </span>
          </div>
          <ul className="space-y-2 text-left text-sm text-slate-700 dark:text-slate-200">
            <li className="flex items-start">
              <svg className="mr-2 mt-1 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fillRule="evenodd" d="M28.04 8.293a1 1 0 0 1 0 1.414l-14 14a1 1 0 0 1-1.414 0l-7-7a1 1 0 1 1 1.414-1.414l6.293 6.293L26.626 8.293a1 1 0 0 1 1.415 0" clipRule="evenodd"></path></svg>
              <span><strong>Gerçek zamanlı randevu durumu</strong> ile boşlukları anında görün, müşteriye saniyeler içinde dönüş yapın.</span>
            </li>
            <li className="flex items-start">
              <svg className="mr-2 mt-1 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fillRule="evenodd" d="M28.04 8.293a1 1 0 0 1 0 1.414l-14 14a1 1 0 0 1-1.414 0l-7-7a1 1 0 1 1 1.414-1.414l6.293 6.293L26.626 8.293a1 1 0 0 1 1.415 0" clipRule="evenodd"></path></svg>
              <span><strong>Günlük ciro ve komisyon takibi</strong> ile gelir gider tablonuz 7/24 cebinizde dursun.</span>
            </li>
            <li className="flex items-start">
              <svg className="mr-2 mt-1 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fillRule="evenodd" d="M28.04 8.293a1 1 0 0 1 0 1.414l-14 14a1 1 0 0 1-1.414 0l-7-7a1 1 0 1 1 1.414-1.414l6.293 6.293L26.626 8.293a1 1 0 0 1 1.415 0" clipRule="evenodd"></path></svg>
              <span><strong>Otomatik hatırlatma ve onay mesajları</strong> ile randevu iptal oranını düşürün.</span>
            </li>
          </ul>
            <Link href={waitlistUrl}>
             <Button>
               Demo talep et
             </Button>
            </Link>
        </div>

        <div className="relative flex min-h-[420px] items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/15 via-white/30 to-indigo-100 blur-3xl dark:from-primary/10 dark:via-slate-900 dark:to-slate-900" />

          <div className="relative flex items-center gap-6">
            <div className="relative w-[200px] aspect-[778/1422] overflow-hidden rounded-[36px] border-2 border-white/80 bg-white shadow-2xl ring-2 ring-primary/20 backdrop-blur dark:border-white/20 dark:bg-slate-900"
            style={{
                transform: `translateY(${scrollOffset}px)`,
                transition: "transform 160ms ease-out",
                willChange: "transform",
              }}>
              <Image
                src="/calendar_mobile.png"
                alt="Salon uygulaması panel"
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 200px, 45vw"
                priority
              />
            </div>
            <div
              className="relative w-[180px] aspect-[778/1422] overflow-hidden rounded-[32px] border-2 border-white/80 bg-white shadow-2xl ring-2 ring-primary/20 backdrop-blur dark:border-white/20 dark:bg-slate-900"
            >
              <Image
                src="/product_detail_mobile.png"
                alt="Salon uygulaması mobil panel"
                fill
                className="object-cover object-top"
                sizes="(min-width: 1024px) 180px, 40vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ProductSection };
