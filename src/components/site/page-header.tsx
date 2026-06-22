import { Container } from "@/components/site/layout-primitives";
import { Fireflies } from "@/components/site/fireflies";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden aurora">
      <Fireflies count={12} />
      <Container className="relative py-16 text-center sm:py-20">
        <span className="eyebrow mb-4">
          <span className="inline-block size-1.5 rounded-full bg-glow-deep" />
          {eyebrow}
        </span>
        <h1 className="mx-auto max-w-3xl text-balance text-4xl leading-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
