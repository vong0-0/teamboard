import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { SkeletonButton } from "~/components/shared/skeleton-button";
import { useSession, useSessionHydrated } from "~/stores/session-store";

type Greeting = "morning" | "afternoon" | "evening";

export function DashboardHeader() {
  const session = useSession();
  const sessionHydrated = useSessionHydrated();
  const [localDate, setLocalDate] = useState<string | null>(null);
  const [greeting, setGreeting] = useState<Greeting | null>(null);
  const headerReady = sessionHydrated && localDate !== null && greeting !== null;
  const firstName = session?.name.split(" ")[0] ?? "there";

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const updateLocalTime = () => {
      const now = new Date();
      const hour = now.getHours();

      setLocalDate(formatter.format(now));
      setGreeting(hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening");
    };

    updateLocalTime();
    const intervalId = window.setInterval(updateLocalTime, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  return headerReady ? (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="font-mono text-[11px] font-bold">{localDate}</p>
        <h2 className="font-display min-w-0 text-[44px] leading-[100%] font-black tracking-[-3%]">
          <span className="block truncate lg:hidden">Hi, {firstName}</span>
          <span className="hidden lg:inline">
            Good {greeting}, {firstName}.
          </span>
        </h2>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="outline"
          className="border-ink bg-paper text-ink shadow-hard-sm hover:text-paper hover:bg-ok rounded-sm border-2 px-5 py-2.5 text-[14px] transition-all duration-200"
        >
          Export
        </Button>
        <Button
          render={<Link to="/projects" />}
          className="border-ink bg-ink text-paper shadow-hard-sm hover:text-ink rounded-sm border-2 px-5 py-2.5 text-[14px] transition-all duration-200 hover:bg-transparent"
        >
          + New project
        </Button>
      </div>
    </div>
  ) : (
    <DashboardHeaderSkeleton />
  );
}

export function DashboardHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0 flex-1 space-y-1.5">
        <Skeleton className="h-3 w-28" />
        <div className="font-display min-w-0 text-[44px] leading-[100%] font-black tracking-[-3%]">
          <Skeleton className="h-11 w-28 lg:hidden" />
          <Skeleton className="hidden h-11 w-64 lg:block" />
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <SkeletonButton className="w-28" />
        <SkeletonButton className="w-40" />
      </div>
    </div>
  );
}
