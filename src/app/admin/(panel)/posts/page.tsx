"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Eye,
  Loader2,
  Pencil,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { deletePost, getAllPosts } from "@/lib/firestore";
import type { Post, PostKind } from "@/lib/types";
import { formatDateShort } from "@/lib/utils";

const KIND_BADGE: Record<PostKind, { label: string; tone: "glow" | "sky" | "neutral" }> = {
  aviso: { label: "Aviso", tone: "glow" },
  evento: { label: "Evento", tone: "sky" },
  momento: { label: "Momento", tone: "neutral" },
};
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isFirebaseConfigured } from "@/lib/firebase";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      setPosts(await getAllPosts());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(post: Post) {
    if (!confirm(`Excluir a publicação "${post.title}"? Esta ação não pode ser desfeita.`))
      return;
    setDeletingId(post.id);
    try {
      await deletePost(post.id);
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch {
      alert("Não foi possível excluir. Tente novamente.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl text-ink">Publicações</h1>
          <p className="mt-1 text-ink-soft">
            Os momentos que aparecem no site para as famílias.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <PlusCircle className="size-4" />
            Nova publicação
          </Link>
        </Button>
      </header>

      {!isFirebaseConfigured && (
        <p className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Exibindo conteúdo de demonstração. Conecte o Firebase para criar e
          editar publicações de verdade.
        </p>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-7 animate-spin text-sky" />
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-line bg-white py-20 text-center">
          <p className="text-ink-soft">Nenhuma publicação ainda.</p>
          <Button asChild className="mt-4">
            <Link href="/admin/posts/new">
              <PlusCircle className="size-4" />
              Criar a primeira
            </Link>
          </Button>
        </div>
      ) : (
        <ul className="space-y-3">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-3 sm:flex-row sm:items-center"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-cloud sm:size-20 sm:shrink-0">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={KIND_BADGE[post.kind].tone}>
                    {KIND_BADGE[post.kind].label}
                  </Badge>
                  <Badge tone={post.status === "published" ? "green" : "amber"}>
                    {post.status === "published" ? "Publicado" : "Rascunho"}
                  </Badge>
                  <span className="text-xs text-ink-soft">
                    {post.kind === "evento" && post.eventDate
                      ? `Evento: ${formatDateShort(post.eventDate)}`
                      : formatDateShort(post.createdAt)}
                  </span>
                </div>
                <p className="mt-1 truncate font-semibold text-ink">
                  {post.title}
                </p>
                <p className="truncate text-sm text-ink-soft">{post.excerpt}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                {post.status === "published" && (
                  <Button asChild variant="ghost" size="icon" aria-label="Ver no site">
                    <Link href={`/momentos/${post.id}`} target="_blank">
                      <Eye className="size-4" />
                    </Link>
                  </Button>
                )}
                <Button asChild variant="ghost" size="icon" aria-label="Editar">
                  <Link href={`/admin/posts/${post.id}`}>
                    <Pencil className="size-4" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Excluir"
                  onClick={() => onDelete(post)}
                  disabled={deletingId === post.id}
                  className="text-destructive hover:bg-destructive/10"
                >
                  {deletingId === post.id ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
