import Link from "next/link";
import { getCategoriesForSelect } from "@/lib/admin-data";
import { ProductForm } from "@/components/admin/product-form";
import { createProduct } from "../actions";
import { requireAdmin } from "@/lib/admin";

export const metadata = { title: "Nuevo producto" };

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  await requireAdmin(); // layouts don't re-run on client navigation
  const categories = await getCategoriesForSelect();

  return (
    <div>
      <Link href="/admin/products" className="text-sm text-muted hover:text-ink">
        ← Volver a productos
      </Link>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Agregar producto</h1>

      {categories.length === 0 && (
        <p className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">
          No se encontraron categorías. Conecta la base de datos y cárgala primero
          (<code>npm run db:seed</code>).
        </p>
      )}

      <div className="mt-6">
        <ProductForm action={createProduct} categories={categories} submitLabel="Crear producto" />
      </div>
    </div>
  );
}
