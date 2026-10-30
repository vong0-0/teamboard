import { Link, useLocation } from "react-router";

type TabItem = {
  label: string;
  letter: string | null;
  to: string;
  badge?: string;
};

const tabs: TabItem[] = [
  { label: "DASHBOARD", letter: "D", to: "/dashboard" },
  { label: "PROJECTS", letter: "P", to: "/projects" },
  { label: "BOARD", letter: "B", to: "/board" },
  { label: "MESSAGES", letter: null, to: "/messages", badge: "3" },
  { label: "ME", letter: "M", to: "/profile" },
];

export function TabBar() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Primary navigation"
      className="border-ink bg-paper fixed inset-x-0 bottom-0 z-50 h-[69px] border-2 px-2 lg:hidden"
    >
      <ul className="flex h-full items-center">
        {tabs.map((tab) => {
          const active =
            pathname === tab.to || pathname.startsWith(`${tab.to}/`);

          return (
            <li
              className="flex h-full flex-1 items-center justify-center"
              key={tab.label}
            >
              <Link
                to={tab.to}
                aria-current={active ? "page" : undefined}
                aria-label={
                  tab.badge
                    ? `${tab.label}, ${tab.badge} unread messages`
                    : tab.label
                }
                className="flex flex-col items-center justify-center gap-1 p-0"
              >
                <span
                  className={`border-ink relative grid h-[26px] w-[30px] place-items-center rounded-sm border-2 font-mono text-sm font-bold ${
                    active
                      ? "bg-ink text-paper shadow-hard-sm"
                      : "bg-paper text-ink"
                  }`}
                >
                  {tab.letter}
                  {tab.badge && (
                    <span className="border-ink bg-accent text-ink shadow-hard-sm absolute -top-2 -right-2 grid size-6 place-items-center rounded-sm border-2 font-mono text-xs font-bold">
                      {tab.badge}
                    </span>
                  )}
                </span>
                <span
                  className={`font-mono text-[9px] leading-none font-bold ${
                    active ? "text-ink" : "text-gray-500"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
