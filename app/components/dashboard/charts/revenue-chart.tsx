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
import { cn } from "cn";

type Period = "7D" | "30D" | "1Y";

type RevenuePoint = {
  label: string;
  value: number;
};

const revenueByPeriod: Record<Period, RevenuePoint[]> = {
  "7D": [
    { label: "MON", value: 6820 },
    { label: "TUE", value: 7340 },
    { label: "WED", value: 7050 },
    { label: "THU", value: 8120 },
    { label: "FRI", value: 7790 },
    { label: "SAT", value: 8610 },
    { label: "SUN", value: 8420 },
  ],
  "30D": [
    { label: "NOV", value: 6120 },
    { label: "DEC", value: 7280 },
    { label: "JAN", value: 6820 },
    { label: "FEB", value: 8420 },
    { label: "MAR", value: 7790 },
    { label: "APR", value: 9120 },
    { label: "MAY", value: 8610 },
    { label: "JUN", value: 10380 },
    { label: "JUL", value: 9760 },
    { label: "AUG", value: 10890 },
    { label: "SEP", value: 10120 },
    { label: "OCT", value: 11420 },
  ],
  "1Y": [
    { label: "NOV", value: 24800 },
    { label: "DEC", value: 28600 },
    { label: "JAN", value: 27100 },
    { label: "FEB", value: 33400 },
    { label: "MAR", value: 31200 },
    { label: "APR", value: 36800 },
    { label: "MAY", value: 34500 },
    { label: "JUN", value: 42100 },
    { label: "JUL", value: 39700 },
    { label: "AUG", value: 45800 },
    { label: "SEP", value: 43100 },
    { label: "OCT", value: 48290 },
  ],
};

const chartConfig = {
  revenue: { label: "Revenue", color: "var(--color-ink)" },
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function RevenueChart() {
  const [period, setPeriod] = useState<Period>("30D");
  const data = revenueByPeriod[period];
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
              {currency.format(total)}
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
                      {currency.format(value)}
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
