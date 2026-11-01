"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, type CartItem } from "./cart-provider";
import { useToast } from "@/components/ui/toast";

export function AddToCart({ product }: { product: Omit<CartItem, "quantity"> }) {
  const { add } = useCart();
  const toast = useToast();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const soldOut = product.stock <= 0;

  function handleAdd() {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    toast.success(`${qty} × ${product.name} agregado a tu carrito`, { title: "Agregado al carrito" });
  }

  // Checks out just this product (the rest of the cart is left untouched).
  function handleBuyNow() {
    router.push(`/checkout?buy=${encodeURIComponent(product.slug)}&qty=${qty}`);
  }

  if (soldOut) {
    return (
      <button
        disabled
        className="w-full cursor-not-allowed rounded-full border border-[var(--line)] px-8 py-3.5 text-sm font-medium tracking-wide text-muted"
      >
        Agotado
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex items-center justify-center rounded-full border border-[var(--line-strong)]">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-3 text-lg text-ink transition hover:text-accent-strong"
            aria-label="Quitar una unidad"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-medium">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            className="px-4 py-3 text-lg text-ink transition hover:text-accent-strong"
            aria-label="Agregar una unidad"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 rounded-full border border-[var(--line-strong)] bg-surface px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-ink transition hover:border-accent hover:text-accent-strong"
        >
          {added ? "Agregado al carrito ✓" : "Agregar al carrito"}
        </button>
      </div>

      <button
        type="button"
        onClick={handleBuyNow}
        className="w-full rounded-full bg-gradient-to-r from-accent-soft to-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-brand shadow-[0_14px_34px_-14px_rgba(239,125,31,0.7)] transition hover:opacity-90"
      >
        Comprar ahora
      </button>
    </div>
  );
}
