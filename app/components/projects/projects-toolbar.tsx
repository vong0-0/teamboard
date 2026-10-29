import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { cn } from "cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const dueOptions = ["This month", "This week", "Overdue"] as const;
const budgetOptions = ["> $5K", "$1K - $5K", "< $1K"] as const;

export function ProjectsToolbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromUrl = searchParams.get("search") ?? "";
  const [search, setSearch] = useState(searchFromUrl);

  useEffect(() => setSearch(searchFromUrl), [searchFromUrl]);

  useEffect(() => {
    if (search === searchFromUrl) return;

    const timeout = window.setTimeout(() => {
      const nextParams = new URLSearchParams(searchParams);
      if (search.trim()) nextParams.set("search", search.trim());
      else nextParams.delete("search");
      setSearchParams(nextParams);
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [search, searchFromUrl, searchParams, setSearchParams]);

  function setFilter(key: "due" | "budget", value: string | null) {
    const nextParams = new URLSearchParams(searchParams);
    if (value) nextParams.set(key, value);
    else nextParams.delete(key);
    setSearchParams(nextParams);
  }

  return (
    <div className="mt-4 flex min-w-0 flex-wrap items-center gap-2">
      <div className="relative w-full min-w-0 sm:w-56">
        <Search
          className="absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-gray-500"
          aria-hidden="true"
        />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search projects..."
          aria-label="Search projects"
          className="border-ink bg-paper h-8 rounded-sm border-2 pr-8 pl-7 font-sans text-xs"
        />
      </div>

      <FilterMenu
        label="DUE"
        queryKey="due"
        options={dueOptions}
        value={searchParams.get("due")}
        onChange={(value) => setFilter("due", value)}
      />
      <FilterMenu
        label="BUDGET"
        queryKey="budget"
        options={budgetOptions}
        value={searchParams.get("budget")}
        onChange={(value) => setFilter("budget", value)}
      />
    </div>
  );
}

function FilterMenu({
  label,
  queryKey,
  options,
  value,
  onChange,
}: {
  label: string;
  queryKey: "due" | "budget";
  options: readonly string[];
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "border-ink h-7 rounded-full px-2.5 font-mono text-[9px] uppercase",
                value
                  ? "!bg-ink !text-paper hover:!bg-ink hover:!text-paper"
                  : "bg-transparent text-ink hover:bg-ink hover:text-paper",
                "focus:text-paper data-popup-open:bg-paper data-popup-open:text-ink",
              )}
            />
          }
        >
          {label}: {value ?? (queryKey === "due" ? "This month" : "> $5K")}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="window shadow-hard-sm min-w-36 rounded-sm p-1"
        >
          {options.map((option) => (
            <DropdownMenuItem key={option} onClick={() => onChange(option)}>
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {value ? (
        <button
          type="button"
          aria-label={`Clear ${label.toLowerCase()} filter`}
          onClick={() => onChange(null)}
          className="text-ink border-ink hover:bg-ink hover:text-paper inline-flex size-5 items-center justify-center rounded-full border"
        >
          <X className="size-3" />
        </button>
      ) : null}
    </div>
  );
}
