import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer } from "~/components/ui/chart";
import { formatUSD } from "~/lib/format-currency";
import { cn } from "cn";
import {
  mockRevenueByPeriod,
  type RevenuePeriod,
} from "~/mock-data/dashboard";

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--color-ink)" },
};

export function RevenueChart() {
  const [period, setPeriod] = useState<RevenuePeriod>("30D");
  const data = mockRevenueByPeriod[period];
  const total = period === "30D" ? 48290 : (data.at(-1)?.value ?? 0);
  const change =
    period === "30D" ? "+12.4%" : period === "7D" ? "+8.2%" : "+18.6%";
  const domain = useMemo(() => {
    const values = data.map((point) => point.value);
    return [
      Math.floor(Math.min(...values) * 0.8),
      Math.ceil(Math.max(...values) * 1.15),
    ];
  }, [data]);

  return (
    <section className="window min-w-0" aria-label="Revenue chart">
      <div className="window-bar relative justify-center">
        <span className="absolute left-2.5 flex gap-1.5" aria-hidden="true">
          <i className="border-ink size-1.5 rounded-full border" />
          <i className="border-ink size-1.5 rounded-full border" />
        </span>
        <span>revenue.chart</span>
      </div>

      <div className="bg-paper p-3 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 pb-3">
          <div className="flex items-center gap-2.5">
            <p className="font-mono text-xl font-bold sm:text-2xl">
              {formatUSD(total)}
            </p>
            <span className="border-ink bg-ok rounded-sm border-2 px-1.5 py-0.5 font-mono text-[10px] font-bold">
              {change}
            </span>
          </div>
          <div className="flex gap-1.5" aria-label="Revenue time range">
            {(["7D", "30D", "1Y"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={period === item}
                onClick={() => setPeriod(item)}
                className={cn(
                  "border-ink rounded-sm border-2 px-2.5 py-1 font-mono text-[10px] font-bold transition-colors",
                  period === item
                    ? "bg-ink text-paper"
                    : "bg-paper text-ink hover:bg-gray-100",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <ChartContainer
          config={chartConfig}
          className="aspect-auto! h-[230px] min-w-0 w-full sm:h-[300px]"
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
          >
            <CartesianGrid vertical={false} stroke="var(--color-gray-200)" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              minTickGap={12}
              tick={{
                fill: "var(--color-gray-500)",
                fontSize: 9,
                fontFamily: "var(--font-mono)",
              }}
            />
            <YAxis hide domain={domain} />
            <ReferenceLine
              y={domain[0]}
              stroke="var(--color-ink)"
              strokeWidth={1.5}
            />
            <Tooltip
              cursor={false}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const value = Number(payload[0].value);
                return (
                  <div className="border-ink bg-ink text-paper shadow-hard-sm rounded-sm border-2 px-2.5 py-1.5">
                    <p className="font-mono text-[9px] text-gray-200">
                      {label} 2026
                    </p>
                    <p className="font-mono text-xs font-bold">
                      {formatUSD(value)}
                    </p>
                  </div>
                );
              }}
            />
            <Area
              type="linear"
              dataKey="value"
              stroke="var(--color-ink)"
              strokeWidth={2.5}
              fill="var(--color-gray-200)"
              activeDot={{
                r: 4,
                fill: "var(--color-ink)",
                stroke: "var(--color-paper)",
                strokeWidth: 2,
              }}
              dot={{
                r: 3.5,
                fill: "var(--color-paper)",
                stroke: "var(--color-ink)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </section>
  );
}
