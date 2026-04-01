import { LegalPage } from "@/components/LegalPage";
import { legalDocuments } from "@/lib/legal";

export default function RefundPolicyPage() {
  const document = legalDocuments["iade-iptal-politikasi"];

  return <LegalPage title={document.title} content={document.content} />;
}
