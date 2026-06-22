import Image from "next/image";
import { cn } from "@/lib/utils";

const accents: Record<string, { ring: string; chip: string; glow: string }> = {
  sky: { ring: "group-hover:border-sky", chip: "bg-sky/15 text-sky-deep", glow: "bg-sky/25" },
  blossom: {
    ring: "group-hover:border-blossom",
    chip: "bg-blossom/20 text-blossom-deep",
    glow: "bg-blossom/25",
  },
  glow: {
    ring: "group-hover:border-glow",
    chip: "bg-glow/25 text-glow-deep",
    glow: "bg-glow/30",
  },
};

export function SegmentCard({
  name,
  age,
  summary,
  color,
  image,
  className,
}: {
  name: string;
  age: string;
  summary: string;
  color: string;
  image: string;
  className?: string;
}) {
  const a = accents[color] ?? accents.sky;
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_10px_40px_-24px_rgba(33,48,74,0.25)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5",
        a.ring,
        className,
      )}
    >
      <div className="relative aspect-[5/3] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span
          className={cn(
            "absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold backdrop-blur",
            a.chip,
          )}
        >
          {age}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl text-ink">{name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{summary}</p>
      </div>
    </article>
  );
}
