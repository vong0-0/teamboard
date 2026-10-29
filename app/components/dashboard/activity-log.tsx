import { Avatar, AvatarFallback } from "~/components/ui/avatar";

const activities = [
  {
    initials: "HP",
    name: "Haemin",
    action: "moved “Hero” to Done",
    time: "2m ago",
  },
  {
    initials: "OP",
    name: "Olga",
    action: "commented on “API docs”",
    time: "18m ago",
  },
  {
    initials: "JS",
    name: "Jin",
    action: "created project “Brand v2”",
    time: "1h ago",
  },
  { initials: "AL", name: "Ana", action: "uploaded 4 files", time: "3h ago" },
  { initials: "TR", name: "Tom", action: "closed bug #204", time: "5h ago" },
];

export function ActivityLog() {
  return (
    <section className="window min-w-0" aria-label="Activity log">
      <div className="window-bar relative justify-center">
        <span className="absolute left-2.5 flex gap-1.5" aria-hidden="true">
          <i className="border-ink size-1.5 rounded-full border" />
          <i className="border-ink size-1.5 rounded-full border" />
        </span>
        <span>activity.log</span>
      </div>

      <ol>
        {activities.map((activity) => (
          <li
            key={`${activity.name}-${activity.time}`}
            className="border-ink flex items-center gap-2.5 border-b px-3 py-2 last:border-b-0"
          >
            <Avatar className="border-ink size-7 shrink-0 border">
              <AvatarFallback className="font-mono text-[9px] font-bold">
                {activity.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-[11px]">
                <span className="font-bold">{activity.name}</span>{" "}
                {activity.action}
              </p>
              <p className="font-mono text-[9px] text-gray-500">
                {activity.time}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
