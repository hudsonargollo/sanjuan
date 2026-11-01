"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Emblem } from "./brand/emblem";

// Weekly-offer carousel: the copy and the photography rotate together like a
// slideshow (seamless two-way loop, arrows, dots, autoplay progress, pause).
const SLIDES: {
  src: string;
  focus: string;
  label: string;
  title: string;
  copy: string;
  cta: string;
  href: string;
}[] = [
  {
    src: "/images/cat-leches.webp",
    focus: "center 55%",
    label: "Lácteos frescos",
    title: "Leche fresca, todos los días",
    copy: "Leche entera, enriquecida y chocolatada de las marcas de siempre, con rotación diaria y entrega el mismo día en Buena Vista.",
    cta: "Ver lácteos",
    href: "/shop/leches",
  },
  {
    src: "/images/cat-yogurts.webp",
    focus: "center 50%",
    label: "Yogures y postres",
    title: "Yogures para toda la familia",
    copy: "Frutados, bebibles y en vaso: el postre que siempre falta en la heladera, a un clic de tu puerta.",
    cta: "Ver yogures",
    href: "/shop/yogurts",
  },
  {
    src: "/images/cat-crema.webp",
    focus: "center 50%",
    label: "Crema y mantequilla",
    title: "El desayuno completo",
    copy: "Crema de queso para untar y mantequilla PIL en el formato que necesitas, listas para el pan de la mañana.",
    cta: "Ver crema y mantequilla",
    href: "/shop/crema-mantequilla",
  },
  {
    src: "/images/cat-limpieza.webp",
    focus: "center 50%",
    label: "Limpieza del hogar",
    title: "Tu casa impecable, sin salir",
    copy: "Detergentes y suavizantes de Ariel, Skip, Olas y Borita con precios de barrio y pago contra entrega.",
    cta: "Ver limpieza",
    href: "/shop/limpieza",
  },
];

const INTERVAL = 5200;
const N = SLIDES.length;
const TOTAL = N + 2; // clones at both ends for a seamless two-way loop
const TRACK = [SLIDES[N - 1], ...SLIDES, SLIDES[0]];

export function PromoSlider() {
  const [index, setIndex] = useState(1); // 1..N are the real slides
  const [anim, setAnim] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const touchX = useRef<number | null>(null);

  const goNext = useCallback(() => {
    setAnim(true);
    setIndex((i) => i + 1);
  }, []);
  const goPrev = useCallback(() => {
    setAnim(true);
    setIndex((i) => i - 1);
  }, []);

  useEffect(() => {
    if (!playing || hovered) return;
    const id = setInterval(goNext, INTERVAL);
    return () => clearInterval(id);
  }, [playing, hovered, goNext]);

  // re-enable animation on the frame after a seamless snap disabled it
  useEffect(() => {
    if (anim) return;
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    return () => cancelAnimationFrame(r);
  }, [anim]);

  // when a clone finishes showing, snap (without anim) to its real twin
  const handleTransitionEnd = () => {
    if (index === TOTAL - 1) {
      setAnim(false);
      setIndex(1);
    } else if (index === 0) {
      setAnim(false);
      setIndex(N);
    }
  };

  const activeDot = (index - 1 + N) % N;
  const slide = SLIDES[activeDot];
  const autoplaying = playing && !hovered;

  return (
    <section
      className="relative overflow-hidden bg-brand text-light"
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover)").matches) setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="grid items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* ── Text panel ── */}
        <div className="relative z-10 order-2 flex flex-col items-center justify-center px-6 py-16 text-center lg:order-1 lg:items-start lg:px-14 lg:py-24 lg:text-left">
          <Emblem size={40} className="text-accent-soft" />

          <div key={activeDot} className="contents">
            <span className="slide-text-in eyebrow mt-4 block text-accent-soft">
              Ofertas de la semana
            </span>
            <h2
              className="slide-text-in mt-3 max-w-[16ch] font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl"
              style={{ animationDelay: "60ms" }}
            >
              {slide.title}
            </h2>
            <p
              className="slide-text-in mt-4 max-w-md text-pretty text-light/80"
              style={{ animationDelay: "130ms" }}
            >
              {slide.copy}
            </p>

            <Link
              href={slide.href}
              className="slide-text-in mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-9 py-3.5 text-sm font-bold text-brand-deep shadow-[0_18px_40px_-16px_rgba(239,125,31,0.9)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
              style={{ animationDelay: "200ms" }}
            >
              {slide.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Controls — arrows, progress, dots, pause */}
          <div className="mt-9 flex w-full max-w-[18rem] items-center justify-center gap-3 sm:max-w-xs lg:max-w-none lg:justify-start">
            <ArrowButton dir="prev" onClick={goPrev} />

            <div className="flex min-w-0 flex-1 flex-col items-center gap-2 lg:hidden" aria-live="polite">
              <span className="font-display text-sm font-semibold tracking-[0.12em] text-light/85 [font-variant-numeric:tabular-nums]">
                <span className="text-accent-soft">{String(activeDot + 1).padStart(2, "0")}</span>
                <span className="mx-1.5 text-light/40">/</span>
                {String(N).padStart(2, "0")}
              </span>
              <span className="h-0.5 w-full max-w-[9rem] overflow-hidden rounded-full bg-light/20">
                <span
                  key={`${activeDot}-${autoplaying}`}
                  className={`block h-full origin-left rounded-full bg-accent ${autoplaying ? "gallery-progress" : "w-full"}`}
                  style={
                    autoplaying
                      ? ({ "--gal-dur": `${INTERVAL}ms` } as React.CSSProperties)
                      : undefined
                  }
                />
              </span>
            </div>

            <div className="hidden flex-wrap items-center gap-2 lg:flex">
              {SLIDES.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => {
                    setAnim(true);
                    setIndex(i + 1);
                  }}
                  aria-label={`Ir a ${s.label}`}
                  aria-current={i === activeDot}
                  title={s.label}
                  className={`h-2 rounded-full transition-all ${
                    i === activeDot ? "w-7 bg-accent" : "w-2 bg-light/40 hover:bg-light/70"
                  }`}
                />
              ))}
            </div>

            <ArrowButton dir="next" onClick={goNext} />
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pausar las ofertas" : "Reproducir las ofertas"}
              aria-pressed={!playing}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-light/70 transition hover:bg-light/10 hover:text-accent-soft"
            >
              {playing ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 4.5v15l13-7.5z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Image slider ── */}
        <div
          className="relative order-1 min-h-[62vh] touch-pan-y overflow-hidden lg:order-2 lg:min-h-[600px]"
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
            setHovered(true);
          }}
          onTouchEnd={(e) => {
            const start = touchX.current;
            touchX.current = null;
            setHovered(false);
            if (start == null) return;
            const dx = e.changedTouches[0].clientX - start;
            if (Math.abs(dx) > 40) (dx < 0 ? goNext : goPrev)();
          }}
        >
          <div
            className="flex h-full"
            onTransitionEnd={handleTransitionEnd}
            style={{
              width: `${TOTAL * 100}%`,
              transform: `translateX(-${(index * 100) / TOTAL}%)`,
              transition: anim ? "transform 900ms cubic-bezier(0.4,0,0.2,1)" : "none",
            }}
          >
            {TRACK.map((s, i) => (
              <div
                key={i}
                aria-hidden="true"
                className="h-full bg-cover"
                style={{
                  width: `${100 / TOTAL}%`,
                  backgroundImage: Math.abs(i - index) <= 1 ? `url(${s.src})` : undefined,
                  backgroundPosition: s.focus,
                }}
              />
            ))}
          </div>

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(14,47,28,0.65) 0%, rgba(14,47,28,0.15) 24%, rgba(14,47,28,0) 48%), linear-gradient(180deg, rgba(14,47,28,0.10) 0%, rgba(14,47,28,0.30) 100%)",
            }}
          />
          <span className="absolute bottom-6 right-6 rounded-full bg-cream/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-brand-deep">
            {slide.label}
          </span>
        </div>
      </div>

      {/* Thin accent inset frame around the whole band */}
      <div className="pointer-events-none absolute inset-4 z-10 border border-[rgba(255,162,92,0.35)] sm:inset-6" />
    </section>
  );
}

function ArrowButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Oferta anterior" : "Oferta siguiente"}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(255,162,92,0.5)] text-accent-soft transition hover:border-accent hover:bg-accent hover:text-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d={dir === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
