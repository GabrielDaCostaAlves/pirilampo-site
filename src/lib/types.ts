export type PostStatus = "draft" | "published";

export type EnrollmentStatus = "open" | "closed" | "soon";

/** O que a publicação é, no mural "Momentos":
 *  - aviso: recado curto (sem foto/texto longo obrigatórios)
 *  - evento: tem data do evento e aparece em "Próximos eventos"
 *  - momento: recap com foto do que já aconteceu (o padrão) */
export type PostKind = "aviso" | "evento" | "momento";

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  status: PostStatus;
  kind: PostKind;
  /** Data em que o evento acontece (epoch ms) — apenas para kind "evento". */
  eventDate?: number;
  createdAt: number; // epoch ms
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
  createdAt?: number;
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  address: string;
  /** Código de incorporação (embed) de um widget de feed do Instagram —
   *  ex.: SnapWidget. Pode ser o <iframe> completo ou só a URL do src.
   *  Vazio = a seção mostra as fotos da galeria. */
  instagramWidget: string;
  /** Situação atual das matrículas, controlada pelo painel. */
  enrollmentStatus: EnrollmentStatus;
  /** Recado opcional sobre as matrículas (ex.: "Abrem em fevereiro").
   *  Aparece abaixo do selo de situação. */
  enrollmentNote: string;
}
