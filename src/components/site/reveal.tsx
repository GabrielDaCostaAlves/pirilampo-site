"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as React from "react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

/** Revela o conteúdo suavemente quando entra na viewport.
 *  Usa um IntersectionObserver próprio (mais confiável que whileInView) com
 *  verificação imediata de visibilidade, garantindo que nada fique preso
 *  invisível. Desativado quando o usuário prefere menos movimento. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Já está visível no carregamento? Mostra imediatamente.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setVisible(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const MotionTag = motion[as] as typeof motion.div;

  const motionRef = ref as React.RefObject<HTMLDivElement>;

  if (reduce) {
    return (
      <MotionTag ref={motionRef} className={className}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      ref={motionRef}
      className={className}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
