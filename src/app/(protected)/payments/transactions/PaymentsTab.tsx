// src/app/payments/transactions/PaymentsTab.tsx
"use client";

import usePayments from "./usePayments";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import PaymentModals from "./PaymentModals";
import { useState } from "react";
import { Payment } from "@/features/payments/types";
import { Column } from "@/features/pagination";
import { IsoDate } from "@/components/common/IsoDate";

export default function PaymentsTab() {
  const {
    payments,
    banks,
    batches,
    pagination,
    loading,
    setPagination,
    addPayment,
    editPayment,
    removePayment,
  } = usePayments();

  
  const [selected, setSelected] = useState<Payment | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const bankOptions = banks.map((b) => ({ value: b._id!, label: b.name }));

const columns = [
  {
    id: "date",
    label: "Date",
    accessor: (p: Payment) => <IsoDate value={p.date} />,
  },
  {
    id: "amount",
    label: "Amount",
    accessor: (p: Payment) =>
      `${p.type === "debit" ? "−" : "+"} ₹ ${p.amount}`,
  },
  {
    id: "type",
    label: "Type",
    accessor: (p: Payment) =>
      p.type === "credit" ? "Income" : "Expense",
  },
  {
    id: "category",
    label: "Category",
    accessor: (p: Payment) =>
      p.type === "debit"
        ? p.expenseCategory ?? "-"
        : "Student Fees",
  },
  {
    id: "person",
    label: "Paid To / From",
    accessor: (p: Payment) =>
      p.type === "debit"
        ? p.payeeName ?? "-"
        : p.payerName ?? "-",
  },
  {
    id: "bankAccount",
    label: "Bank",
    accessor: (p: Payment) =>
      typeof p.bankAccount === "object"
        ? p.bankAccount?.name ?? "-"
        : "-",
  },
];



  const rowActions = (row: Payment) => (
    <div className="flex gap-2 justify-center">
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setSelected(row);
          setOpen(true);
        }}
      >
        Edit
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => {
          setSelected(row);
          setDeleteOpen(true);
        }}
      >
        Delete
      </Button>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Payments</h2>
        <Button onClick={() => setOpen(true)}>+ Add Payment</Button>
      </div>

      <DataTable
        columns={columns}
        data={payments}
        totalItems={pagination.totalItems}
        page={pagination.page}
        limit={pagination.limit}
        serverSide
        rowActions={rowActions}
        emptyMessage={loading ? "Loading..." : "No payments found"}
        onPaginationChange={(info) => setPagination((prev) => ({ ...prev, page: info.page, limit: info.limit }))}
        showIndex
      />

      <PaymentModals
        open={open}
        setOpen={setOpen}
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        selected={selected}
        banksOptions={bankOptions}
        batchesOption={batches}
        onAdd={async (d) => {
          await addPayment(d);
          setOpen(false);
        }}
        onEdit={async (d) => {
          if (!selected?._id) return;
          await editPayment(selected._id, d);
          setOpen(false);
          setSelected(null);
        }}
        onDelete={async () => {
          if (!selected?._id) return;
          await removePayment(selected._id);
          setDeleteOpen(false);
          setSelected(null);
        }}
      />
    </div>
  );
}
