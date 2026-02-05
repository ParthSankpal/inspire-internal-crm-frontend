"use client";

import { useEffect, useMemo, useState } from "react";
import { Pie, PieChart, Cell } from "recharts";

import { DataTable } from "@/components/common/DataTable";
import { getExpenses } from "@/features/finance/apis";
import { Payment } from "@/features/payments/types";
import { IsoDate } from "@/components/common/IsoDate";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#6366f1",
  "#a855f7",
  "#ec4899",
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getExpenses(1, 1000)
      .then((res) => setExpenses(res.data))
      .finally(() => setLoading(false));
  }, []);

  /* =========================
     PIE DATA
  ========================= */
  const pieData = useMemo(() => {
    const map: Record<string, number> = {};

    expenses.forEach((e) => {
      const key = e.expenseCategory || "Other";
      const amount = Number(e.amount) || 0;
      map[key] = (map[key] || 0) + amount;
    });

    return Object.entries(map)
      .filter(([, v]) => v > 0)
      .map(([name, value], i) => ({
        name,
        value,
        fill: COLORS[i % COLORS.length],
      }));
  }, [expenses]);

  const chartConfig = {
    value: { label: "Amount" },
  } satisfies ChartConfig;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Expenses</h1>

      <ChartContainer
        config={chartConfig}
        className="mx-auto aspe max-h-[300px]"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            label
            outerRadius={110}
          >
            {pieData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>

      {/* TABLE */}
      <DataTable
        data={expenses}
        columns={[
          { id: "date", label: "Date", accessor: r => <IsoDate value={r.date}/> },
          { id: "amount", label: "Amount", accessor: r => `₹ ${r.amount}` },
          { id: "category", label: "Category", accessor: r => r.expenseCategory },
          { id: "payee", label: "Paid To", accessor: r => r.payeeName },
          { id: "mode", label: "Mode", accessor: r => r.mode },
        ]}
        emptyMessage={loading ? "Loading..." : "No expenses found"}
      />
    </div>
  );
}
