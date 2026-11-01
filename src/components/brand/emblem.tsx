// The store's brand mark — the SanJuan produce-basket icon on a warm cream
// badge. `BasketMark` is the small line-art basket, kept only for the faint
// decorative watermarks where the full-colour mark would be too heavy.

type MarkProps = {
  size?: number;
  className?: string;
  /** Kept for call sites that still pass a colour; the logo carries its own. */
  color?: string;
  /** Same as `color` — unused by the logo, used by the basket watermark. */
  accent?: string;
};

export function Emblem({ size = 44, className = "" }: MarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/sanjuan-icon.webp"
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
      className={`shrink-0 rounded-[22%] object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export function BasketMark({
  size = 44,
  className = "",
  color = "currentColor",
  accent = "var(--color-accent)",
}: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* handle */}
      <path
        d="M22 27c0-6.6 4.5-12 10-12s10 5.4 10 12"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* basket body */}
      <path
        d="M11 27h42l-4.8 27a6 6 0 0 1-5.9 5H21.7a6 6 0 0 1-5.9-5L11 27z"
        stroke={color}
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* weave */}
      <path
        d="M19.5 36l2.6 18M32 36v18M44.5 36l-2.6 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* leaf */}
      <path d="M33 22c0-6.4 4.4-11 9.8-11-1.1 6.6-4.6 10-9.8 11z" fill={accent} />
      {/* berry */}
      <circle cx="47" cy="16" r="4.2" fill={accent} />
    </svg>
  );
}
