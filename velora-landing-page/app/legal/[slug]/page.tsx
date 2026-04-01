import { Footer } from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { legalDocuments, type LegalDocumentSlug } from "@/lib/legal";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
  };
};

export default function LegalDocumentPage({ params }: PageProps) {
  const { slug } = params;
  const document = legalDocuments[slug as LegalDocumentSlug];

  if (!document) {
    notFound();
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="p-3">
        <Navigation />
      </div>
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border bg-white p-8 shadow-sm sm:p-10">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {document.title}
          </h1>
          <pre className="mt-8 whitespace-pre-wrap font-sans text-base leading-8 text-foreground">
            {document.content}
          </pre>
        </div>
      </main>
      <Footer className="py-24" />
    </div>
  );
}
