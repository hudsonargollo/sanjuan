import type { Metadata } from "next";
import { OrnateFrame } from "@/components/ornate-frame";
import { Emblem } from "@/components/brand/emblem";
import { CustomDesignForm } from "@/components/custom-design-form";
import { getStoreSettings } from "@/lib/settings";
import { whatsappUrl } from "@/lib/settings-shared";

export const metadata: Metadata = {
  alternates: { canonical: "/custom" },
  title: "Pedidos especiales",
  description: "Pide productos especiales o por volumen en SanJuan Mini Market.",
};

const STEPS = [
  { n: "1", title: "Cuéntanos qué necesitas", body: "Producto, cantidad y para cuándo lo necesitas." },
  { n: "2", title: "Revisamos y confirmamos", body: "Te enviamos opciones, precio y tiempo de entrega." },
  { n: "3", title: "Recíbelo en casa", body: "Preparamos tu pedido y lo entregamos en la fecha acordada." },
];

export default async function CustomPage() {
  const settings = await getStoreSettings();
  return (
    <div className="bg-cream px-5 py-12">
      <OrnateFrame className="mx-auto max-w-4xl bg-panel">
        <div className="px-6 py-16 text-center sm:px-14">
          <Emblem size={48} className="mx-auto text-accent-strong" />
          <span className="eyebrow mt-4 block">Para tu casa y tu negocio</span>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Pedidos especiales
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-ink/80">
            ¿Necesitas una cantidad mayor para tu tienda, una presentación que no está en el
            catálogo o un producto para una fecha especial? Cuéntanos tu pedido y lo conseguimos
            para ti.
          </p>
          {/* Jumps to the request form further down this page */}
          <a
            href="#design-request"
            className="mt-9 inline-block rounded-full bg-accent px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-brand-deep shadow-[0_14px_32px_-16px_rgba(239,125,31,0.9)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
          >
            Pedir un producto especial
          </a>
          <p className="mt-3 text-xs text-muted">
            Rellena un formulario breve — toma 2 minutos, sin pago.
          </p>
        </div>
      </OrnateFrame>

      <section className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="rounded-lg border border-[var(--line)] bg-cream-soft p-7 text-center"
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand font-display text-lg text-accent">
              {s.n}
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.body}</p>
          </div>
        ))}
      </section>

      {/* Request form */}
      <section
        id="design-request"
        className="mx-auto mt-14 max-w-4xl scroll-mt-28 rounded-2xl border border-[var(--line)] bg-cream-soft p-6 sm:p-10"
      >
        <div className="text-center">
          <span className="eyebrow">Paso 1</span>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Cuéntanos qué necesitas</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
            Completa lo que puedas — te responderemos en 1–2 días hábiles con opciones y un presupuesto.
          </p>
        </div>
        <div className="mt-8">
          <CustomDesignForm whatsappUrl={whatsappUrl(settings) || undefined} />
        </div>
      </section>
    </div>
  );
}
