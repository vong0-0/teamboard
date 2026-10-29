import { cn } from "cn";

type TrackProps = {
  value: number;
  max?: number;
  className?: string;
  label?: string;
};

export function Track({ value, max = 100, className, label }: TrackProps) {
  const percentage = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.min(Math.max(value, 0), max)}
      className={cn("border-ink bg-paper h-2.5 w-full border-2 p-px", className)}
    >
      <div
        className="bg-ink h-full transition-[width] duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
