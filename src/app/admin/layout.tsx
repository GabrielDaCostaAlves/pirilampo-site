import type { Metadata } from "next";
import { AuthProvider } from "@/components/admin/auth-provider";

export const metadata: Metadata = {
  title: "Painel administrativo",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-dvh bg-cloud">{children}</div>
    </AuthProvider>
  );
}
