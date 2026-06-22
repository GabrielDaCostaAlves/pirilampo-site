import { Container, Section } from "@/components/site/layout-primitives";
import { EnrollButton } from "@/components/site/enroll-button";
import { Fireflies } from "@/components/site/fireflies";
import { Reveal } from "@/components/site/reveal";

export function CtaBanner({
  title = "Vamos conhecer a Pirilampo de pertinho?",
  text = "Agende uma visita ou fale com a gente pelo WhatsApp. Será um prazer receber a sua família.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <Section>
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-sky via-sky-deep to-[#2f7fb8] px-6 py-16 text-center shadow-[0_30px_80px_-30px_rgba(61,146,207,0.6)] sm:px-12">
            <Fireflies count={12} />
            <div
              aria-hidden
              className="absolute -right-10 -top-10 size-48 rounded-full bg-glow/30 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-12 -left-10 size-48 rounded-full bg-blossom/30 blur-3xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-3xl text-white sm:text-4xl">
                {title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
                {text}
              </p>
              <div className="mt-8 flex justify-center">
                <EnrollButton variant="glow" size="lg" />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
