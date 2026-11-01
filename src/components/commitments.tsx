import { Emblem } from "./brand/emblem";

const COMMITMENTS = [
  {
    title: "Frescos de verdad",
    body: "Lácteos con rotación diaria y productos revisados antes de cada entrega.",
    icon: <LeafIcon />,
  },
  {
    title: "Entrega en el día",
    body: "Pide antes del mediodía y recibe tu compra el mismo día en Buena Vista.",
    icon: <TruckIcon />,
  },
  {
    title: "Precio de barrio",
    body: "Ofertas claras y precios justos, sin sorpresas al pagar.",
    icon: <TagIcon />,
  },
  {
    title: "Atención cercana",
    body: "Escríbenos por WhatsApp y te ayudamos a armar tu pedido.",
    icon: <ChatIcon />,
  },
];

export function Commitments() {
  return (
    <section className="bg-brand py-20 text-light">
      <div className="mx-auto max-w-6xl px-5 text-center">
        <Emblem size={40} className="mx-auto text-accent-soft" />
        <span className="eyebrow mt-4 block text-accent-soft">Nuestro compromiso</span>
        <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Compra fácil, cerca de ti
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-light/75">
          Un minimarket de barrio en Buena Vista, Santa Cruz, que cuida tu tiempo y tu mesa.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-4 px-5 sm:grid-cols-2">
        {COMMITMENTS.map((c) => (
          <div
            key={c.title}
            className="flex items-start gap-4 rounded-2xl border border-[rgba(255,162,92,0.25)] bg-[rgba(255,255,255,0.05)] p-6 text-left transition hover:border-accent-soft/60 hover:bg-[rgba(255,255,255,0.08)]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-soft">
              {c.icon}
            </span>
            <span>
              <span className="block font-display text-lg font-bold">{c.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-light/70">{c.body}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function LeafIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 20c0-8 5-14 16-15 0 10-5 15-11 15H4z" strokeLinejoin="round" />
      <path d="M4 20c3-5 7-8 12-10" strokeLinecap="round" />
    </svg>
  );
}
function TruckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 7h10v8H3z" strokeLinejoin="round" />
      <path d="M13 10h4l3 3v2h-7z" strokeLinejoin="round" />
      <circle cx="7" cy="17.5" r="1.6" />
      <circle cx="17.5" cy="17.5" r="1.6" />
    </svg>
  );
}
function TagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 12L12 3h8v8l-9 9-8-8z" strokeLinejoin="round" />
      <circle cx="16" cy="8" r="1.4" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 5h16v11H9l-5 4V5z" strokeLinejoin="round" />
      <path d="M8 10h8M8 13h5" strokeLinecap="round" />
    </svg>
  );
}
