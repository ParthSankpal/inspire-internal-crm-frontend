"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { FormSelect } from "@/components/common/Forms/FormSelect";

import { Column } from "@/features/pagination";
import { Batch } from "@/features/batches/types";
import { BatchStudentFinance, InstallmentRow } from "@/features/finance/types";

import { getAllBatches } from "@/api/batchApi";
import { useMonthlyFinance } from "@/features/finance/hooks/useMonthlyFinance";
import { getBatchStudentFinance } from "@/features/finance/apis";
import { useForm } from "react-hook-form";
import StatCard from "@/components/common/StatCard";
import { getInstallments } from "@/api/payments";
import { FormDatePicker } from "@/components/common/Forms/FormDatePicker";
import { FormDateRangePicker } from "@/components/common/Forms/FormDateRangePicker";
import { IsoDate } from "@/components/common/IsoDate";

interface BatchStudentFinanceRow extends BatchStudentFinance {
    _id: string;
}

export default function FinanceDashboardPage() {
    const router = useRouter();
    const { control } = useForm();


    /* =========================
       STATE
    ========================= */
    const [batches, setBatches] = useState<{ value: string; label: string }[]>([]);
    const [selectedBatch, setSelectedBatch] = useState("");

    const [students, setStudents] = useState<BatchStudentFinanceRow[]>([]);
    const [loading, setLoading] = useState(false);

    const [installments, setInstallments] = useState<InstallmentRow[]>([]);
    const [installmentsLoading, setInstallmentsLoading] = useState(false);

    const [installmentType, setInstallmentType] = useState<"upcoming" | "overdue">("upcoming");

    const [dateRange, setDateRange] = useState({
        startDate: "",
        endDate: "",
    });

    const [installmentPagination, setInstallmentPagination] = useState({
        currentPage: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 1,
    });



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

    useEffect(() => {
        loadBatches();
    }, [loadBatches]);

    /* =========================
       COLUMNS
    ========================= */


    const loadInstallments = useCallback(async () => {
        if (!selectedBatch) return;

        setInstallmentsLoading(true);

        try {
            const res = await getInstallments(
                installmentPagination.currentPage,
                installmentPagination.limit,
                {
                    batchId: selectedBatch,
                    startDate: dateRange.startDate,
                    endDate: dateRange.endDate,
                    type: installmentType,
                }
            );

            setInstallments(res.data);

            setInstallmentPagination((prev) => ({
                ...prev,
                totalItems: res.pagination.totalItems,
                totalPages: res.pagination.totalPages,
            }));
        } finally {
            setInstallmentsLoading(false);
        }
    }, [
        selectedBatch,
        dateRange.startDate,
        dateRange.endDate,
        installmentType,
        installmentPagination.currentPage,
        installmentPagination.limit,
    ]);


    useEffect(() => {
        loadInstallments();
    }, [loadInstallments]);


    const installmentColumns: Column<InstallmentRow>[] = [
        {
            id: "student",
            label: "Student",
            accessor: (s) => `${s.firstName} ${s.lastName}`,
        },
        {
            id: "amount",
            label: "Amount",
            accessor: (s) => `₹ ${s.installment.amount}`,
        },
        {
            id: "pending",
            label: "Pending",
            className: "text-red-600",
            accessor: (s) => `₹ ${s.installment.pendingAmount}`,
        },
        {
            id: "dueDate",
            label: "Due Date",
            accessor: (s) => <IsoDate value={s.installment.dueDate} /> as any,
        },

        // ✅ NEW STATUS COLUMN
        {
            id: "status",
            label: "Status",
            accessor: (s) => {
                const status = s.installment.status;

                const colorMap = {
                    Overdue: "text-red-600 font-semibold",
                    Partial: "text-blue-600",
                    Pending: "text-yellow-600",
                    Paid: "text-green-600",
                };

                return <span className={colorMap[status]}>{status}</span>;
            },
        },
        {
            id: "urgency",
            label: "Priority",
            accessor: (s) => {
                const status = s.installment.status;

                if (status === "Overdue") return "🔥 Urgent";
                if (status === "Partial") return "⚠️ Follow-up";
                return "Normal";
            },
        }
    ];


    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Installment Dashboard</h1>

            {/* FILTER */}
            <div className="flex justify-start gap-5 items-end">

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

                {/* TYPE TOGGLE */}
                <div className="flex gap-2">
                    <Button
                        variant={installmentType === "upcoming" ? "default" : "outline"}
                        onClick={() => {
                            setInstallmentType("upcoming");
                            setInstallmentPagination((p) => ({ ...p, currentPage: 1 }));
                        }}
                    >
                        Incoming
                    </Button>

                    <Button
                        variant={installmentType === "overdue" ? "destructive" : "outline"}
                        onClick={() => {
                            setInstallmentType("overdue");
                            setInstallmentPagination((p) => ({ ...p, currentPage: 1 }));
                        }}
                    >
                        Overdue
                    </Button>
                </div>

                {/* DATE FILTER */}
                <FormDateRangePicker
                    startName="startDate"
                    endName="endDate"
                    label="Date Range"
                    control={control}
                    onChange={(range) => {
                        setDateRange({
                            startDate: range.startDate,
                            endDate: range.endDate,
                        });

                        setInstallmentPagination((p) => ({
                            ...p,
                            currentPage: 1,
                        }));
                    }}
                />
            </div>




            <div className="space-y-4">


                {/* TABLE */}
                <DataTable
                    columns={installmentColumns}
                    data={installments}
                    totalItems={installmentPagination.totalItems}
                    page={installmentPagination.currentPage}
                    limit={installmentPagination.limit}
                    serverSide
                    showIndex
                    onPaginationChange={(info) =>
                        setInstallmentPagination((p) => ({
                            ...p,
                            currentPage: info.page,
                            limit: info.limit,
                        }))
                    }
                    emptyMessage={
                        installmentsLoading
                            ? "Loading installments..."
                            : selectedBatch
                                ? "No installments found"
                                : "Select a batch"
                    }
                />
            </div>
        </div>
    );
}
