/** Upload de imagens via Cloudinary (plano gratuito, sem cartão).
 *  Usado no lugar do Firebase Storage. O envio é "unsigned": acontece
 *  direto do navegador usando um upload preset, sem expor segredos.
 *  O Firestore continua guardando apenas a URL devolvida aqui. */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const isCloudinaryConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET);

/** Envia um arquivo para o Cloudinary e devolve a URL pública (https). */
export async function uploadToCloudinary(
  file: File,
  folder: "posts" | "gallery",
): Promise<string> {
  if (!isCloudinaryConfigured) {
    throw new Error("Cloudinary não configurado.");
  }

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET as string);
  form.append("folder", `pirilampo/${folder}`);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: form },
  );

  if (!res.ok) {
    throw new Error("Falha no upload para o Cloudinary.");
  }

  const data = (await res.json()) as { secure_url?: string };
  if (!data.secure_url) {
    throw new Error("Resposta inesperada do Cloudinary.");
  }
  return data.secure_url;
}
