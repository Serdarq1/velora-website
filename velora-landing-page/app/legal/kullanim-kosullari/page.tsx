import { LegalPage } from "@/components/LegalPage";
import { legalDocuments } from "@/lib/legal";

export default function TermsPage() {
  const document = legalDocuments["kullanim-kosullari"];

  return <LegalPage title={document.title} content={document.content} />;
}
