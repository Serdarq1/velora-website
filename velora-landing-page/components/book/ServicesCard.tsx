"use client";

import { Check, Plus } from "lucide-react";

type ServiceCardItem = {
  id: string;
  service_name: string;
  duration_min: number | null;
  price: number | null;
  currency: string | null;
  description: string | null;
  category: string | null;
};

type ServicesCardProps = {
  service: ServiceCardItem;
  isSelected: boolean;
  onToggle: (serviceId: string) => void;
};

const formatPrice = (amount: number | null, currency: string | null) => {
  if (amount == null) return "Fiyat bilgisi yok";
  if ((currency ?? "TRY").toUpperCase() === "TRY") return `${amount.toFixed(0)} TL`;
  return `${amount.toFixed(0)} ${currency ?? ""}`.trim();
};

export default function ServicesCard({
  service,
  isSelected,
  onToggle,
}: ServicesCardProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(service.id)}
      className={`flex w-full items-center justify-between gap-5 rounded-3xl border px-5 py-5 text-left transition-all ${
        isSelected
          ? "border-zinc-900 bg-white shadow-sm"
          : "border-zinc-200 bg-white hover:border-zinc-300"
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="text-[1.35rem] font-semibold leading-[1.2] tracking-[-0.035em] text-zinc-950">
          {service.service_name}
        </p>
        <p className="text-sm font-medium text-zinc-500">
          {service.duration_min ? `${service.duration_min} dk` : "Süre belirtilmedi"}
        </p>
        <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-zinc-950">
          {formatPrice(service.price, service.currency)}
        </p>
        <p className="mt-1 text-sm leading-6 text-zinc-500">
          {service.description || service.category || "Salon hizmeti"}
        </p>
      </div>

      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all ${
          isSelected
            ? "border-zinc-950 bg-zinc-950 text-white"
            : "border-zinc-200 bg-white text-zinc-900"
        }`}
      >
        {isSelected ? <Check size={20} strokeWidth={2.2} /> : <Plus size={20} strokeWidth={2.1} />}
      </div>
    </button>
  );
}
