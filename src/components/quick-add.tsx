"use client";

import { useState } from "react";
import { useCart } from "./cart/cart-provider";
import { useToast } from "@/components/ui/toast";
import type { ProductView } from "@/lib/types";
import { toCartLine } from "@/lib/cart";

// Compact "Add to cart" button used on product cards.
export function QuickAdd({ product }: { product: ProductView }) {
  const { add } = useCart();
  const toast = useToast();
  const [added, setAdded] = useState(false);
  const soldOut = product.stock <= 0;

  if (soldOut) {
    return (
      <span className="mt-3 block w-full cursor-not-allowed rounded-full border border-[var(--line)] py-2 text-center text-xs uppercase tracking-[0.12em] text-muted">
        Agotado
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        add(toCartLine(product), 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
        toast.success(`${product.name} agregado a tu carrito`, { title: "Agregado al carrito" });
      }}
      className="mt-3 block w-full rounded-full border border-accent/70 bg-transparent py-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-accent-strong transition duration-300 hover:bg-accent hover:text-brand-deep dark:border-accent-strong/50 dark:text-accent-soft"
    >
      {added ? "Agregado ✓" : "Agregar al carrito"}
    </button>
  );
}
