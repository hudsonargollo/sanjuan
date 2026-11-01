import type { Metadata } from "next";
import Link from "next/link";
import { Emblem } from "@/components/brand/emblem";
import { SplitText } from "@/components/text-reveal";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "Nosotros",
  description: "SanJuan Mini Market — tu minimarket de barrio en Buena Vista, Santa Cruz: lácteos frescos, limpieza y todo para tu casa.",
};

const PILLARS = [
  { title: "Frescos todo el día", body: "Lácteos con rotación diaria y cadena de frío hasta tu puerta." },
  { title: "Precios claros", body: "Ofertas de barrio, sin sorpresas al momento de pagar." },
  { title: "Entrega en el día", body: "Pide antes del mediodía y recibe tu compra el mismo día en Buena Vista." },
];

export default function AboutPage() {
  return (
    <div className="bg-cream px-5 py-12">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[var(--line)] bg-panel">
        <div className="px-6 py-16 text-center sm:px-14">
          <Emblem size={52} className="mx-auto text-brand" accent="var(--color-accent)" />
          <span className="eyebrow mt-5 block">Nuestra historia</span>
          <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink text-balance sm:text-5xl">
            <SplitText text="Tu minimarket" />{" "}
            <span className="brand-text">de barrio</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-ink/80">
            SanJuan Mini Market nació en Buena Vista, Santa Cruz, para que hacer las compras del
            día sea simple. Reunimos lácteos, yogures, crema, mantequilla y productos de limpieza
            en un solo lugar, con precios de barrio y atención cercana.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-ink/80">
            Trabajamos con rotación diaria para que lo que llega a tu mesa esté fresco, y
            entregamos el mismo día en Buena Vista y zonas cercanas de Santa Cruz para que no
            tengas que salir de casa. Pedir es fácil: eliges, confirmas y nosotros llevamos tu compra.
          </p>
          <Link
            href="/shop"
            className="mt-7 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-brand-deep shadow-[0_14px_32px_-16px_rgba(239,125,31,0.9)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
          >
            Ver nuestros productos
          </Link>
        </div>
      </div>

      <section className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.title} className="text-center">
            <h3 className="font-display text-xl font-bold text-ink">{p.title}</h3>
            <p className="mt-2 text-sm text-muted">{p.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
