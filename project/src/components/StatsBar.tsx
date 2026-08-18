import { motion } from "framer-motion";
import { Eye, Users, Package } from "lucide-react";

interface StatsBarProps {
  stats: readonly { label: string; value: string; icon: string }[];
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  eye: Eye,
  slot: Package,
};

/**
 * Stats bar showing generic, non-fabricated activity indicators.
 * Animated counters with scroll reveal.
 */
export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-6">
      {stats.map((stat, i) => {
        const Icon = ICONS[stat.icon] ?? Eye;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2 py-4 text-center backdrop-blur-md sm:gap-2 sm:px-4"
          >
            <Icon className="h-5 w-5 text-green-400 sm:h-6 sm:w-6" />
            <span className="text-lg font-black text-white sm:text-2xl">{stat.value}</span>
            <span className="text-[10px] uppercase tracking-wider text-white/40 sm:text-xs">
              {stat.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
