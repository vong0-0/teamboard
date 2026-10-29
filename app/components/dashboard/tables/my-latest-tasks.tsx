import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { PriorityBadge, type Priority } from "~/components/shared/priority-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const tasks: {
  title: string;
  project: string;
  due: string;
  priority: Priority;
  assignee: string;
}[] = [
  { title: "Design kanban cards", project: "Retro Kit", due: "Oct 24", priority: "HIGH", assignee: "HP" },
  { title: "Fix navbar overflow", project: "Marketing", due: "Oct 25", priority: "MED", assignee: "OP" },
  { title: "Write API docs", project: "Mockapi", due: "Oct 26", priority: "LOW", assignee: "MC" },
  { title: "Review pull requests", project: "Retro Kit", due: "Oct 27", priority: "HIGH", assignee: "JS" },
  { title: "Export icon set", project: "Brand", due: "Oct 28", priority: "MED", assignee: "AL" },
];

export function MyLatestTasks() {
  return (
    <section className="window min-w-0" aria-label="My latest tasks">
      <div className="window-bar relative justify-center">
        <span className="absolute left-2.5 flex gap-1.5" aria-hidden="true">
          <i className="border-ink size-1.5 rounded-full border" />
          <i className="border-ink size-1.5 rounded-full border" />
        </span>
        <span>my-tasks.table</span>
      </div>

      <Table className="min-w-[620px] border-collapse">
        <TableHeader>
          <TableRow className="border-ink bg-ink hover:bg-ink">
            <TableHead className="h-8 px-3 font-mono text-[9px] font-bold text-paper uppercase">Task</TableHead>
            <TableHead className="h-8 px-3 font-mono text-[9px] font-bold text-paper uppercase">Project</TableHead>
            <TableHead className="h-8 px-3 font-mono text-[9px] font-bold text-paper uppercase">Due</TableHead>
            <TableHead className="h-8 px-3 font-mono text-[9px] font-bold text-paper uppercase">Priority</TableHead>
            <TableHead className="h-8 px-3 text-right font-mono text-[9px] font-bold text-paper uppercase">Who</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow
              key={task.title}
              className={`border-ink border-b hover:bg-gray-100 ${index % 2 === 1 ? "bg-gray-100" : "bg-paper"}`}
            >
              <TableCell className="px-3 py-2.5 text-xs font-bold">{task.title}</TableCell>
              <TableCell className="px-3 py-2.5 text-xs text-gray-500">{task.project}</TableCell>
              <TableCell className="px-3 py-2.5 font-mono text-[10px]">{task.due}</TableCell>
              <TableCell className="px-3 py-2.5">
                <PriorityBadge priority={task.priority} />
              </TableCell>
              <TableCell className="px-3 py-2.5">
                <div className="flex justify-end">
                  <Avatar className="border-ink size-6 border">
                    <AvatarFallback className="font-mono text-[8px] font-bold">{task.assignee}</AvatarFallback>
                  </Avatar>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
