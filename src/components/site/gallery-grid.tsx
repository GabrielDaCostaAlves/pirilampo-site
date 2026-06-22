"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";

export function GalleryGrid({
  images,
  className,
}: {
  images: GalleryImage[];
  className?: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? i : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  return (
    <>
      <div
        className={cn(
          "columns-2 gap-4 [column-fill:_balance] sm:columns-3 lg:columns-4",
          className,
        )}
      >
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActive(i)}
            className="group mb-4 block w-full overflow-hidden rounded-2xl border border-line bg-cloud focus-visible:ring-2 focus-visible:ring-sky"
          >
            <Image
              src={img.imageUrl}
              alt="Foto da Escola Pirilampo"
              width={500}
              height={500}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="h-auto w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de imagem"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <X />
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Anterior"
                className="absolute left-3 flex size-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:left-6"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Próxima"
                className="absolute right-3 flex size-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:right-6"
              >
                <ChevronRight />
              </button>
            </>
          )}
          <div
            className="relative max-h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active].imageUrl}
              alt="Foto da Escola Pirilampo"
              width={1400}
              height={1000}
              className="mx-auto max-h-[85vh] w-auto rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
