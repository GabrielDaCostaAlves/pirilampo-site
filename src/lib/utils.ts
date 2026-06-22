import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formata uma data (Date | timestamp ms) para pt-BR. */
export function formatDate(value: Date | number | string): string {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Versão curta da data (dd/mm/aaaa). */
export function formatDateShort(value: Date | number | string): string {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

/** Data do evento de forma compacta (ex.: "28 de jun"), sem o ano. */
export function formatEventDate(value: Date | number | string): string {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  })
    .format(date)
    .replace(".", "");
}

/** Converte o valor de um <input type="date"> ("YYYY-MM-DD") em epoch ms. */
export function dateInputToMs(value: string): number | undefined {
  if (!value) return undefined;
  const ms = new Date(`${value}T12:00:00`).getTime();
  return Number.isNaN(ms) ? undefined : ms;
}

/** Converte epoch ms em "YYYY-MM-DD" para preencher um <input type="date">. */
export function msToDateInput(value?: number): string {
  if (!value) return "";
  const d = new Date(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Constrói o link do WhatsApp com mensagem pré-preenchida. */
export function whatsappLink(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
