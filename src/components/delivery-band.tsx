import Link from "next/link";
import { RotatingWord, SplitText } from "./text-reveal";
import { formatPrice } from "@/lib/format";

// Editorial band built around the gold truck illustration (cropped from the
// client's original banner). Deep-green ground, cream delivery card, orange CTAs.
export function DeliveryBand({
  hours,
  deliveryTime,
  freeThreshold,
}: {
  hours: string;
  deliveryTime: string;
  freeThreshold: number;
}) {
  const freeLine =
    freeThreshold > 0 ? `Gratis desde ${formatPrice(freeThreshold)}` : "Gratis en Buena Vista";

  const steps = [
    { title: "Eliges y confirmas", body: "Desde la web o por WhatsApp, sin llamadas." },
    { title: "Preparamos tu compra", body: "Revisamos cada producto antes de salir." },
    { title: "Pagas al recibir", body: "Efectivo contra entrega, en tu puerta." },
  ];

  return (
    <section className="relative overflow-hidden bg-brand-deep text-light">
      {/* Atmosphere: soft orange aurora + fine grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 60% at 82% 18%, rgba(239,125,31,0.20), transparent 68%), radial-gradient(45% 50% at 8% 90%, rgba(232,200,142,0.12), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,200,142,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(232,200,142,0.16) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(70% 70% at 50% 40%, black, transparent 78%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-28">
        {/* Copy */}
        <div>
          <span className="eyebrow inline-flex items-center gap-2.5 text-gold">
            <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
            Entrega local · Buena Vista
          </span>

          <h2 className="mt-5 max-w-[17ch] font-display text-3xl font-extrabold leading-[1.06] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
            <SplitText text="Tu compra llega" />{" "}
            <RotatingWord
              words={["el mismo día", "a tu puerta", "en Buena Vista"]}
              className="text-accent-soft"
            />
          </h2>

          <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-light/75">
            Pides en la web o por WhatsApp, preparamos tu pedido y lo llevamos a tu puerta con
            pago contra entrega. {deliveryTime === "el mismo día" ? "Hoy mismo" : `Entrega ${deliveryTime}`} en
            Buena Vista y zonas cercanas de Santa Cruz.
          </p>

          <ol className="mt-9 grid gap-3 sm:grid-cols-3">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-sm transition-colors hover:border-accent/45"
              >
                <span className="font-display text-2xl font-bold leading-none text-gold/75 transition-colors group-hover:text-accent-soft">
                  0{i + 1}
                </span>
                <p className="mt-2.5 text-sm font-semibold text-light">{step.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-light/55">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-brand-deep shadow-[0_18px_40px_-16px_rgba(239,125,31,0.95)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
            >
              Hacer un pedido
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/shipping"
              className="inline-flex items-center gap-2 rounded-full border border-light/25 px-7 py-3.5 text-sm font-semibold text-light transition hover:border-gold/60 hover:text-gold"
            >
              Zonas y horarios
            </Link>
          </div>

          <p className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-light/45">
            <ClockIcon />
            {hours}
          </p>
        </div>

        {/* Illustration card */}
        <div className="relative mx-auto w-full max-w-md">
          {/* Floating chips outside the frame */}
          <span className="absolute -left-4 top-20 z-20 -rotate-3 rounded-2xl bg-accent px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-brand-deep shadow-[0_16px_34px_-14px_rgba(239,125,31,0.9)] sm:-left-6">
            Mismo día
          </span>
          <span className="absolute -bottom-3 right-6 z-20 rotate-2 rounded-2xl border border-brand/15 bg-white px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-brand shadow-[0_16px_34px_-18px_rgba(18,53,31,0.6)]">
            {freeLine}
          </span>

          <div className="relative overflow-hidden rounded-[2rem] border border-gold/35 bg-cream p-6 shadow-[0_40px_90px_-46px_rgba(0,0,0,0.75)] sm:p-8">
            {/* dot grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage: "radial-gradient(rgba(31,91,51,0.16) 1px, transparent 1.4px)",
                backgroundSize: "20px 20px",
              }}
            />
            {/* glow + rings */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[54%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(239,125,31,0.18), transparent 65%)" }}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[54%] h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/15"
            />
            <span
              aria-hidden="true"
              className="animate-ring pointer-events-none absolute left-1/2 top-[54%] h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40"
            />

            <div className="relative">
              <div className="flex items-start justify-between">
                <span className="rounded-full border border-brand/20 bg-white/70 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-brand">
                  Ruta de hoy
                </span>
                <span className="font-display text-[0.7rem] font-semibold tracking-[0.16em] text-brand/60">
                  BV · SC
                </span>
              </div>

              <div className="relative flex min-h-[300px] items-center justify-center">
                {/* route from the shop to the door */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 400 300"
                  className="pointer-events-none absolute inset-0 h-full w-full text-accent/65"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M52 246 C 128 232, 120 172, 205 160 S 322 128, 350 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="5 9"
                    className="route-dash"
                  />
                </svg>

                <MapPin className="bottom-[5%] left-[4%]">SanJuan</MapPin>
                <MapPin className="right-[2%] top-[1%]">Tu puerta</MapPin>

                {/* kerb + lane marks under the wheels */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-[8%] bottom-[8%] h-[7px] rounded-full bg-brand/10"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-[11%] bottom-[11%] border-t-2 border-dashed border-cream"
                />

                <TruckArt />
              </div>

              <div className="relative grid grid-cols-2 gap-2">
                <Chip icon={<StoreIcon />} label="Pedido por WhatsApp" />
                <Chip icon={<CashIcon />} label="Pago al recibir" />
              </div>
            </div>

            {/* double frame, like the editorial panels */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-brand/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TruckArt() {
  return (
    <div className="animate-truck relative z-[1] w-[74%] max-w-[290px] drop-shadow-[0_24px_26px_rgba(18,53,31,0.2)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/delivery-truck.webp"
        alt=""
        width={800}
        height={800}
        loading="lazy"
        decoding="async"
        className="w-full"
      />
      <span aria-hidden="true" className="absolute left-[76%] top-[41%] -translate-x-1/2 -translate-y-1/2 font-display text-[0.6rem] font-extrabold uppercase tracking-[0.22em] text-brand-deep/70">
        SanJuan
      </span>
    </div>
  );
}

function MapPin({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={`absolute z-[2] flex items-center gap-1.5 rounded-full border border-brand/15 bg-white/85 px-2.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-brand shadow-sm backdrop-blur-sm ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      {children}
    </span>
  );
}

function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-brand/10 bg-white/75 px-3 py-2.5 text-[0.7rem] font-semibold text-brand">
      <span className="text-accent-strong">{icon}</span>
      {label}
    </div>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M4 9v10h16V9" />
      <path d="M9 19v-5h6v5" />
    </svg>
  );
}

function CashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.3" />
      <path d="M6 9.5v5M18 9.5v5" />
    </svg>
  );
}
