"use client";

import Link from "next/link";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { useSettings } from "@/components/site/settings-provider";
import { NAV_LINKS, SITE, WHATSAPP_ENROLL_MESSAGE } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";
import { Fireflies } from "@/components/site/fireflies";

export function Footer() {
  const s = useSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="absolute inset-0 opacity-60">
        <Fireflies count={10} />
      </div>
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 h-48 w-[42rem] -translate-x-1/2 rounded-full bg-glow/15 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <Logo invert />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              Educação acolhedora e de excelência em {SITE.city}, {SITE.district}—
              {SITE.state}. Da creche ao 9º ano, cuidando para que cada criança
              brilhe.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={whatsappLink(s.whatsapp, WHATSAPP_ENROLL_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#25D366]"
              >
                <MessageCircle className="size-5" />
              </a>
              <a
                href={`https://instagram.com/${s.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-blossom"
              >
                <Instagram className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">
              Navegação
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-glow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/50">
              Contato
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-glow" />
                <span>{s.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-5 shrink-0 text-glow" />
                <a className="hover:text-glow" href={`tel:${s.phone.replace(/\D/g, "")}`}>
                  {s.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="size-5 shrink-0 text-glow" />
                <a
                  className="hover:text-glow"
                  href={`https://instagram.com/${s.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{s.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {SITE.name}. Feito com carinho.
          </p>
          <p>
            Desenvolvido por{" "}
            <a
              href="https://stayoff.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/70 transition-colors hover:text-glow"
            >
              Stay Off
            </a>
          </p>
          <Link href="/admin" className="inline-flex items-center gap-1.5 hover:text-white/80">
            <Mail className="size-3.5" />
            Acesso da equipe
          </Link>
        </div>
      </div>
    </footer>
  );
}
