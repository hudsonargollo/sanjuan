import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/catalog";
import { formatPrice, discountPercent, visiblePack } from "@/lib/format";
import { ProductGallery } from "@/components/product-gallery";
import { getStoreSettings } from "@/lib/settings";
import { ProductCard } from "@/components/product-card";
import { DealPanel } from "@/components/ui/sale-badge";
import { AddToCart } from "@/components/cart/add-to-cart";
import { JsonLd } from "@/components/json-ld";
import { SplitText } from "@/components/text-reveal";

import { siteUrl } from "@/lib/site";
import { AccordionItem } from "@/components/ui/accordion-item";
import { toCartLine } from "@/lib/cart";

// Product pages are cached and served instantly; a product / stock change
// refreshes them (catalog tag + revalidatePath in the admin actions).
export const revalidate = 300;
export function generateStaticParams() {
  return []; // build nothing up front — each page is cached on its first visit
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "No encontrado" };
  const description = product.description ?? `${product.name} — disponible en SanJuan Mini Market.`;
  return {
    title: product.name,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.name} · SanJuan Mini Market`,
      description,
      type: "website",
      url: `${siteUrl}/product/${product.slug}`,
      images: product.images.length ? product.images : undefined,
    },
  };
}

/** Returns a short neutral attribute note inferred from the product description. */
function attributeOf(text: string): string | null {
  if (/anti-bacterial|antiséptico/i.test(text)) return "Antibacteriano";
  if (/sin aroma|unscented/i.test(text)) return "Sin aroma";
  if (/refresco|crudo/i.test(text)) return "Refrescante";
  if (/natural|orgánico|eco/i.test(text)) return "Natural";
  return null;
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const settings = await getStoreSettings();
  const DELIVERY_TIME = settings.shipping.deliveryTime;
  const off = discountPercent(product.price, product.compareAtPrice);
  const related = await getRelatedProducts(product);
  const inStock = product.stock > 0;
  const lowStock = inStock && product.stock <= settings.inventory.lowStockThreshold;

  const desc = product.description ?? "";
  const sentences = desc.split(/(?<=\.)\s+/).map((s) => s.trim()).filter(Boolean);
  const lead = sentences.slice(0, 2).join(" ");
  const attribute = attributeOf(desc);
  const pack = visiblePack(product.material);
  const customSpecs: [string, string][] = (product.specs ?? "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const idx = l.indexOf(":");
      return (idx === -1 ? ["Detalle", l] : [l.slice(0, idx).trim(), l.slice(idx + 1).trim()]) as [string, string];
    });
  const hasCustom = customSpecs.length > 0;

  // Compact highlights shown up top (Amazon-style "Top highlights")
  const derivedHighlights: [string, string][] = [
    ["Categoría", product.category.name],
    ...(pack ? ([["Presentación", pack]] as [string, string][]) : []),
    ...(attribute ? ([["Tipo", attribute]] as [string, string][]) : []),
    ["Entrega", DELIVERY_TIME],
  ];
  const highlights = hasCustom ? customSpecs.slice(0, 4) : derivedHighlights;

  // Fuller specification table (inside "Product details")
  const specs: [string, string][] = hasCustom
    ? customSpecs
    : [
        ["Categoría", product.category.name],
        ...(pack ? ([["Presentación", pack]] as [string, string][]) : []),
        ...(attribute ? ([["Tipo", attribute]] as [string, string][]) : []),
        ["Disponibilidad", inStock ? "En stock" : "Agotado"],
        ["Entrega", `Entrega ${DELIVERY_TIME}`],
        ["Pago", "Contra entrega en Buena Vista y zonas cercanas"],
        ["Devoluciones", "7 días"],
      ];

  const aboutBullets = [
    ...sentences,
    "Producto seleccionado para tu día a día y revisado antes de la entrega.",
    "Pago contra entrega al recibir en Buena Vista y zonas cercanas.",
  ];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? undefined,
    category: product.category.name,
    ...(pack ? { material: pack } : {}),
    ...(product.images.length ? { image: product.images } : {}),
    brand: { "@type": "Brand", name: "SanJuan Mini Market" },
    offers: {
      "@type": "Offer",
      priceCurrency: "BOB",
      price: product.price,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${siteUrl}/product/${product.slug}`,
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-10">
      <JsonLd data={productJsonLd} />
      {/* Breadcrumb */}
      <nav className="text-sm text-muted">
        <Link href="/shop" className="hover:text-accent-strong">Productos</Link>
        <span className="mx-2">/</span>
        <Link href={`/shop/${product.category.slug}`} className="hover:text-accent-strong">
          {product.category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        {/* Gallery */}
        <div className="md:sticky md:top-24 md:self-start">
          <ProductGallery images={product.images} name={product.name} slug={product.slug} />
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted">{product.category.name}</p>
            {product.featured && (
              <span className="rounded-full bg-brand px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-accent">
                Destacado
              </span>
            )}
          </div>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-ink text-balance">
            <SplitText text={product.name} />
          </h1>


          {off && product.compareAtPrice ? (
            <DealPanel price={product.price} compareAt={product.compareAtPrice} percent={off} />
          ) : (
            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              <span className="font-display text-3xl font-semibold text-ink">{formatPrice(product.price)}</span>
            </div>
          )}

          {lead && <p className="mt-4 max-w-prose text-pretty leading-relaxed text-ink/80">{lead}</p>}

          {/* Top highlights */}
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-[var(--line)] bg-surface/60 p-5">
            {highlights.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[0.62rem] font-medium uppercase tracking-[0.12em] text-muted">{k}</dt>
                <dd className="mt-0.5 text-sm text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          {/* Availability */}
          <p className="mt-4 text-sm">
            <span className={inStock ? "font-medium text-green-700" : "font-medium text-red-700"}>
              {inStock ? "En stock" : "Agotado"}
            </span>
            {lowStock && <span className="text-amber-700"> · quedan {product.stock}</span>}
          </p>

          {/* Actions */}
          <div className="mt-5">
            <AddToCart
              product={toCartLine(product)}
            />
          </div>

          {/* Delivery & assurance */}
          <div className="mt-6 space-y-2.5 rounded-xl border border-[var(--line)] p-4 text-sm">
            <Assure icon="truck">Entrega <b className="font-medium text-ink">{DELIVERY_TIME}</b> en Buena Vista y zonas cercanas</Assure>
            <Assure icon="cash">Pago contra entrega disponible</Assure>
            <Assure icon="return">Devoluciones fáciles en <b className="font-medium text-ink">7 días</b></Assure>
            <Assure icon="shield">Compra segura y atención directa</Assure>
          </div>
        </div>
      </div>

      {/* ---------- Detailed sections (Amazon-style) ---------- */}
      <section className="mt-14 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Detalles del producto</h2>
          <div className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            <Accordion title="Detalles y especificaciones" open>
              <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3 border-b border-[var(--line)]/60 pb-2">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Accordion>

            <Accordion title="Sobre este producto">
              <ul className="space-y-2.5">
                {aboutBullets.map((b, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-strong" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Accordion>

            <Accordion title="Presentación y uso">
              <p>
                Se entrega en su presentación original sellada. Si buscas una cantidad mayor o un
                producto que no está en el catálogo,{" "}
                <Link href="/contact" className="text-accent-strong underline">escríbenos</Link>{" "}
                y lo conseguimos para ti.
              </p>
            </Accordion>

            <Accordion title="Conservación">
              <ul className="space-y-2 [&>li]:flex [&>li]:gap-2.5">
                <li><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-strong" /> Revisa la fecha de vencimiento en el envase.</li>
                <li><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-strong" /> Guarda en un lugar fresco y seco, lejos del sol directo.</li>
                <li><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-strong" /> Sigue las indicaciones de uso de la etiqueta.</li>
                <li><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-strong" /> Mantén fuera del alcance de los niños.</li>
              </ul>
            </Accordion>

            <Accordion title="Envíos y devoluciones">
              <p>
                Entregamos en Buena Vista y zonas cercanas de Santa Cruz con{" "}
                <b className="font-medium text-ink">pago contra entrega</b>. Los pedidos se preparan
                el mismo día y llegan en la ruta de entrega.
                Si algo no está bien, devuelve el producto sin usar en su empaque original dentro de{" "}
                <b className="font-medium text-ink">7 días</b>.
              </p>
            </Accordion>
          </div>
        </div>

        {/* Sticky assurance rail on desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-[var(--line)] bg-surface p-6 shadow-[0_20px_50px_-40px_rgba(18,53,31,0.5)]">
            <p className="font-display text-xl font-semibold text-ink">¿Por qué SanJuan Mini Market?</p>
            <ul className="mt-4 space-y-3 text-sm text-ink/80">
              <li className="flex gap-2.5"><Dot /> Productos revisados antes de cada entrega</li>
              <li className="flex gap-2.5"><Dot /> Pago contra entrega en Buena Vista</li>
              <li className="flex gap-2.5"><Dot /> Entrega {DELIVERY_TIME}</li>
              <li className="flex gap-2.5"><Dot /> Atención cercana por WhatsApp</li>
            </ul>
          </div>
        </aside>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-semibold text-ink">También te puede gustar</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Accordion({
  title,
  open,
  children,
}: {
  title: string;
  open?: boolean;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem
      title={title}
      group="product-details"
      defaultOpen={open}
      summaryClassName="py-4 font-display text-lg font-semibold text-ink"
      icon={
        <svg
          className="shrink-0 text-muted transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[state=open]:rotate-180"
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      }
    >
      <div className="pb-5 text-sm leading-relaxed text-ink/80">{children}</div>
    </AccordionItem>
  );
}

function Dot() {
  return <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-strong" />;
}

function Assure({ icon, children }: { icon: "truck" | "cash" | "return" | "shield"; children: React.ReactNode }) {
  const paths: Record<string, React.ReactNode> = {
    truck: (<><path d="M3 7h10v8H3z" /><path d="M13 10h4l3 3v2h-7z" /><circle cx="7" cy="17.5" r="1.4" /><circle cx="17.5" cy="17.5" r="1.4" /></>),
    cash: (<><rect x="2.5" y="6" width="19" height="12" rx="2" /><circle cx="12" cy="12" r="2.3" /><path d="M6 9.5v5M18 9.5v5" /></>),
    return: (<><path d="M4 9a8 8 0 1 1-1 4" /><path d="M4 5v4h4" strokeLinecap="round" strokeLinejoin="round" /></>),
    shield: (<><path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" /></>),
  };
  return (
    <div className="flex items-center gap-3 text-muted">
      <svg className="shrink-0 text-accent-strong" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {paths[icon]}
      </svg>
      <span className="text-ink/80">{children}</span>
    </div>
  );
}
