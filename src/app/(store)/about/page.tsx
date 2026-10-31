import type { Metadata } from "next";
import Link from "next/link";
import { OrnateFrame } from "@/components/ornate-frame";
import { Emblem } from "@/components/brand/emblem";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About",
  description: "SanJuan Mini Market - productos de higiene y cuidado personal premium para toda la familia. Calidad garantizada.",
};

export default function AboutPage() {
  return (
    <div className="bg-cream px-5 py-12">
      <OrnateFrame className="mx-auto max-w-4xl bg-panel">
        <div className="px-6 py-16 text-center sm:px-14">
          <Emblem size={48} className="mx-auto text-gold-deep" />
          <span className="eyebrow mt-4 block">Nuestra historia</span>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-ink sm:text-5xl">
            Calidad premium en cada detalle
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-ink/80">
            SanJuan Mini Market crea productos de higiene y cuidado personal premium, 
            artículos de limpieza y cuidado diario—elegantes, duraderos y hechos para usted. 
            SanJuan Mini Market crea productos de higiene y cuidado personal premium, artículos de
            limpieza y cuidado diario—elegantes, duraderos y hechos para usted. Algunos tienen
            acabado mate, otros brillante, todo pensado para el día a día.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-ink/80">
            En SanJuan Mini Market, cada producto cuenta una historia — de confianza y cuidado.
            Diseños premium sin precios de lujo.
          </p>
          <Link
            href="/shop"
            className="mt-7 inline-block rounded-full bg-maroon px-8 py-3 text-sm font-medium uppercase tracking-[0.12em] text-light transition hover:bg-maroon-2"
          >
            Ver nuestros productos
          </Link>
        </div>
      </OrnateFrame>

      <section className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-3">
        {[{ title: "Calidad premium", body: "Productos de higiene y cuidado personal de alta calidad." },
          { title: "Acabado matte", body: "Terminaciones elegantes que duran." },
          { title: "Total confianza", body: "Diseñados para uso diario seguro y efectivo." },
        ].map((p) => (
          <div key={p.title} className="text-center">
            <h3 className="font-serif text-xl font-semibold text-ink">{p.title}</h3>
            <p className="mt-2 text-sm text-muted">{p.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}