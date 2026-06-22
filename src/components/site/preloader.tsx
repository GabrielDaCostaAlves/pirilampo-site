"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";

const FIREFLY_COUNT = 24;

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Phase = "in" | "out" | "done";

export function Preloader() {
  const [phase, setPhase] = useState<Phase>("in");

  const fireflies = useMemo(() => {
    // Valores arredondados: garante que servidor e cliente gerem strings
    // idênticas (Math.sin pode variar nos últimos dígitos entre motores JS),
    // evitando erro de hidratação.
    const r2 = (n: number) => Math.round(n * 100) / 100;
    const rand = (seed: number) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      return r2(x - Math.floor(x));
    };
    return Array.from({ length: FIREFLY_COUNT }, (_, i) => ({
      id: i,
      left: r2(rand(i + 11) * 100),
      top: r2(rand(i + 23) * 100),
      size: r2(3 + rand(i + 1) * 7),
      driftX: r2((rand(i + 31) - 0.5) * 90),
      driftY: r2((rand(i + 43) - 0.5) * 90),
      delay: r2(rand(i + 57) * 1.6),
      dur: r2(2.6 + rand(i + 67) * 2.6),
      blink: r2(1.4 + rand(i + 79) * 1.8),
    }));
  }, []);

  useIsoLayoutEffect(() => {
    if (sessionStorage.getItem("pirilampo:seen")) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("pirilampo:seen", "1");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const outAt = reduced ? 600 : 2000;
    const doneAt = reduced ? 1000 : 2600;

    const toOut = window.setTimeout(() => setPhase("out"), outAt);
    const toDone = window.setTimeout(() => setPhase("done"), doneAt);
    return () => {
      window.clearTimeout(toOut);
      window.clearTimeout(toDone);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div aria-hidden data-phase={phase} className="preloader">
      <div className="preloader__sky" />

      <div className="preloader__fireflies">
        {fireflies.map((f) => (
          <span
            key={f.id}
            className="preloader__firefly"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              width: f.size,
              height: f.size,
              ["--dx" as string]: `${f.driftX}px`,
              ["--dy" as string]: `${f.driftY}px`,
              ["--delay" as string]: `${f.delay}s`,
              ["--dur" as string]: `${f.dur}s`,
              ["--blink" as string]: `${f.blink}s`,
            }}
          />
        ))}
      </div>

      <div className="preloader__center">
        <span className="preloader__beacon" />
        <span className="preloader__mark">Pirilampo</span>
        <span className="preloader__sub">Escola e Creche</span>
      </div>

      <div className="preloader__dawn" />
    </div>
  );
}
