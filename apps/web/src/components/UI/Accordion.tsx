"use client";

import {
  Accordion as NextUIAccordion,
  AccordionProps,
  AccordionItem as NextUIAccordionItem,
  AccordionItemProps,
} from "@nextui-org/accordion";

export function Accordion({ children, ...props }: AccordionProps) {
  return <NextUIAccordion {...props}>{children}</NextUIAccordion>;
}

export function AccordionItem({ children, ...props }: AccordionItemProps) {
  return <NextUIAccordionItem {...props}>{children}</NextUIAccordionItem>;
}
