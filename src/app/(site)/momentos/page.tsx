import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Megaphone } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import {
  Container,
  Section,
  SectionHeading,
} from "@/components/site/layout-primitives";
import { PostCard } from "@/components/site/post-card";
import { Reveal } from "@/components/site/reveal";
import { CtaBanner } from "@/components/site/cta-banner";
import { getPublishedPosts } from "@/lib/firestore";
import { formatDate, formatEventDate } from "@/lib/utils";
import type { Post } from "@/lib/types";

export const metadata: Metadata = {
  title: "Momentos Pirilampo",
  description:
    "Avisos, próximos eventos e os melhores momentos da Escola Pirilampo em Itabatã, Mucuri-BA.",
};

export const revalidate = 60;

export default async function MomentosPage() {
  const posts = await getPublishedPosts();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const today = startOfToday.getTime();

  const upcoming = posts
    .filter((p) => p.kind === "evento" && p.eventDate && p.eventDate >= today)
    .sort((a, b) => (a.eventDate ?? 0) - (b.eventDate ?? 0));

  const avisos = posts.filter((p) => p.kind === "aviso");

  const momentos = posts.filter(
    (p) =>
      p.kind === "momento" ||
      (p.kind === "evento" && (!p.eventDate || p.eventDate < today)),
  );

  const isEmpty =
    upcoming.length === 0 && avisos.length === 0 && momentos.length === 0;

  return (
    <>
      <PageHeader
        eyebrow="Momentos Pirilampo"
        title="O mural da nossa escola"
        description="Avisos importantes, os próximos eventos e as lembranças que a gente faz questão de guardar. Tudo em um só lugar."
      />

      {/* Próximos eventos */}
      {upcoming.length > 0 && (
        <Section>
          <Container>
            <SectionHeading
              align="left"
              eyebrow="Agenda"
              title="Próximos eventos"
              description="Anote na agenda e venha participar com a gente."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {upcoming.map((e, i) => (
                <Reveal as="div" key={e.id} delay={(i % 2) * 0.08}>
                  <EventCard post={e} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Avisos */}
      {avisos.length > 0 && (
        <Section className="bg-cloud">
          <Container>
            <SectionHeading
              align="left"
              eyebrow="Fique por dentro"
              title="Avisos"
              description="Recados rápidos para as famílias."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {avisos.map((a, i) => (
                <Reveal as="div" key={a.id} delay={(i % 3) * 0.08}>
                  <NoticeCard post={a} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Momentos (recaps) */}
      {momentos.length > 0 && (
        <Section>
          <Container>
            <SectionHeading
              align="left"
              eyebrow="Lembranças"
              title="Momentos"
              description="O dia a dia que vira lembrança: festas, projetos e conquistas."
            />
            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {momentos.map((post, i) => (
                <Reveal as="div" key={post.id} delay={(i % 3) * 0.08}>
                  <PostCard post={post} priority={i < 3} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {isEmpty && (
        <Section>
          <Container>
            <div className="rounded-3xl border border-dashed border-line bg-cloud py-20 text-center">
              <p className="text-lg text-ink-soft">
                Em breve, novidades por aqui. Fique de olho! 💛
              </p>
            </div>
          </Container>
        </Section>
      )}

      <CtaBanner />
    </>
  );
}

/** Cartão de evento futuro: bloco de data + título + descrição. */
function EventCard({ post }: { post: Post }) {
  const date = post.eventDate ? new Date(post.eventDate) : null;
  const day = date ? String(date.getDate()).padStart(2, "0") : "";
  const month = date
    ? new Intl.DateTimeFormat("pt-BR", { month: "short" })
        .format(date)
        .replace(".", "")
        .toUpperCase()
    : "";

  return (
    <Link
      href={`/momentos/${post.id}`}
      className="group flex h-full gap-4 rounded-3xl border border-line bg-white p-5 shadow-[0_10px_40px_-22px_rgba(33,48,74,0.25)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-26px_rgba(33,48,74,0.4)]"
    >
      <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-sky/12 text-sky-deep">
        <span className="font-display text-2xl font-bold leading-none">
          {day}
        </span>
        <span className="text-[0.65rem] font-bold tracking-wide">{month}</span>
      </div>
      <div className="min-w-0 flex-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky/12 px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide text-sky-deep">
          <CalendarDays className="size-3" />
          {date ? formatEventDate(date) : "Evento"}
        </span>
        <h3 className="mt-2 text-lg leading-snug text-ink transition-colors group-hover:text-sky-deep">
          {post.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {post.excerpt}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sky-deep">
          Ver detalhes
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

/** Cartão de aviso: recado curto, em destaque, sem foto. */
function NoticeCard({ post }: { post: Post }) {
  return (
    <div className="flex h-full gap-3 rounded-2xl border border-glow-deep/30 bg-glow/10 p-5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-glow/30 text-glow-deep">
        <Megaphone className="size-4.5" />
      </span>
      <div className="min-w-0">
        <p className="font-display text-base font-semibold leading-snug text-ink">
          {post.title}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
          {post.excerpt}
        </p>
        <p className="mt-2 text-xs font-medium text-ink-soft/80">
          {formatDate(post.createdAt)}
        </p>
      </div>
    </div>
  );
}
