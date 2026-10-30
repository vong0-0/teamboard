import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { SkeletonButton } from "~/components/shared/skeleton-button";
import { PageHeader } from "~/components/shared/page-header";
import { useSession, useSessionHydrated } from "~/stores/session-store";

type Greeting = "morning" | "afternoon" | "evening";

export function DashboardHeader() {
  const session = useSession();
  const sessionHydrated = useSessionHydrated();
  const [localDate, setLocalDate] = useState<string | null>(null);
  const [greeting, setGreeting] = useState<Greeting | null>(null);
  const headerReady =
    sessionHydrated && localDate !== null && greeting !== null;
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
    <PageHeader
      eyebrow={localDate}
      title={
        <>
          <span className="block truncate lg:hidden">Hi, {firstName}</span>
          <span className="hidden lg:inline">
            Good {greeting}, {firstName}.
          </span>
        </>
      }
      actions={
        <>
          <Button
            variant="outline"
            className="border-ink bg-paper text-ink shadow-hard-sm hover:text-paper hover:bg-ok min-w-0 flex-1 rounded-sm border-2 px-2 py-2 text-xs whitespace-nowrap transition-all duration-200 sm:flex-none sm:px-5 sm:py-2.5 sm:text-[14px]"
          >
            Export
          </Button>
          <Button
            render={<Link to="/projects" />}
            className="border-ink bg-ink text-paper shadow-hard-sm hover:text-ink min-w-0 flex-1 rounded-sm border-2 px-2 py-2 text-xs whitespace-nowrap transition-all duration-200 hover:bg-transparent sm:flex-none sm:px-5 sm:py-2.5 sm:text-[14px]"
          >
            + New project
          </Button>
        </>
      }
    />
  ) : (
    <DashboardHeaderSkeleton />
  );
}

export function DashboardHeaderSkeleton() {
  return (
    <PageHeader
      eyebrow={<Skeleton className="h-3 w-28" />}
      title={
        <>
          <Skeleton className="h-8 w-28 lg:hidden" />
          <Skeleton className="hidden h-11 w-64 lg:block" />
        </>
      }
      actions={
        <>
          <SkeletonButton className="min-w-0 flex-1 sm:w-28 sm:flex-none" />
          <SkeletonButton className="min-w-0 flex-1 sm:w-40 sm:flex-none" />
        </>
      }
    />
  );
}
