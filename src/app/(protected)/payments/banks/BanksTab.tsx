// src/app/payments/banks/BanksTab.tsx
"use client";

import useBanks from "./useBanks";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import BankModals from "./BankModals";
import { useState } from "react";
import { BankAccount } from "@/features/payments/types";

export default function BanksTab() {
  const { banks, loading, addBank, editBank, removeBank } = useBanks();
  const [selected, setSelected] = useState<BankAccount | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

const columns = [
  {
    id: "name",
    label: "Name",
    accessor: (row: BankAccount) => row.name,
  },
  {
    id: "type",
    label: "Type",
    accessor: (row: BankAccount) => row.type?.toUpperCase(),
  },
  {
    id: "bankName",
    label: "Bank Name",
    accessor: (row: BankAccount) => row.bankName ?? "—",
  },
  {
    id: "accountNumber",
    label: "Account Number",
    accessor: (row: BankAccount) => row.accountNumber ?? "—",
  },
  {
    id: "ifsc",
    label: "IFSC",
    accessor: (row: BankAccount) => row.ifsc ?? "—",
  },
];


  const rowActions = (row: BankAccount) => (
    <div className="flex gap-2 justify-center">
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setSelected(row);
          setOpenEdit(true);
        }}
      >
        Edit
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => {
          setSelected(row);
          setOpenDelete(true);
        }}
      >
        Delete
      </Button>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Bank Accounts</h2>
        <Button onClick={() => setOpenAdd(true)}>+ Add Bank</Button>
      </div>

      <DataTable
        columns={columns}
        data={banks}
        showIndex
        rowActions={rowActions}
        emptyMessage={loading ? "Loading..." : "No banks found"}
      />

      <BankModals
        openAdd={openAdd}
        setOpenAdd={setOpenAdd}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        selected={selected}
        onAdd={async (d) => {
          await addBank(d);
          setOpenAdd(false);
        }}
        onEdit={async (d) => {
          if (!selected?._id) return;
          await editBank(selected._id, d);
          setOpenEdit(false);
          setSelected(null);
        }}
        onDelete={async () => {
          if (!selected?._id) return;
          await removeBank(selected._id);
          setOpenDelete(false);
          setSelected(null);
        }}
      />
    </div>
  );
}
