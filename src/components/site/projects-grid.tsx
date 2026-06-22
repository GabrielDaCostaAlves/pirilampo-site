import { Reveal } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
import { PROJECTS } from "@/lib/constants";

const tones = ["sky", "blossom", "glow", "sky", "blossom", "glow"] as const;

export function ProjectsGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {PROJECTS.map((p, i) => (
        <Reveal as="div" key={p.title} delay={i * 0.06}>
          <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-30px_rgba(33,48,74,0.4)]">
            <span
              aria-hidden
              className="absolute -right-8 -top-8 size-24 rounded-full bg-glow/10 transition-transform duration-500 group-hover:scale-125"
            />
            <Badge tone={tones[i % tones.length]} className="self-start">
              {p.tag}
            </Badge>
            <h3 className="mt-4 text-xl text-ink">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
              {p.text}
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
