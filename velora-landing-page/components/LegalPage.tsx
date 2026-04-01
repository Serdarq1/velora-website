import { Footer } from "@/components/Footer";
import { Faq } from "@/components/Faq";
import { HelpCenter } from "@/components/HelpCenter";
import Navigation from "@/components/Navigation";

interface LegalPageProps {
  title: string;
  content: string;
}

const isMainHeading = (line: string) =>
  line === line.toUpperCase() && /[A-ZÇĞİÖŞÜ]/.test(line) && !/^\d+\./.test(line);

const isSectionHeading = (line: string) => /^\d+\./.test(line);

const isBulletLike = (line: string) =>
  line.endsWith(",") ||
  line.endsWith(";") ||
  /^(Kimlik bilgileri|İletişim bilgileri|Kullanıcı hesabı bilgileri|Müşteri ve randevu verileri|Finansal veriler|Teknik veriler|Kullanım verileri|Entegrasyon verileri|Sağlayıcı \/ Satıcı|Alıcı \/ Tüketici)/.test(
    line
  );

const renderContentLines = (lines: string[]) => {
  const elements: JSX.Element[] = [];
  let bulletBuffer: string[] = [];

  const flushBulletBuffer = (key: string) => {
    if (!bulletBuffer.length) {
      return;
    }

    elements.push(
      <ul key={key} className="space-y-2 pl-6 text-base leading-8 text-foreground list-disc">
        {bulletBuffer.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );

    bulletBuffer = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushBulletBuffer(`bullets-${index}`);
      elements.push(<div key={`space-${index}`} className="h-2" />);
      return;
    }

    if (isBulletLike(trimmed)) {
      bulletBuffer.push(trimmed);
      return;
    }

    flushBulletBuffer(`bullets-${index}`);
    elements.push(
      <p key={`line-${index}`} className="text-base leading-8 text-foreground">
        {trimmed}
      </p>
    );
  });

  flushBulletBuffer(`bullets-final`);

  return elements;
};

const LegalPage = ({ title, content }: LegalPageProps) => {
  const blocks = content.split("\n\n");

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="p-3">
        <Navigation />
      </div>
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl px-2 sm:px-4">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <div className="mt-10 space-y-8 text-foreground">
            {blocks.map((block, index) => {
              const lines = block.split("\n");
              const firstLine = lines[0]?.trim() ?? "";

              if (!firstLine) {
                return null;
              }

              if (isMainHeading(firstLine)) {
                return (
                  <div key={index} className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      {firstLine}
                    </h2>
                    {lines.slice(1).map((line, lineIndex) =>
                      line.trim() ? (
                        <p
                          key={lineIndex}
                          className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground"
                        >
                          {line}
                        </p>
                      ) : null
                    )}
                  </div>
                );
              }

              if (isSectionHeading(firstLine)) {
                return (
                  <section key={index} className="space-y-4">
                    <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {firstLine}
                    </h3>
                    <div className="space-y-3">{renderContentLines(lines.slice(1))}</div>
                  </section>
                );
              }

              return (
                <div key={index} className="space-y-3">
                  {renderContentLines(lines)}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <HelpCenter />
      <Faq />
      <Footer className="py-24" />
    </div>
  );
};

export { LegalPage };
