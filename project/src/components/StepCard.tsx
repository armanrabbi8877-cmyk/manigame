import { motion } from "framer-motion";
import { Target, ShieldCheck, CheckCircle2 } from "lucide-react";

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon?: string;
  index: number;
}



const ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  target: Target,
  shield: ShieldCheck,
  check: CheckCircle2,
};

/**
 * Animated numbered 3D step card with icon used in "How It Works".
 */
export function StepCard({ number, title, description, icon = "target", index }: StepProps) {
  const Icon = ICONS[icon] ?? Target;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative flex flex-col items-center text-center"
      style={{ perspective: "800px" }}
    >
      {/* Connector line */}
      {index < 2 && (
        <div
          className="absolute top-12 hidden h-px w-full bg-gradient-to-r from-green-400/40 to-transparent lg:block"
          style={{ left: "60%" }}
        />
      )}

      {/* 3D numbered badge */}
      <div
        className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 shadow-[0_8px_30px_-8px_rgba(95,211,95,0.5)]"
        style={{
          transformStyle: "preserve-3d",
          animation: `cardFloat ${4 + index}s ease-in-out infinite`,
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400/20 via-blue-400/10 to-transparent"
          style={{ transform: "translateZ(-10px)" }}
        />
        {/* Number */}
        <span
          className="absolute text-5xl font-black text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg, #5fd35f, #3ea6ff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            transform: "translateZ(10px)",
            opacity: 0.3,
          }}
        >
          {number}
        </span>
        {/* Icon */}
        <Icon
          className="relative h-10 w-10 text-green-400"
          style={{ transform: "translateZ(25px)" }}
        />
        {/* Glow ring */}
        <div className="absolute -inset-1 rounded-2xl bg-green-400/20 opacity-0 blur-xl transition-opacity duration-500 hover:opacity-100" />
      </div>

      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="max-w-xs text-sm leading-relaxed text-white/60">{description}</p>
    </motion.div>
  );
}
