import type { Metadata } from "next";
import Link from "next/link";
import { Emblem } from "@/components/brand/emblem";
import { getStoreSettings } from "@/lib/settings";
import { AccordionItem } from "@/components/ui/accordion-item";

export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: "Preguntas frecuentes",
  description: "Respuestas sobre pedidos, pagos, entregas y devoluciones en SanJuan Mini Market, Buena Vista, Santa Cruz.",
};

const faqs = (DELIVERY_TIME: string) => [
  {
    q: "¿Cómo hago un pedido?",
    a: "Explora el catálogo, agrega productos al carrito y confirma tu pedido. Puedes pagar contra entrega o de forma segura en línea.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Pago contra entrega en Buena Vista y zonas cercanas, y pagos en línea con tarjeta o billetera a través de nuestras pasarelas.",
  },
  {
    q: "¿Cuánto tarda la entrega?",
    a: `Los pedidos llegan normalmente ${DELIVERY_TIME} en Buena Vista. Si necesitas coordinación especial, te escribimos por WhatsApp.`,
  },
  {
    q: "¿Los lácteos llegan fríos?",
    a: "Sí. Mantenemos la cadena de frío desde la tienda hasta tu puerta y despachamos los lácteos al final de la ruta.",
  },
  {
    q: "¿Puedo pedir algo que no está en el catálogo?",
    a: "Sí. Usa la página de Pedidos especiales y cuéntanos qué necesitas; lo conseguimos para ti.",
  },
  {
    q: "¿Cuál es la política de devoluciones?",
    a: "Si un producto llega dañado o vencido, escríbenos dentro de las 48 horas con tu número de pedido y lo cambiamos o reembolsamos. Ver Envíos y devoluciones.",
  },
  {
    q: "¿Entregan en mi zona?",
    a: "Entregamos en Buena Vista y zonas cercanas de Santa Cruz. Si tienes dudas sobre tu dirección, consúltanos por WhatsApp antes de pedir.",
  },
];

export default async function FaqPage() {
  const FAQS = faqs((await getStoreSettings()).shipping.deliveryTime);
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="text-center">
        <Emblem size={40} className="mx-auto text-brand" accent="var(--color-accent)" />
        <span className="eyebrow mt-3 block">Ayuda</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink">
          Preguntas frecuentes
        </h1>
      </div>

      <div className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {FAQS.map((item) => (
          <AccordionItem
            key={item.q}
            title={item.q}
            group="faq"
            className="py-4"
            summaryClassName="font-display text-lg text-ink"
            icon={
              <span
                aria-hidden="true"
                className="shrink-0 text-xl leading-none text-accent-strong transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[state=open]:rotate-45"
              >
                +
              </span>
            }
          >
            <p className="pt-3 text-sm leading-relaxed text-ink/80">{item.a}</p>
          </AccordionItem>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-muted">
        ¿Sigues con dudas?{" "}
        <Link href="/contact" className="text-accent-strong hover:underline">
          Contáctanos
        </Link>
        .
      </p>
    </div>
  );
}
