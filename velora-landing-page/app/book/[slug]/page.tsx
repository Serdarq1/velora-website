"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  LoaderCircle,
  MoveLeft,
  MoveRight,
  Scissors,
  User,
} from "lucide-react";

import ServicesCard from "@/components/book/ServicesCard";

type Salon = {
  id: string;
  name: string;
  slug: string;
  booking_timezone: string;
  booking_enabled: boolean;
  is_open: boolean;
  accepts_bookings: boolean;
};

type Service = {
  id: string;
  service_name: string;
  duration_min: number | null;
  price: number | null;
  currency: string | null;
  description: string | null;
  category: string | null;
  color: string | null;
  is_active: boolean;
};

type AvailabilitySlot = {
  start_at: string;
  end_at: string;
  staff_ids: string[];
};

type AvailabilityResponse = {
  salon_id: string;
  slug: string;
  service_ids: string[];
  date: string;
  timezone: string;
  duration_min: number;
  slots: AvailabilitySlot[];
};

type AvailabilityDatesResponse = {
  salon_id: string;
  slug: string;
  service_ids: string[];
  staff_id: string | null;
  timezone: string;
  start_date: string;
  days: number;
  dates: string[];
};

type PublicStaff = {
  id: string;
  name: string;
  job_title: string | null;
  color: string | null;
  image_url: string | null;
};

type BookingResult = {
  appointment_id: string;
  salon_id: string;
  service_ids: string[];
  staff_id: string;
  client_id: string;
  start_at: string;
  end_at: string;
  status: string;
};

type FormData = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  staffId: string;
  date: string;
  hour: string;
  services: string[];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const getLocalIsoDate = (value: Date) => {
  const local = new Date(value.getTime() - value.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

const formatDateLabel = (value: string) =>
  new Intl.DateTimeFormat("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${value}T00:00:00`));

const formatHour = (value: string, timeZone: string) =>
  new Intl.DateTimeFormat("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(new Date(value));

const formatPrice = (amount: number, currency: string) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

const stepItems = [
  { id: 1, icon: Scissors, label: "Hizmet" },
  { id: 2, icon: Calendar, label: "Tarih" },
  { id: 3, icon: User, label: "Bilgiler" },
] as const;

export default function BookingPage() {
  const params = useParams<{ slug: string }>();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const [step, setStep] = useState(1);
  const [salon, setSalon] = useState<Salon | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    email: "",
    phone: "",
    staffId: "",
    date: "",
    hour: "",
    services: [],
  });
  const [pageState, setPageState] = useState<"loading" | "ready" | "error" | "disabled">("loading");
  const [availabilityState, setAvailabilityState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [pageError, setPageError] = useState("");
  const [availabilityError, setAvailabilityError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [staffOptions, setStaffOptions] = useState<PublicStaff[]>([]);
  const [staffState, setStaffState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [staffError, setStaffError] = useState("");
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [dateState, setDateState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [dateError, setDateError] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const categoriesScrollRef = useRef<HTMLDivElement | null>(null);
  const categorySectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const categoryButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const categoryScrollIntentRef = useRef(false);

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();

    const loadData = async () => {
      setPageState("loading");
      setPageError("");

      try {
        const salonResponse = await fetch(`${API_BASE_URL}/api/public/salons/${slug}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!salonResponse.ok) {
          const errorBody = await salonResponse.json().catch(() => null);
          throw new Error(errorBody?.detail?.message || "Salon bilgileri alınamadı.");
        }

        const salonData: Salon = await salonResponse.json();

        if (!salonData.booking_enabled) {
          setSalon(salonData);
          setServices([]);
          setPageState("disabled");
          return;
        }

        const servicesResponse = await fetch(`${API_BASE_URL}/api/public/salons/${slug}/services`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!servicesResponse.ok) {
          const errorBody = await servicesResponse.json().catch(() => null);
          throw new Error(errorBody?.detail?.message || "Hizmetler alınamadı.");
        }

        const servicesData: Service[] = await servicesResponse.json();
        setSalon(salonData);
        setServices(servicesData);
        setFormData((current) => ({
          ...current,
          services: current.services.length ? current.services : servicesData[0]?.id ? [servicesData[0].id] : [],
        }));
        setPageState("ready");
      } catch (error) {
        if ((error as { name?: string }).name === "AbortError") return;
        setPageError(error instanceof Error ? error.message : "Sayfa yüklenemedi.");
        setPageState("error");
      }
    };

    void loadData();

    return () => controller.abort();
  }, [slug]);

  useEffect(() => {
    if (!slug || !formData.services.length) {
      setStaffOptions([]);
      setStaffState("idle");
      setStaffError("");
      return;
    }

    const controller = new AbortController();

    const loadStaff = async () => {
      setStaffState("loading");
      setStaffError("");
      setStaffOptions([]);
      setAvailableDates([]);
      setDateState("idle");
      setDateError("");
      setAvailability(null);
      setAvailabilityState("idle");
      setAvailabilityError("");
      setSelectedSlot(null);
      setFormData((current) => ({
        ...current,
        staffId: "",
        date: "",
        hour: "",
      }));

      try {
        const query = new URLSearchParams({ service_ids: formData.services.join(",") });
        const response = await fetch(`${API_BASE_URL}/api/public/salons/${slug}/staff?${query.toString()}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => null);
          throw new Error(errorBody?.detail?.message || "Personeller alınamadı.");
        }

        const payload: PublicStaff[] = await response.json();
        setStaffOptions(payload);
        setStaffState("ready");
      } catch (error) {
        if ((error as { name?: string }).name === "AbortError") return;
        setStaffState("error");
        setStaffError(error instanceof Error ? error.message : "Personeller alınamadı.");
      }
    };

    void loadStaff();

    return () => controller.abort();
  }, [formData.services, slug]);

  useEffect(() => {
    if (!slug || !formData.services.length || !formData.staffId) {
      setAvailableDates([]);
      setDateState("idle");
      setDateError("");
      setAvailability(null);
      setAvailabilityState("idle");
      setAvailabilityError("");
      setSelectedSlot(null);
      setFormData((current) => ({ ...current, date: "", hour: "" }));
      return;
    }

    const controller = new AbortController();

    const loadAvailableDates = async () => {
      setDateState("loading");
      setDateError("");
      setAvailableDates([]);
      setAvailability(null);
      setAvailabilityState("idle");
      setAvailabilityError("");
      setSelectedSlot(null);
      setFormData((current) => ({ ...current, date: "", hour: "" }));

      try {
        const query = new URLSearchParams({
          service_ids: formData.services.join(","),
          staff_id: formData.staffId,
          start_date: getLocalIsoDate(new Date()),
          days: "21",
        });
        const response = await fetch(`${API_BASE_URL}/api/public/salons/${slug}/availability/dates?${query.toString()}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => null);
          throw new Error(errorBody?.detail?.message || "Uygun tarihler alınamadı.");
        }

        const payload: AvailabilityDatesResponse = await response.json();
        setAvailableDates(payload.dates);
        setDateState("ready");
      } catch (error) {
        if ((error as { name?: string }).name === "AbortError") return;
        setDateState("error");
        setDateError(error instanceof Error ? error.message : "Uygun tarihler alınamadı.");
      }
    };

    void loadAvailableDates();

    return () => controller.abort();
  }, [formData.services, formData.staffId, slug]);

  useEffect(() => {
    if (!slug || !formData.services.length || !formData.staffId || !formData.date) {
      setAvailability(null);
      setSelectedSlot(null);
      setAvailabilityState("idle");
      setAvailabilityError("");
      setFormData((current) => ({ ...current, hour: "" }));
      return;
    }

    const controller = new AbortController();

    const loadAvailability = async () => {
      setAvailabilityState("loading");
      setAvailabilityError("");
      setSelectedSlot(null);
      setFormData((current) => ({ ...current, hour: "" }));

      try {
        const query = new URLSearchParams({
          service_ids: formData.services.join(","),
          staff_id: formData.staffId,
          date: formData.date,
        });
        const response = await fetch(`${API_BASE_URL}/api/public/salons/${slug}/availability?${query.toString()}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => null);
          throw new Error(errorBody?.detail?.message || "Müsait saatler alınamadı.");
        }

        const payload: AvailabilityResponse = await response.json();
        setAvailability(payload);
        setAvailabilityState("ready");
      } catch (error) {
        if ((error as { name?: string }).name === "AbortError") return;
        setAvailability(null);
        setAvailabilityState("error");
        setAvailabilityError(error instanceof Error ? error.message : "Müsait saatler alınamadı.");
      }
    };

    void loadAvailability();

    return () => controller.abort();
  }, [formData.date, formData.services, formData.staffId, slug]);

  const selectedServices = useMemo(
    () => services.filter((service) => formData.services.includes(service.id)),
    [formData.services, services],
  );
  const selectedStaff = staffOptions.find((staff) => staff.id === formData.staffId) ?? null;
  const totalSelectedDuration = selectedServices.reduce((sum, service) => sum + Number(service.duration_min ?? 0), 0);
  const totalSelectedPrice = selectedServices.reduce((sum, service) => sum + Number(service.price ?? 0), 0);
  const bookingCurrency =
    selectedServices.find((service) => typeof service.currency === "string" && service.currency.trim())?.currency?.trim() ||
    "TRY";
  const categories = Array.from(new Set(services.map((service) => service.category?.trim() || "Diğer")));
  const servicesByCategory = categories.map((category) => ({
    category,
    services: services.filter((service) => (service.category?.trim() || "Diğer") === category),
  }));

  useEffect(() => {
    if (!categories.length) {
      setActiveCategory("");
      return;
    }
    setActiveCategory((current) => (current && categories.includes(current) ? current : categories[0]));
  }, [categories]);

  useEffect(() => {
    if (step !== 1 || !categories.length) return;

    const sections = categories
      .map((category) => categorySectionRefs.current[category])
      .filter((section): section is HTMLDivElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (categoryScrollIntentRef.current) return;
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        const nextCategory = visibleEntries[0].target.getAttribute("data-category");
        if (nextCategory) setActiveCategory(nextCategory);
      },
      {
        rootMargin: "-120px 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories, step]);

  useEffect(() => {
    if (!activeCategory || !categoriesScrollRef.current) return;
    const container = categoriesScrollRef.current;
    const button = categoryButtonRefs.current[activeCategory];
    if (!button) return;

    container.scrollTo({
      left: Math.max(0, button.offsetLeft - container.clientWidth / 2 + button.clientWidth / 2),
      behavior: "smooth",
    });
  }, [activeCategory]);

  const canGoNext =
    step === 1
      ? Boolean(formData.services.length)
      : step === 2
        ? Boolean(formData.staffId && formData.date && selectedSlot)
        : Boolean(formData.name.trim() && formData.surname.trim() && formData.phone.trim());

  const updateForm = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const toggleService = (serviceId: string) => {
    updateForm(
      "services",
      formData.services.includes(serviceId)
        ? formData.services.filter((item) => item !== serviceId)
        : [...formData.services, serviceId],
    );
  };

  const scrollCategories = (direction: "left" | "right") => {
    if (!categoriesScrollRef.current) return;
    categoriesScrollRef.current.scrollBy({ left: direction === "left" ? -240 : 240, behavior: "smooth" });
  };

  const scrollToCategory = (category: string) => {
    const section = categorySectionRefs.current[category];
    if (!section) return;

    categoryScrollIntentRef.current = true;
    setActiveCategory(category);
    section.scrollIntoView({ behavior: "smooth", block: "start" });

    window.setTimeout(() => {
      categoryScrollIntentRef.current = false;
    }, 500);
  };

  const prevStep = () => {
    setStep((current) => Math.max(current - 1, 1));
  };

  const nextStep = async () => {
    if (step < 3) {
      if (!canGoNext) return;
      setStep((current) => Math.min(current + 1, 3));
      return;
    }

    if (!slug || !selectedServices.length || !selectedSlot || !formData.staffId) return;

    setSubmitState("submitting");
    setSubmitError("");
    setSuccessMessage("");
    setBookingResult(null);

    try {
      const clientName = `${formData.name.trim()} ${formData.surname.trim()}`.trim();
      const response = await fetch(`${API_BASE_URL}/api/public/salons/${slug}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_ids: formData.services,
          start_at: selectedSlot.start_at,
          staff_id: formData.staffId,
          client_name: clientName,
          client_phone: formData.phone.trim(),
          client_email: formData.email.trim() || null,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(
          errorBody?.detail?.message ||
            errorBody?.error?.message ||
            errorBody?.error ||
            "Randevu oluşturulamadı.",
        );
      }

      const payload: BookingResult = await response.json();
      setBookingResult(payload);
      setSuccessMessage(
        `Randevunuz oluşturuldu. Başlangıç saati ${formatHour(payload.start_at, salon?.booking_timezone ?? "Europe/Istanbul")}.`,
      );
      setSubmitState("success");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Randevu oluşturulamadı.");
      setSubmitState("error");
    }
  };

  if (pageState === "loading" || !slug) {
    return <div className="min-h-screen animate-pulse bg-zinc-50" />;
  }

  if (pageState === "error" || !salon) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
        <div className="max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">Velora Randevu</p>
          <h1 className="mt-4 text-3xl font-bold text-zinc-950">Bu sayfa açılamadı</h1>
          <p className="mt-4 text-zinc-600">{pageError || "Salon bulunamadı."}</p>
        </div>
      </div>
    );
  }

  if (pageState === "disabled") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6">
        <div className="max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">Velora Randevu</p>
          <h1 className="mt-4 text-3xl font-bold text-zinc-950">Online randevu kapalı</h1>
          <p className="mt-4 text-zinc-600">Bu salon şu anda online randevu kabul etmiyor.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col md:flex-row">
        <aside className="relative overflow-hidden bg-[#070b10] px-8 py-10 text-white md:w-2/5 md:px-12 md:py-12">
          <div className="relative z-10">
            <Image src="/Velora_white.png" width={96} height={28} alt="Velora" priority />
            <h1 className="mt-12 max-w-md text-4xl font-semibold leading-tight tracking-[-0.05em] md:text-5xl">
              {salon.name} için randevunuzu birkaç adımda oluşturun.
            </h1>
            <p className="mt-5 max-w-sm text-base leading-7 text-zinc-400">
              Hizmet seçin, uygun saati bulun ve bilgilerinizi bırakın. Geri kalanını sistem tamamlasın.
            </p>

            <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Özet</p>
              <div className="mt-4 space-y-3 text-sm text-zinc-300">
                <div className="flex items-center justify-between gap-4">
                  <span>Hizmet</span>
                  <span className="text-right font-medium text-white">
                    {selectedServices.length ? selectedServices.map((service) => service.service_name).join(", ") : "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Toplam süre</span>
                  <span className="font-medium text-white">{totalSelectedDuration ? `${totalSelectedDuration} dk` : "-"}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Toplam tutar</span>
                  <span className="font-medium text-white">
                    {selectedServices.length ? formatPrice(totalSelectedPrice, bookingCurrency) : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-[#8f4f3a]/25 blur-3xl" />
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#f1d6ca]/10 blur-3xl" />
        </aside>

        <main className="flex-1 px-6 py-8 md:px-12 md:py-12">
          <div className="relative mb-12 flex justify-between">
            {stepItems.map((item) => (
              <div key={item.id} className="z-10 flex flex-col items-center gap-2">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full shadow-sm transition-all ${
                    step >= item.id ? "bg-zinc-950 text-white" : "bg-zinc-200 text-zinc-500"
                  }`}
                >
                  <item.icon size={18} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">{item.label}</span>
              </div>
            ))}

            <div className="absolute left-0 top-6 h-px w-full bg-zinc-200" />
            <div
              className="absolute left-0 top-6 h-px bg-zinc-950 transition-all duration-300"
              style={{ width: `${(step - 1) * 50}%` }}
            />
          </div>

          {successMessage ? (
            <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {successMessage}
            </div>
          ) : null}

          {step === 1 ? (
            <section className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-semibold tracking-[-0.04em] text-zinc-950">Hizmet Seçin</h2>
                  <p className="mt-2 text-sm text-zinc-500">Birden fazla hizmet seçebilirsiniz.</p>
                </div>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canGoNext}
                  className="grid h-11 w-11 place-items-center rounded-full text-zinc-900 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:text-zinc-300"
                  aria-label="Sonraki adım"
                >
                  <MoveRight size={22} />
                </button>
              </div>

              <div className="sticky top-0 z-20 -mx-2 px-2 py-3 backdrop-blur">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => scrollCategories("left")}
                    className="hidden h-10 w-10 shrink-0 place-items-center rounded-full text-zinc-500 hover:bg-zinc-100 lg:grid"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div ref={categoriesScrollRef} className="flex min-w-0 flex-1 gap-3 overflow-x-auto pb-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        ref={(element) => {
                          categoryButtonRefs.current[category] = element;
                        }}
                        type="button"
                        onClick={() => scrollToCategory(category)}
                        className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                          activeCategory === category
                            ? "bg-zinc-950 text-white"
                            : "bg-white text-zinc-700 hover:text-zinc-950"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollCategories("right")}
                    className="hidden h-10 w-10 shrink-0 place-items-center rounded-full text-zinc-500 hover:bg-zinc-100 lg:grid"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                {servicesByCategory.map(({ category, services: categoryServices }) => (
                  <div
                    key={category}
                    ref={(element) => {
                      categorySectionRefs.current[category] = element;
                    }}
                    data-category={category}
                    className="scroll-mt-28 space-y-4"
                  >
                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-zinc-950">{category}</h3>
                    <div className="space-y-4">
                      {categoryServices.map((service) => (
                        <ServicesCard
                          key={service.id}
                          service={service}
                          isSelected={formData.services.includes(service.id)}
                          onToggle={toggleService}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {step === 2 ? (
            <section className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-semibold tracking-[-0.04em] text-zinc-950">Tarih ve Saat</h2>
                  <p className="mt-2 text-sm text-zinc-500">Önce personel, sonra tarih ve uygun saat seçin.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="grid h-11 w-11 place-items-center rounded-full text-zinc-900 transition hover:bg-zinc-100"
                    aria-label="Önceki adım"
                  >
                    <MoveLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!canGoNext}
                    className="grid h-11 w-11 place-items-center rounded-full text-zinc-900 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:text-zinc-300"
                    aria-label="Sonraki adım"
                  >
                    <MoveRight size={20} />
                  </button>
                </div>
              </div>

              <div className="grid gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Personel</label>
                  <div className="relative">
                    <User size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <select
                      value={formData.staffId}
                      onChange={(event) => {
                        const staffId = event.target.value;
                        setSelectedSlot(null);
                        setAvailability(null);
                        setAvailabilityState("idle");
                        setAvailabilityError("");
                        setAvailableDates([]);
                        setDateState(staffId ? "loading" : "idle");
                        updateForm("staffId", staffId);
                      }}
                      disabled={staffState === "loading" || !staffOptions.length}
                      className="w-full appearance-none rounded-2xl border border-zinc-200 bg-white py-4 pl-12 pr-4 text-base text-zinc-950 outline-none disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400"
                    >
                      <option value="">
                        {staffState === "loading"
                          ? "Personeller yükleniyor..."
                          : staffOptions.length
                            ? "Personel seçin"
                            : "Bu hizmetler için uygun personel yok"}
                      </option>
                      {staffOptions.map((staff) => (
                        <option key={staff.id} value={staff.id}>
                          {staff.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {staffState === "error" ? <p className="text-sm text-rose-700">{staffError}</p> : null}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Tarih</label>
                  <div className="relative">
                    <Calendar size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                    {dateState === "loading" ? (
                      <LoaderCircle size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-zinc-400" />
                    ) : null}
                    <select
                      value={formData.date}
                      onChange={(event) => {
                        setSelectedSlot(null);
                        setAvailability(null);
                        setAvailabilityState(event.target.value ? "loading" : "idle");
                        setAvailabilityError("");
                        setFormData((current) => ({ ...current, date: event.target.value, hour: "" }));
                      }}
                      disabled={!formData.staffId || dateState === "loading" || !availableDates.length}
                      className="w-full appearance-none rounded-2xl border border-zinc-200 bg-white py-4 pl-12 pr-12 text-base text-zinc-950 outline-none disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400"
                    >
                      <option value="">
                        {!formData.staffId
                          ? "Önce personel seçin"
                          : dateState === "loading"
                            ? "Uygun tarihler yükleniyor..."
                            : availableDates.length
                              ? "Tarih seçin"
                              : "Uygun tarih bulunamadı"}
                      </option>
                      {availableDates.map((date) => (
                        <option key={date} value={date}>
                          {formatDateLabel(date)}
                        </option>
                      ))}
                    </select>
                  </div>
                  {dateState === "error" ? <p className="text-sm text-rose-700">{dateError}</p> : null}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Saat</label>
                  <div className="relative">
                    <Clock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                    {availabilityState === "loading" ? (
                      <LoaderCircle size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-zinc-400" />
                    ) : null}
                    <select
                      value={formData.hour}
                      onChange={(event) => {
                        const startAt = event.target.value;
                        const slot = availability?.slots.find((item) => item.start_at === startAt) ?? null;
                        setSelectedSlot(slot);
                        updateForm("hour", startAt);
                      }}
                      disabled={!formData.staffId || !formData.date || availabilityState === "loading" || !availability?.slots.length}
                      className="w-full appearance-none rounded-2xl border border-zinc-200 bg-white py-4 pl-12 pr-12 text-base text-zinc-950 outline-none disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400"
                    >
                      <option value="">
                        {!formData.staffId
                          ? "Önce personel seçin"
                          : !formData.date
                            ? "Önce tarih seçin"
                            : availabilityState === "loading"
                              ? "Uygun saatler yükleniyor..."
                              : availability?.slots.length
                                ? "Saat seçin"
                                : "Uygun saat bulunamadı"}
                      </option>
                      {(availability?.slots ?? []).map((slot) => (
                        <option key={slot.start_at} value={slot.start_at}>
                          {formatHour(slot.start_at, availability?.timezone ?? salon.booking_timezone)}
                        </option>
                      ))}
                    </select>
                  </div>
                  {availabilityState === "error" ? <p className="text-sm text-rose-700">{availabilityError}</p> : null}
                </div>
              </div>
            </section>
          ) : null}

          {step === 3 ? (
            <section className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-semibold tracking-[-0.04em] text-zinc-950">Kişisel Bilgiler</h2>
                  <p className="mt-2 text-sm text-zinc-500">Randevuyu oluşturmak için iletişim bilgilerinizi girin.</p>
                </div>
                <button
                  type="button"
                  onClick={prevStep}
                  className="grid h-11 w-11 place-items-center rounded-full text-zinc-900 transition hover:bg-zinc-100"
                  aria-label="Önceki adım"
                >
                  <MoveLeft size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Ad</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => updateForm("name", event.target.value)}
                    placeholder="Ayşe"
                    className="w-full rounded-2xl border border-zinc-200 bg-white p-4 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Soyad</label>
                  <input
                    type="text"
                    value={formData.surname}
                    onChange={(event) => updateForm("surname", event.target.value)}
                    placeholder="Yılmaz"
                    className="w-full rounded-2xl border border-zinc-200 bg-white p-4 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Telefon Numarası</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(event) => updateForm("phone", event.target.value)}
                  placeholder="+90 5xx xxx xx xx"
                  className="w-full rounded-2xl border border-zinc-200 bg-white p-4 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">E-posta (İsteğe bağlı)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => updateForm("email", event.target.value)}
                  placeholder="ornek@mail.com"
                  className="w-full rounded-2xl border border-zinc-200 bg-white p-4 outline-none"
                />
              </div>

              <div className="rounded-3xl border border-zinc-200 bg-white p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">Randevu Özeti</p>
                <div className="mt-4 space-y-3 text-sm text-zinc-600">
                  <div className="flex items-center justify-between gap-4">
                    <span>Salon</span>
                    <span className="font-semibold text-zinc-950">{salon.name}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Hizmet</span>
                    <span className="text-right font-semibold text-zinc-950">
                      {selectedServices.length ? selectedServices.map((service) => service.service_name).join(", ") : "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Personel</span>
                    <span className="font-semibold text-zinc-950">{selectedStaff?.name || "-"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Tarih</span>
                    <span className="font-semibold text-zinc-950">{formData.date ? formatDateLabel(formData.date) : "-"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Saat</span>
                    <span className="font-semibold text-zinc-950">
                      {selectedSlot && availability ? formatHour(selectedSlot.start_at, availability.timezone) : "-"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-zinc-200 pt-3 text-zinc-950">
                    <span className="font-semibold">Toplam Tutar</span>
                    <span className="font-semibold">
                      {selectedServices.length ? formatPrice(totalSelectedPrice, bookingCurrency) : "-"}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={nextStep}
                disabled={submitState === "submitting" || !canGoNext}
                className="w-full rounded-2xl bg-zinc-950 px-4 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
              >
                {submitState === "submitting" ? "Onaylanıyor..." : "Randevuyu Onayla"}
              </button>

              {submitState === "error" ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {submitError}
                </div>
              ) : null}

              {bookingResult ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  Randevu numarası: {bookingResult.appointment_id}
                </div>
              ) : null}
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}
