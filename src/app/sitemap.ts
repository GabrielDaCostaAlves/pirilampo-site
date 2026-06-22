import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getPublishedPosts } from "@/lib/firestore";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const routes = [
    "",
    "/sobre",
    "/segmentos",
    "/projetos",
    "/galeria",
    "/momentos",
    "/contato",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  let posts: MetadataRoute.Sitemap = [];
  try {
    const published = await getPublishedPosts();
    posts = published.map((p) => ({
      url: `${base}/momentos/${p.id}`,
      lastModified: new Date(p.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    /* sem posts disponíveis */
  }

  return [...routes, ...posts];
}
