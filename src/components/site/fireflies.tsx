"use client";

import { useMemo } from "react";

/** Vaga-lumes flutuantes — o elemento de assinatura da Pirilampo.
 *  Pontos de luz suaves que derivam lentamente. Respeita prefers-reduced-motion
 *  (a animação é neutralizada via CSS global). */
export function Fireflies({ count = 14 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r = (n: number) => ((seed * n) % 1000) / 1000;
        const size = 4 + r(7) * 8;
        return {
          id: i,
          left: `${r(3) * 100}%`,
          top: `${r(11) * 100}%`,
          width: size,
          height: size,
          delay: `${r(13) * 6}s`,
          dur: `${7 + r(17) * 8}s`,
        };
      }),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="firefly"
          style={{
            left: d.left,
            top: d.top,
            width: d.width,
            height: d.height,
            ["--delay" as string]: d.delay,
            ["--dur" as string]: d.dur,
          }}
        />
      ))}
    </div>
  );
}
