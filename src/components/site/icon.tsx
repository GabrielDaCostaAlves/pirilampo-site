import {
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
  Palette,
  Smile,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
  Palette,
  Smile,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} aria-hidden />;
}
