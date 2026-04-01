import { LegalPage } from "@/components/LegalPage";
import { legalDocuments } from "@/lib/legal";

export default function KvkkPage() {
  const document = legalDocuments.kvkk;

  return <LegalPage title={document.title} content={document.content} />;
}
