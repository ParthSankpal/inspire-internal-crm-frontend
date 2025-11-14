// src/app/payments/transactions/PaymentsTab.tsx
"use client";

import usePayments from "./usePayments";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import PaymentModals from "./PaymentModals";
import { useState } from "react";
import { Payment } from "@/features/payments/types";

export default function PaymentsTab() {
  const {
    payments,
    banks,
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
    { id: "date", label: "Date" },
    { id: "amount", label: "Amount" },
    { id: "type", label: "Type" },
    { id: "mode", label: "Mode" },
    { id: "payerName", label: "Payer" },
    {
      id: "bankAccount",
      label: "Bank",
      accessor: (row: Payment) => {
        if (!row.bankAccount) return "-";
        if (typeof row.bankAccount === "object") return (row.bankAccount as any).name ?? "-";
        return banks.find((b) => b._id === row.bankAccount)?.name ?? "-";
      },
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
