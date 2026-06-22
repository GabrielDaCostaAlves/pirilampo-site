"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Camera,
  CalendarDays,
  Check,
  Loader2,
  Megaphone,
  Save,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/image-uploader";
import { createPost, updatePost } from "@/lib/firestore";
import { dateInputToMs, msToDateInput } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Post, PostKind, PostStatus } from "@/lib/types";

type FormState = {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  kind: PostKind;
  eventDate: string; // "YYYY-MM-DD"
};

const KINDS: { value: PostKind; label: string; hint: string; icon: typeof Camera }[] = [
  { value: "aviso", label: "Aviso", hint: "Recado curto", icon: Megaphone },
  { value: "evento", label: "Evento", hint: "Tem data", icon: CalendarDays },
  { value: "momento", label: "Momento", hint: "Recap com foto", icon: Camera },
];

export function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const editing = Boolean(post);
  const [form, setForm] = useState<FormState>({
    title: post?.title ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    coverImage: post?.coverImage ?? "",
    kind: post?.kind ?? "momento",
    eventDate: msToDateInput(post?.eventDate),
  });
  const [saving, setSaving] = useState<PostStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormState) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }) as FormState);

  const setKind = (value: PostKind) => setForm((f) => ({ ...f, kind: value }));

  const { kind } = form;
  const isMomento = kind === "momento";
  const isEvento = kind === "evento";
  const isAviso = kind === "aviso";

  const excerptLabel = isAviso ? "Mensagem" : isEvento ? "Descrição" : "Resumo";

  function validate(): string | null {
    if (!form.title.trim()) return "Dê um título.";
    if (!form.excerpt.trim())
      return isAviso
        ? "Escreva a mensagem do aviso."
        : "Escreva um resumo curto.";
    if (isEvento && !form.eventDate) return "Escolha a data do evento.";
    if (isMomento) {
      if (!form.coverImage.trim()) return "Adicione uma imagem de capa.";
      if (!form.content.trim()) return "Escreva o texto da publicação.";
    }
    return null;
  }

  async function save(status: PostStatus) {
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setSaving(status);
    try {
      const payload = {
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        coverImage: form.coverImage.trim(),
        status,
        kind,
        ...(isEvento ? { eventDate: dateInputToMs(form.eventDate) } : {}),
      };
      if (editing && post) {
        await updatePost(post.id, payload);
      } else {
        await createPost(payload);
      }
      router.push("/admin/posts");
      router.refresh();
    } catch {
      setError("Não foi possível salvar. Verifique a conexão com o Firebase.");
      setSaving(null);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/posts"
        className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink"
      >
        <ArrowLeft className="size-4" />
        Voltar para publicações
      </Link>

      <h1 className="mt-4 text-3xl text-ink">
        {editing ? "Editar publicação" : "Nova publicação"}
      </h1>
      <p className="mt-1 text-ink-soft">
        Escolha o tipo e preencha os campos. Você pode salvar como rascunho e
        publicar depois.
      </p>

      <div className="mt-8 space-y-6 rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8">
        {/* Tipo da publicação */}
        <div>
          <Label>Tipo</Label>
          <div className="mt-1 grid grid-cols-3 gap-2">
            {KINDS.map((k) => {
              const active = kind === k.value;
              return (
                <button
                  key={k.value}
                  type="button"
                  onClick={() => setKind(k.value)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl border-2 px-2 py-3 text-center transition-colors",
                    active
                      ? "border-sky bg-sky/10 text-sky-deep"
                      : "border-line text-ink-soft hover:border-sky/50 hover:text-ink",
                  )}
                  aria-pressed={active}
                >
                  <k.icon className="size-5" />
                  <span className="text-sm font-semibold">{k.label}</span>
                  <span className="text-[0.7rem] leading-none">{k.hint}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => set("title")(e.target.value)}
            placeholder={
              isAviso
                ? "Ex.: Não haverá aula na sexta (feriado)"
                : isEvento
                  ? "Ex.: Festival de Talentos Pirilampo"
                  : "Ex.: Nossa Festa Junina foi pura alegria"
            }
            maxLength={120}
          />
        </div>

        {isEvento && (
          <div>
            <Label htmlFor="eventDate">Data do evento</Label>
            <Input
              id="eventDate"
              type="date"
              value={form.eventDate}
              onChange={(e) => set("eventDate")(e.target.value)}
              className="max-w-xs"
            />
            <p className="mt-1 text-xs text-ink-soft">
              Eventos com data futura aparecem em “Próximos eventos”.
            </p>
          </div>
        )}

        <div>
          <Label htmlFor="excerpt">{excerptLabel}</Label>
          <Textarea
            id="excerpt"
            value={form.excerpt}
            onChange={(e) => set("excerpt")(e.target.value)}
            placeholder={
              isAviso
                ? "O recado completo, em uma ou duas frases."
                : "Uma ou duas frases que aparecem na listagem."
            }
            rows={isAviso ? 3 : 2}
            maxLength={280}
          />
          <p className="mt-1 text-right text-xs text-ink-soft">
            {form.excerpt.length}/280
          </p>
        </div>

        <div>
          <Label>
            {isMomento ? "Imagem de capa" : "Imagem (opcional)"}
          </Label>
          <ImageUploader
            value={form.coverImage}
            onChange={set("coverImage")}
            folder="posts"
          />
        </div>

        {!isAviso && (
          <div>
            <Label htmlFor="content">
              {isMomento ? "Texto completo" : "Texto completo (opcional)"}
            </Label>
            <Textarea
              id="content"
              value={form.content}
              onChange={(e) => set("content")(e.target.value)}
              placeholder="Escreva o conteúdo. Separe os parágrafos com uma linha em branco."
              rows={12}
            />
            <p className="mt-1 text-xs text-ink-soft">
              Dica: deixe uma linha em branco entre os parágrafos.
            </p>
          </div>
        )}

        {error && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={() => save("draft")}
            disabled={saving !== null}
          >
            {saving === "draft" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            Salvar rascunho
          </Button>
          <Button
            variant="glow"
            onClick={() => save("published")}
            disabled={saving !== null}
          >
            {saving === "published" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : editing && post?.status === "published" ? (
              <Check className="size-4" />
            ) : (
              <Send className="size-4" />
            )}
            {editing && post?.status === "published"
              ? "Salvar alterações"
              : "Publicar agora"}
          </Button>
        </div>
      </div>
    </div>
  );
}
