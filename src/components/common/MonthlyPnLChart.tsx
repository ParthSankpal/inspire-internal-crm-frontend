"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

/* =========================
   TYPES
========================= */
export type MonthlyPnLChartRow = {
  monthLabel: string;
  income: number;
  expense: number;
  profit: number;
};

type Props = {
  data: MonthlyPnLChartRow[];
};

export default function MonthlyPnLChart({ data }: Props) {
  if (!data.length) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          No data available
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 flex gap-4 w-full">
      {/* =========================
         INCOME vs EXPENSE
      ========================= */}
      <Card className=" w-full">
        <CardHeader>
          <CardTitle>Income vs Expense</CardTitle>
          <CardDescription>
            Monthly comparison of total income and expenses
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="w-full ">
            <ResponsiveContainer width="100%" aspect={2.2}>
              <BarChart data={data}>
                <XAxis dataKey="monthLabel" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="income"
                  name="Income"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expense"
                  name="Expense"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* =========================
         PROFIT TREND
      ========================= */}
      <Card className=" w-full">
        <CardHeader>
          <CardTitle>Profit Trend</CardTitle>
          <CardDescription>
            Net profit trend across the year
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="w-full">
            <ResponsiveContainer width="100%" aspect={3}>
              <LineChart data={data}>
                <XAxis dataKey="monthLabel" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="profit"
                  name="Profit"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
