import type { CategoryView, ProductView } from "./types";

// Fallback catalog used until a real PostgreSQL database is connected.
// Mirrors prisma/seed.ts so the UI looks identical before and after DB hookup.

export const sampleCategories: CategoryView[] = [
  { id: "c-leches", name: "Leches", slug: "leches", description: "Leche entera, deslactosada, evaporada y en polvo." },
  { id: "c-yogurts", name: "Yogurts", slug: "yogurts", description: "Yogurt natural, con fruta y bebible." },
  { id: "c-crema", name: "Crema y mantequilla", slug: "crema-mantequilla", description: "Crema de leche, mantequilla y margarina." },
  { id: "c-limpieza", name: "Limpieza", slug: "limpieza", description: "Detergentes, jabones y desinfectantes para tu casa." },
];

export const sampleProducts: ProductView[] = [
  {
    id: "p1",
    name: "Leche Entera 1 L",
    slug: "leche-entera-1l",
    description:
      "Leche entera de vaca, fresca y cremosa. Ideal para el desayuno, la cocina y toda la familia. Botella de 1 litro sellada.",
    price: 8,
    compareAtPrice: 10,
    material: "Botella 1 L",
    stock: 40,
    images: [],
    featured: true,
    category: { name: "Leches", slug: "leches" },
  },
  {
    id: "p2",
    name: "Leche Deslactosada 1 L",
    slug: "leche-deslactosada-1l",
    description:
      "Leche deslactosada de sabor suave, pensada para quienes digieren mejor sin lactosa. Misma cremosidad, botella de 1 litro.",
    price: 10,
    compareAtPrice: null,
    material: "Botella 1 L",
    stock: 24,
    images: [],
    featured: true,
    category: { name: "Leches", slug: "leches" },
  },
  {
    id: "p3",
    name: "Yogurt Natural 1 kg",
    slug: "yogurt-natural-1kg",
    description:
      "Yogurt natural sin azúcar añadida, cremoso y fresco. Perfecto para acompañar frutas, cereales o tus recetas de casa. Pote de 1 kilo.",
    price: 18,
    compareAtPrice: 22,
    material: "Pote 1 kg",
    stock: 18,
    images: [],
    featured: true,
    category: { name: "Yogurts", slug: "yogurts" },
  },
  {
    id: "p4",
    name: "Yogurt con Fruta 1 L",
    slug: "yogurt-con-fruta-1l",
    description:
      "Bebible de yogurt con trozos de fruta, listo para llevar al colegio o al trabajo. Botella de 1 litro.",
    price: 16,
    compareAtPrice: null,
    material: "Botella 1 L",
    stock: 30,
    images: [],
    featured: false,
    category: { name: "Yogurts", slug: "yogurts" },
  },
  {
    id: "p5",
    name: "Mantequilla 250 g",
    slug: "mantequilla-250g",
    description:
      "Mantequilla de mesa con sabor delicado y textura suave. Ideal para untar en el pan y cocinar. Presentación de 250 gramos.",
    price: 14,
    compareAtPrice: null,
    material: "Pote 250 g",
    stock: 22,
    images: [],
    featured: false,
    category: { name: "Crema y mantequilla", slug: "crema-mantequilla" },
  },
  {
    id: "p6",
    name: "Crema de Leche 500 ml",
    slug: "crema-de-leche-500ml",
    description:
      "Crema de leche espesa y cremosa para postres, salsas y cafés. Botella de 500 mililitros, lista para usar.",
    price: 20,
    compareAtPrice: 24,
    material: "Botella 500 ml",
    stock: 12,
    images: [],
    featured: true,
    category: { name: "Crema y mantequilla", slug: "crema-mantequilla" },
  },
  {
    id: "p7",
    name: "Detergente en Polvo 900 g",
    slug: "detergente-en-polvo-900g",
    description:
      "Detergente en polvo para ropa blanca y de color. Perfume fresco y limpio, rinde para varios lavados. Bolsa de 900 gramos.",
    price: 26,
    compareAtPrice: 32,
    material: "Bolsa 900 g",
    stock: 35,
    images: [],
    featured: true,
    category: { name: "Limpieza", slug: "limpieza" },
  },
  {
    id: "p8",
    name: "Lavandina 1 L",
    slug: "lavandina-1l",
    description:
      "Lavandina para desinfectar superficies, baños y cocina. Botella de 1 litro con tapa dosificadora.",
    price: 12,
    compareAtPrice: null,
    material: "Botella 1 L",
    stock: 28,
    images: [],
    featured: false,
    category: { name: "Limpieza", slug: "limpieza" },
  },
];
