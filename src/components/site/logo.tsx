import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

export function Logo({
  className,
  showText = true,
  invert = false,
}: {
  className?: string;
  showText?: boolean;
  invert?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`${SITE.name} — página inicial`}
    >
      <span className="relative inline-flex size-11 shrink-0 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-glow/40 blur-md transition-opacity duration-500 group-hover:opacity-90" />
        <Image
          src="/logopirilampo.png"
          alt=""
          width={44}
          height={44}
          className="relative size-11 rounded-full object-cover"
          priority
        />
      </span>
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-lg font-semibold tracking-tight",
              invert ? "text-white" : "text-ink",
            )}
          >
            Pirilampo
          </span>
          <span
            className={cn(
              "text-[0.65rem] font-semibold uppercase tracking-[0.18em]",
              invert ? "text-white/70" : "text-ink-soft",
            )}
          >
            Escola e Creche
          </span>
        </span>
      )}
    </Link>
  );
}
