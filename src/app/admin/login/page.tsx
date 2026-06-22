"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, LogIn } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { Fireflies } from "@/components/site/fireflies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/admin/auth-provider";

export default function LoginPage() {
  const router = useRouter();
  const { login, user, loading, configured } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/admin");
  }, [loading, user, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/admin");
    } catch {
      setError("E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden aurora px-5">
      <Fireflies count={14} />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-3xl border border-line bg-white/90 p-8 shadow-soft backdrop-blur">
          <h1 className="text-center text-2xl text-ink">Painel da equipe</h1>
          <p className="mt-2 text-center text-sm text-ink-soft">
            Entre para gerenciar publicações, galeria e informações da escola.
          </p>

          {!configured && (
            <div className="mt-6 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>
                O Firebase ainda não foi configurado. Adicione as variáveis em{" "}
                <code className="font-mono">.env.local</code> para ativar o login.
              </span>
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@escolapirilampo.com.br"
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="size-4" />
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={submitting || !configured}
            >
              {submitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <LogIn className="size-4" />
              )}
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
