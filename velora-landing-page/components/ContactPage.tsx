"use client";

import { type FormEvent, useState } from "react";
import { Headset, Clock3, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M19.05 4.94A9.87 9.87 0 0 0 12.02 2C6.5 2 2 6.48 2 12c0 1.77.46 3.5 1.35 5.02L2 22l5.12-1.32A9.95 9.95 0 0 0 12.02 22C17.53 22 22 17.52 22 12a9.9 9.9 0 0 0-2.95-7.06Zm-7.03 15.38a8.3 8.3 0 0 1-4.22-1.15l-.3-.18-3.04.78.81-2.96-.2-.31A8.27 8.27 0 0 1 3.7 12a8.33 8.33 0 0 1 8.32-8.32 8.27 8.27 0 0 1 5.89 2.44A8.24 8.24 0 0 1 20.34 12a8.33 8.33 0 0 1-8.32 8.32Zm4.57-6.24c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.57.12-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.25-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.5.12-.12.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.37-.78-1.88-.21-.5-.42-.43-.57-.44h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09 0 1.23.9 2.42 1.02 2.58.13.17 1.76 2.69 4.27 3.77.6.26 1.07.42 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29Z" />
  </svg>
);

type Feature = {
  icon: LucideIcon | typeof WhatsAppIcon;
  title: string;
  description: string;
  href?: string;
  ctaLabel?: string;
  cardClassName?: string;
  iconWrapClassName?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  ctaClassName?: string;
};

const whatsappNumber = "+90 850 840 17 62";
const whatsappUrl = "https://wa.me/908508401762";

const features: Feature[] = [
  {
    icon: Headset,
    title: "7/24 destek",
    description:
      "7/24 aktif desteğimiz ile yaşadığınız tüm sorunlara hızlıca çözüm üretiyoruz.",
  },
  {
    icon: Clock3,
    title: "Hızlı çözüm akışı",
    description:
      "Önceliğinizi belirtin, size en uygun kanaldan hızlıca geri dönüş yapalım.",
  },
  {
    icon: WhatsAppIcon,
    title: "WhatsApp destek hattı",
    description:
      "WhatsApp üzerinden bizimle iletişime geçin, en kısa şekilde sorununuzu çözelim.",
    href: whatsappUrl,
    ctaLabel: whatsappNumber,
    cardClassName:
      "border-emerald-200 bg-[linear-gradient(135deg,rgba(16,185,129,0.16),rgba(255,255,255,0.96))] hover:border-emerald-400 hover:shadow-[0_20px_65px_-38px_rgba(16,185,129,0.7)]",
    iconWrapClassName: "text-emerald-700",
    iconClassName: "h-5 w-5",
    titleClassName: "text-emerald-950",
    descriptionClassName: "text-emerald-900/80",
    ctaClassName: "text-emerald-700 hover:text-emerald-800",
  },
];

const topics = [
  "Hesap ve giriş",
  "Ödeme / faturalandırma",
  "Rezervasyon desteği",
  "Teknik sorun",
  "Özellik talebi",
  "Diğer",
];

const priorities = [
  "Acil (sistem çalışmıyor)",
  "Yüksek (iş akışı etkileniyor)",
  "Orta (bilgi / öneri)",
  "Düşük (genel soru)",
];

type FormState = {
  name: string;
  email: string;
  company: string;
  topic: string;
  priority: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  company: "",
  topic: "",
  priority: "",
  message: "",
};

const ContactPage = () => {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Mesaj gönderilemedi.");
      }

      setSubmitState({
        type: "success",
        message:
          data.message || "Talebiniz alındı. En kısa sürede size dönüş yapacağız.",
      });
      setForm(initialFormState);
    } catch (error) {
      setSubmitState({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative isolate overflow-x-clip px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-20 bottom-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-20 bottom-0"
      />
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(440px,520px)] lg:gap-12">
        <section className="mx-auto w-full max-w-2xl space-y-8 lg:mx-0 lg:max-w-xl">
          <div className="space-y-4">
            <p className="text-4xl font-bold tracking-tight sm:text-5xl">
              Destek ekibimizle iletişime geçin
            </p>
            <p className="text-lg text-muted-foreground">
              Sorularınız veya yaşadığınız sorunlar için bilgilerinizi bırakın,
              size en kısa sürede dönüş yapalım.
            </p>
          </div>

          <div className="space-y-5">
            {features.map((feature) => {
              const content = (
                <div
                  className={`flex gap-4 rounded-xl border border-gray-200 bg-white/80 p-3 shadow-[0_12px_50px_-40px_rgba(99,51,238,0.55)] transition hover:border-primary/30 hover:shadow-[0_16px_60px_-35px_rgba(99,51,238,0.6)] ${feature.cardClassName ?? ""}`}
                >
                  <div
                    className={`mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary ${feature.iconWrapClassName ?? ""}`}
                  >
                    <feature.icon className={feature.iconClassName ?? "h-5 w-5"} />
                  </div>
                  <div className="space-y-1">
                    <h3 className={`text-lg font-semibold ${feature.titleClassName ?? ""}`}>
                      {feature.title}
                    </h3>
                    <p
                      className={`text-sm text-muted-foreground sm:text-base ${feature.descriptionClassName ?? ""}`}
                    >
                      {feature.description}
                    </p>
                    {feature.ctaLabel ? (
                      <p
                        className={`inline-flex items-center gap-2 pt-2 text-sm font-medium transition ${feature.ctaClassName ?? "text-primary hover:text-primary/80"}`}
                      >
                        <span>{feature.ctaLabel}</span>
                      </p>
                    ) : null}
                  </div>
                </div>
              );

              if (feature.href) {
                return (
                  <Link
                    key={feature.title}
                    href={feature.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2"
                  >
                    {content}
                  </Link>
                );
              }

              return <div key={feature.title}>{content}</div>;
            })}
          </div>
        </section>

        <Card
          id="contact"
          className="mx-auto w-full max-w-2xl rounded-2xl border-none bg-white/90 shadow-[0_24px_90px_-55px_rgba(99,51,238,0.7)] backdrop-blur lg:mx-0"
        >
          <CardContent className="p-6 sm:p-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-foreground" htmlFor="name">
                  Adınız
                </label>
                <Input
                  id="name"
                  placeholder="Adınızı girin"
                  required
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-foreground" htmlFor="email">
                  E-posta
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@gmail.com"
                  required
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, email: event.target.value }))
                  }
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-foreground" htmlFor="company">
                    Şirket / Salon adı
                  </label>
                  <Input
                    id="company"
                    placeholder="Firma adınız"
                    required
                    value={form.company}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        company: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-foreground">
                    Destek konusu
                  </label>
                  <Select
                    value={form.topic}
                    onValueChange={(value) =>
                      setForm((current) => ({ ...current, topic: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Bir seçenek seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-foreground">
                  Talep önceliği
                </label>
                <Select
                  value={form.priority}
                  onValueChange={(value) =>
                    setForm((current) => ({ ...current, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Önceliğinizi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-foreground" htmlFor="message">
                  Mesajınız
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="İhtiyacınızı veya yaşadığınız sorunu kısaca paylaşın."
                  className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex min-h-32 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px]"
                  value={form.message}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                />
              </div>

              {submitState.type ? (
                <div
                  aria-live="polite"
                  className={`rounded-md px-3 py-2 text-sm ${
                    submitState.type === "success"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {submitState.message}
                </div>
              ) : null}

              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  !form.topic ||
                  !form.priority ||
                  !form.email
                }
                className="mt-2 h-12 w-full cursor-pointer rounded-lg text-base font-semibold"
              >
                {isSubmitting ? "Gönderiliyor..." : "Destek talebi gönder"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactPage;
