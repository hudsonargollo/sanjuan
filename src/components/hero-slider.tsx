"use client";

import { preload } from "react-dom";
import Link from "next/link";
import { RotatingWord, SplitText } from "./text-reveal";

const HERO = "/images/hero-sanjuan.webp";

export function HeroSlider() {
  // The hero photo is the biggest thing above the fold — fetch it straight away.
  preload(HERO, { as: "image", fetchPriority: "high" });

  return (
    <section className="relative overflow-hidden bg-brand text-light">
      {/* Slide */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO})` }}
      />
      {/* Readability overlay: strong on the left, clearing toward the shelves */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(14,47,28,0.92) 0%, rgba(14,47,28,0.72) 38%, rgba(14,47,28,0.25) 66%, rgba(14,47,28,0.05) 100%)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-brand/45 lg:hidden" />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:py-36">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/sanjuan-logo-dark.webp"
            alt="SanJuan Mini Market"
            width={220}
            height={70}
            className="mx-auto h-14 w-auto sm:h-16 lg:mx-0"
          />
          <span className="mt-5 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" aria-hidden="true" />
            Minimarket de barrio · Buena Vista
          </span>
          <h1 className="mt-3 max-w-[19ch] font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-balance sm:text-5xl lg:text-[4rem]">
            <SplitText text="Frescos, limpieza y todo para" delay={80} />{" "}
            <RotatingWord
              words={["tu día", "tu casa", "tu familia"]}
              className="text-accent-soft"
            />
          </h1>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-light/85">
            Lácteos, yogures, crema y productos de limpieza con entrega el mismo día en Buena
            Vista y pago contra entrega.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link
              href="/shop"
              className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-brand-deep shadow-[0_18px_40px_-16px_rgba(239,125,31,0.9)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
            >
              Ver productos
            </Link>
            <Link
              href="/about"
              className="inline-block rounded-full border border-light/50 px-8 py-3.5 text-sm font-semibold text-light transition hover:border-accent-soft hover:bg-light/5 hover:text-accent-soft"
            >
              Nuestra historia
            </Link>
          </div>

          <p className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-light/60">
            Pago contra entrega · Entrega el mismo día
          </p>
        </div>
      </div>
    </section>
  );
}
