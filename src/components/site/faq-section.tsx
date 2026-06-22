import { ChevronDown } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { FAQ } from "@/lib/constants";

/** Seção de Perguntas Frequentes — acordeão nativo (acessível por teclado,
 *  funciona sem JavaScript) + dados estruturados FAQPage para o Google. */
export function FaqSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <Section className="bg-cloud">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Perguntas frequentes"
          title="Tudo o que você precisa saber"
          description="Reunimos as dúvidas mais comuns das famílias. Não encontrou a sua? Fale com a gente pelo WhatsApp."
        />

        <div className="mt-12 space-y-3">
          {FAQ.map((item, i) => (
            <Reveal as="div" key={item.q} delay={(i % 3) * 0.06}>
              <details className="group rounded-2xl border border-line bg-white px-5 shadow-[0_10px_40px_-24px_rgba(33,48,74,0.25)] open:shadow-soft">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-display text-lg font-semibold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown
                    className="size-5 shrink-0 text-sky-deep transition-transform duration-300 group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="pb-5 text-base leading-relaxed text-ink-soft">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Section>
  );
}
