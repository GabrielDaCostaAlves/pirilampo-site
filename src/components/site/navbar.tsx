"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { EnrollButton } from "@/components/site/enroll-button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "border-b border-line/80 bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "bg-sky/12 text-sky-deep"
                      : "text-ink-soft hover:bg-cloud hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <EnrollButton size="default" variant="glow" showIcon={false}>
            Matricule-se
          </EnrollButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-cloud lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Menu mobile */}
      <div
        className={cn(
          "overflow-hidden border-t border-line bg-white/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                    active ? "bg-sky/12 text-sky-deep" : "text-ink hover:bg-cloud",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="mt-2 px-1">
            <EnrollButton className="w-full" variant="glow">
              Matricule seu filho
            </EnrollButton>
          </li>
        </ul>
      </div>
    </header>
  );
}
