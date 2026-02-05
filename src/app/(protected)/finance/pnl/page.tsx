"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";

import { FormSelect } from "@/components/common/Forms/FormSelect";
import { getMonthlyPnL } from "@/features/finance/apis";
import type { MonthlyPnLChartRow } from "@/components/common/MonthlyPnLChart";

/* =========================
   DYNAMIC IMPORT (SSR OFF)
========================= */
const MonthlyPnLChart = dynamic(
  () => import("@/components/common/MonthlyPnLChart"),
  { ssr: false }
);

/* =========================
   API ROW TYPE (LOCAL)
========================= */
type MonthlyPnLApiRow = {
  month: number;
  income: number;
  expense: number;
  profit: number;
};

export default function MonthlyPnLPage() {
  const { control, watch } = useForm({
    defaultValues: {
      year: new Date().getFullYear().toString(),
    },
  });

  const year = watch("year");

  const [rawData, setRawData] = useState<MonthlyPnLApiRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMonthlyPnL(Number(year))
      .then(setRawData)
      .finally(() => setLoading(false));
  }, [year]);

  /* =========================
     TRANSFORM (TYPE SAFE)
  ========================= */
  const chartData: MonthlyPnLChartRow[] = useMemo(() => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    return rawData.map((d) => ({
      monthLabel: months[d.month - 1] ?? `M${d.month}`,
      income: d.income,
      expense: d.expense,
      profit: d.profit,
    }));
  }, [rawData]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Monthly Profit & Loss</h1>

      {/* FILTER */}
      <div className="w-40">
        <FormSelect
          name="year"
          label="Year"
          control={control}
          options={[
            { value: "2024", label: "2024" },
            { value: "2025", label: "2025" },
            { value: "2026", label: "2026" },
          ]}
        />
      </div>

      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <MonthlyPnLChart data={chartData} />
      )}
    </div>
  );
}
