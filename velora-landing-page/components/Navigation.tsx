"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { getWaitlistUrl } from "@/lib/waitlist-url";
import Link from "next/link";
import Image from "next/image";

const waitlistUrl = getWaitlistUrl();

const navItems = [
  { href: "/about", label: "Hakkımızda" },
  { href: "/pricing/", label: "Fiyatlandırma" },
  { href: "/faq", label: "Sıkça Sorulan Sorular" },
  { href: "/contact", label: "İletişim" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav className="relative z-30 w-full">
      <div className="navbar-ambient relative hidden w-full items-center justify-between gap-3 lg:flex">
        <div className="flex shrink-0 items-center gap-2 font-semibold tracking-tight">
          <Link href="/">
            <Image
              alt="velora-logo"
              src="/Velora.png"
              height={80}
              width={80}
              className="h-16 w-16"
            />
          </Link>
        </div>

        <NavigationMenu className="flex-1 justify-center">
          <NavigationMenuList className="flex w-full flex-wrap items-center justify-center gap-2">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  className="cursor-pointer rounded-md px-4 py-2 text-center text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
                  href={item.href}
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex shrink-0 items-center gap-2">
          <Link href={waitlistUrl}>
            <Button variant="ghost" size="sm" className="cursor-pointer">
              Giriş Yap
            </Button>
          </Link>
          <Link href={waitlistUrl}>
            <Button size="sm" className="cursor-pointer">
              Kayıt Ol
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex w-full items-center justify-between px-1 py-2 lg:hidden">
        <Link href="/" className="flex items-center justify-start">
          <Image
            alt="velora-logo"
            src="/Velora.png"
            height={80}
            width={80}
            className="h-14 w-14"
          />
        </Link>

        <button
          type="button"
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center text-slate-900 transition"
        >
          <span className="relative h-5 w-5">
            <Menu
              className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                isOpen ? "scale-75 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
              }`}
            />
            <X
              className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                isOpen ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-90 opacity-0"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <div
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-slate-950/30 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute inset-0 flex min-h-screen flex-col bg-[radial-gradient(circle_at_top,#ffffff_0%,#f5f1ff_38%,#ede8ff_100%)] px-6 pb-10 pt-5 text-slate-950 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                alt="velora-logo"
                src="/Velora.png"
                height={88}
                width={88}
                className="h-14 w-14"
              />
            </Link>

            <button
              type="button"
              aria-label="Menüyü kapat"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center text-slate-900 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center">
            <div className="space-y-3">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-1 py-3 text-2xl font-semibold tracking-tight text-slate-950 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: isOpen ? `${120 + index * 60}ms` : "0ms" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div
            className={`space-y-3 transition-all duration-500 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "320ms" : "0ms" }}
          >
            <Link href={waitlistUrl} onClick={() => setIsOpen(false)} className="block">
              <Button
                size="lg"
                className="h-12 w-full rounded-full text-base font-semibold shadow-none"
              >
                Kayıt Ol
              </Button>
            </Link>
            <Link href={waitlistUrl} onClick={() => setIsOpen(false)} className="block">
              <Button
                variant="ghost"
                size="lg"
                className="h-12 w-full rounded-full text-base font-semibold text-slate-900 shadow-none"
              >
                Giriş Yap
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
