"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  total: {
    label: "Transaksi",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type WeeklyData = { date: string; total: number };

function getLast7Days(): WeeklyData[] {
  const days: WeeklyData[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({ date: d.toISOString().split("T")[0], total: 0 });
  }
  return days;
}

export function HomeChart() {
  const [chartData, setChartData] = React.useState<WeeklyData[]>(getLast7Days());
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => {
        const base = getLast7Days();
        const map: Record<string, number> = {};
        (d.weeklyData || []).forEach((row: WeeklyData) => {
          const key = typeof row.date === "string"
            ? row.date.split("T")[0]
            : new Date(row.date).toISOString().split("T")[0];
          map[key] = Number(row.total);
        });
        setChartData(base.map((day) => ({ date: day.date, total: map[day.date] ?? 0 })));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalWeek = chartData.reduce((acc, d) => acc + d.total, 0);

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:py-6">
          <CardTitle>Transaksi 7 Hari Terakhir</CardTitle>
          <CardDescription>
            {new Date(Date.now() - 6 * 86400000).toLocaleDateString("id-ID", { day: "numeric", month: "long" })}
            {" - "}
            {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
          </CardDescription>
        </div>
        <div className="flex flex-col justify-center border-t sm:border-t-0 sm:border-l px-6 py-4 sm:py-6">
          <span className="text-xs text-muted-foreground">Total Transaksi</span>
          <span className="text-2xl font-bold">{loading ? "..." : totalWeek}</span>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart data={chartData} margin={{ left: 4, right: 4 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) =>
                new Date(value).toLocaleDateString("id-ID", { weekday: "short", day: "numeric" })
              }
            />
            <YAxis tickLine={false} axisLine={false} allowDecimals={false} width={30} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[160px]"
                  nameKey="total"
                  labelFormatter={(value) => {
                    if (typeof value !== "string" && typeof value !== "number") return "";
                    return new Date(value).toLocaleDateString("id-ID", {
                      weekday: "long", day: "numeric", month: "long",
                    });
                  }}
                />
              }
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
