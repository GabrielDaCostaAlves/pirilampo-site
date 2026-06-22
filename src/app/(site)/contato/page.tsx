import type { Metadata } from "next";
import { PageHeader } from "@/components/site/page-header";
import { ContactContent } from "@/components/site/contact-content";
import { FaqSection } from "@/components/site/faq-section";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Escola e Creche Pirilampo em Itabatã, Mucuri-BA. Endereço, telefone, WhatsApp, Instagram e mapa.",
};

export default function ContatoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contato"
        title="Vamos conversar?"
        description="Estamos por perto e prontos para receber a sua família. Escolha o melhor jeito de falar com a gente."
      />
      <ContactContent />
      <FaqSection />
    </>
  );
}
