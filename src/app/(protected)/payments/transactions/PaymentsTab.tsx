// src/app/payments/transactions/PaymentsTab.tsx
"use client";

import usePayments from "./usePayments";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import PaymentModals from "./PaymentModals";
import { useState } from "react";
import { BankAccount, Payment } from "@/features/payments/types";

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
    accessor: (row: Payment) =>
      row.date ? new Date(row.date).toLocaleDateString("en-IN") : "-",
  },
  {
    id: "amount",
    label: "Amount",
    accessor: (row: Payment) => `₹ ${row.amount}`,
  },
  {
    id: "type",
    label: "Type",
    accessor: (row: Payment) => row.type.toUpperCase(),
  },
  {
    id: "mode",
    label: "Mode",
    accessor: (row: Payment) => row.mode.toUpperCase(),
  },
  {
    id: "payerName",
    label: "Payer",
    accessor: (row: Payment) => row.payerName ?? "-",
  },
  {
    id: "bankAccount",
    label: "Bank",
    accessor: (row: Payment) => {
      if (!row.bankAccount) return "-";

      // If populated from backend with full object
      if (typeof row.bankAccount === "object") {
        const bank = row.bankAccount as BankAccount;
        return bank.name ?? "-";
      }

      // If only ID is provided (string)
      const bank = banks.find((b) => b._id === row.bankAccount);
      return bank?.name ?? "-";
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
