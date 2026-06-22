import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Eye, Heart, ShieldCheck, Sparkles, Sprout } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Container, Section, SectionHeading } from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { CtaBanner } from "@/components/site/cta-banner";
import { VALUES } from "@/lib/constants";
import { SEGMENT_IMAGES, HERO_IMAGE } from "@/lib/fallback-data";

export const metadata: Metadata = {
  title: "A Escola",
  description:
    "Conheça a história, a missão, os valores e a proposta pedagógica da Escola e Creche Pirilampo, em Itabatã, Mucuri-BA.",
};

export default function SobrePage() {
  return (
    <>
      <PageHeader
        eyebrow="A Escola"
        title={
          <>
            Acolher, ensinar e fazer{" "}
            <span className="glow-underline">cada criança brilhar</span>
          </>
        }
        description="Uma escola onde o afeto encontra a excelência. Conheça quem somos e no que acreditamos."
      />

      {/* História */}
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] border-4 border-white shadow-soft">
                <Image
                  src={HERO_IMAGE}
                  alt="Ambiente acolhedor da Escola Pirilampo"
                  width={700}
                  height={560}
                  className="aspect-[5/4] w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="eyebrow mb-4">Nossa história</span>
              <h2 className="text-balance text-3xl sm:text-4xl">
                Uma luz acesa no coração de Itabatã
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
                <p>
                  A Escola e Creche Pirilampo nasceu do sonho de oferecer à
                  comunidade de Itabatã uma educação que cuida da criança por
                  inteiro — do primeiro sorriso da creche até a autonomia do 9º
                  ano.
                </p>
                <p>
                  Ao longo dos anos, construímos um ambiente onde famílias se
                  sentem em casa e educadores conhecem cada aluno pelo nome.
                  Crescemos sem perder o que nos define: o cuidado de perto e o
                  compromisso com um ensino de verdade.
                </p>
                <p>
                  Como o pirilampo que ilumina a noite, acreditamos que toda
                  criança carrega uma luz própria. Nosso papel é protegê-la,
                  alimentá-la e ajudá-la a brilhar cada vez mais forte.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Missão e Visão */}
      <Section className="bg-cloud">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Compass,
                title: "Missão",
                text: "Oferecer uma educação acolhedora e de excelência, que desenvolva o potencial intelectual, emocional e social de cada criança, em parceria com as famílias.",
                tone: "from-sky/15 to-sky/5 text-sky-deep",
              },
              {
                icon: Eye,
                title: "Visão",
                text: "Ser referência em Itabatã e região como uma escola que une carinho e qualidade, formando crianças felizes, seguras e preparadas para a vida.",
                tone: "from-blossom/20 to-blossom/5 text-blossom-deep",
              },
            ].map((card, i) => (
              <Reveal as="div" key={card.title} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-line bg-white p-8 shadow-soft">
                  <span
                    className={`flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.tone}`}
                  >
                    <card.icon className="size-7" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-2xl text-ink">{card.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft">
                    {card.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Valores */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Nossos valores"
            title="O que guia cada um dos nossos dias"
            description="Quatro pilares que sustentam a forma como ensinamos e cuidamos."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const value = [
                { icon: Heart, tone: "bg-blossom/20 text-blossom-deep" },
                { icon: ShieldCheck, tone: "bg-sky/15 text-sky-deep" },
                { icon: Sprout, tone: "bg-glow/25 text-glow-deep" },
                { icon: Sparkles, tone: "bg-blossom/20 text-blossom-deep" },
              ][i];
              const ValueIcon = value.icon;
              return (
                <Reveal as="div" key={v.title} delay={i * 0.08}>
                  <div className="h-full rounded-3xl border border-line bg-white p-7 text-center transition-transform duration-500 hover:-translate-y-1.5">
                    <span
                      className={`mx-auto flex size-12 items-center justify-center rounded-full ${value.tone}`}
                    >
                      <ValueIcon className="size-6" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-lg text-ink">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {v.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Proposta pedagógica + ambiente */}
      <Section className="bg-cloud">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="eyebrow mb-4">
                <Sprout className="size-3.5" />
                Proposta pedagógica
              </span>
              <h2 className="text-balance text-3xl sm:text-4xl">
                Desenvolvimento integral, no tempo de cada criança
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
                <p>
                  Nossa proposta une uma base acadêmica sólida ao olhar atento
                  para o lado humano. Trabalhamos a leitura, o raciocínio e a
                  curiosidade ao mesmo tempo em que cultivamos empatia, respeito e
                  autonomia.
                </p>
                <p>
                  Aprender, aqui, é uma experiência viva: feita de projetos,
                  brincadeiras, arte e descobertas que fazem sentido para a
                  criança.
                </p>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Respeito ao ritmo e à individualidade de cada aluno",
                  "Aprendizagem por projetos e vivências significativas",
                  "Acompanhamento próximo e diálogo constante com as famílias",
                  "Cuidado com o desenvolvimento socioemocional",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink">
                    <Heart className="mt-1 size-4 shrink-0 fill-blossom text-blossom" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src={SEGMENT_IMAGES["creche"]}
                  alt="Ambiente da creche"
                  width={400}
                  height={500}
                  className="mt-10 aspect-[4/5] w-full rounded-3xl border-4 border-white object-cover shadow-soft"
                />
                <Image
                  src={SEGMENT_IMAGES["ensino-fundamental"]}
                  alt="Alunos do Ensino Fundamental"
                  width={400}
                  height={500}
                  className="aspect-[4/5] w-full rounded-3xl border-4 border-white object-cover shadow-soft"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
