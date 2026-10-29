import type { HTMLAttributes } from "react";
import { cn } from "cn";

export type Priority = "HIGH" | "MED" | "LOW";

const priorityStyles: Record<Priority, string> = {
  HIGH: "bg-accent",
  MED: "bg-warn",
  LOW: "bg-gray-200",
};

type PriorityBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  priority: Priority;
};

export function PriorityBadge({ priority, className, ...props }: PriorityBadgeProps) {
  return (
    <span
      className={cn(
        "border-ink inline-flex rounded-sm border-2 px-2 py-0.5 font-mono text-[9px] font-bold",
        priorityStyles[priority],
        className,
      )}
      {...props}
    >
      {priority}
    </span>
  );
}
