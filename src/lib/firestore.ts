import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  type DocumentData,
} from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "./firebase";
import { DEFAULT_SETTINGS } from "./constants";
import {
  FALLBACK_GALLERY,
  FALLBACK_POSTS,
} from "./fallback-data";
import type {
  GalleryImage,
  Post,
  PostKind,
  PostStatus,
  SiteSettings,
} from "./types";

const SETTINGS_DOC = "site";

function toMillis(value: unknown): number {
  if (value instanceof Timestamp) return value.toMillis();
  if (typeof value === "number") return value;
  if (typeof value === "string") return new Date(value).getTime();
  return Date.now();
}

/** Remove chaves com valor `undefined` — o Firestore não as aceita. */
function clean<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as T;
}

function mapPost(id: string, data: DocumentData): Post {
  return {
    id,
    title: data.title ?? "",
    excerpt: data.excerpt ?? "",
    content: data.content ?? "",
    coverImage: data.coverImage ?? "",
    status: (data.status as PostStatus) ?? "draft",
    kind: (data.kind as PostKind) ?? "momento",
    eventDate: data.eventDate != null ? toMillis(data.eventDate) : undefined,
    createdAt: toMillis(data.createdAt),
  };
}

/* ──────────────────────────── Configurações ─────────────────────────── */

export async function getSettings(): Promise<SiteSettings> {
  const db = getDb();
  if (!db) return DEFAULT_SETTINGS;
  try {
    const snap = await getDoc(doc(db, "settings", SETTINGS_DOC));
    if (!snap.exists()) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...(snap.data() as Partial<SiteSettings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase não configurado.");
  await setDoc(doc(db, "settings", SETTINGS_DOC), settings, { merge: true });
}

/* ────────────────────────────── Publicações ─────────────────────────── */

/** Apenas publicações com status "published", mais recentes primeiro. */
export async function getPublishedPosts(): Promise<Post[]> {
  const db = getDb();
  if (!db) return FALLBACK_POSTS.filter((p) => p.status === "published");
  try {
    // Só o filtro de igualdade (status): usa o índice automático de campo
    // único e NÃO exige índice composto no Firestore. A ordenação por data
    // é feita aqui, no código (a quantidade de posts é pequena).
    const q = query(collection(db, "posts"), where("status", "==", "published"));
    const snap = await getDocs(q);
    if (snap.empty) return [];
    return snap.docs
      .map((d) => mapPost(d.id, d.data()))
      .sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return FALLBACK_POSTS.filter((p) => p.status === "published");
  }
}

/** Todas as publicações (rascunhos + publicadas) — uso administrativo. */
export async function getAllPosts(): Promise<Post[]> {
  const db = getDb();
  if (!db) return FALLBACK_POSTS;
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => mapPost(d.id, d.data()));
}

export async function getPost(id: string): Promise<Post | null> {
  const db = getDb();
  if (!db) return FALLBACK_POSTS.find((p) => p.id === id) ?? null;
  try {
    const snap = await getDoc(doc(db, "posts", id));
    if (!snap.exists()) return null;
    return mapPost(snap.id, snap.data());
  } catch {
    return FALLBACK_POSTS.find((p) => p.id === id) ?? null;
  }
}

export type PostInput = Omit<Post, "id" | "createdAt">;

export async function createPost(input: PostInput): Promise<string> {
  const db = getDb();
  if (!db) throw new Error("Firebase não configurado.");
  const docRef = await addDoc(collection(db, "posts"), {
    ...clean(input),
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updatePost(
  id: string,
  input: Partial<PostInput>,
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase não configurado.");
  await updateDoc(doc(db, "posts", id), clean(input));
}

export async function deletePost(id: string): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase não configurado.");
  await deleteDoc(doc(db, "posts", id));
}

/* ─────────────────────────────── Galeria ────────────────────────────── */

export async function getGallery(): Promise<GalleryImage[]> {
  const db = getDb();
  if (!db) return FALLBACK_GALLERY;
  try {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    if (snap.empty) return [];
    return snap.docs.map((d) => ({
      id: d.id,
      imageUrl: d.data().imageUrl ?? "",
      createdAt: toMillis(d.data().createdAt),
    }));
  } catch {
    return FALLBACK_GALLERY;
  }
}

export async function addGalleryImage(imageUrl: string): Promise<string> {
  const db = getDb();
  if (!db) throw new Error("Firebase não configurado.");
  const docRef = await addDoc(collection(db, "gallery"), {
    imageUrl,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function deleteGalleryImage(id: string): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Firebase não configurado.");
  await deleteDoc(doc(db, "gallery", id));
  // A imagem em si fica hospedada no Cloudinary; remover o registro do
  // Firestore já a tira do site. (O Cloudinary não permite exclusão pelo
  // navegador sem assinatura, então o arquivo permanece lá, sem custo.)
}

export { isFirebaseConfigured };
