import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionIntroProps {
  title: string;
  description: ReactNode;
  className?: string;
}

const SectionIntro = ({ title, description, className }: SectionIntroProps) => {
  return (
    <div className={cn("mx-auto max-w-3xl text-center mb-20", className)}>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {title}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg">{description}</p>
    </div>
  );
};

export { SectionIntro };
