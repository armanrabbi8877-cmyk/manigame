import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface RewardCardProps {
  icon: string;
  title: string;
  description: string;
  tag?: string;
  color?: string;
  index: number;
}

const COLOR_MAP: Record<string, { border: string; glow: string; gradient: string; tag: string }> = {
  green: {
    border: "border-green-400/30",
    glow: "hover:shadow-[0_0_40px_-5px_rgba(95,211,95,0.5)]",
    gradient: "from-green-400/15 via-transparent to-transparent",
    tag: "bg-green-400/15 text-green-400 border-green-400/30",
  },
  blue: {
    border: "border-blue-400/30",
    glow: "hover:shadow-[0_0_40px_-5px_rgba(62,166,255,0.5)]",
    gradient: "from-blue-400/15 via-transparent to-transparent",
    tag: "bg-blue-400/15 text-blue-400 border-blue-400/30",
  },
  gold: {
    border: "border-amber-400/30",
    glow: "hover:shadow-[0_0_40px_-5px_rgba(250,204,21,0.5)]",
    gradient: "from-amber-400/15 via-transparent to-transparent",
    tag: "bg-amber-400/15 text-amber-400 border-amber-400/30",
  },
};

/**
 * 3D tilt-on-hover reward card with glassmorphism background,
 * floating animation, tag badge, and accent-colored glow.
 */
export function RewardCard({ icon, title, description, tag, color = "green", index }: RewardCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * 18, ry: px * 18 });
  };

  const handleLeave = () => setTilt({ rx: 0, ry: 0 });

  const c = COLOR_MAP[color] ?? COLOR_MAP.green;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`group relative h-full overflow-hidden rounded-2xl border ${c.border} bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 ${c.glow}`}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.2s ease-out",
          animation: `cardFloat ${5 + index}s ease-in-out infinite`,
        }}
      >
        {/* Gradient overlay */}
        <div className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${c.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

        {/* Tag badge */}
        {tag && (
          <div
            className={`absolute right-4 top-4 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${c.tag}`}
            style={{ transform: "translateZ(50px)" }}
          >
            {tag}
          </div>
        )}

        {/* Icon */}
        <div
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/15 to-white/0 text-3xl shadow-lg"
          style={{ transform: "translateZ(40px)" }}
        >
          {icon}
        </div>

        {/* Title */}
        <h3
          className="mb-2 text-xl font-bold text-white"
          style={{ transform: "translateZ(30px)" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed text-white/60"
          style={{ transform: "translateZ(20px)" }}
        >
          {description}
        </p>

        {/* Bottom accent line */}
        <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/5">
          <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 transition-all duration-500 group-hover:w-full" />
        </div>
      </div>
    </motion.div>
  );
}
