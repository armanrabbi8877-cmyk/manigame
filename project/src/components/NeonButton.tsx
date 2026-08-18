import { useEffect, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

/**
 * Neon CTA button with ripple effect, 3D depth, pulsing glow,
 * and shine sweep. Redirects to CONTENT_LOCKER_URL on click.
 */
export function NeonButton({
  children,
  onClick,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [pressed, setPressed] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
    onClick?.();
  };

  useEffect(() => {
    if (!pressed) return;
    const t = window.setTimeout(() => setPressed(false), 150);
    return () => clearTimeout(t);
  }, [pressed]);

  const base =
    "group relative overflow-hidden rounded-xl px-8 py-4 text-base font-bold tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 active:scale-95";

  const styles =
    variant === "primary"
      ? "text-white border-2 border-green-400/60 bg-gradient-to-br from-green-500/40 via-emerald-500/30 to-green-600/40 hover:border-green-400 hover:shadow-[0_0_35px_-2px_rgba(95,211,95,0.7)]"
      : "text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:shadow-[0_0_20px_-4px_rgba(62,166,255,0.5)]";

  return (
    <button
      onClick={handleClick}
      onMouseDown={() => setPressed(true)}
      className={`${base} ${styles} ${className}`}
      style={{
        transform: pressed ? "translateY(2px) scale(0.98)" : "translateY(0)",
        boxShadow: pressed
          ? "0 2px 10px -2px rgba(95,211,95,0.5)"
          : "0 6px 25px -4px rgba(95,211,95,0.5), 0 0 0 1px rgba(95,211,95,0.1)",
        animation: variant === "primary" ? "ctaPulse 2.5s ease-in-out infinite" : undefined,
      }}
    >
      {/* Ripple layer */}
      <span className="pointer-events-none absolute inset-0">
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full bg-white/50"
            style={{
              left: r.x,
              top: r.y,
              width: 10,
              height: 10,
              transform: "translate(-50%, -50%)",
              animation: "ripple 0.7s ease-out forwards",
            }}
          />
        ))}
      </span>

      {/* Shine sweep on hover */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
        <span className="absolute -left-full top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
      </span>

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
