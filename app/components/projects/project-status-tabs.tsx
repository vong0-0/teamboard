import { useSearchParams } from "react-router";
import { cn } from "cn";
import { mockProjectStatusCounts } from "~/mock-data/projects";

export function ProjectStatusTabs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeStatus = searchParams.get("status") ?? "all";

  function selectStatus(status: string) {
    const nextParams = new URLSearchParams(searchParams);

    if (status === "all") {
      nextParams.delete("status");
    } else {
      nextParams.set("status", status);
    }

    setSearchParams(nextParams);
  }

  return (
    <div
      className="border-ink mt-6 flex min-w-0 gap-5 overflow-x-auto overflow-y-hidden border-b-2"
      role="tablist"
      aria-label="Filter projects by status"
    >
      {mockProjectStatusCounts.map((status) => {
        const isActive = activeStatus === status.value;

        return (
          <button
            key={status.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => selectStatus(status.value)}
            className={cn(
              "border-ink -mb-0.5 flex shrink-0 items-center gap-2 border-b-2 px-0 pb-2 font-sans text-xs transition-colors",
              isActive
                ? "border-ink text-ink font-bold"
                : "hover:text-ink border-transparent text-gray-500",
            )}
          >
            {status.label}
            <span
              className={cn(
                "rounded-sm border-2 px-1.5 py-0.5 font-mono text-[9px] leading-none font-bold",
                isActive
                  ? "border-ink bg-ink text-paper"
                  : "border-ink text-ink bg-gray-100",
              )}
            >
              {status.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
