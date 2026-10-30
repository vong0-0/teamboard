import type { ReactNode } from "react";

type PageHeaderProps = {
  title: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
};

export function PageHeader({ title, eyebrow, actions }: PageHeaderProps) {
  return (
    <header className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="min-w-0 flex-1 space-y-1.5">
        {eyebrow ? (
          <div className="font-mono text-[11px] font-bold">{eyebrow}</div>
        ) : null}
        <h2 className="font-display min-w-0 text-3xl leading-[100%] font-black tracking-[-3%] sm:text-[44px]">
          {title}
        </h2>
      </div>
      {actions ? (
        <div className="flex w-full min-w-0 gap-2 sm:w-auto sm:shrink-0 sm:items-center">
          {actions}
        </div>
      ) : null}
    </header>
  );
}
