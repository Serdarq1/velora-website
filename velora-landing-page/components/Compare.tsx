import React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CompareProps {
  className?: string;
}

const packageFeatures = [
  "Randevu yönetimi",
  "Online randevu alma",
  "Ekip takvimi",
  "Google takvim entegrasyonu",
  "Hizmet yönetimi",
  "Kasa yönetimi",
  "Kasa takibi",
  "Ekip yönetimi",
  "Sınırsız ekip üyesi ekleme",
  "Ekip ödemesi takibi",
  "Ürün satışı yönetimi",
  "Ürün yönetimi",
  "Envanter takibi",
  "Whatsapp entegrasyonu",
  "Instagram entegrasyonu",
  "Detaylı personel analizi",
  "Detaylı müşteri analizi",
];

const Compare = ({ className }: CompareProps) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="mb-3 text-center text-4xl font-semibold">
          Pakete dahil özellikler
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-center text-muted-foreground lg:text-lg">
          Velora işletmenizin tüm ihtiyaçlarını kapsayan tek bir paket sunar. Bu pakete tüm özellikler dahildir.
        </p>
        <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-muted/40 bg-white shadow-lg">
          <Table className="w-full border-collapse text-left">
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="border-t border-t-muted/40 px-10 py-6 text-base font-semibold text-muted-foreground">
                  Özellikler
                </TableHead>
                <TableHead className="w-40 border-t border-l border-t-muted/40 border-l-muted/50 px-10 py-6 text-center text-base font-semibold text-muted-foreground">
                  
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-foreground">
              {packageFeatures.map((feature, index) => (
                <TableRow key={feature}>
                  <TableCell
                    className={cn(
                      "px-10 py-6 text-base font-medium",
                      index !== packageFeatures.length - 1 && "border-b border-muted/30"
                    )}
                  >
                    {feature}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "border-l border-muted/30 px-10 py-6 text-center",
                      index !== packageFeatures.length - 1 && "border-b border-muted/30"
                    )}
                  >
                    <Check className="mx-auto size-5 text-emerald-500" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export { Compare };
