import { cn } from "@/lib/utils";
import Image from "next/image";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  className?: string;
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = ({
  className,
  tagline = "Tüm salonunuzu tek bir panelden kolaylıkla yönetin.",
  menuItems = [
    {
      title: "Destek",
      links: [
        { text: "SSS", url: "faq" },
        // { text: "Yardım Merkezi", url: "" },
        { text: "Destek ekibi", url: "contact" },
      ],
    },
  ],
  copyright = "© 2026 Velora. Tüm hakları saklıdır.",
  bottomLinks = [
    { text: "KVKK & Gizlilik", url: "/legal/kvkk" },
    { text: "Kullanım Şartları", url: "/legal/kullanim-kosullari" },
    { text: "Mesafeli Satış Sözleşmesi", url: "/legal/mesafeli-satis-sozlesmesi" },
    { text: "İade / İptal Politikası", url: "/legal/iade-iptal-politikasi" },
  ],
}: FooterProps) => {
  return (
    <section
      className={cn(
        "bg-stone-900 py-60 text-primary-foreground md:py-24",
        className
      )}
    >
      <div className="container">
        <footer className="space-y-12">
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-5">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 lg:justify-start">
                <Image src="/Velora_white.png" alt="Velora logo" width={85} height={85} />
              </div>
              <p className="max-w-md text-sm text-white/85">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx} className="space-y-4">
                <h3 className="text-base font-semibold text-white">
                  {section.title}
                </h3>
                <ul className="space-y-3 text-sm text-white/70">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium transition hover:text-white"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-between gap-4 border-t border-white/15 pt-8 text-sm font-medium text-white/70 md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex flex-wrap gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li
                  key={linkIdx}
                  className="underline underline-offset-2 transition hover:text-white"
                >
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };
