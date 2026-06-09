"use client";

import {
  Accordion as HeroAccordion,
  AccordionBody,
  AccordionHeading,
  AccordionIndicator,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@heroui/react";
import { joinClasses } from "../../utils/join-classes";

import type { ReactNode } from "react";

type FeatureAccordionItem = {
  key: string;
  ariaLabel: string;
  title: ReactNode;
  subtitle?: ReactNode;
  startContent?: ReactNode;
  content: ReactNode;
};

type FeatureAccordionProps = {
  items: FeatureAccordionItem[];
  className?: string;
};

export function FeatureAccordion({ items, className }: FeatureAccordionProps) {
  return (
    <HeroAccordion variant="surface" className={joinClasses("w-full max-w-[600px] bg-zinc-900", className)}>
      {items.map((item) => (
        <AccordionItem key={item.key} aria-label={item.ariaLabel}>
          <AccordionHeading>
            <AccordionTrigger className="flex items-center gap-3 py-4 text-left">
              {item.startContent && <span className="shrink-0">{item.startContent}</span>}

              <span className="flex flex-1 flex-col">
                <span>{item.title}</span>

                {item.subtitle && <span className="text-sm text-zinc-400">{item.subtitle}</span>}
              </span>

              <AccordionIndicator />
            </AccordionTrigger>
          </AccordionHeading>

          <AccordionPanel>
            <AccordionBody>{item.content}</AccordionBody>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </HeroAccordion>
  );
}

export type { FeatureAccordionItem, FeatureAccordionProps };
