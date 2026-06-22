"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";

const FIREFLY_COUNT = 24;

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Phase = "in" | "out" | "done";

export function Preloader() {
  const [phase, setPhase] = useState<Phase>("in");

  const fireflies = useMemo(() => {
    const rand = (seed: number) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: FIREFLY_COUNT }, (_, i) => {
      const size = 3 + rand(i + 1) * 7;
      return {
        id: i,
        left: rand(i + 11) * 100,
        top: rand(i + 23) * 100,
        size,
        driftX: (rand(i + 31) - 0.5) * 90,
        driftY: (rand(i + 43) - 0.5) * 90,
        delay: rand(i + 57) * 1.6,
        dur: 2.6 + rand(i + 67) * 2.6,
        blink: 1.4 + rand(i + 79) * 1.8,
      };
    });
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
