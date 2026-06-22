"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnrollButton } from "@/components/site/enroll-button";
import { Fireflies } from "@/components/site/fireflies";
import { useSettings } from "@/components/site/settings-provider";
import { enrollmentInfo } from "@/lib/enrollment";
import { SITE } from "@/lib/constants";

export function Hero({ image }: { image: string }) {
  const settings = useSettings();
  const { heroTitle, heroSubtitle } = settings;
  const enroll = enrollmentInfo(settings);
  const reduce = useReducedMotion();

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative overflow-hidden aurora">
      <Fireflies count={18} />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-12 pt-10 sm:px-8 sm:pt-12 sm:pb-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-16 lg:pt-14 2xl:pb-28 2xl:pt-20">
        {/* Texto */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.span
            {...fade(0)}
            className="eyebrow mb-6"
          >
            <Star className="size-3.5 fill-glow text-glow" />
            {SITE.city}, {SITE.district}—{SITE.state}
          </motion.span>

          <motion.h1
            {...fade(0.08)}
            className="text-balance text-4xl leading-[1.05] sm:text-5xl lg:text-5xl 2xl:text-6xl"
          >
            <span className="glow-underline">{heroTitle}</span>
          </motion.h1>

          <motion.p
            {...fade(0.16)}
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft lg:mx-0 lg:text-lg"
          >
            {heroSubtitle}
          </motion.p>

          <motion.div
            {...fade(0.24)}
            className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start 2xl:mt-9"
          >
            <EnrollButton size="lg" />
            <Button asChild variant="outline" size="lg">
              <a href="/sobre">
                Conheça a escola
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </motion.div>

          <motion.dl
            {...fade(0.32)}
            className="mt-8 grid max-w-md grid-cols-3 gap-4 lg:mx-0 2xl:mt-12 2xl:gap-6"
          >
            {[
              { n: "4 meses", l: "a 14 anos" },
              { n: "9 anos", l: "do Fundamental" },
              { n: "+ carinho", l: "em cada dia" },
            ].map((stat) => (
              <div key={stat.l} className="text-center lg:text-left">
                <dt className="font-display text-2xl font-semibold text-ink">
                  {stat.n}
                </dt>
                <dd className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                  {stat.l}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Imagem */}
        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, scale: 0.94 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
              })}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div
            aria-hidden
            className="animate-pulse-glow absolute -inset-6 rounded-[3rem] bg-glow/30 blur-2xl"
          />
          <div className="animate-blob relative overflow-hidden border-4 border-white shadow-[0_30px_80px_-30px_rgba(33,48,74,0.45)]">
            <Image
              src={image}
              alt="Crianças felizes aprendendo na Escola Pirilampo"
              width={720}
              height={820}
              className="aspect-[4/5] h-full w-full object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>

          {/* Cartão flutuante */}
          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.6 },
                })}
            className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-line bg-white/95 p-3 pr-5 shadow-[0_18px_50px_-20px_rgba(33,48,74,0.4)] backdrop-blur sm:-left-6"
          >
            <span
              className={`flex size-11 items-center justify-center rounded-full text-xl ${
                enroll.tone === "open"
                  ? "bg-glow/25"
                  : enroll.tone === "soon"
                    ? "bg-blossom/20"
                    : "bg-ink/10"
              }`}
            >
              {enroll.emoji}
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold text-ink">{enroll.label}</p>
              <p className="text-xs text-ink-soft">{enroll.sub}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
