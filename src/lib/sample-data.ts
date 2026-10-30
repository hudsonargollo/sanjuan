import type { CategoryView, ProductView } from "./types";

// Fallback catalog used until a real PostgreSQL database is connected.
// Mirrors prisma/seed.ts so the UI looks identical before and after DB hookup.

export const sampleCategories: CategoryView[] = [
  { id: "c-higiene", name: "Higiene personal", slug: "higiene", description: "Productos de cuidado diario para ti y tu familia." },
  { id: "c-limepe", name: "Limpieza", slug: "limpieza", description: "Artículos de limpieza para casa." },
  { id: "c-hogar", name: "Para el hogar", slug: "hogar", description: "Accesorios y útiles para el hogar." },
  { id: "c-belleza", name: "Belleza", slug: "belleza", description: "Productos de cuidado de la piel." },
];

export const sampleProducts: ProductView[] = [
  {
    id: "p1",
    name: "Suavizante Sudaderas 900ml",
    slug: "suavizante-suadaderas-900ml",
    description:
      "Suavizante líquido en un recipiente de 900ml con acabado dorado premium. Perfume suave y suave, perfecto para tu rutina diaria.",
    price: 48000,
    compareAtPrice: 56000,
    material: "Plástico con acabado dorado",
    stock: 12,
    images: [],
    featured: true,
    category: { name: "Higiene personal", slug: "higiene" },
  },
  {
    id: "p2",
    name: "Crema Hidratante 200ml",
    slug: "crema-hidratante-200ml",
    description:
      "Crema hidratante ligera en presentación de 200ml. Fórmula sin aroma, para piel sensible.",
    price: 62000,
    compareAtPrice: null,
    material: "Fórmula matemática",
    stock: 8,
    images: [],
    featured: true,
    category: { name: "Higiene personal", slug: "higiene" },
  },
  {
    id: "p3",
    name: "Jabón Santizar 100g",
    slug: "jabon-santizar-100g",
    description:
      "Jabón antiséptico en presentación de 100g. Fórmula con alcohol incorporado.",
    price: 35000,
    compareAtPrice: 41000,
    material: "Fórmula matemática",
    stock: 20,
    images: [],
    featured: true,
    category: { name: "Limpieza", slug: "limpieza" },
  },
  {
    id: "p4",
    name: "Aluminio Fresador 500ml",
    slug: "aluminio-fresador-500ml",
    description:
      "Aluminio fresador en presentación de 500ml. Perfume fresco y limpio.",
    price: 74000,
    compareAtPrice: null,
    material: "Fórmula matemática",
    stock: 6,
    images: [],
    featured: true,
    category: { name: "Limpieza", slug: "limpieza" },
  },
  {
    id: "p5",
    name: "Cera de Parafina 200g",
    slug: "cera-de-parafina-200g",
    description:
      "Cera de parafina en presentación de 200g. Fórmula sin aroma.",
    price: 28000,
    compareAtPrice: null,
    material: "Fórmula matemática",
    stock: 25,
    images: [],
    featured: false,
    category: { name: "Para el hogar", slug: "hogar" },
  },
  {
    id: "p6",
    name: "Esponja de Lana 10cm",
    slug: "esponja-de-lana-10cm",
    description:
      "Esponja de lana orgánica para limpieza y cuidado de tocados.",
    price: 18000,
    compareAtPrice: null,
    material: "Lana orgánica",
    stock: 40,
    images: [],
    featured: false,
    category: { name: "Limpieza", slug: "limpieza" },
  },
  {
    id: "p7",
    name: "Jabón en Polvo 500g",
    slug: "jabon-en-polvo-500g",
    description:
      "Jabón en polvo de lavado a temperatura ambiente.",
    price: 58000,
    compareAtPrice: 65000,
    material: "Fórmula matemática",
    stock: 10,
    images: [],
    featured: false,
    category: { name: "Limpieza", slug: "limpieza" },
  },
  {
    id: "p8",
    name: "Toalla de Microfibra 10cm",
    slug: "toalla-de-microfibra-10cm",
    description:
      "Toalla de microfibra para limpieza de superficies y aislamiento térmico.",
    price: 32000,
    compareAtPrice: null,
    material: "Microfibra",
    stock: 18,
    images: [],
    featured: false,
    category: { name: "Para el hogar", slug: "hogar" },
  },
];
