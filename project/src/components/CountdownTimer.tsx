import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  minutes: number;
  label: string;
}

/**
 * Urgency countdown timer. Counts down from `minutes` on mount.
 * When expired, resets to keep urgency persistent without deception.
 */
export function CountdownTimer({ minutes, label }: CountdownTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) return minutes * 60;
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [minutes]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400/90">
        <Clock className="h-3.5 w-3.5" />
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-1.5 font-mono text-2xl font-black sm:text-3xl">
        <TimeBlock value={pad(mins)} />
        <span className="text-amber-400/60">:</span>
        <TimeBlock value={pad(secs)} />
      </div>
    </div>
  );
}

function TimeBlock({ value }: { value: string }) {
  return (
    <span className="inline-flex min-w-[2.5rem] items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10 px-2 py-1.5 text-amber-400 shadow-[0_0_15px_-3px_rgba(250,204,21,0.4)] sm:min-w-[3rem]">
      {value}
    </span>
  );
}
