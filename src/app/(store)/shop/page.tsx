import type { Metadata } from "next";
import { getProducts, getShopFacets } from "@/lib/catalog";
import { parseProductFilters } from "@/lib/filters";
import { ShopBrowser } from "@/components/shop/shop-browser";

export const metadata: Metadata = {
  alternates: { canonical: "/shop" },
  title: "Shop All productos",
  description: "Browse the full SanJuan Mini Market collection of premium stainless steel & productos de higiene y cuidado personal.",
};

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const sp = await searchParams;
  const filters = parseProductFilters(sp);
  const [products, facets] = await Promise.all([getProducts(filters), getShopFacets()]);

  return (
    <ShopBrowser
      eyebrow="The Collection"
      title="All productos"
      description="Premium stainless steel & gold-plated pieces — rust-free and made to last. Refine by category, price, offers or material to find your next favorite."
      products={products}
      facets={facets}
    />
  );
}
