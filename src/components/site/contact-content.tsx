"use client";

import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container, Section } from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { EnrollButton } from "@/components/site/enroll-button";
import { useSettings } from "@/components/site/settings-provider";
import { whatsappLink } from "@/lib/utils";
import { WHATSAPP_ENROLL_MESSAGE } from "@/lib/constants";

export function ContactContent() {
  const s = useSettings();
  const mapsQuery = encodeURIComponent(s.address);

  const cards = [
    {
      icon: MapPin,
      label: "Endereço",
      value: s.address,
      action: {
        href: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
        text: "Ver no mapa",
      },
      tone: "bg-sky/12 text-sky-deep",
    },
    {
      icon: Phone,
      label: "Telefone",
      value: s.phone,
      action: { href: `tel:${s.phone.replace(/\D/g, "")}`, text: "Ligar agora" },
      tone: "bg-glow/20 text-glow-deep",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: s.phone,
      action: {
        href: whatsappLink(s.whatsapp, WHATSAPP_ENROLL_MESSAGE),
        text: "Enviar mensagem",
        external: true,
      },
      tone: "bg-emerald-100 text-emerald-700",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: `@${s.instagram}`,
      action: {
        href: `https://instagram.com/${s.instagram}`,
        text: "Seguir perfil",
        external: true,
      },
      tone: "bg-blossom/20 text-blossom-deep",
    },
  ];

  return (
    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Cartões de contato */}
          <div className="grid gap-5 sm:grid-cols-2">
            {cards.map((c, i) => (
              <Reveal as="div" key={c.label} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft">
                  <span
                    className={`flex size-12 items-center justify-center rounded-2xl ${c.tone}`}
                  >
                    <c.icon className="size-6" aria-hidden />
                  </span>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-ink-soft">
                    {c.label}
                  </p>
                  <p className="mt-1 flex-1 text-base font-semibold text-ink">
                    {c.value}
                  </p>
                  <a
                    href={c.action.href}
                    target={c.action.external ? "_blank" : undefined}
                    rel={c.action.external ? "noopener noreferrer" : undefined}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-deep hover:underline"
                  >
                    {c.action.text}
                  </a>
                </div>
              </Reveal>
            ))}
            <Reveal as="div" delay={0.24} className="sm:col-span-2">
              <div className="flex flex-col items-start gap-4 rounded-3xl bg-gradient-to-br from-sky/10 to-blossom/10 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-lg font-semibold text-ink">
                    Pronto para fazer parte?
                  </p>
                  <p className="text-sm text-ink-soft">
                    Fale com a gente sobre matrículas.
                  </p>
                </div>
                <EnrollButton size="default" />
              </div>
            </Reveal>
          </div>

          {/* Mapa */}
          <Reveal delay={0.1}>
            <div className="h-full min-h-80 overflow-hidden rounded-3xl border-4 border-white shadow-soft">
              <iframe
                title="Mapa da Escola Pirilampo"
                src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                className="h-full min-h-80 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="blossom">
              <a
                href={`https://instagram.com/${s.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="size-5" /> Instagram
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={`tel:${s.phone.replace(/\D/g, "")}`}>
                <Phone className="size-5" /> {s.phone}
              </a>
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
