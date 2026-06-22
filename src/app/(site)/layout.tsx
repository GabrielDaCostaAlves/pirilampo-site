import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsappFab } from "@/components/site/whatsapp-fab";
import { SettingsProvider } from "@/components/site/settings-provider";
import { StructuredData } from "@/components/site/structured-data";
import { getSettings } from "@/lib/firestore";

export const revalidate = 60;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <SettingsProvider value={settings}>
      <StructuredData settings={settings} />
      <div className="flex min-h-dvh flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsappFab />
      </div>
    </SettingsProvider>
  );
}
