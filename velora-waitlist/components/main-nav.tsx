"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"

const landingUrl =
  process.env.NEXT_PUBLIC_LANDING_URL || "http://localhost:3000"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const logoSrc =
    mounted && resolvedTheme === "light" ? "/Velora.png" : "/Velora_white.png"

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href={landingUrl} className="flex items-center space-x-2">
        <Image src={logoSrc} alt="Logo" width={100} height={100} />
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "font-sans flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
