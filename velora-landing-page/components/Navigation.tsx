import React from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";

const waitlistUrl =
  process.env.NEXT_PUBLIC_WAITLIST_URL || "http://localhost:3001";

const Navigation = () => {
  return (
    <nav className="relative z-20 w-full">
      <div className="navbar-ambient relative flex w-full flex-col items-stretch gap-4 rounded-2xl px-4 py-3 sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:rounded-none">
        <div className="flex shrink-0 items-center justify-center gap-2 font-semibold tracking-tight sm:gap-3 lg:justify-start">
         <Link href={"/"} >
          <Image alt="velora-logo" src="/Velora.png" height={80} width={80} className="h-14 w-14 sm:h-16 sm:w-16" /></Link>
        </div>

        <NavigationMenu className="w-full max-w-full justify-center px-1 lg:flex-1 lg:px-0">
          <NavigationMenuList className="flex w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink
                className="cursor-pointer rounded-md px-3 py-2 text-center text-sm font-medium transition hover:bg-accent hover:text-accent-foreground sm:px-4"
                href={"/about"}
              >
                Hakkımızda
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="cursor-pointer rounded-md px-3 py-2 text-center text-sm font-medium transition hover:bg-accent hover:text-accent-foreground sm:px-4"
                href={"/pricing/"}
              >
                Fiyatlandırma
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className="cursor-pointer rounded-md px-3 py-2 text-center text-sm font-medium transition hover:bg-accent hover:text-accent-foreground sm:px-4"
                href="faq"
              >
                Sıkça Sorulan Sorular
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className="cursor-pointer rounded-md px-3 py-2 text-center text-sm font-medium transition hover:bg-accent hover:text-accent-foreground sm:px-4"
                href={"/contact"}
              >
                İletişim
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex w-full shrink-0 flex-col items-stretch gap-2 px-1 sm:flex-row sm:items-center sm:px-0 lg:w-auto">
          <Link href={waitlistUrl}> 
            <Button variant="ghost" size="sm" className="hidden cursor-pointer sm:inline-flex">
              Giriş Yap
            </Button>
          </Link>
          <Link href={waitlistUrl} className="w-full sm:w-auto">
            <Button size="sm" className="w-full cursor-pointer sm:w-auto">
              Kayıt Ol
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
