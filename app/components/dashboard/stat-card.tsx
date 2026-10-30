import { cn } from "cn";
import type { ReactNode } from "react";
import {
  mockNeutralStatCardChartPoints,
  mockStatCardChartPointsByTone,
} from "~/mock-data/dashboard";

export type StatCardBadgeTone = "positive" | "negative" | "live";

export type StatCardProps = {
  title: string;
  value: string;
  badge?: ReactNode;
  badgeTone?: StatCardBadgeTone;
  chartPoints?: number[];
};

const badgeToneClasses: Record<StatCardBadgeTone, string> = {
  positive: "bg-ok",
  negative: "bg-accent",
  live: "bg-warn",
};

export function StatCard({
  title,
  value,
  badge,
  badgeTone,
  chartPoints = badgeTone
    ? mockStatCardChartPointsByTone[badgeTone]
    : mockNeutralStatCardChartPoints,
}: StatCardProps) {
  const showBadge =
    badge !== undefined &&
    badge !== null &&
    badge !== "" &&
    typeof badge !== "boolean";

  return (
    <article className="border-ink bg-paper shadow-hard-sm flex min-w-0 flex-col justify-between gap-4 rounded-sm border-2 p-5">
      <div>
        <p className="font-mono text-[10px] font-bold text-gray-500 uppercase">
          {title}
        </p>
        <p className="text-ink mt-4 font-mono text-4xl font-bold leading-none">
          {value}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3">
        {showBadge ? (
          <span
            className={cn(
              "border-ink inline-flex shrink-0 items-center rounded-sm border-2 px-2 py-1 font-mono text-[10px] font-bold leading-none [&_svg]:size-3 [&_svg]:shrink-0",
              badgeTone ? badgeToneClasses[badgeTone] : "bg-gray-200",
            )}
          >
            {badge}
          </span>
        ) : null}
        <svg
          aria-hidden="true"
          className="text-ink h-9 w-32 min-w-0 flex-1"
          viewBox="0 0 128 36"
          preserveAspectRatio="none"
        >
          <polyline
            fill="none"
            points={getChartPoints(chartPoints)}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
        </svg>
      </div>
    </article>
  );
}

function getChartPoints(values: number[]) {
  if (values.length < 2) return "0,18 128,18";

  const minimum = Math.min(...values);
  const range = Math.max(...values) - minimum || 1;

  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 128;
      const y = 32 - ((value - minimum) / range) * 24;

      return `${x},${y}`;
    })
    .join(" ");
}
