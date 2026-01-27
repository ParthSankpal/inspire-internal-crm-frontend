"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { FormSelect } from "@/components/common/Forms/FormSelect";

import { Column } from "@/features/pagination";
import { Batch } from "@/features/batches/types";
import { BatchStudentFinance } from "@/features/finance/types";

import { getAllBatches } from "@/api/batchApi";
import { useMonthlyFinance } from "@/features/finance/hooks/useMonthlyFinance";
import { getBatchStudentFinance } from "@/features/finance/apis";
import { useForm } from "react-hook-form";
import StatCard from "@/components/common/StatCard";

interface BatchStudentFinanceRow extends BatchStudentFinance {
  _id: string;
}

export default function FinanceDashboardPage() {
  const router = useRouter();
  const { control } = useForm();

  /* =========================
     MONTHLY STATS
  ========================= */
  const { data: monthly, loading: statsLoading } = useMonthlyFinance();

  /* =========================
     STATE
  ========================= */
  const [batches, setBatches] = useState<{ value: string; label: string }[]>([]);
  const [selectedBatch, setSelectedBatch] = useState("");

  const [students, setStudents] = useState<BatchStudentFinanceRow[]>([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  });

  /* =========================
     LOAD BATCHES
  ========================= */
  const loadBatches = useCallback(async () => {
    const res = await getAllBatches();
    setBatches(
      res.data.map((b: Batch) => ({
        value: b._id ?? "",
        label: b.name,
      }))
    );
  }, []);

  /* =========================
     LOAD STUDENTS (PAGINATED)
  ========================= */
  const loadBatchStudents = useCallback(async () => {
    if (!selectedBatch) return;

    setLoading(true);
    try {
      const res = await getBatchStudentFinance(
        selectedBatch,
        pagination.currentPage,
        pagination.limit
      );

      setStudents(
        res.data.map((s, i) => ({
          ...s,
          _id: s._id ?? `${selectedBatch}-${i}`,
        }))
      );

      setPagination((prev) => ({
        ...prev,
        totalItems: res.pagination.totalItems,
        totalPages: res.pagination.totalPages,
      }));
    } finally {
      setLoading(false);
    }
  }, [selectedBatch, pagination.currentPage, pagination.limit]);

  useEffect(() => {
    loadBatches();
  }, [loadBatches]);

  useEffect(() => {
    loadBatchStudents();
  }, [loadBatchStudents]);

  /* =========================
     COLUMNS
  ========================= */
  const columns: Column<BatchStudentFinanceRow>[] = [
    { id: "student", label: "Student", accessor: s => `${s.firstName} ${s.lastName}` },
    { id: "finalFees", label: "Final Fees", accessor: s => `₹ ${s.fees.finalFees}` },
    { id: "collected", label: "Collected", accessor: s => `₹ ${s.totalCollected}` },
    { id: "pending", label: "Pending", accessor: s => `₹ ${s.totalPending}` },
    { id: "upcoming", label: "Upcoming", accessor: s => s.upcomingInstallments.length },
    { id: "overdue", label: "Overdue", accessor: s => s.overdueInstallments.length },
  ];

  const rowActions = (row: BatchStudentFinanceRow) => (
    <Button size="sm" variant="outline" onClick={() => router.push(`/finance/student/${row._id}`)}>
      View
    </Button>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Finance Dashboard</h1>


      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Collected (This Month)" value={monthly?.collectedThisMonth ?? 0} loading={statsLoading} />
        <StatCard label="Upcoming (This Month)" value={monthly?.upcomingThisMonth ?? 0} loading={statsLoading} />
        <StatCard label="Overdue Till Now" value={monthly?.overdueTotal ?? 0} loading={statsLoading} />
      </div>

      {/* FILTER */}
      <div className="flex justify-between items-end">

        <div className="w-64">
          <FormSelect
            name="batch"
            label="Batch"
            control={control}
            options={batches}
            onValueChange={(v) => {
              setSelectedBatch(v);
              setPagination((p) => ({ ...p, currentPage: 1 }));
            }}
          />
        </div>

        {selectedBatch && (
          <Button
            variant="outline"
            onClick={() => router.push(`/finance/batch/${selectedBatch}`)}
          >
            View Batch Details →
          </Button>
        )}

      </div>


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
          setPagination((p) => ({
            ...p,
            currentPage: info.page,
            limit: info.limit,
          }))
        }
        emptyMessage={
          loading
            ? "Loading students..."
            : selectedBatch
              ? "No students found"
              : "Select a batch"
        }
      />
    </div>
  );
}
