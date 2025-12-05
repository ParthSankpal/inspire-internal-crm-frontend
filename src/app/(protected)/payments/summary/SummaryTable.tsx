// src/app/payments/summary/SummaryTable.tsx
"use client";
import { SummaryBankRow, SummaryDayRow } from "@/features/payments/types";

type Props = {
  data: SummaryBankRow[] | SummaryDayRow[];
  groupBy: "bank" | "day";
  loading: boolean;
};

export default function SummaryTable({ data, groupBy, loading }: Props) {
  const columns =
    groupBy === "bank"
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

        console.log(columns, data,loading);
        
  return (
    <div>
      hello
    </div>
  );
}
