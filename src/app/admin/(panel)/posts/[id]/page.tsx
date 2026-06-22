"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { PostForm } from "@/components/admin/post-form";
import { getPost } from "@/lib/firestore";
import type { Post } from "@/lib/types";

export default function EditPostPage() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading");

  useEffect(() => {
    (async () => {
      const found = await getPost(params.id);
      if (found) {
        setPost(found);
        setState("ready");
      } else {
        setState("missing");
      }
    })();
  }, [params.id]);

  if (state === "loading") {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="size-7 animate-spin text-sky" />
      </div>
    );
  }

  if (state === "missing" || !post) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-dashed border-line bg-white py-20 text-center">
        <p className="text-ink-soft">Publicação não encontrada.</p>
        <Link
          href="/admin/posts"
          className="mt-3 inline-block font-semibold text-sky-deep hover:underline"
        >
          Voltar para publicações
        </Link>
      </div>
    );
  }

  return <PostForm post={post} />;
}
