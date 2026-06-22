import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Container } from "@/components/site/layout-primitives";
import { Fireflies } from "@/components/site/fireflies";
import { PostCard } from "@/components/site/post-card";
import { CtaBanner } from "@/components/site/cta-banner";
import { getPost, getPublishedPosts } from "@/lib/firestore";
import { formatDate } from "@/lib/utils";
import { SITE } from "@/lib/constants";

export const revalidate = 60;

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return { title: "Momento não encontrado" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
      type: "article",
    },
  };
}

export default async function MomentoPage({ params }: Params) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post || post.status !== "published") notFound();

  const all = await getPublishedPosts();
  const related = all
    .filter((p) => p.id !== post.id && p.kind === "momento")
    .slice(0, 3);
  const paragraphs = post.content.split(/\n{2,}/).filter(Boolean);
  const isEvent = post.kind === "evento" && Boolean(post.eventDate);
  const kindLabel =
    post.kind === "evento"
      ? "Evento"
      : post.kind === "aviso"
        ? "Aviso"
        : null;

  return (
    <>
      <article>
        {/* Cabeçalho do post */}
        <header className="relative overflow-hidden aurora">
          <Fireflies count={10} />
          <Container className="relative max-w-3xl py-12 text-center sm:py-16">
            <Link
              href="/momentos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-deep transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-4" />
              Voltar para Momentos
            </Link>
            <p className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-ink-soft">
              {kindLabel && (
                <span className="rounded-full bg-sky/12 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-sky-deep">
                  {kindLabel}
                </span>
              )}
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4 text-glow-deep" />
                {isEvent
                  ? `Acontece em ${formatDate(post.eventDate!)}`
                  : formatDate(post.createdAt)}
              </span>
            </p>
            <h1 className="mt-3 text-balance text-3xl leading-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {post.excerpt}
            </p>
          </Container>
        </header>

        {/* Imagem de capa */}
        {post.coverImage && (
          <Container className="max-w-4xl">
            <div className="-mt-2 overflow-hidden rounded-[2rem] border-4 border-white shadow-soft">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={1200}
                height={750}
                priority
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </Container>
        )}

        {/* Texto */}
        <Container className="max-w-3xl py-14">
          <div className="space-y-6 text-lg leading-[1.8] text-ink/90">
            {paragraphs.length > 0 ? (
              paragraphs.map((p, i) => (
                <p key={i} className="first:first-letter:float-left first:first-letter:mr-2 first:first-letter:font-display first:first-letter:text-6xl first:first-letter:font-semibold first:first-letter:leading-[0.8] first:first-letter:text-sky-deep">
                  {p}
                </p>
              ))
            ) : (
              <p>{post.excerpt}</p>
            )}
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-line pt-8">
            <Link
              href="/momentos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-deep hover:text-ink"
            >
              <ArrowLeft className="size-4" />
              Todos os momentos
            </Link>
            <p className="text-sm text-ink-soft">{SITE.shortName}</p>
          </div>
        </Container>
      </article>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="bg-cloud py-20">
          <Container>
            <h2 className="text-center text-2xl sm:text-3xl">
              Outros momentos
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
