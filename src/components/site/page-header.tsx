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
      <Container className="relative py-10 text-center sm:py-14 lg:py-16">
        <span className="eyebrow mb-4">
          <span className="inline-block size-1.5 rounded-full bg-glow-deep" />
          {eyebrow}
        </span>
        <h1 className="mx-auto max-w-3xl text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl">
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
