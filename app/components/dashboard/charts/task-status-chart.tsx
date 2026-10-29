import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { ChartContainer } from "~/components/ui/chart";

const taskStatuses = [
  { name: "Done", value: 64, color: "var(--color-ink)" },
  { name: "In progress", value: 43, color: "var(--color-gray-500)" },
  { name: "To do", value: 35, color: "var(--color-gray-200)" },
];

const chartConfig = {
  tasks: { label: "Tasks" },
};

const totalTasks = taskStatuses.reduce((total, status) => total + status.value, 0);

export function TaskStatusChart() {
  return (
    <section className="window min-w-0" aria-label="Task status chart">
      <div className="window-bar relative justify-center">
        <span className="absolute left-2.5 flex gap-1.5" aria-hidden="true">
          <i className="border-ink size-1.5 rounded-full border" />
          <i className="border-ink size-1.5 rounded-full border" />
        </span>
        <span>task-status.chart</span>
      </div>

      <div className="bg-paper flex min-h-[360px] flex-col justify-center p-4 sm:p-5">
        <div className="relative mx-auto h-64 w-full max-w-80">
          <ChartContainer config={chartConfig} className="aspect-auto! h-full w-full">
            <PieChart accessibilityLayer>
              <Pie
                data={taskStatuses}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="48%"
                outerRadius="88%"
                stroke="var(--color-ink)"
                strokeWidth={2}
                paddingAngle={0}
              >
                {taskStatuses.map((status) => (
                  <Cell key={status.name} fill={status.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const point = payload[0].payload as (typeof taskStatuses)[number];

                  return (
                    <div className="border-ink rounded-sm border-2 bg-ink px-2.5 py-1.5 text-paper shadow-hard-sm">
                      <p className="font-mono text-[10px]">{point.name}</p>
                      <p className="font-mono text-xs font-bold">
                        {point.value} tasks
                      </p>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ChartContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-2xl leading-none font-bold">
              {totalTasks}
            </span>
            <span className="font-mono text-[9px] text-gray-500 uppercase">
              tasks
            </span>
          </div>
        </div>

        <ul className="mx-auto mt-4 w-full max-w-80 space-y-1.5" aria-label="Task status totals">
          {taskStatuses.map((status) => (
            <li key={status.name} className="flex items-center gap-2 text-xs">
              <span
                className="border-ink size-2.5 shrink-0 border"
                style={{ backgroundColor: status.color }}
                aria-hidden="true"
              />
              <span className="flex-1">{status.name}</span>
              <span className="font-mono font-bold">{status.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
