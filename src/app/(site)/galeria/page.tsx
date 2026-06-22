import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { Container, Section } from "@/components/site/layout-primitives";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { CtaBanner } from "@/components/site/cta-banner";
import { getGallery } from "@/lib/firestore";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Fotos das atividades, projetos e ambientes da Escola e Creche Pirilampo, em Itabatã, Mucuri-BA.",
};

export const revalidate = 60;

export default async function GaleriaPage() {
  const images = await getGallery();

  return (
    <>
      <PageHeader
        eyebrow="Galeria"
        title="Nossos dias em imagens"
        description="Cada foto é uma lembrança do carinho, da alegria e das descobertas que vivemos juntos."
      />

      <Section>
        <Container>
          {images.length > 0 ? (
            <GalleryGrid images={images} />
          ) : (
            <div className="rounded-3xl border border-dashed border-line bg-cloud py-20 text-center">
              <p className="text-lg text-ink-soft">
                Em breve, novas fotos por aqui. 💛
              </p>
            </div>
          )}
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
