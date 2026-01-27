"use client";

import { useParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/common/DataTable";
import { Column } from "@/features/pagination";
import { Button } from "@/components/ui/button";

import { useBatchFinance } from "@/features/finance/hooks/useBatchFinance";
import { BatchStudentFinance } from "@/features/finance/types";
import { ArrowLeft } from "lucide-react";
import StatCard from "@/components/common/StatCard";

export default function BatchFinancePage() {
  const { batchId } = useParams<{ batchId: string }>();
  const router = useRouter();

  const {
    summary,
    students,
    pagination,
    setPagination,
    loading,
  } = useBatchFinance(batchId);

  const columns: Column<BatchStudentFinance>[] = [
    { id: "student", label: "Student", accessor: s => `${s.firstName} ${s.lastName}` },
    { id: "finalFees", label: "Final Fees", accessor: s => `₹ ${s.fees.finalFees}` },
    { id: "collected", label: "Collected", accessor: s => `₹ ${s.totalCollected}` },
    { id: "pending", label: "Pending", accessor: s => `₹ ${s.totalPending}` },
    { id: "upcoming", label: "Upcoming", accessor: s => s.upcomingInstallments.length },
    { id: "overdue", label: "Overdue", accessor: s => s.overdueInstallments.length },
  ];

  const rowActions = (row: BatchStudentFinance) => (
    <Button
      size="sm"
      variant="outline"
      onClick={() => router.push(`/finance/student/${row._id}`)}
    >
      View
    </Button>
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold">Batch Finance</h1>
      </div>

      {/* SUMMARY */}
      {summary && (
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Total Fees" value={summary.totalFinalFees} />
          <StatCard label="Collected" value={summary.totalCollected} />
          <StatCard label="Pending" value={summary.totalPending} />
        </div>
      )}

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={students}
        totalItems={pagination.totalItems}
        page={pagination.currentPage}
        limit={pagination.limit}
        serverSide
        showIndex
        rowActions={rowActions}
        onPaginationChange={(info) =>
          setPagination((prev) => ({
            ...prev,
            currentPage: info.page,
            limit: info.limit,
          }))
        }
        emptyMessage={loading ? "Loading..." : "No students found"}
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold">₹ {value}</p>
    </div>
  );
}
