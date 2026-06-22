import { Icon } from "@/components/site/icon";
import { Reveal } from "@/components/site/reveal";
import { DIFFERENTIALS } from "@/lib/constants";

export function DifferentialsGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {DIFFERENTIALS.map((d, i) => (
        <Reveal as="div" key={d.title} delay={i * 0.06}>
          <div className="group h-full rounded-3xl border border-line bg-white p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-sky/40 hover:shadow-[0_24px_60px_-30px_rgba(33,48,74,0.4)]">
            <span className="flex size-13 items-center justify-center rounded-2xl bg-gradient-to-br from-sky/15 to-blossom/15 text-sky-deep transition-transform duration-500 group-hover:scale-110">
              <Icon name={d.icon} className="size-6" />
            </span>
            <h3 className="mt-5 text-lg text-ink">{d.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
