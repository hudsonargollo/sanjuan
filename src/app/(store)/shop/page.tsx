import type { Metadata } from "next";
import { getProducts, getShopFacets } from "@/lib/catalog";
import { parseProductFilters } from "@/lib/filters";
import { ShopBrowser } from "@/components/shop/shop-browser";

export const metadata: Metadata = {
  alternates: { canonical: "/shop" },
  title: "Productos",
  description: "Catálogo completo de SanJuan Mini Market: lácteos, yogures, crema, mantequilla y productos de limpieza.",
};

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const sp = await searchParams;
  const filters = parseProductFilters(sp);
  const [products, facets] = await Promise.all([getProducts(filters), getShopFacets()]);

  return (
    <ShopBrowser
      eyebrow="El catálogo"
      title="Todos los productos"
      description="Lácteos frescos, yogures, crema, mantequilla y productos de limpieza para tu casa. Filtra por categoría, precio u ofertas para encontrar lo que necesitas."
      products={products}
      facets={facets}
    />
  );
}
