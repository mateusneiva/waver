"use client";

import { Button as NextUIButton, ButtonProps } from "@nextui-org/button";

export function Button({ children, ...props }: ButtonProps) {
  return (
    <NextUIButton className="rounded-full px-5 text-black font-bold" {...props}>
      {children}
    </NextUIButton>
  );
}
