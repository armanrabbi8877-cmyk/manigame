import { ShieldCheck, Zap, Globe, Lock } from "lucide-react";

interface TrustBadgesProps {
  badges: readonly { icon: string; text: string }[];
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: ShieldCheck,
  zap: Zap,
  globe: Globe,
  lock: Lock,
};

/**
 * Row of trust badges with icons — reinforces credibility.
 */
export function TrustBadges({ badges }: TrustBadgesProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
      {badges.map((badge) => {
        const Icon = ICONS[badge.icon] ?? ShieldCheck;
        return (
          <div
            key={badge.text}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md sm:px-4"
          >
            <Icon className="h-4 w-4 text-green-400" />
            <span className="text-xs font-medium text-white/60">{badge.text}</span>
          </div>
        );
      })}
    </div>
  );
}
