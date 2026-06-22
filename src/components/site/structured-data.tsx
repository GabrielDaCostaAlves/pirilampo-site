import { SITE, SEGMENTS } from "@/lib/constants";
import type { SiteSettings } from "@/lib/types";

/** Dados estruturados (JSON-LD) para SEO local em Itabatã/Mucuri-BA. */
export function StructuredData({ settings }: { settings: SiteSettings }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "School",
    "@id": `${SITE.url}/#escola`,
    name: SITE.name,
    alternateName: SITE.shortName,
    slogan: SITE.tagline,
    description:
      "Creche, Maternal, Educação Infantil e Ensino Fundamental (1º ao 9º ano) com ensino de excelência e acolhimento.",
    url: SITE.url,
    telephone: settings.phone,
    image: `${SITE.url}/logopirilampo.png`,
    logo: `${SITE.url}/logopirilampo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: SITE.city,
      addressRegion: SITE.state,
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "Itabatã" },
      { "@type": "City", name: "Mucuri" },
    ],
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      settings.address,
    )}`,
    // Horário típico — ajuste na secretaria conforme o funcionamento real.
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "07:00",
      closes: "17:30",
    },
    // Etapas de ensino oferecidas.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Segmentos de ensino",
      itemListElement: SEGMENTS.map((seg) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "EducationalOccupationalProgram",
          name: seg.name,
          description: seg.summary,
        },
      })),
    },
    sameAs: [`https://instagram.com/${settings.instagram}`],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
