import { cn } from "cn";
import { Skeleton } from "~/components/ui/skeleton";

type SkeletonButtonProps = React.ComponentProps<typeof Skeleton>;

export function SkeletonButton({ className, ...props }: SkeletonButtonProps) {
  return (
    <Skeleton
      aria-hidden="true"
      className={cn("h-11 rounded-sm", className)}
      {...props}
    />
  );
}
