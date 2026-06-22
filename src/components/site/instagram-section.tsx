"use client";

import { Instagram } from "lucide-react";
import { Container, Section } from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/components/site/settings-provider";

/** Extrai a URL do src de um código de widget — aceita o <iframe> inteiro
 *  ou apenas a URL colada diretamente. Devolve null se não houver nada. */
function widgetSrc(raw: string | undefined): string | null {
  const v = (raw ?? "").trim();
  if (!v) return null;
  const match = v.match(/src=["']([^"']+)["']/i);
  if (match) return match[1];
  if (/^https?:\/\//i.test(v)) return v;
  return null;
}

/** "Acompanhe nosso dia a dia" — leva ao perfil do Instagram.
 *  Se houver um widget configurado (SnapWidget etc.), exibe o feed real e
 *  ao vivo. Caso contrário, mostra as fotos da galeria como prévia. */
export function InstagramSection({
  images = [],
}: {
  images?: string[];
}) {
  const { instagram, instagramWidget } = useSettings();
  const handle = `@${instagram}`;
  const profileUrl = `https://instagram.com/${instagram}`;
  const feedSrc = widgetSrc(instagramWidget);

  const tiles: (string | null)[] = images.length
    ? images.slice(0, 6)
    : Array.from({ length: 6 }, () => null);

  return (
    <Section className="bg-cloud">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <span className="eyebrow mb-4">
              <Instagram className="size-3.5" />
              Instagram
            </span>
            <h2 className="text-balance text-3xl sm:text-4xl">
              Acompanhe nosso dia a dia
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">
              Fotos, recados e os melhores momentos da Pirilampo, sempre
              fresquinhos no nosso perfil. Siga {handle} e fique por dentro de
              tudo.
            </p>
            <div className="mt-8">
              <Button asChild variant="blossom" size="lg">
                <a href={profileUrl} target="_blank" rel="noopener noreferrer">
                  <Instagram className="size-5" />
                  Seguir {handle}
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {feedSrc ? (
              <iframe
                src={feedSrc}
                title={`Feed do Instagram ${handle}`}
                loading="lazy"
                scrolling="no"
                className="w-full rounded-2xl border border-line bg-white"
                style={{ border: "none", minHeight: 420, overflow: "hidden" }}
              />
            ) : (
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {tiles.map((src, i) =>
                src ? (
                  <a
                    key={i}
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square overflow-hidden rounded-2xl"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt="Publicação do Instagram"
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-500 group-hover:bg-ink/35 group-hover:opacity-100"
                    >
                      <Instagram className="size-7 text-white" />
                    </span>
                  </a>
                ) : (
                  <a
                    key={i}
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver no Instagram"
                    className="flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-sky/15 via-blossom/15 to-glow/20 transition-transform duration-500 hover:scale-[1.03]"
                  >
                    <Instagram className="size-7 text-ink/30" />
                  </a>
                ),
              )}
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
