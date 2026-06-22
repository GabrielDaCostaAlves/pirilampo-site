"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2, UploadCloud } from "lucide-react";
import { uploadToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/** Campo de upload de imagem única (Firebase Storage), com prévia e fallback
 *  para colar uma URL caso o Storage não esteja configurado. */

/** Dica de dimensão por tipo de imagem. A capa é cortada em 16:10; a foto
 *  da galeria mantém a proporção original (não corta). */
const SIZE_HINT: Record<"posts" | "gallery", string> = {
  posts: "Horizontal 16:10 — ideal 1600 × 1000 px",
  gallery: "Qualquer formato — lado maior de ~1600 px",
};

export function ImageUploader({
  value,
  onChange,
  folder,
  aspect = "aspect-[16/10]",
}: {
  value: string;
  onChange: (url: string) => void;
  folder: "posts" | "gallery";
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Selecione um arquivo de imagem.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("A imagem deve ter no máximo 5 MB.");
      return;
    }
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file, folder);
      onChange(url);
    } catch {
      setError("Não foi possível enviar a imagem. Verifique o Cloudinary.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      {value ? (
        <div className={cn("group relative overflow-hidden rounded-2xl border border-line", aspect)}>
          <Image src={value} alt="Prévia" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-ink/70 text-white opacity-0 transition-opacity hover:bg-destructive group-hover:opacity-100"
            aria-label="Remover imagem"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading || !isCloudinaryConfigured}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-cloud text-ink-soft transition-colors hover:border-sky hover:text-sky-deep disabled:cursor-not-allowed disabled:opacity-60",
            aspect,
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="size-7 animate-spin" />
              <span className="text-sm font-semibold">Enviando…</span>
            </>
          ) : (
            <>
              <UploadCloud className="size-7" />
              <span className="text-sm font-semibold">Clique para enviar uma imagem</span>
              <span className="text-xs font-medium text-sky-deep">{SIZE_HINT[folder]}</span>
              <span className="text-xs">JPG ou PNG, até 5 MB</span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {!value && (
        <div className="flex items-center gap-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-cloud text-ink-soft">
            <ImagePlus className="size-4" />
          </span>
          <Input
            type="url"
            placeholder="ou cole o link de uma imagem (https://…)"
            defaultValue=""
            onBlur={(e) => {
              const v = e.target.value.trim();
              if (v) onChange(v);
            }}
          />
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
