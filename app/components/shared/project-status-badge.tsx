import type { HTMLAttributes } from "react";
import { cn } from "cn";

export type ProjectStatus = "ACTIVE" | "ON HOLD" | "DONE";

const styles: Record<ProjectStatus, string> = {
  ACTIVE: "bg-ok",
  "ON HOLD": "bg-warn",
  DONE: "bg-ink text-paper",
};

type ProjectStatusBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  status: ProjectStatus;
};

export function ProjectStatusBadge({ status, className, ...props }: ProjectStatusBadgeProps) {
  return (
    <span
      className={cn(
        "border-ink inline-flex rounded-sm border px-1.5 py-0.5 font-mono text-[7px] font-bold",
        styles[status],
        className,
      )}
      {...props}
    >
      {status}
    </span>
  );
}
