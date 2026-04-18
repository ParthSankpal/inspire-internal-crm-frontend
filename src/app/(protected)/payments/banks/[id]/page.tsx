"use client";

import { useEffect, useState } from "react";
import { getBankSummary } from "@/api/payments";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import StatCard from "@/components/common/StatCard";

import {
  BankDetailsResponse,
  Payment,
} from "@/features/payments/types";
import { IsoDate } from "@/components/common/IsoDate";


export default function BankDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const [data, setData] = useState<BankDetailsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getBankSummary(id as string);
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) load();
  }, [id]);

  if (!data) return <div>Loading...</div>;

  const { bank, summary, transactions } = data;

  const columns = [
    {
      id: "date",
      label: "Date",
      accessor: (p: Payment) => <IsoDate value={p.date} />,
    },
    {
      id: "type",
      label: "Type",
      accessor: (p: Payment) => (
        <span
          className={` ${
            p.type === "credit" ? "text-green-600" : "text-red-600"
          }`}
        >
          {p.type}
        </span>
      ),
    },
    {
      id: "amount",
      label: "Amount",
      accessor: (p: Payment) => (
        <span className="font-medium">₹{p.amount}</span>
      ),
    },
    { id: "mode", label: "Mode" },
    { id: "payerName", label: "Payer" },
    { id: "notes", label: "Notes" },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex gap-4 items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div>
          <h1 className="text-2xl font-bold">{bank.name}</h1>
          <p className="text-gray-500 capitalize">{bank.type}</p>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Total Credit"
          value={`₹${summary.totalCredit}`}
          variant="success"
        />
        <StatCard
          label="Total Debit"
          value={`₹${summary.totalDebit}`}
          variant="warning"
        />
        <StatCard
          label="Balance"
          value={`₹${summary.balance}`}
          variant="info"
        />
      </div>

      {/* TRANSACTIONS */}
      <DataTable
        columns={columns}
        data={transactions}
        emptyMessage={loading ? "Loading..." : "No transactions"}
      />
    </div>
  );
}