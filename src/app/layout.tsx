import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-provider";
import { ToastProvider } from "@/components/ui/toast";
import { FlashToast } from "@/components/ui/flash-toast";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SanJuan Mini Market - Productos de higiene y cuidado personal",
    template: "%s | SanJuan Mini Market",
  },
  description:
    "SanJuan Mini Market - productos de higiene y cuidado personal premium, limpieza del día, artículos para el hogar y cuidado personal de calidad. Compra con confianza.",
  keywords: [
    "SanJuan Mini Market",
    "productos de higiene y cuidado personal",
    "artículos de limpieza",
    "productos con acabado dorado",
    " productos Bolivia",
    "hipoalergénico",
  ],
  applicationName: "SanJuan Mini Market",
  openGraph: {
    title: "SanJuan Mini Market - Productos de higiene y cuidado personal",
    description: "Productos premium de higiene y cuidado personal, artículos de limpieza y cuidado diario. Compra segura con envío a todo el país.",
    type: "website",
    siteName: "SanJuan Mini Market",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "SanJuan Mini Market - Productos de higiene y cuidado personal",
    description: "Productos premium de higiene y cuidado personal, artículos de limpieza y cuidado diario. Compra segura.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {/* Apply saved theme before paint to avoid a flash of the wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('sanjuan-theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}else if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();",
          }}
        />
        <ToastProvider>
          <CartProvider>{children}</CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}