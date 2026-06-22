"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Images,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  Newspaper,
  Settings,
  ExternalLink,
  X,
} from "lucide-react";
import { Logo } from "@/components/site/logo";
import { useAuth } from "@/components/admin/auth-provider";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Início", icon: LayoutDashboard, exact: true },
  { href: "/admin/posts", label: "Publicações", icon: Newspaper },
  { href: "/admin/galeria", label: "Galeria", icon: Images },
  { href: "/admin/configuracoes", label: "Informações", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout, configured } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/admin/login");
  }, [loading, user, router]);

  useEffect(() => setOpen(false), [pathname]);

  if (loading || !user) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Loader2 className="size-7 animate-spin text-sky" />
      </div>
    );
  }

  const nav = (
    <nav className="flex flex-1 flex-col gap-1">
      {links.map((l) => {
        const active = l.exact
          ? pathname === l.href
          : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
              active
                ? "bg-sky/12 text-sky-deep"
                : "text-ink-soft hover:bg-cloud hover:text-ink",
            )}
          >
            <l.icon className="size-4.5" />
            {l.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-dvh">
      {/* Sidebar desktop */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-line bg-white p-5 lg:flex">
        <div className="px-1">
          <Logo />
        </div>
        <div className="mt-8 flex-1">{nav}</div>
        <SidebarFooter
          email={user.email}
          configured={configured}
          onLogout={async () => {
            await logout();
            router.replace("/admin/login");
          }}
        />
      </aside>

      {/* Topbar mobile */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-white/90 px-5 backdrop-blur lg:hidden">
          <Logo showText={false} />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            className="inline-flex size-10 items-center justify-center rounded-full hover:bg-cloud"
          >
            <Menu />
          </button>
        </header>

        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-ink/40"
              onClick={() => setOpen(false)}
            />
            <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-white p-5">
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar menu"
                  className="inline-flex size-10 items-center justify-center rounded-full hover:bg-cloud"
                >
                  <X />
                </button>
              </div>
              <div className="mt-8 flex-1">{nav}</div>
              <SidebarFooter
                email={user.email}
                configured={configured}
                onLogout={async () => {
                  await logout();
                  router.replace("/admin/login");
                }}
              />
            </aside>
          </div>
        )}

        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarFooter({
  email,
  configured,
  onLogout,
}: {
  email: string | null;
  configured: boolean;
  onLogout: () => void;
}) {
  return (
    <div className="space-y-3 border-t border-line pt-4">
      {!configured && (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          Firebase não configurado — alterações não serão salvas.
        </p>
      )}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-ink-soft hover:bg-cloud hover:text-ink"
      >
        <ExternalLink className="size-4" />
        Ver o site
      </a>
      <div className="px-4">
        <p className="truncate text-xs text-ink-soft" title={email ?? ""}>
          {email}
        </p>
      </div>
      <button
        type="button"
        onClick={onLogout}
        className="flex w-full items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10"
      >
        <LogOut className="size-4" />
        Sair
      </button>
    </div>
  );
}
