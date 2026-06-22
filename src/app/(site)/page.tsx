import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Hero } from "@/components/site/home/hero";
import { Container, Section, SectionHeading } from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { SegmentCard } from "@/components/site/segment-card";
import { DifferentialsGrid } from "@/components/site/differentials-grid";
import { ProjectsGrid } from "@/components/site/projects-grid";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { PostCard } from "@/components/site/post-card";
import { InstagramSection } from "@/components/site/instagram-section";
import { CtaBanner } from "@/components/site/cta-banner";
import { EnrollButton } from "@/components/site/enroll-button";
import { EnrollmentBadge } from "@/components/site/enrollment-badge";
import { getGallery, getPublishedPosts } from "@/lib/firestore";
import { SEGMENTS, VALUES } from "@/lib/constants";
import { HERO_IMAGE, SEGMENT_IMAGES } from "@/lib/fallback-data";

export const revalidate = 60;

export default async function HomePage() {
  const [posts, gallery] = await Promise.all([
    getPublishedPosts(),
    getGallery(),
  ]);
  const latestPosts = posts.filter((p) => p.kind === "momento").slice(0, 3);
  const galleryPreview = gallery.slice(0, 8);

  return (
    <>
      <Hero image={HERO_IMAGE} />

      {/* Quem Somos */}
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -left-4 -top-4 size-24 rounded-full bg-blossom/20 blur-xl"
                />
                <div className="relative grid grid-cols-2 gap-4">
                  <Image
                    src={SEGMENT_IMAGES["educacao-infantil"]}
                    alt="Crianças em atividade na Pirilampo"
                    width={400}
                    height={500}
                    className="mt-8 aspect-[4/5] w-full rounded-3xl border-4 border-white object-cover shadow-soft"
                  />
                  <Image
                    src={SEGMENT_IMAGES["maternal"]}
                    alt="Momento de aprendizado lúdico"
                    width={400}
                    height={500}
                    className="aspect-[4/5] w-full rounded-3xl border-4 border-white object-cover shadow-soft"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <span className="eyebrow mb-4">
                <Heart className="size-3.5 fill-blossom text-blossom" />
                Quem somos
              </span>
              <h2 className="text-balance text-3xl leading-tight sm:text-4xl">
                Um segundo lar, onde aprender é{" "}
                <span className="glow-underline">brincar de crescer</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                A Escola e Creche Pirilampo nasceu do desejo de oferecer, em
                Itabatã, uma educação que une o cuidado de uma família ao rigor de
                uma escola de excelência. Como o pirilampo que ilumina a noite,
                acreditamos que cada criança carrega uma luz própria — e nosso
                papel é ajudá-la a brilhar.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {VALUES.map((v) => (
                  <div
                    key={v.title}
                    className="rounded-2xl border border-line bg-cloud/60 p-4"
                  >
                    <p className="font-display text-base font-semibold text-ink">
                      {v.title}
                    </p>
                    <p className="mt-1 text-sm leading-snug text-ink-soft">
                      {v.text}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button asChild variant="outline">
                  <Link href="/sobre">
                    Nossa história
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Segmentos */}
      <Section className="bg-cloud">
        <Container>
          <SectionHeading
            eyebrow="Segmentos de ensino"
            title="Um caminho completo, do colo ao 9º ano"
            description="Cada fase tem seu tempo, seu jeito e seu cuidado. Acompanhamos o desenvolvimento da criança em todas as etapas."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SEGMENTS.map((seg, i) => (
              <Reveal as="div" key={seg.slug} delay={i * 0.08}>
                <Link href={`/segmentos#${seg.slug}`} className="block h-full">
                  <SegmentCard
                    name={seg.name}
                    age={seg.age}
                    summary={seg.summary}
                    color={seg.color}
                    image={SEGMENT_IMAGES[seg.slug]}
                    className="h-full"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Diferenciais */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Por que a Pirilampo"
            title="Diferenciais que as famílias sentem todos os dias"
            description="Mais do que ensinar, cuidamos. Conheça o que torna a experiência Pirilampo especial."
          />
          <div className="mt-14">
            <DifferentialsGrid />
          </div>
        </Container>
      </Section>

      {/* Projetos */}
      <Section className="bg-cloud">
        <Container>
          <SectionHeading
            eyebrow="Projetos pedagógicos"
            title="Aprender com arte, cultura e emoção"
            description="Projetos que despertam talentos e dão sentido ao que se aprende em sala."
          />
          <div className="mt-14">
            <ProjectsGrid />
          </div>
        </Container>
      </Section>

      {/* Galeria em destaque */}
      {galleryPreview.length > 0 && (
        <Section>
          <Container>
            <SectionHeading
              eyebrow="Galeria"
              title="Cenas que valem mais que mil palavras"
              description="Um pedacinho do dia a dia colorido da nossa escola."
            />
            <div className="mt-14">
              <GalleryGrid images={galleryPreview} />
            </div>
            <div className="mt-10 flex justify-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/galeria">
                  Ver galeria completa
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Container>
        </Section>
      )}

      {/* Momentos Pirilampo */}
      {latestPosts.length > 0 && (
        <Section className="bg-cloud">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                align="left"
                eyebrow="Momentos Pirilampo"
                title="O que está acontecendo por aqui"
                description="Festas, projetos, conquistas e comunicados — acompanhe o dia a dia da escola."
              />
              <Button asChild variant="ghost" className="shrink-0">
                <Link href="/momentos">
                  Ver todos
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {latestPosts.map((post, i) => (
                <Reveal as="div" key={post.id} delay={i * 0.08}>
                  <PostCard post={post} priority={i === 0} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Instagram */}
      <InstagramSection images={gallery.slice(0, 6).map((g) => g.imageUrl)} />

      {/* Chamada para matrícula */}
      <div className="bg-cloud pb-4">
        <EnrollHero />
      </div>
      <CtaBanner />
    </>
  );
}

function EnrollHero() {
  return (
    <Section className="!pb-8">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <EnrollmentBadge className="mb-4" />
            <h2 className="text-balance text-3xl sm:text-4xl">
              Garanta a vaga do seu filho na Pirilampo
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
              É rápido: fale com a nossa equipe pelo WhatsApp e tire todas as suas
              dúvidas sobre vagas, valores e proposta pedagógica.
            </p>
            <div className="mt-8 flex justify-center">
              <EnrollButton size="lg" />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
