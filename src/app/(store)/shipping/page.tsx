import type { Metadata } from "next";
import Link from "next/link";
import { Emblem } from "@/components/brand/emblem";
import { formatPrice } from "@/lib/format";
import { getStoreSettings } from "@/lib/settings";

export const metadata: Metadata = {
  alternates: { canonical: "/shipping" },
  title: "Envíos y devoluciones",
  description: "Entrega el mismo día en Buena Vista, Santa Cruz: costos de envío y política de devoluciones de SanJuan Mini Market.",
};

export default async function ShippingPage() {
  const { flatFee: FLAT_SHIPPING, freeThreshold: FREE_SHIPPING_THRESHOLD, deliveryTime: DELIVERY_TIME } = (
    await getStoreSettings()
  ).shipping;
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="text-center">
        <Emblem size={40} className="mx-auto text-brand" accent="var(--color-accent)" />
        <span className="eyebrow mt-3 block">Ayuda</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink">
          Envíos y devoluciones
        </h1>
      </div>

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Entregas</h2>
          <ul className="mt-4 space-y-3 text-ink/80">
            <li>• Entregamos en <strong>Buena Vista y zonas cercanas de Santa Cruz</strong>, normalmente {DELIVERY_TIME}.</li>
            <li>
              • Costo de envío: <strong>{formatPrice(FLAT_SHIPPING)}</strong>
              {FREE_SHIPPING_THRESHOLD > 0 ? (
                <> — <strong>gratis</strong> en pedidos desde {formatPrice(FREE_SHIPPING_THRESHOLD)}.</>
              ) : (
                <> — y <strong>gratis</strong> en todos los pedidos de Buena Vista.</>
              )}
            </li>
            <li>• Los lácteos viajan al final de la ruta para mantener la cadena de frío.</li>
            <li>• Recibirás la confirmación del pedido y podemos escribirte para coordinar la entrega.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Cambios y devoluciones</h2>
          <ul className="mt-4 space-y-3 text-ink/80">
            <li>• Si un producto llega dañado o vencido, avísanos dentro de las <strong>48 horas</strong> con tu número de pedido.</li>
            <li>• Lo cambiamos por el mismo producto o te devolvemos el importe.</li>
            <li>• Los productos deben estar sellados y en su empaque original para el cambio.</li>
            <li>• Los reembolsos se procesan por el mismo medio de pago tras la verificación.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-[var(--line)] bg-cream-soft p-6 text-sm text-muted">
          ¿Necesitas ayuda con un pedido? Escríbenos desde la{" "}
          <Link href="/contact" className="text-accent-strong hover:underline">
            página de contacto
          </Link>{" "}
          con tu número de orden.
        </section>
      </div>
    </div>
  );
}
