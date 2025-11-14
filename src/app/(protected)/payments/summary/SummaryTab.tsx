// src/app/payments/summary/SummaryTab.tsx
"use client";

import SummaryFilters from "./SummaryFilters";
import SummaryTable from "./SummaryTable";
import useSummary from "./useSummary";
import usePayments from "../transactions/usePayments"; // reuse to fetch banks
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SummaryTab() {
  const { summary, loading, loadSummary } = useSummary();
  const { banks } = usePayments(); // to show bank dropdown options
  const bankOptions = banks.map((b) => ({ value: b._id!, label: b.name }));

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    groupBy: "bank",
    mode: "",
    bankAccount: "",
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Payment Summary</h2>
        <Button onClick={() => loadSummary(filters)}>Apply Filters</Button>
      </div>

      <SummaryFilters
        onChange={(v) => setFilters(v)}
        banks={bankOptions}
      />

      <SummaryTable data={summary} loading={loading} groupBy={filters.groupBy as any} />
    </div>
  );
}
