"use client";

import { forwardRef } from "react";
import type React from "react";
import { Button as HeroUIButton } from "@heroui/react";
import { joinClasses } from "../../utils/join-classes";

import type { ButtonProps } from "@heroui/react";

type AppButtonProps = Omit<ButtonProps, "className" | "children"> & {
  className?: string;
  color?: "primary" | "secondary";
  asChild?: boolean;
  href?: string;
  target?: string;
  as?: any;
  children?: React.ReactNode;
};

export const Button = forwardRef<any, AppButtonProps>(
  ({ children, className, color = "primary", asChild, href, as, target, ...props }, ref) => {
    const classes = joinClasses(
      "rounded px-5 text-black font-semibold",
      color === "primary" && "bg-lime-400",
      color === "secondary" && "bg-zinc-800 text-white",
      className,
    );

    if (href && !as) {
      return (
        <a href={href} target={target} className="contents">
          <HeroUIButton
            className={classes}
            ref={ref}
            {...(props as any)}
          >
            {children}
          </HeroUIButton>
        </a>
      );
    }

    return (
      <HeroUIButton
        as={as as any}
        href={href}
        target={target}
        className={classes}
        ref={ref}
        {...(props as any)}
      >
        {children}
      </HeroUIButton>
    );
  },
);

Button.displayName = "Button";
