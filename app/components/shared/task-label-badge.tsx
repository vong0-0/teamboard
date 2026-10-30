import type { HTMLAttributes } from "react";
import { cn } from "cn";

type TaskLabel = {
  name: string;
  tone: string;
};

type TaskLabelBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  label: TaskLabel;
};

export function TaskLabelBadge({
  label,
  className,
  ...props
}: TaskLabelBadgeProps) {
  return (
    <span
      className={cn(
        "border-ink rounded-sm border font-mono text-[8px] leading-none font-bold",
        label.tone === "feature" ? "bg-ok" : "bg-gray-100",
        className,
      )}
      {...props}
    >
      {label.name}
    </span>
  );
}
