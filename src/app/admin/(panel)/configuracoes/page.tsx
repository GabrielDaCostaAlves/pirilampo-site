"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Save } from "lucide-react";
import { getSettings, saveSettings } from "@/lib/firestore";
import { isFirebaseConfigured } from "@/lib/firebase";
import { DEFAULT_SETTINGS } from "@/lib/constants";
import type { EnrollmentStatus, SiteSettings } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ConfiguracoesPage() {
  const [form, setForm] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setForm(await getSettings());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const set =
    (key: keyof SiteSettings) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setSaved(false);
    };

  const setStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((f) => ({
      ...f,
      enrollmentStatus: e.target.value as EnrollmentStatus,
    }));
    setSaved(false);
  };

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await saveSettings(form);
      setSaved(true);
    } catch {
      setError("Não foi possível salvar. Verifique a conexão com o Firebase.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="size-7 animate-spin text-sky" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8">
        <h1 className="text-3xl text-ink">Informações da escola</h1>
        <p className="mt-1 text-ink-soft">
          Esses dados aparecem em todo o site: contato, rodapé e botões de
          WhatsApp.
        </p>
      </header>

      {!isFirebaseConfigured && (
        <p className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          O Firebase não está configurado, então as alterações não serão salvas.
        </p>
      )}

      <form
        onSubmit={onSave}
        className="space-y-8 rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8"
      >
        <fieldset className="space-y-5">
          <legend className="text-sm font-bold uppercase tracking-wider text-ink-soft">
            Textos da página inicial
          </legend>
          <div>
            <Label htmlFor="heroTitle">Título principal (Hero)</Label>
            <Input
              id="heroTitle"
              value={form.heroTitle}
              onChange={set("heroTitle")}
            />
          </div>
          <div>
            <Label htmlFor="heroSubtitle">Subtítulo (Hero)</Label>
            <Textarea
              id="heroSubtitle"
              rows={3}
              value={form.heroSubtitle}
              onChange={set("heroSubtitle")}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-5 border-t border-line pt-6">
          <legend className="text-sm font-bold uppercase tracking-wider text-ink-soft">
            Matrículas
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="enrollmentStatus">Situação</Label>
              <select
                id="enrollmentStatus"
                value={form.enrollmentStatus}
                onChange={setStatus}
                className="flex h-11 w-full rounded-xl border border-input bg-white px-4 py-2 text-sm text-ink shadow-sm transition-colors focus-visible:border-sky focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky/30"
              >
                <option value="open">Abertas</option>
                <option value="soon">Em breve</option>
                <option value="closed">Encerradas</option>
              </select>
            </div>
            <div>
              <Label htmlFor="enrollmentNote">Recado (opcional)</Label>
              <Input
                id="enrollmentNote"
                value={form.enrollmentNote}
                onChange={set("enrollmentNote")}
                placeholder="Ex.: Abrem em fevereiro"
              />
              <p className="mt-1 text-xs text-ink-soft">
                Aparece abaixo do selo. Deixe vazio para usar o texto padrão.
              </p>
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-5 border-t border-line pt-6">
          <legend className="text-sm font-bold uppercase tracking-wider text-ink-soft">
            Contato
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={set("phone")}
                placeholder="(73) 99999-0000"
              />
            </div>
            <div>
              <Label htmlFor="whatsapp">WhatsApp (com DDI)</Label>
              <Input
                id="whatsapp"
                value={form.whatsapp}
                onChange={set("whatsapp")}
                placeholder="5573999990000"
              />
              <p className="mt-1 text-xs text-ink-soft">
                Apenas números, começando por 55 (Brasil). Ex.: 5573999990000
              </p>
            </div>
          </div>
          <div>
            <Label htmlFor="instagram">Instagram (sem @)</Label>
            <Input
              id="instagram"
              value={form.instagram}
              onChange={set("instagram")}
              placeholder="escolapirilampo"
            />
          </div>
          <div>
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={form.address}
              onChange={set("address")}
              placeholder="Rua, nº, bairro — Itabatã, Mucuri-BA"
            />
          </div>
        </fieldset>

        <fieldset className="space-y-5 border-t border-line pt-6">
          <legend className="text-sm font-bold uppercase tracking-wider text-ink-soft">
            Feed do Instagram
          </legend>
          <div>
            <Label htmlFor="instagramWidget">Código do widget (embed)</Label>
            <Textarea
              id="instagramWidget"
              rows={4}
              value={form.instagramWidget}
              onChange={set("instagramWidget")}
              placeholder='Cole aqui o código do SnapWidget, ex.: <iframe src="https://snapwidget.com/embed/0000000" ...></iframe>'
            />
            <p className="mt-1 text-xs text-ink-soft">
              Crie um widget grátis em{" "}
              <a
                href="https://snapwidget.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-sky-deep underline"
              >
                snapwidget.com
              </a>
              , conecte o Instagram da escola e cole o código aqui. Pode colar o
              &lt;iframe&gt; inteiro ou só a URL. Deixe vazio para mostrar as
              fotos da galeria.
            </p>
          </div>
        </fieldset>

        {error && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="flex items-center justify-end gap-4 border-t border-line pt-6">
          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
              <CheckCircle2 className="size-4" />
              Salvo!
            </span>
          )}
          <Button type="submit" variant="glow" disabled={saving}>
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            Salvar alterações
          </Button>
        </div>
      </form>
    </div>
  );
}
