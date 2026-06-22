import type { Metadata } from "next";
import { BookOpen, HeartHandshake, Palette, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Container, Section, SectionHeading } from "@/components/site/layout-primitives";
import { ProjectsGrid } from "@/components/site/projects-grid";
import { Reveal } from "@/components/site/reveal";
import { CtaBanner } from "@/components/site/cta-banner";

export const metadata: Metadata = {
  title: "Projetos Pedagógicos",
  description:
    "Projetos de literatura, artes, cultura, datas comemorativas e desenvolvimento socioemocional na Escola Pirilampo, Itabatã-BA.",
};

const pillars: {
  icon: LucideIcon;
  tone: string;
  title: string;
  text: string;
}[] = [
  {
    icon: BookOpen,
    tone: "bg-sky/15 text-sky-deep",
    title: "Letrar e encantar",
    text: "A leitura como porta de entrada para a imaginação e o conhecimento.",
  },
  {
    icon: Palette,
    tone: "bg-blossom/20 text-blossom-deep",
    title: "Criar e expressar",
    text: "A arte como linguagem para sentimentos, ideias e descobertas.",
  },
  {
    icon: HeartHandshake,
    tone: "bg-glow/25 text-glow-deep",
    title: "Conviver e respeitar",
    text: "O desenvolvimento socioemocional no centro de tudo o que fazemos.",
  },
];

export default function ProjetosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projetos pedagógicos"
        title="Onde o aprendizado ganha vida"
        description="Mais do que conteúdo, oferecemos experiências. Nossos projetos transformam a sala de aula em um espaço de criação, cultura e afeto."
      />

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => {
              const PillarIcon = p.icon;
              return (
                <Reveal as="div" key={p.title} delay={i * 0.1}>
                  <div className="h-full rounded-3xl border border-line bg-white p-8 text-center shadow-soft">
                    <span
                      className={`mx-auto flex size-14 items-center justify-center rounded-2xl ${p.tone}`}
                    >
                      <PillarIcon className="size-7" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-xl text-ink">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {p.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-cloud">
        <Container>
          <SectionHeading
            eyebrow="Nossos projetos"
            title="Iniciativas que marcam o ano todo"
            description="Conheça alguns dos projetos e atividades que fazem parte da rotina da Pirilampo."
          />
          <div className="mt-14">
            <ProjectsGrid />
          </div>
        </Container>
      </Section>

      <CtaBanner
        title="Quer ver tudo isso de pertinho?"
        text="Agende uma visita e conheça nossos projetos, espaços e a nossa equipe. Será um prazer receber você."
      />
    </>
  );
}
