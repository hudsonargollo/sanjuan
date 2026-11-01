import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-provider";
import { ToastProvider } from "@/components/ui/toast";
import { FlashToast } from "@/components/ui/flash-toast";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SanJuan Mini Market | Minimarket en Buena Vista, Santa Cruz",
    template: "%s | SanJuan Mini Market",
  },
  description:
    "Tu minimarket de barrio en Buena Vista, Santa Cruz: lácteos, yogures, crema, mantequilla y productos de limpieza. Entrega el mismo día y pago contra entrega.",
  keywords: [
    "SanJuan Mini Market",
    "minimarket",
    "lácteos",
    "yogur",
    "productos de limpieza",
    "compra de barrio",
    "minimarket Buena Vista",
    "Santa Cruz",
    "delivery",
    "Bolivia",
  ],
  applicationName: "SanJuan Mini Market",
  openGraph: {
    title: "SanJuan Mini Market | Lácteos, limpieza y tu día a día",
    description: "Lácteos, yogures, crema y productos de limpieza con entrega el mismo día en Buena Vista y pago contra entrega.",
    type: "website",
    siteName: "SanJuan Mini Market",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "SanJuan Mini Market | Lácteos, limpieza y tu día a día",
    description: "Lácteos, yogures, crema y productos de limpieza con entrega el mismo día en Buena Vista y pago contra entrega.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <noscript>
          <style>{`.split-word{opacity:1 !important;filter:none !important;transform:none !important}`}</style>
        </noscript>
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
