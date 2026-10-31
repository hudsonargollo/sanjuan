import Link from "next/link";
import type { ProductView } from "@/lib/types";
import { formatPrice, discountPercent, savingsOf } from "@/lib/format";
import { SaleRibbon, SaveLine } from "./ui/sale-badge";
import { ProductImage } from "./product-image";
import { QuickAdd } from "./quick-add";

/** Simple product icon (package + label) used in the category label row. */
const LOW_STOCK = 5;

/** Attribute label line above the price (e.g. "Fragrance-free · 200 ml"). */
function ProductAttributeLine() {
  return (
    <div className="flex items-center gap-2 text-gold/70" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/45" />
      <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/45" />
    </div>
  );
}

/** "In stock" / "Only 3 left" / "Out of stock" under a regular price. */
function Availability({ stock }: { stock: number }) {
  const [dot, text, label] =
    stock <= 0
      ? ["bg-muted/60", "text-muted", "Out of stock"]
      : stock <= LOW_STOCK
        ? ["bg-bad animate-pulse", "text-bad", `Only ${stock} left`]
        : ["bg-ok", "text-ok", <>In stock<span className="hidden sm:inline"> · Won&apos;t tarnish</span></>];
  return (
    <p className={`mt-1 flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] ${text}`}>
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
      {label}
    </p>
  );
}

export function ProductCard({ product }: { product: ProductView }) {
  const off = discountPercent(product.price, product.compareAtPrice);
  const saved = savingsOf(product.price, product.compareAtPrice);
  const soldOut = product.stock <= 0;

  return (
    <div
      className={`group flex h-full flex-col overflow-hidden rounded-lg border transition hover:border-gold hover:shadow-[0_18px_40px_-24px_rgba(38,8,16,0.5)] ${
        off ? "border-gold/55 bg-surface/70" : "border-[var(--line)] bg-gradient-to-b from-surface/80 to-cream-soft/60"
      }`}
    >
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-sand">
        <div className="h-full w-full transition duration-500 group-hover:scale-105">
          <ProductImage src={product.images[0]} alt={product.name} seed={product.slug} />
        </div>
        {off ? (
          <SaleRibbon percent={off} />
        ) : (
          // Product card is a clean display card — no frame or ornaments
          <span
            className="pointer-events-none absolute inset-2.5 rounded-[3px] border border-gold/35 transition duration-500 group-hover:inset-2 group-hover:border-gold/70"
            aria-hidden="true"
          >
            <span className="absolute h-1.5 w-1.5 rotate-45 bg-gold/80 -left-[3px] -top-[3px]" />
            <span className="absolute h-1.5 w-1.5 rotate-45 bg-gold/80 -right-[3px] -top-[3px]" />
            <span className="absolute h-1.5 w-1.5 rotate-45 bg-gold/80 -bottom-[3px] -left-[3px]" />
            <span className="absolute h-1.5 w-1.5 rotate-45 bg-gold/80 -bottom-[3px] -right-[3px]" />
          </span>
        )}
        {soldOut && (
          <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-white">
            Sold out
          </span>
        )}
      </Link>

      <div className="relative flex flex-1 flex-col p-3 sm:p-4">
        {/* gold hairline where the photo meets the label */}
        <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" aria-hidden="true" />

        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-muted">
          {product.category.name}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 font-serif text-lg leading-snug text-ink transition-colors group-hover:text-gold-deep">
            {product.name}
          </h3>
        </Link>
        {product.material && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70" />
            <span className="text-xs text-muted">{product.material}</span>
          </p>
        )}

        <div className="mt-auto pt-4">
          <div className="mt-3">
            {saved ? (
              <>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-lg font-semibold text-maroon dark:text-gold-hi">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-muted line-through decoration-maroon/50 dark:decoration-gold/60">
                    {formatPrice(product.compareAtPrice!)}
                  </span>
                </div>
                <SaveLine amount={saved} />
              </>
            ) : (
              <>
                <span className="block text-lg font-semibold text-ink">{formatPrice(product.price)}</span>
                <Availability stock={product.stock} />
              </>
            )}
          </div>
        </div>
        <QuickAdd product={product} />
      </div>
    </div>
  );
}
