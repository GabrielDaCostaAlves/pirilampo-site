"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import {
  addGalleryImage,
  deleteGalleryImage,
  getGallery,
} from "@/lib/firestore";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { GalleryImage } from "@/lib/types";
import { ImageUploader } from "@/components/admin/image-uploader";

export default function AdminGaleriaPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState("");
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      setImages(await getGallery());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onAdd(url: string) {
    if (!url) return;
    setPending(url);
    setAdding(true);
    try {
      const id = await addGalleryImage(url);
      setImages((prev) => [{ id, imageUrl: url, createdAt: Date.now() }, ...prev]);
      setPending("");
    } catch {
      alert("Não foi possível adicionar a imagem.");
    } finally {
      setAdding(false);
    }
  }

  async function onDelete(img: GalleryImage) {
    if (!confirm("Remover esta foto da galeria?")) return;
    setDeletingId(img.id);
    try {
      await deleteGalleryImage(img.id);
      setImages((prev) => prev.filter((i) => i.id !== img.id));
    } catch {
      alert("Não foi possível remover a imagem.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <h1 className="text-3xl text-ink">Galeria</h1>
        <p className="mt-1 text-ink-soft">
          Adicione e remova as fotos que aparecem na página de galeria do site.
        </p>
      </header>

      {!isFirebaseConfigured && (
        <p className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Exibindo fotos de demonstração. Conecte o Firebase para gerenciar a
          galeria de verdade.
        </p>
      )}

      {/* Adicionar */}
      <div className="mb-10 rounded-3xl border border-line bg-white p-6 shadow-soft">
        <h2 className="mb-4 font-semibold text-ink">Adicionar nova foto</h2>
        <div className="max-w-md">
          <ImageUploader
            value={pending}
            onChange={onAdd}
            folder="gallery"
            aspect="aspect-[4/3]"
          />
        </div>
        {adding && (
          <p className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
            <Loader2 className="size-4 animate-spin" /> Adicionando…
          </p>
        )}
      </div>

      {/* Lista */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-7 animate-spin text-sky" />
        </div>
      ) : images.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-line bg-white py-20 text-center text-ink-soft">
          Nenhuma foto na galeria ainda.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-line bg-cloud"
            >
              <Image
                src={img.imageUrl}
                alt="Foto da galeria"
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => onDelete(img)}
                disabled={deletingId === img.id}
                aria-label="Remover foto"
                className="absolute right-2 top-2 inline-flex size-9 items-center justify-center rounded-full bg-ink/70 text-white opacity-0 transition-opacity hover:bg-destructive group-hover:opacity-100"
              >
                {deletingId === img.id ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Trash2 className="size-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
