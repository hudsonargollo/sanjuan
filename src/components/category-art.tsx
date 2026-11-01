/** Line icons for supermarket category tiles. */

type Props = { className?: string };

function Milk({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      {/* gable-top carton */}
      <path d="M44 46V28l12-9 12 9v18" strokeLinejoin="round" />
      <path d="M44 46h24v52a4 4 0 0 1-4 4H48a4 4 0 0 1-4-4V46z" strokeLinejoin="round" />
      <path d="M56 19v27" />
      <path d="M44 62h24" strokeWidth="1.4" opacity="0.6" />
      <path d="M50 74c2-3 5-4 8-3" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function Yogurt({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      {/* cup */}
      <path d="M38 44h44l-6 48a5 5 0 0 1-5 4H49a5 5 0 0 1-5-4l-6-48z" strokeLinejoin="round" />
      {/* lid */}
      <rect x="34" y="36" width="52" height="9" rx="2.5" />
      {/* spoon */}
      <ellipse cx="60" cy="28" rx="7" ry="9" />
      <path d="M60 37v12" strokeLinecap="round" />
      {/* soft swirl */}
      <path d="M52 78c4-4 8-4 12 0s8 4 12 0" strokeLinecap="round" opacity="0.6" strokeWidth="1.6" />
    </svg>
  );
}

function Butter({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      {/* butter block in perspective */}
      <path d="M26 62l26-14 42 10-26 14-42-10z" strokeLinejoin="round" />
      <path d="M26 62v14l42 10V76" strokeLinejoin="round" />
      <path d="M68 76l26-14V48" strokeLinejoin="round" />
      <path d="M40 63l24-12M48 67l24-12" strokeWidth="1.4" opacity="0.55" strokeLinecap="round" />
      {/* knife */}
      <path d="M72 30l16 5-4 10-16-5z" strokeLinejoin="round" />
    </svg>
  );
}

function Cleaning({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      {/* spray bottle */}
      <path d="M46 52h20l5 48a4 4 0 0 1-4 4H45a4 4 0 0 1-4-4l5-48z" strokeLinejoin="round" />
      <path d="M50 52V36h12v16" strokeLinejoin="round" />
      <path d="M62 34h8l8 6v8l-16-4" strokeLinejoin="round" />
      {/* trigger */}
      <path d="M62 40l-8 6" strokeLinecap="round" />
      {/* spray droplets */}
      <path d="M84 30l6-4M88 40h7M82 22l2-6" strokeLinecap="round" opacity="0.65" />
      {/* label */}
      <rect x="48" y="70" width="16" height="16" rx="2" strokeWidth="1.4" opacity="0.55" />
    </svg>
  );
}

function Basket({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M42 50c0-8 6-15 15-15s15 7 15 15" />
      <path d="M24 50h72l-8 40a7 7 0 0 1-7 6H39a7 7 0 0 1-7-6l-8-40z" strokeLinejoin="round" />
      <path d="M36 64l4 26M52 64v26M68 64v26M84 64l-4 26" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M72 40c0-8 5-14 12-14-1.3 8-5.6 12.5-12 14z" fill="currentColor" stroke="none" opacity="0.85" />
    </svg>
  );
}

const MAP: Record<string, (p: Props) => React.ReactElement> = {
  leches: Milk,
  yogurts: Yogurt,
  "crema-mantequilla": Butter,
  limpieza: Cleaning,
};

export function CategoryArt({ slug, className }: { slug: string; className?: string }) {
  const Art = MAP[slug] ?? Basket;
  return <Art className={className} />;
}
