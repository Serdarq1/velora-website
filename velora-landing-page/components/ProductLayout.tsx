import { cn } from "@/lib/utils";
import Image from 'next/image';

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface ProductLayoutProps {
  title: string;
  description: string;
  className?: string;
}

const ProductLayout = ({
  title = "Salon operasyonlarınızı tek ekranda yönetin",
  description = "Randevudan stok takibine, personel performansından ciroya kadar tüm salon süreçlerinizi tek panelde toplayın. Mobil ve webden aynı deneyimle yönetin.",
  className,
}: ProductLayoutProps) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-24 flex flex-col items-center gap-6">
          <h1 className="text-center text-3xl font-semibold lg:max-w-3xl lg:text-5xl">
            {title}
          </h1>
          <p className="text-center text-lg font-medium text-muted-foreground md:max-w-4xl lg:text-xl">
            {description}
          </p>
        </div>
        <div className="relative flex justify-center">
          <div className="-muted2 relative flex w-full flex-col  md:w-1/2 lg:w-full">
            <div className="relative flex flex-col lg:flex-row">
              <div className="-muted2 flex flex-col justify-between -b -solid p-8 lg:p-10 lg:w-3/5 lg:-r lg:-b-0">
                <h2 className="text-xl font-semibold">Randevu yönetimi</h2>
                <p className="text-muted-foreground">Anlık takvim durumu, hızlı randevu ekleme ve otomatik onay mesajlarıyla iptal oranını azaltın.</p>
                <Image
                  src="/calendar.png"
                  alt="Salon randevu ekranı"
                  width={720}
                  height={540}
                  className="mt-6 w-full max-h-[320px] rounded-lg border border-black/5 object-cover shadow-sm"
                />
              </div>
              <div className="flex flex-col justify-between p-8 lg:p-10 lg:w-2/5">
                <h2 className="text-xl font-semibold">Mobil görünüm</h2>
                <p className="text-muted-foreground">Salonunuzu telefondan takip edin; boş slot önerileriyle müşteriye saniyeler içinde dönüş yapın.</p>
                <Image
                  src="/calendar_mobile.png"
                  alt="Velora mobil randevu ekranı"
                  width={480}
                  height={640}
                  className="mt-6 w-44 max-h-[320px] rounded-lg border border-black/5 object-contain shadow-sm"
                />
              </div>
            </div>
            <div className="-muted2 relative flex flex-col -t -solid lg:flex-row">
              <div className="-muted2 flex flex-col gap-3 -b -solid p-8 lg:p-10 lg:w-1/2 lg:-r lg:-b-0">
                <h2 className="text-xl font-semibold">Envanter</h2>
                <p className="text-muted-foreground">Ürün giriş-çıkışlarını takip edin kolaylıkla takip edin.</p>
                <Image
                  src="/products.png"
                  alt="Velora ürünler ekranı"
                  width={600}
                  height={800}
                  className="mt-2 h-auto w-full rounded-lg border border-black/5 object-contain shadow-sm"
                />
              </div>
              <div className="flex flex-col justify-between p-8 lg:p-10 lg:w-1/2">
                <h2 className="text-xl font-semibold">Ciro ve komisyon</h2>
                <p className="text-muted-foreground">Şube, hizmet ve personel bazlı gelirleri anlık görün; komisyonları otomatik hesaplayın.</p>
                <Image
                  src="/gross_income.png"
                  alt="Velora Kasa Ekranı"
                  width={900}
                  height={580}
                  className="mt-6 w-full max-h-[360px] rounded-lg border border-black/5 object-cover shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ProductLayout };
