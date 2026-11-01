import type { Metadata } from "next";
import Link from "next/link";
import { getFeaturedProducts, getProducts, getCategories } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { ProductImage } from "@/components/product-image";
import { HeroSlider } from "@/components/hero-slider";
import { PromoSlider } from "@/components/promo-slider";
import { PromoOverlay } from "@/components/promo-overlay";
import { CategoryArt } from "@/components/category-art";
import { FeaturedCarousel } from "@/components/featured-carousel";
import { Commitments } from "@/components/commitments";
import { Newsletter } from "@/components/newsletter";
import { DeliveryBand } from "@/components/delivery-band";
import { Reveal } from "@/components/reveal";
import { SplitText } from "@/components/text-reveal";
import { JsonLd } from "@/components/json-ld";

import { siteUrl } from "@/lib/site";
import { getStoreSettings } from "@/lib/settings";
import { formatPrice } from "@/lib/format";
import { InstagramIcon } from "@/components/icons";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SanJuan Mini Market",
  url: siteUrl,
  slogan: "Frescos, limpieza y todo para tu día",
  description:
    "SanJuan Mini Market - minimarket de barrio en Buena Vista, Santa Cruz, con lácteos, yogures, crema, mantequilla y productos de limpieza. Entrega el mismo día y pago contra entrega.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buena Vista",
    addressRegion: "Santa Cruz",
    addressCountry: "BO",
  },
  areaServed: "Buena Vista y zonas cercanas de Santa Cruz",
  currenciesAccepted: "BOB",
  paymentAccepted: "Efectivo",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SanJuan Mini Market",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const trustBadges = (freeThreshold: number) => [
  { title: "Frescos del día", body: "Lácteos con rotación diaria." },
  { title: "Pago contra entrega", body: "Paga al recibir, en Buena Vista y zonas cercanas." },
  {
    title: "Envío gratis",
    body:
      freeThreshold > 0
        ? `En pedidos desde ${formatPrice(freeThreshold)}.`
        : "En todos los pedidos de Buena Vista.",
  },
  { title: "Atención cercana", body: "Te ayudamos a pedir por WhatsApp." },
];

// Category covers generated for the store (fallback: first product photo).
const COVER_BY_SLUG: Record<string, string> = {
  leches: "/images/cat-leches.webp",
  yogurts: "/images/cat-yogurts.webp",
  "crema-mantequilla": "/images/cat-crema.webp",
  limpieza: "/images/cat-limpieza.webp",
};

export const revalidate = 300;

export default async function HomePage() {
  const settings = await getStoreSettings();
  const TRUST = trustBadges(settings.shipping.freeThreshold);
  const CONTACT = settings.social;
  const [featured, newest, categories] = await Promise.all([
    getFeaturedProducts(8),
    getProducts({ sort: "newest" }),
    getCategories(),
  ]);
  const topCategories = categories.slice(0, 4);

  // Product count + a representative image per category (falls back to the
  // category cover when no product photo exists yet).
  const countBySlug: Record<string, number> = {};
  const imageBySlug: Record<string, string> = {};
  for (const p of newest) {
    countBySlug[p.category.slug] = (countBySlug[p.category.slug] ?? 0) + 1;
    if (!imageBySlug[p.category.slug] && p.images.length > 0) {
      imageBySlug[p.category.slug] = p.images[0];
    }
  }

  // Real product images for the Instagram-style grid.
  const galleryProducts = newest.filter((p) => p.images.length > 0).slice(0, 6);

  return (
    <>
      <JsonLd data={orgJsonLd} />
      <JsonLd data={websiteJsonLd} />

      {/* Hero */}
      <HeroSlider />

      {/* Immediate local promo for Buena Vista delivery */}
      <PromoOverlay />

      {/* Trust badges */}
      <section className="border-y border-[var(--line)] bg-cream-soft/50 px-5 py-11">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-9 lg:grid-cols-4">
          {TRUST.map((t, i) => (
            <div
              key={t.title}
              className={`flex flex-col items-center px-2 text-center sm:px-6 ${
                i > 0 ? "lg:border-l lg:border-[var(--line)]" : ""
              }`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(239,125,31,0.35)] bg-[radial-gradient(circle,rgba(255,162,92,0.18),transparent_70%)] text-accent-strong">
                <TrustIcon i={i} />
              </span>
              <p className="mt-3.5 font-display text-lg font-bold text-ink">{t.title}</p>
              <p className="mt-1 text-sm leading-snug text-muted">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by category */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <div className="text-center">
            <span className="eyebrow">Categorías</span>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              <SplitText text="Compra por categoría" />
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-muted">
              Todo lo que falta en la heladera o en el lavadero, en un mismo pedido.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {topCategories.map((c, idx) => {
            const count = countBySlug[c.slug] ?? 0;
            const comingSoon = count === 0;
            const img = COVER_BY_SLUG[c.slug] ?? imageBySlug[c.slug];
            const cardCls =
              "group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--line)] transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-[0_28px_55px_-28px_rgba(18,53,31,0.55)]";

            const body =
              comingSoon || !img ? (
                // No products / no photo yet → green card with a grocery icon
                <div
                  className="relative flex h-full flex-col items-center justify-center gap-3 p-6 text-center"
                  style={{ background: "linear-gradient(160deg, #16452a, #0e2f1c)" }}
                >
                  <div className="pointer-events-none absolute inset-3 rounded-xl border border-[rgba(255,162,92,0.25)]" />
                  <CategoryArt slug={c.slug} className="h-20 w-20 text-accent-soft transition duration-500 group-hover:scale-105" />
                  <div>
                    <h3 className="font-display text-xl font-bold text-light">{c.name}</h3>
                    {comingSoon ? (
                      <span className="mt-2 inline-block rounded-full border border-[rgba(255,162,92,0.4)] px-3 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-accent-soft">
                        Próximamente
                      </span>
                    ) : (
                      <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-accent-soft">Ver productos →</span>
                    )}
                  </div>
                </div>
              ) : (
                // Product / category photo as the cover
                <>
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                    <ProductImage src={img} alt={c.name} seed={c.slug} />
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(14,47,28,0) 35%, rgba(14,47,28,0.55) 68%, rgba(14,47,28,0.88) 100%)" }}
                  />
                  <div className="pointer-events-none absolute inset-3 rounded-xl border border-[rgba(255,255,255,0.16)]" />
                  <div className="relative flex h-full flex-col items-center justify-end p-5 text-center">
                    <h3 className="font-display text-2xl font-bold text-light drop-shadow-sm">{c.name}</h3>
                    <span className="mt-1 text-xs uppercase tracking-[0.16em] text-accent-soft">Ver productos →</span>
                  </div>
                </>
              );

            return (
              <Reveal key={c.slug} delay={(idx % 4) * 80}>
                {comingSoon ? (
                  <div className={cardCls}>{body}</div>
                ) : (
                  <Link href={`/shop/${c.slug}`} className={cardCls}>
                    {body}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Nuevos productos (sorted by newest — there's no sales ranking yet) */}
      <section className="bg-cream-soft px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <span className="eyebrow">Recién llegados</span>
                <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
                  <SplitText text="Nuevos productos" />
                </h2>
              </div>
              <Link href="/shop" className="text-sm font-semibold text-accent-strong hover:text-accent">
                Ver todo →
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {newest.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo band — cross-fading offer slider */}
      <PromoSlider />

      {/* Destacado carousel */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <span className="eyebrow">Favoritos</span>
              <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
                <SplitText text="Los más pedidos" />
              </h2>
            </div>
            <Link href="/shop" className="text-sm font-semibold text-accent-strong hover:text-accent">
              Ver todo →
            </Link>
          </div>
        </Reveal>
        <div className="mt-10">
          <FeaturedCarousel products={featured} />
        </div>
      </section>

      {/* Same-day local delivery, built around the truck illustration */}
      <DeliveryBand
        hours={settings.contact.hours}
        deliveryTime={settings.shipping.deliveryTime}
        freeThreshold={settings.shipping.freeThreshold}
      />

      {/* Brand story */}
      <section className="bg-cream px-5 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-panel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/story-sanjuan.webp"
                alt="Empacando lácteos, verduras y productos de limpieza en SanJuan Mini Market"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-3 rounded-xl border border-[rgba(246,243,232,0.6)]" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <span className="eyebrow">Nuestra historia</span>
              <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink text-balance sm:text-5xl">
                <SplitText text="Tu minimarket" />{" "}
                <span className="brand-text">de barrio</span>
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-ink/80">
                En SanJuan Mini Market encuentras lo esencial sin dar vueltas: lácteos frescos,
                yogures, crema, mantequilla y productos de limpieza para tu casa.
              </p>
              <p className="mt-4 text-pretty leading-relaxed text-ink/80">
                Atendemos a las familias de Buena Vista y zonas cercanas de Santa Cruz con
                entrega el mismo día y pago contra entrega. Pedir es fácil: eliges, confirmas y
                nosotros llevamos tu compra hasta tu puerta.
              </p>
              <Link
                href="/about"
                className="mt-7 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-brand-deep shadow-[0_16px_36px_-18px_rgba(239,125,31,0.95)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
              >
                Conoce SanJuan Mini Market
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Commitments (replaces the pre-launch sample testimonials) */}
      <Commitments />

      {/* Product gallery */}
      <section className="relative overflow-hidden bg-cream-soft px-5 py-24">
        {/* accent hairline + soft glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(239,125,31,0.4)] to-transparent" />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[60rem] -translate-x-1/2"
          style={{ background: "radial-gradient(50% 60% at 50% 0%, rgba(255,162,92,0.16), transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-6xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-cream px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-strong">
            <InstagramIcon size={15} />
            Galería
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink text-balance sm:text-5xl">
            <SplitText text="Productos que ya son de casa" />
          </h2>
          <p className="mt-3 text-pretty text-muted">
            Un vistazo a lo que más piden nuestros clientes — compártelo con{" "}
            <span className="font-semibold text-accent-strong">#SanJuanMiniMarket</span>
          </p>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {galleryProducts.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                aria-label={p.name}
                className="group relative block aspect-square overflow-hidden rounded-xl ring-1 ring-[var(--line)] transition-all duration-500 hover:-translate-y-1 hover:ring-2 hover:ring-accent hover:shadow-[0_24px_48px_-24px_rgba(18,53,31,0.5)]"
              >
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
                  <ProductImage src={p.images[0]} alt={p.name} seed={p.slug} />
                </div>
                {/* darkening gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* product name reveal */}
                <span className="absolute inset-x-0 bottom-0 translate-y-2 px-3 pb-3 text-left text-[0.72rem] font-medium leading-tight text-light opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {p.name}
                </span>
                {/* Instagram glyph */}
                <span className="absolute right-2.5 top-2.5 text-accent-soft opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <InstagramIcon size={18} />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {CONTACT.instagram && (
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-brand-deep shadow-[0_16px_36px_-18px_rgba(239,125,31,0.95)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
              >
                <InstagramIcon size={18} />
                Síguenos en Instagram
              </a>
            )}
            <Link
              href="/shop"
              className="rounded-full border border-[var(--line-strong)] px-8 py-3.5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent-strong"
            >
              Ver productos
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}

function TrustIcon({ i }: { i: number }) {
  const p = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  // 0 Frescos · 1 Pago contra entrega · 2 Envío gratis · 3 Atención cercana
  if (i === 0)
    return (
      <svg {...p}>
        <path d="M4 20c0-8 5-14 16-15 0 10-5 15-11 15H4z" />
        <path d="M4 20c3-5 7-8 12-10" />
      </svg>
    );
  if (i === 1)
    return (
      <svg {...p}>
        <rect x="2.5" y="6" width="19" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.4" />
        <path d="M6 9.5v5M18 9.5v5" />
      </svg>
    );
  if (i === 2)
    return (
      <svg {...p}>
        <path d="M3 7h10v8H3z" />
        <path d="M13 10h4l3 3v2h-7z" />
        <circle cx="7" cy="17.5" r="1.5" />
        <circle cx="17.5" cy="17.5" r="1.5" />
      </svg>
    );
  return (
    <svg {...p}>
      <path d="M4 5h16v11H9l-5 4V5z" />
      <path d="M8 10h8M8 13h5" />
    </svg>
  );
}
