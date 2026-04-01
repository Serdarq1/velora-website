import {
  Inter,
  JetBrains_Mono as FontMono,
  Plus_Jakarta_Sans,
} from "next/font/google"

export const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
