import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}
      {...props}
    />
  );
}

export function Section({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("py-20 sm:py-28", className)} {...props} />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="eyebrow mb-4">
          <span className="inline-block size-1.5 rounded-full bg-glow-deep" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl leading-tight sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed text-ink-soft",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
