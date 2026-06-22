import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Container, Section } from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
import { EnrollButton } from "@/components/site/enroll-button";
import { CtaBanner } from "@/components/site/cta-banner";
import { SEGMENTS } from "@/lib/constants";
import { SEGMENT_IMAGES } from "@/lib/fallback-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Segmentos de Ensino",
  description:
    "Creche, Maternal, Educação Infantil e Ensino Fundamental (1º ao 9º ano) na Escola Pirilampo, em Itabatã, Mucuri-BA. Conheça cada etapa.",
};

const toneToBadge: Record<string, "sky" | "blossom" | "glow"> = {
  sky: "sky",
  blossom: "blossom",
  glow: "glow",
};

export default function SegmentosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Segmentos de ensino"
        title="Cada fase, um cuidado especial"
        description="Da creche ao 9º ano, acompanhamos o crescimento da criança com uma proposta pensada para cada etapa do desenvolvimento."
      />

      <Section>
        <Container className="space-y-24">
          {SEGMENTS.map((seg, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={seg.slug}
                id={seg.slug}
                className="scroll-mt-28 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal className={cn(reversed && "lg:order-2")}>
                  <div className="relative">
                    <div
                      aria-hidden
                      className={cn(
                        "absolute -inset-3 rounded-[2.5rem] blur-2xl",
                        seg.color === "sky" && "bg-sky/20",
                        seg.color === "blossom" && "bg-blossom/20",
                        seg.color === "glow" && "bg-glow/25",
                      )}
                    />
                    <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-soft">
                      <Image
                        src={SEGMENT_IMAGES[seg.slug]}
                        alt={`Segmento ${seg.name}`}
                        width={700}
                        height={560}
                        className="aspect-[5/4] w-full object-cover"
                      />
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.1} className={cn(reversed && "lg:order-1")}>
                  <Badge tone={toneToBadge[seg.color]}>{seg.age}</Badge>
                  <h2 className="mt-4 text-3xl sm:text-4xl">{seg.name}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                    {seg.description}
                  </p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {seg.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5">
                        <span
                          className={cn(
                            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                            seg.color === "sky" && "bg-sky/15 text-sky-deep",
                            seg.color === "blossom" &&
                              "bg-blossom/20 text-blossom-deep",
                            seg.color === "glow" && "bg-glow/25 text-glow-deep",
                          )}
                        >
                          <Check className="size-3" />
                        </span>
                        <span className="text-sm text-ink">{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <EnrollButton
                      variant="outline"
                      size="default"
                      showIcon
                      message={`Olá! Gostaria de obter informações sobre matrícula para ${seg.name}.`}
                    >
                      Quero matricular no {seg.name}
                    </EnrollButton>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
