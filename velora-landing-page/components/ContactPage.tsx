"use client";

import { type FormEvent, useState } from "react";
import { Headset, Clock3, ShieldCheck, type LucideIcon } from "lucide-react";

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

const features: { icon: LucideIcon; title: string; description: string }[] = [
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
  }
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
        className="pointer-events-none absolute inset-x-0 -top-20 bottom-0 [background:radial-gradient(130%_120%_at_85%_70%,rgba(99,51,238,0.18),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-20 bottom-0 [background:radial-gradient(110%_110%_at_20%_25%,rgba(141,88,255,0.16),transparent_52%)]"
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
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 rounded-xl border border-gray-200 bg-white/80 p-3 shadow-[0_12px_50px_-40px_rgba(99,51,238,0.55)] transition hover:border-primary/30 hover:shadow-[0_16px_60px_-35px_rgba(99,51,238,0.6)]"
              >
                <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
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
