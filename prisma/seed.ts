import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// SanJuan Mini Market — full catalog seed from sanjuan.md + cleaning brands (img/).
// Categories are auto-created from the product data; duplicates are skipped.

const categories: { name: string; slug: string; description: string }[] = [
  { name: "Leches", slug: "leches", description: "Leches PIL: saborizadas, blancas, deslactosadas y soya." },
  { name: "Yogurts", slug: "yogurts", description: "Yogurts PIL: frutados, bebibiles y bonlé." },
  { name: "Crema & Mantequilla", slug: "crema-mantequilla", description: "Crema de queso de Untar y mantequilla PIL." },
  { name: "Limpieza", slug: "limpieza", description: "Detergentes, suavizantes y limpiadores de las marcas Ariel, Olafuturo, Olas, Borita, Skip." },
];

const products: { name: string; slug: string; description: string; price: number; compareAtPrice?: number; material?: string; brand: string; categorySlug: string; contents?: string; details?: string; stock: number }[] = [
  // Leches PIL
  { name: "Leche Chocolatada (Pura energía)", slug: "leche-chocolatina-pura-energia", description: "Leche chocolatada con energía — refrescante y nutritiva para toda la familia.", price: 10.5, material: "Leche", brand: "Leche PIL", categorySlug: "leches", contents: "Leche", details: "Materia Grasa: 1.9%", stock: 40 },
  { name: "Leche Sabor Frutilla (Deliciosa)", slug: "leche-sabor-frutilla-deliciosa", description: "Leche sabor frutilla con un sabor auténtico y suave.", price: 10.5, material: "Leche", brand: "Leche PIL", categorySlug: "leches", contents: "Leche", details: "Materia Grasa: 2.3%", stock: 40 },
  { name: "Leche con Avena (Sabor a canela - Con fibra natural)", slug: "leche-con-avena-sabor-canela-con-fibra", description: "Leche con avena, sabor canela y fibra natural — más saludable.", price: 10.5, material: "Leche", brand: "Leche PIL", categorySlug: "leches", contents: "Leche", details: "Materia Grasa: 1.7%", stock: 40 },
  { name: "Mónaco Leche con Café (Café Premium)", slug: "monaco-leche-con-cafe-cafe-premium", description: "Mónaco con leche y café premium — el momento perfecto para comenzar el día.", price: 14.0, material: "Leche", brand: "Leche PIL", categorySlug: "leches", contents: "Leche", details: "Contenido: 800 ml", stock: 35 },
  { name: "Leche Fresca Natural", slug: "leche-fresca-natural", description: "Leche fresca natural, ultrapasteurizada y homogeneizada — pura calidad.", price: 10.0, material: "Leche", brand: "Leche PIL", categorySlug: "leches", contents: "Leche", details: "Proceso: Ultrapasteurizada y Homogeneizada", stock: 45 },
  { name: "Leche Enriquecida", slug: "leche-enriquecida", description: "Leche enriquecida con vitaminas A, D3 y E — para una alimentación completa.", price: 9.0, material: "Leche", brand: "Leche PIL", categorySlug: "leches", contents: "Leche", details: "Contenido: 800 ml", stock: 45 },
  { name: "Leche Light (Liviana)", slug: "leche-light-liviana", description: "Leche liviana, baja en grasa y enriquecida con vitaminas A, D y E.", price: 10.0, material: "Leche", brand: "Leche PIL", categorySlug: "leches", contents: "Leche", details: "Materia Grasa: 1%", stock: 40 },
  { name: "Leche Entera (Más cremosa)", slug: "leche-ente-mas-cremosa", description: "Leche entera más cremosa, con 3% de grasa y enriquecida con vitamina A.", price: 13.0, material: "Leche", brand: "Leche PIL", categorySlug: "leches", contents: "Leche", details: "Materia Grasa: 3% · Contenido: 1.100 ml (1.1 L)", stock: 35 },
  { name: "Bonlé Enriquecida", slug: "bonle-enriquecida", description: "Alimento lácteo formulado con enriquecimiento — nutrición adicional.", price: 7.5, material: "Leche", brand: "Leche PIL", categorySlug: "leches", contents: "Leche", details: "Tipo: Alimento lácteo formulado", stock: 50 },
  { name: "Leche Deslactosada (Fácil digestión)", slug: "leche-deslactosada-facil-digestion", description: "Leche deslactosada, fácil digestión, enriquecida con vitaminas A, D y E.", price: 10.5, material: "Leche", brand: "Leche PIL", categorySlug: "leches", contents: "Leche", details: "Materia Grasa: 2.8%", stock: 40 },
  { name: "Leche Deslactosada Chocolatada", slug: "leche-deslactosada-chocolatada", description: "Leche deslactosada con sabor chocolatada, caliente y nutritiva.", price: 12.0, material: "Leche", brand: "Leche PIL", categorySlug: "leches", contents: "Leche", details: "Propiedades: Fuente de Calcio", stock: 35 },
  { name: "Leche Deslactosada Sabor Frutilla", slug: "leche-deslactosada-sabor-frutilla", description: "Leche deslactosada con sabor frutilla, refrescante y digestiva.", price: 12.0, material: "Leche", brand: "Leche PIL", categorySlug: "leches", contents: "Leche", details: "Propiedades: Fuente de Calcio", stock: 35 },
  { name: "Leche Soy Saborizada Sabor Banana", slug: "leche-soy-sabor-banana", description: "Leche de soya 100% vegetal, con sabor banana y fuente de proteína.", price: 8.0, material: "Soya", brand: "Leche Soy", categorySlug: "leches", contents: "Soya", details: "100% Vegetal · Fuente de Proteína", stock: 40 },
  { name: "Leche Soy Saborizada Sabor Chocolate", slug: "leche-soy-sabor-chocolate", description: "Leche de soya 100% vegetal, con sabor chocolate y proteína vegetal.", price: 8.0, material: "Soya", brand: "Leche Soy", categorySlug: "leches", contents: "Soya", details: "100% Vegetal · Fuente de Proteína", stock: 40 },
  { name: "Leche Soy Saborizada Sabor Frutilla", slug: "leche-soy-sabor-frutilla", description: "Leche de soya 100% vegetal, con sabor frutilla y proteína vegetal.", price: 8.0, material: "Soya", brand: "Leche Soy", categorySlug: "leches", contents: "Soya", details: "100% Vegetal · Fuente de Proteína", stock: 40 },
  { name: "Leche Soy Saborizada Sabor Vainilla", slug: "leche-soy-sabor-vainilla", description: "Leche de soya 100% vegetal, con sabor vainilla y proteína vegetal.", price: 8.0, material: "Soya", brand: "Leche Soy", categorySlug: "leches", contents: "Soya", details: "100% Vegetal · Fuente de Proteína", stock: 40 },

  // Yogurts PIL
  { name: "Batidito", slug: "batidito", description: "Batidito refrescante — lo ideal para un adelanto de energía.", price: 3.0, material: "Frutado", brand: "Yogurt PIL", categorySlug: "yogurts", contents: "90 g", stock: 60 },
  { name: "YoGurt Frutado (Vaso Pequeño)", slug: "yogurts-frutado-vaso-pequeno", description: "YoGurt frutado en vaso pequeño — sabores frutilla y durazno.", price: 6.0, material: "Frutado", brand: "Yogurt PIL", categorySlug: "yogurts", contents: "140 g", stock: 55 },
  { name: "YoGurt Frutado (Vaso Grande)", slug: "yogurts-frutado-vaso-grande", description: "YoGurt frutado en vaso grande — sabores coco rallado, frutillas en trozos y duraznos en trozos.", price: 24.0, material: "Frutado", brand: "Yogurt PIL", categorySlug: "yogurts", contents: "700 g", stock: 30 },
  { name: "YoGurt Bebible (1 L)", slug: "yogurts-bebible-1l", description: "YoGurt bebibible de 1 litro — sabores frutilla, durazno, coco, mora y natural.", price: 20.0, material: "Saborizado", brand: "Yogurt PIL", categorySlug: "yogurts", contents: "1 L", stock: 40 },
  { name: "YoGurt Bebible (200 g)", slug: "yogurts-bebible-200g", description: "YoGurt bebibible de 200 g — sabores frutilla y durazno.", price: 6.5, material: "Saborizado", brand: "Yogurt PIL", categorySlug: "yogurts", contents: "200 g", stock: 50 },
  { name: "Bebida Láctea Bonlé (1 L)", slug: "bebidalactea-bonle-1l", description: "Bebida láctea Bonlé de 1 L — sabores frutilla y durazno.", price: 16.0, material: "Bonlé", brand: "Yogurt PIL", categorySlug: "yogurts", contents: "1 L (940 ml)", stock: 35 },
  { name: "Bebida Láctea Bonlé (1.9 L)", slug: "bebidalactea-bonle-19l", description: "Bebida láctea Bonlé de 1.9 L — sabores frutilla y durazno.", price: 25.0, material: "Bonlé", brand: "Yogurt PIL", categorySlug: "yogurts", contents: "1.9 L", stock: 25 },

  // Crema de Queso de Untar Bonlé
  { name: "Crema de Queso de Untar Bonlé — 1 kg", slug: "crema-queso-untar-bonle-1kg", description: "Crema de queso de Untar Bonlé, presentación de 1 kg.", price: 115.0, material: "Crema", brand: "Crema de Queso de Untar", categorySlug: "crema-mantequilla", contents: "1 kg", stock: 15 },
  { name: "Crema de Queso de Untar Bonlé — 200 g", slug: "crema-queso-untar-bonle-200g", description: "Crema de queso de Untar Bonlé, presentación de 200 g — aprovechamiento a partir de 3 unidades.", price: 32.0, compareAtPrice: 30.0, material: "Crema", brand: "Crema de Queso de Untar", categorySlug: "crema-mantequilla", contents: "200 g", stock: 25 },

  // Mantequilla PIL
  { name: "Mantequilla PIL Pote Grande (900 g)", slug: "mantequilla-pil-pote-granote", description: "Mantequilla con sal en pote grande — 900 g de sabor auténtico.", price: 95.0, material: "Mantequilla", brand: "Mantequilla PIL", categorySlug: "crema-mantequilla", contents: "900 g", stock: 25 },
  { name: "Mantequilla PIL Paquete (200 g)", slug: "mantequilla-pil-paquete-200g", description: "Mantequilla con sal y sin sal — presentación de 200 g.", price: 25.0, compareAtPrice: 24.0, material: "Mantequilla", brand: "Mantequilla PIL", categorySlug: "crema-mantequilla", contents: "200 g", stock: 40 },

  // Cleaning brands (img/)
  { name: "Ariel 5L", slug: "ariel-5l", description: "Detergente corporal Ariel de 5 litros — potente y concentrado.", price: 48.0, material: "Detergente", brand: "Ariel", categorySlug: "limpieza", contents: "5 L", stock: 20 },
  { name: "Olafuturo 17", slug: "olafuturo-17", description: "Limpieza con técnica Olafuturo — 17 versiones de potencia.", price: 35.0, material: "Limpiador", brand: "Olafuturo", categorySlug: "limpieza", contents: "1 L", details: "17 efectos", stock: 18 },
  { name: "Olafuturo Maquina", slug: "olafuturo-maquina", description: "Olafuturo para máquina de lavaplatos — limpieza profunda.", price: 32.0, material: "Limpieza de Lavadora", brand: "Olafuturo", categorySlug: "limpieza", contents: "1 L", stock: 15 },
  { name: "Olas Suavecito 5L", slug: "olas-suavecito-5l", description: "Suavizante Olas Suavecito — 5 litros para ropa suave y fragancia.", price: 38.0, material: "Suavizante", brand: "Olas", categorySlug: "limpieza", contents: "5 L", stock: 16 },
  { name: "Olas Suavecitos Sensaciones 5L", slug: "olas-suavecitos-sensaciones-5l", description: "Suavizante Olas Suavecitos — sensaciones y fragancias variados.", price: 36.0, material: "Suavizante", brand: "Olas", categorySlug: "limpieza", contents: "5 L", stock: 14 },
  { name: "Borita Suavizante 900ml (Celeste)", slug: "borita-suavizante-900ml-celeste", description: "Suavizante Borita 900ml en color celeste — suavidad y durabilidad.", price: 12.5, material: "Suavizante", brand: "Borita", categorySlug: "limpieza", contents: "900 ml", stock: 22 },
  { name: "Borita Suavizante 900ml (Purpura)", slug: "borita-suavizante-900ml-purpura", description: "Suavizante Borita 900ml en color purpura — teñido ligero y suave.", price: 12.5, material: "Suavizante", brand: "Borita", categorySlug: "limpieza", contents: "900 ml", stock: 22 },
  { name: "Borita Suavizante 900ml (Rosita)", slug: "borita-suavizante-900ml-rosita", description: "Suavizante Borita 900ml en color rosa — suavidad y fragancia.", price: 12.5, material: "Suavizante", brand: "Borita", categorySlug: "limpieza", contents: "900 ml", stock: 22 },
  { name: "Borita 4L (Amarillo)", slug: "borita-4l-amarillo", description: "Suavizante Borita 4L en color amarillo — cantidad generosa.", price: 28.0, material: "Suavizante", brand: "Borita", categorySlug: "limpieza", contents: "4 L", stock: 16 },
  { name: "Borita 4L (Rosa)", slug: "borita-4l-rosa", description: "Suavizante Borita 4L en color rosa — suavidad y dureza.", price: 28.0, material: "Suavizante", brand: "Borita", categorySlug: "limpieza", contents: "4 L", stock: 16 },
  { name: "Skip 3L", slug: "skip-3l", description: "Suavizante Skip de 3 litros — calidad y durabilidad.", price: 26.0, material: "Suavizante", brand: "Skip", categorySlug: "limpieza", contents: "3 L", stock: 18 },
  { name: "Skip 5L", slug: "skip-5l", description: "Suavizante Skip de 5 litros — para toda la casa.", price: 38.0, material: "Suavizante", brand: "Skip", categorySlug: "limpieza", contents: "5 L", stock: 16 },
];

async function main() {
  console.log("🌱 Seeding SanJuan Mini Market database...");

  // Categories
  const categoryIdBySlug = new Map<string, string>();
  for (const c of categories) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, description: c.description },
      create: c,
    });
    categoryIdBySlug.set(c.slug, cat.id);
  }
  console.log(`  ✔ ${categories.length} categories`);

  // Products
  for (const p of products) {
    const categoryId = categoryIdBySlug.get(p.categorySlug);
    if (!categoryId) continue;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        price: new Prisma.Decimal(p.price),
        compareAtPrice: p.compareAtPrice ? new Prisma.Decimal(p.compareAtPrice) : null,
        material: p.material,
        brand: p.brand,
        categoryId,
        contents: p.contents,
        details: p.details,
        stock: p.stock,
      },
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description,
        price: new Prisma.Decimal(p.price),
        compareAtPrice: p.compareAtPrice ? new Prisma.Decimal(p.compareAtPrice) : null,
        material: p.material,
        brand: p.brand,
        categoryId,
        contents: p.contents,
        details: p.details,
        stock: p.stock,
      },
    });
  }
  console.log(`  ✔ ${products.length} products`);

  // Seed settings
  const settings = {
    contact: {
      email: "ventas@sanjuanmini.market",
      phone: "+591 71 662 586",
      whatsapp: "59171662586",
      city: "La Paz, Bolivia",
      hours: "Lunes–Sábado, 8am – 8pm",
    },
    social: {
      instagram: "https://instagram.com/sanjuanmini.market",
      facebook: "https://facebook.com/sanjuanmini.market",
      tiktok: "",
    },
    shipping: {
      flatFee: 15.00,
      freeThreshold: 100.00,
      deliveryTime: "3–5 días hábiles",
    },
    announcements: [
      "Envío gratis a partir de Bs 100",
      "Servicios de licuado y battido",
      "Calidad certificada · Pago contra entrega",
      "Atención al cliente: 71662586",
    ],
    inventory: { lowStockThreshold: 5 },
    notifications: { orderEmail: "ventas@sanjuanmini.market" },
  };

  await prisma.setting.upsert({
    where: { key: "store" },
    update: { value: settings },
    create: { key: "store", value: settings },
  });

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
