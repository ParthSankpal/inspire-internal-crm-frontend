// src/app/payments/summary/SummaryTable.tsx
"use client";

import { DataTable } from "@/components/common/DataTable";

type Props = {
  data: any[];
  groupBy: "bank" | "day";
  loading: boolean;
  onPaginationChange?: (info: { page: number; limit: number }) => void;
};

export default function SummaryTable({ data, groupBy, loading, onPaginationChange }: Props) {
  const columns = groupBy === "bank"
    ? [
        { id: "bank.name", label: "Bank" },
        { id: "totalIn", label: "Total In" },
        { id: "totalOut", label: "Total Out" },
        { id: "balance", label: "Balance" },
      ]
    : [
        { id: "day", label: "Date" },
        { id: "totalIn", label: "Total In" },
        { id: "totalOut", label: "Total Out" },
        { id: "balance", label: "Balance" },
      ];

  return (
    <DataTable
      columns={columns}
      data={data}
      showIndex
      emptyMessage={loading ? "Loading..." : "No summary data"}
      onPaginationChange={onPaginationChange}
    />
  );
}
