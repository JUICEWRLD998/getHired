"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Mock data for status distribution
const chartData = [
  { status: "applied", applications: 45, fill: "var(--color-applied)" },
  { status: "interviewing", applications: 12, fill: "var(--color-interviewing)" },
  { status: "offer", applications: 5, fill: "var(--color-offer)" },
  { status: "rejected", applications: 18, fill: "var(--color-rejected)" },
  { status: "saved", applications: 8, fill: "var(--color-saved)" },
]

const chartConfig = {
  applications: {
    label: "Applications",
  },
  applied: {
    label: "Applied",
    color: "var(--chart-1)",
  },
  interviewing: {
    label: "Interviewing",
    color: "var(--chart-2)",
  },
  offer: {
    label: "Offer",
    color: "var(--chart-4)",
  },
  rejected: {
    label: "Rejected",
    color: "var(--destructive)",
  },
  saved: {
    label: "Saved",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function StatusChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status Distribution</CardTitle>
        <CardDescription>All time application status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie 
              data={chartData} 
              dataKey="applications" 
              nameKey="status" 
              innerRadius={60} 
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          5 offers received so far <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Breakdown of your 88 total applications
        </div>
      </CardFooter>
    </Card>
  )
}
