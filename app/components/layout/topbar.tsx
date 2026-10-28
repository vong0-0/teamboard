import type { ReactNode } from "react";

type TopbarProps = {
  left?: ReactNode;
  right?: ReactNode;
};

export function Topbar({ left, right }: TopbarProps) {
  return (
    <header className="border-ink bg-paper flex h-[71px] w-full items-center border-b-2 px-4 py-2.5 lg:px-8 lg:py-3.5">
      <div className="flex min-w-0 flex-1 items-center">{left}</div>
      <div className="ml-auto flex shrink-0 items-center">{right}</div>
    </header>
  );
}
