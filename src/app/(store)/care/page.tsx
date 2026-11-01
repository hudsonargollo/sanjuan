import type { Metadata } from "next";
import { Emblem } from "@/components/brand/emblem";

export const metadata: Metadata = {
  alternates: { canonical: "/care" },
  title: "Guía y cuidado",
  description: "Cómo conservar tus lácteos frescos y usar tus productos de limpieza de forma segura.",
};

const TIPS = [
  {
    title: "Refrigera al recibir",
    body: "Guarda la leche, el yogur y la crema en frío apenas lleguen. Mantén la cadena de frío con una bolsa térmica si tardas en llegar a casa.",
  },
  {
    title: "Revisa la fecha",
    body: "Todos nuestros lácteos tienen rotación diaria. Revisa el vencimiento y consume primero lo que lleva más días abierto.",
  },
  {
    title: "Limpieza segura",
    body: "No mezcles cloro con otros limpiadores y ventila el ambiente mientras limpias. Usa guantes si tu piel es sensible.",
  },
  {
    title: "Fuera del alcance de niños",
    body: "Guarda limpiadores y detergentes en un lugar fresco y seco, lejos de alimentos y de los más pequeños de la casa.",
  },
  {
    title: "Dosis correctas",
    body: "Usa la cantidad indicada en la etiqueta del detergente o suavizante: rinde más y cuida mejor tus prendas.",
  },
  {
    title: "¿Un problema con tu producto?",
    body: "Escríbenos por WhatsApp con tu número de pedido y lo resolvemos. Tu compra está respaldada.",
  },
];

export default function CarePage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <div className="text-center">
        <Emblem size={40} className="mx-auto text-brand" accent="var(--color-accent)" />
        <span className="eyebrow mt-3 block">Ayuda</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink">
          Guía y cuidado
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Pequeños hábitos que mantienen tus lácteos frescos y tu hogar seguro.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {TIPS.map((t) => (
          <div key={t.title} className="rounded-xl border border-[var(--line)] bg-cream-soft p-6">
            <h2 className="font-display text-xl font-bold text-ink">{t.title}</h2>
            <p className="mt-2 text-sm text-ink/80">{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
