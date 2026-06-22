"use client";

import { useSettings } from "@/components/site/settings-provider";
import { enrollmentInfo } from "@/lib/enrollment";
import { cn } from "@/lib/utils";

const TONE: Record<string, string> = {
  open: "bg-glow/25 text-glow-deep",
  soon: "bg-blossom/20 text-blossom-deep",
  closed: "bg-ink/10 text-ink-soft",
};

/** Selo de situação das matrículas (estilo "eyebrow"), controlado pelo
 *  painel: abertas, em breve ou encerradas. */
export function EnrollmentBadge({ className }: { className?: string }) {
  const settings = useSettings();
  const { label, emoji, tone } = enrollmentInfo(settings);

  return (
    <span className={cn("eyebrow", TONE[tone], className)}>
      <span aria-hidden>{emoji}</span>
      {label}
    </span>
  );
}
