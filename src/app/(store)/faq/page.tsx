import type { Metadata } from "next";
import Link from "next/link";
import { Emblem } from "@/components/brand/emblem";
import { getStoreSettings } from "@/lib/settings";
import { AccordionItem } from "@/components/ui/accordion-item";

export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: "FAQ",
  description: "Respuestas a preguntas comunes sobre pedidos, pago, envío y devoluciones en SanJuan Mini Market.",
};

const faqs = (DELIVERY_TIME: string) => [
  {
    q: "¿Cómo realizo un pedido?",
    a: "Explora nuestra colección, agrega productos a tu carrito y finaliza en elcheckout. Puedes pagar contra entrega o de forma segura online.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Pago contra entrega (COD) a nivel nacional, y pagos online vía PayFast y Safepay (tarjeta y billetera).",
  },
  {
    q: "¿Cuánto tarda el envío?",
    a: `Los pedidos llegan típicamente en ${DELIVERY_TIME}. Nuestro equipo puede llamarte para confirmar detalles de entrega.`,
  },
  {
    q: "¿Puedo rastrear mi pedido?",
    a: "Sí — usa la página de Estado de Pedidos e ingresa tu número de orden y email para ver el estado actualizado.",
  },
  {
    q: "¿Cuál es su política de devoluciones?",
    a: "Artículos sin usar en condición original pueden devolverse en 7 días. Productos personalizados no son elegibles para devolución. Ver Envíos y Devoluciones.",
  },
  {
    q: "¿Hacen productos personalizados?",
    a: "Sí. Visita la página Personalizados para crear tu diseño — cuéntanos tu necesidad y lo prepararemos en acero inoxidable.",
  },
  {
    q: "¿De qué están hechos sus productos?",
    a: "Acero inoxidable pulido — muchos con acabado dorado o plata. Antialérgico y no oxida con uso diario. Detalles en cada página de producto.",
  },
];

export default async function FaqPage() {
  const FAQS = faqs((await getStoreSettings()).shipping.deliveryTime);
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="text-center">
        <Emblem size={40} className="mx-auto text-gold-deep" />
        <span className="eyebrow mt-3 block">Help</span>
        <h1 className="mt-2 font-serif text-4xl font-semibold text-ink">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {FAQS.map((item) => (
          <AccordionItem
            key={item.q}
            title={item.q}
            group="faq"
            className="py-4"
            summaryClassName="font-serif text-lg text-ink"
            icon={
              <span
                aria-hidden="true"
                className="shrink-0 text-xl leading-none text-gold-deep transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[state=open]:rotate-45"
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
        Still have a question?{" "}
        <Link href="/contact" className="text-gold-deep hover:underline">
          Contáctanos
        </Link>
        .
      </p>
    </div>
  );
}
