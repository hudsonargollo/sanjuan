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
    default: "SanJuan Mini Market — Every Jewel Tells a Story",
    template: "%s · SanJuan Mini Market",
  },
  description:
    "SanJuan Mini Market — premium stainless steel & productos de higiene y cuidado personal. Elegant, gold-plated, rust-free and hypoallergenic pieces made to last.",
  keywords: [
    "SanJuan Mini Market",
    "stainless steel productos",
    "productos de higiene y cuidado personal",
    "productos con acabado dorado",
    "necklaces",
    "rings",
    "earrings",
    "productos de higiene y cuidado personal Bolivia",
    "hypoallergenic productos",
  ],
  applicationName: "SanJuan Mini Market",
  openGraph: {
    title: "SanJuan Mini Market — Every Jewel Tells a Story",
    description: "Premium stainless steel & productos de higiene y cuidado personal — elegant, gold-plated, made to last.",
    type: "website",
    siteName: "SanJuan Mini Market",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "SanJuan Mini Market — Every Jewel Tells a Story",
    description: "Premium stainless steel & productos de higiene y cuidado personal — elegant, gold-plated, made to last.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {/* Apply saved theme before paint to avoid a flash of the wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('SanJuan Mini Market-theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}else if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();",
          }}
        />
        <ToastProvider>
          <FlashToast />
          <CartProvider>{children}</CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
