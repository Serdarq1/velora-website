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
      <div className="navbar-ambient relative flex w-full flex-wrap items-center justify-between gap-3 rounded-none px-2 py-3 sm:px-4">
        <div className="flex items-center gap-2 font-semibold tracking-tight sm:gap-3 shrink-0 pl-1">
         <Link href={"/"} >
          <Image alt="velora-logo" src="/Velora.png" height={80} width={80} /></Link>
        </div>

        <NavigationMenu className="flex-1 justify-center">
          <NavigationMenuList className="flex w-full flex-wrap items-center justify-center gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink
                className="rounded-md px-3 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground sm:px-4 cursor-pointer"
                href={"/about"}
              >
                Hakkımızda
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="rounded-md px-3 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground sm:px-4 cursor-pointer"
                href={"/pricing/"}
              >
                Fiyatlandırma
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className="rounded-md px-3 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground sm:px-4 cursor-pointer"
                href="faq"
              >
                Sıkça Sorulan Sorular
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className="rounded-md px-3 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground sm:px-4 cursor-pointer"
                href={"/contact"}
              >
                İletişim
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex shrink-0 items-center gap-2">
          <Link href={waitlistUrl}> 
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex cursor-pointer">
              Giriş Yap
            </Button>
          </Link>
          <Link href={waitlistUrl}>
            <Button size="sm" className="w-full sm:w-auto cursor-pointer">
              Kayıt Ol
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
