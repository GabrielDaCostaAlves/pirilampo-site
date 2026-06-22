import Link from "next/link";
import { Fireflies } from "@/components/site/fireflies";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden aurora px-5 text-center">
      <Fireflies count={16} />
      <div className="relative">
        <p className="font-display text-7xl font-semibold text-sky-deep sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 text-2xl text-ink sm:text-3xl">
          Esta luzinha se apagou
        </h1>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          A página que você procura não foi encontrada. Que tal voltar para o
          começo?
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild variant="glow" size="lg">
            <Link href="/">Voltar para o início</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
