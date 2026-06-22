import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  return (
    <Link
      href={`/momentos/${post.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_10px_40px_-22px_rgba(33,48,74,0.25)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-26px_rgba(33,48,74,0.4)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-sky/20 via-blossom/15 to-glow/25">
            <Sparkles className="size-9 text-ink/25" />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink backdrop-blur">
          {formatDate(post.createdAt)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl leading-snug text-ink transition-colors group-hover:text-sky-deep">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
          {post.excerpt}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-deep">
          Ler momento
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
