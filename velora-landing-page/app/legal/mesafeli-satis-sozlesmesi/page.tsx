import { LegalPage } from "@/components/LegalPage";
import { legalDocuments } from "@/lib/legal";

export default function DistanceSalesPage() {
  const document = legalDocuments["mesafeli-satis-sozlesmesi"];

  return <LegalPage title={document.title} content={document.content} />;
}
