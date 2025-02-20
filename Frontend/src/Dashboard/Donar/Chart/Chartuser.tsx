"use client";

import { Area, AreaChart, CartesianGrid} from "recharts"

import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", desktop: 50 },
  { month: "February", desktop: 200 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 350 },
  { month: "May", desktop: 409 },
  { month: "June", desktop: 554 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function Component() {
  return (
    <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
  )
}