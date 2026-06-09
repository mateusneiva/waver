import type { ReactNode } from "react";

import { Section } from "../section";
import { FeatureAccordion, type FeatureAccordionItem } from "../ui/accordion";

type HomeFeatureSectionProps = {
  delay: number;
  title: string;
  items: FeatureAccordionItem[];
  children: ReactNode;
  backgroundClassName?: string;
};

export function HomeFeatureSection({ delay, title, items, children, backgroundClassName }: HomeFeatureSectionProps) {
  const content = (
    <Section delay={delay}>
      <div className="flex flex-col md:flex-row items-start gap-10 w-full relative">
        <div className="flex flex-col gap-4 w-full md:flex-1 min-w-0">
          <div className="flex flex-col justify-center">
            <p className="uppercase text-xs font-semibold tracking-widest text-lime-400">Feature</p>
            <h2 className="text-4xl font-bold leading-tight">{title}</h2>
          </div>

          <FeatureAccordion items={items} />
        </div>

        <div className="flex flex-col gap-8 w-full md:flex-1 min-w-0">{children}</div>
      </div>
    </Section>
  );

  if (!backgroundClassName) {
    return content;
  }

  return <div className={backgroundClassName}>{content}</div>;
}
