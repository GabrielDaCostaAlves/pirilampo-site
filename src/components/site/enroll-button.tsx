"use client";

import { MessageCircle } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useSettings } from "@/components/site/settings-provider";
import { WHATSAPP_ENROLL_MESSAGE } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

/** Botão de matrícula: abre o WhatsApp da escola com a mensagem padrão.
 *  Usado em diversos pontos do site. */
export function EnrollButton({
  children = "Matricule seu filho",
  message = WHATSAPP_ENROLL_MESSAGE,
  variant = "glow",
  size = "lg",
  className,
  showIcon = true,
}: {
  children?: React.ReactNode;
  message?: string;
  showIcon?: boolean;
} & Pick<ButtonProps, "variant" | "size" | "className">) {
  const { whatsapp } = useSettings();
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={whatsappLink(whatsapp, message)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {showIcon && <MessageCircle aria-hidden />}
        {children}
      </a>
    </Button>
  );
}
