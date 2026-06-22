import * as React from "react";
import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  sky: "bg-sky/15 text-sky-deep",
  blossom: "bg-blossom/20 text-blossom-deep",
  glow: "bg-glow/25 text-glow-deep",
  neutral: "bg-cloud text-ink-soft",
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
};

export function Badge({
  className,
  tone = "sky",
  ...props
}: React.ComponentProps<"span"> & { tone?: keyof typeof tones }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
