"use client";

import { useParams, useRouter } from "next/navigation";
import { Column, DataTable } from "@/components/common/DataTable";

import { useStudentFinance } from "@/features/finance/hooks/useStudentFinance";
import { Installment } from "@/features/finance/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { IsoDate } from "@/components/common/IsoDate";
import StatCard from "@/components/common/StatCard";

/* =========================
   UI ROW TYPES (DataTable requires _id)
========================= */

interface InstallmentRow extends Installment {
    _id: string;
}

interface StudentPaymentRow {
    _id: string;
    amount: number;
    date: string;
    mode: string;
    paymentRef?: string;
    notes?: string;
}

export default function StudentFinancePage() {
    const { studentId } = useParams<{ studentId: string }>();
    const { data, loading } = useStudentFinance(studentId);

    const router = useRouter();


    if (loading || !data) {
        return <div>
            <div className="flex h-[70vh] items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
                    <p className="text-sm text-muted-foreground">
                        Loading finiance configuration...
                    </p>
                </div>
            </div>
        </div>;
    }

    /* =========================
       MAP INSTALLMENTS → UI ROWS
    ========================= */

    const installmentRows: InstallmentRow[] = data.fees.installments.map(
        (inst, index) => ({
            ...inst,
            _id: `${data._id}-inst-${inst.installmentNo}-${index}`,
        })
    );

    /* =========================
       MAP PAYMENTS → UI ROWS
    ========================= */

    const paymentRows: StudentPaymentRow[] = data.payments.map((p, index) => ({
        ...p,
        _id: p._id ?? `${data._id}-pay-${index}`,
    }));

    /* =========================
       INSTALLMENT COLUMNS
    ========================= */

    const installmentColumns: Column<InstallmentRow>[] = [
        {
            id: "installmentNo",
            label: "No",
            accessor: (i) => i.installmentNo,
        },
        {
            id: "dueDate",
            label: "Due Date",
            accessor: (i) => <IsoDate value={i.dueDate} />,
        },
        {
            id: "amount",
            label: "Amount",
            accessor: (i) => `₹ ${i.amount}`,
            className: "text-blue-600",
        },
        {
            id: "paid",
            label: "Paid",
            accessor: (i) => `₹ ${i.paidAmount}`,
            className: "text-green-600",
        },
        {
            id: "pending",
            label: "Pending",
            accessor: (i) => `₹ ${i.pendingAmount}`,
            className: "text-red-600",
        },
        { id: "status", label: "Status" },
    ];

    /* =========================
       PAYMENT COLUMNS
    ========================= */

    const paymentColumns: Column<StudentPaymentRow>[] = [
        {
            id: "date",
            label: "Date",
            accessor: (p) => <IsoDate value={p.date} />,
        },
        {
            id: "amount",
            label: "Amount",
            accessor: (p) => `₹ ${p.amount}`,
            className: "text-blue-600",
        },
            
        { id: "mode", label: "Mode", className: "text-green-600" },
        { id: "paymentRef", label: "Ref" },
        { id: "notes", label: "Notes" },
    ];

    return (
        <div className="space-y-6">
            {/* =========================
          HEADER
      ========================= */}

            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-semibold">
                    {data.firstName} {data.lastName} ({data.studentId})
                </h1>
            </div>

            {/* =========================
          STATS
      ========================= */}
            <div className="grid grid-cols-3 gap-4">
                <StatCard label="Final Fees" value={data.fees.finalFees} variant="info" />
                <StatCard label="Collected" value={data.totalCollected} variant="success"/>
                <StatCard label="Pending" value={data.totalPending} variant="danger" />
            </div>

            {/* =========================
          INSTALLMENTS TABLE
      ========================= */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Installments</h2>
                <DataTable
                    columns={installmentColumns}
                    data={installmentRows}
                    totalItems={installmentRows.length}
                    page={1}
                    limit={10}
                    serverSide={false}
                    showIndex
                />
            </div>

            {/* =========================
          PAYMENTS TABLE
      ========================= */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Payments</h2>
                <DataTable
                    columns={paymentColumns}
                    data={paymentRows}
                    totalItems={paymentRows.length}
                    page={1}
                    limit={10}
                    serverSide={false}
                    showIndex
                />
            </div>
        </div>
    );
}


