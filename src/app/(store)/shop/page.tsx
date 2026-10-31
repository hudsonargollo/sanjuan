import type { Metadata } from "next";
import { getProducts, getShopFacets } from "@/lib/catalog";
import { parseProductFilters } from "@/lib/filters";
import { ShopBrowser } from "@/components/shop/shop-browser";

export const metadata: Metadata = {
  alternates: { canonical: "/shop" },
  title: "Shop All productos",
  description: "Explora el catálogo completo de SanJuan Mini Market de acero inoxidable premium y productos de higiene y cuidado personal.",
};

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const sp = await searchParams;
  const filters = parseProductFilters(sp);
  const [products, facets] = await Promise.all([getProducts(filters), getShopFacets()]);

  return (
    <ShopBrowser
      eyebrow="El catálogo"
      title="All productos"
      description="Piezas premium de acero inoxidable y bañadas en oro — libres de óxido y hechas para durar. Filtra por categoría, price, offers or material to find your next favorite."
      products={products}
      facets={facets}
    />
  );
}
