import type { EnrollmentStatus, SiteSettings } from "./types";

export interface EnrollmentInfo {
  status: EnrollmentStatus;
  /** true apenas quando as matrículas estão abertas. */
  isOpen: boolean;
  /** Rótulo curto para o selo (ex.: "Matrículas abertas"). */
  label: string;
  /** Linha de apoio — usa o recado do painel, se houver. */
  sub: string;
  emoji: string;
  /** Tom de cor da marca usado pelo selo. */
  tone: "open" | "soon" | "closed";
}

/** Traduz a situação das matrículas (definida no painel) em textos e cor.
 *  Mantém um único ponto de verdade usado pelo hero e pela chamada de
 *  matrícula, para que tudo mude junto ao alternar o status. */
export function enrollmentInfo(
  settings: Pick<SiteSettings, "enrollmentStatus" | "enrollmentNote">,
): EnrollmentInfo {
  const note = settings.enrollmentNote?.trim();

  switch (settings.enrollmentStatus) {
    case "closed":
      return {
        status: "closed",
        isOpen: false,
        label: "Matrículas encerradas",
        sub: note || "Em breve, novas turmas!",
        emoji: "🌙",
        tone: "closed",
      };
    case "soon":
      return {
        status: "soon",
        isOpen: false,
        label: "Matrículas em breve",
        sub: note || "Fique de olho para não perder!",
        emoji: "⏳",
        tone: "soon",
      };
    default:
      return {
        status: "open",
        isOpen: true,
        label: "Matrículas abertas",
        sub: note || "Venha nos visitar!",
        emoji: "🐝",
        tone: "open",
      };
  }
}
