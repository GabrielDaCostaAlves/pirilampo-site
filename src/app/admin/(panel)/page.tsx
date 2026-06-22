"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Images,
  Loader2,
  Newspaper,
  PlusCircle,
  Settings,
  FileEdit,
} from "lucide-react";
import { getAllPosts, getGallery } from "@/lib/firestore";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ posts: 0, drafts: 0, images: 0 });

  useEffect(() => {
    (async () => {
      try {
        const [posts, gallery] = await Promise.all([
          getAllPosts(),
          getGallery(),
        ]);
        setStats({
          posts: posts.filter((p) => p.status === "published").length,
          drafts: posts.filter((p) => p.status === "draft").length,
          images: gallery.length,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-8">
        <h1 className="text-3xl text-ink">Olá! 👋</h1>
        <p className="mt-1 text-ink-soft">
          Bem-vindo ao painel da Escola Pirilampo. O que vamos atualizar hoje?
        </p>
      </header>

      {/* Estatísticas */}
      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard
          icon={Newspaper}
          label="Publicações"
          value={stats.posts}
          hint="momentos publicados"
          loading={loading}
          tone="bg-sky/12 text-sky-deep"
        />
        <StatCard
          icon={FileEdit}
          label="Rascunhos"
          value={stats.drafts}
          hint="ainda não publicados"
          loading={loading}
          tone="bg-glow/20 text-glow-deep"
        />
        <StatCard
          icon={Images}
          label="Fotos na galeria"
          value={stats.images}
          hint="imagens publicadas"
          loading={loading}
          tone="bg-blossom/20 text-blossom-deep"
        />
      </div>

      {/* Ações rápidas */}
      <h2 className="mb-4 mt-10 text-lg font-semibold text-ink">
        Acesso rápido
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <QuickAction
          href="/admin/posts/new"
          icon={PlusCircle}
          title="Nova publicação"
          text="Crie um novo momento: festa, projeto ou comunicado."
        />
        <QuickAction
          href="/admin/galeria"
          icon={Images}
          title="Gerenciar galeria"
          text="Adicione ou remova fotos da escola."
        />
        <QuickAction
          href="/admin/posts"
          icon={Newspaper}
          title="Todas as publicações"
          text="Edite, publique ou exclua os momentos existentes."
        />
        <QuickAction
          href="/admin/configuracoes"
          icon={Settings}
          title="Informações da escola"
          text="Atualize telefone, WhatsApp, Instagram e textos."
        />
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  loading,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  hint: string;
  loading: boolean;
  tone: string;
}) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_10px_40px_-26px_rgba(33,48,74,0.3)]">
      <span className={`flex size-11 items-center justify-center rounded-2xl ${tone}`}>
        <Icon className="size-5" />
      </span>
      <p className="mt-4 text-sm font-medium text-ink-soft">{label}</p>
      <p className="mt-1 font-display text-4xl font-semibold text-ink">
        {loading ? <Loader2 className="size-7 animate-spin text-ink-soft" /> : value}
      </p>
      <p className="text-xs text-ink-soft">{hint}</p>
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  title,
  text,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky/40 hover:shadow-soft"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-cloud text-sky-deep transition-colors group-hover:bg-sky/12">
        <Icon className="size-5" />
      </span>
      <div className="flex-1">
        <p className="font-semibold text-ink">{title}</p>
        <p className="mt-0.5 text-sm text-ink-soft">{text}</p>
      </div>
      <ArrowRight className="size-5 text-ink-soft transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
