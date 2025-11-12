// src/app/payments/PaymentsPage.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { FormDialogWrapper } from "@/components/common/Forms/FormDialogWrapper";
import { ConfirmDialog } from "@/components/common/dialogs/ConfirmDialog";
import { FormInput } from "@/components/common/Forms/FormInput";
import { FormSelect } from "@/components/common/Forms/FormSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  getAllBanks,
  createBank,
  updateBank,
  deleteBank,
  getAllPayments,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentSummary,
} from "@/api/payments";
import {
  BankAccount,
  BankFormData,
  bankSchema,
  Payment,
  PaymentFormData,
  paymentSchema,
} from "@/features/payments/types";
import { useNotify } from "@/components/common/NotificationProvider";

export default function PaymentsPage() {
  const notify = useNotify();
  const [activeTab, setActiveTab] = useState<"banks" | "transactions" | "summary">("banks");

  // ==============================
  // 🏦 BANKS MANAGEMENT
  // ==============================
  const [banks, setBanks] = useState<BankAccount[]>([]);
  const [selectedBank, setSelectedBank] = useState<BankAccount | null>(null);
  const [bankModalOpen, setBankModalOpen] = useState(false);
  const [editBankModalOpen, setEditBankModalOpen] = useState(false);
  const [deleteBankModalOpen, setDeleteBankModalOpen] = useState(false);
  const [loadingBanks, setLoadingBanks] = useState(false);

  // ✅ Banks loader
  const loadBanks = useCallback(async () => {
    try {
      setLoadingBanks(true);
      const data = await getAllBanks();
      setBanks(data);
    } catch {
      notify("Failed to load banks", "error");
    } finally {
      setLoadingBanks(false);
    }
  }, [notify]);



  const {
    control: bankControl,
    handleSubmit: handleBankSubmit,
    reset: resetBank,
    formState: { errors: bankErrors },
  } = useForm<BankFormData>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      name: "",
      type: "bank",
      bankName: "",
      accountNumber: "",
      ifsc: "",
      branch: "",
    },
  });

  const handleAddBank = async (data: BankFormData) => {
    try {
      await createBank(data);
      notify("Bank added successfully ✅", "success");
      setBankModalOpen(false);
      resetBank();
      loadBanks();
    } catch {
      notify("Failed to add bank", "error");
    }
  };

  const handleUpdateBank = async (data: BankFormData) => {
    if (!selectedBank?._id) return;
    try {
      await updateBank(selectedBank._id, data);
      notify("Bank updated successfully ✅", "success");
      setEditBankModalOpen(false);
      resetBank();
      loadBanks();
    } catch {
      notify("Failed to update bank", "error");
    }
  };

  const handleDeleteBank = async () => {
    if (!selectedBank?._id) return;
    try {
      await deleteBank(selectedBank._id);
      notify("Bank deleted 🗑️", "info");
      setDeleteBankModalOpen(false);
      loadBanks();
    } catch {
      notify("Failed to delete bank", "error");
    }
  };

  const bankColumns = [
    { id: "name", label: "Name" },
    { id: "type", label: "Type" },
    { id: "bankName", label: "Bank Name" },
    { id: "accountNumber", label: "Account Number" },
    { id: "ifsc", label: "IFSC" },
  ];

  const bankRowActions = (row: BankAccount) => (
    <div className="flex gap-2 justify-center">
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setSelectedBank(row);
          resetBank(row);
          setEditBankModalOpen(true);
        }}
      >
        Edit
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => {
          setSelectedBank(row);
          setDeleteBankModalOpen(true);
        }}
      >
        Delete
      </Button>
    </div>
  );

  // ==============================
  // 💵 PAYMENTS MANAGEMENT
  // ==============================
  const [payments, setPayments] = useState<Payment[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  });
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [deletePaymentOpen, setDeletePaymentOpen] = useState(false);

  // ✅ Payments loader
  const loadPayments = useCallback(async () => {
    try {
      setLoadingPayments(true);
      const res = await getAllPayments(pagination.page, pagination.limit);
      setPayments(res.data);

      // ✅ Prevent infinite re-renders
      setPagination((prev) => {
        const next = {
          ...prev,
          totalItems: res.pagination.totalItems,
          totalPages: res.pagination.totalPages,
        };
        if (
          prev.totalItems === next.totalItems &&
          prev.totalPages === next.totalPages
        )
          return prev;
        return next;
      });
    } catch {
      notify("Failed to load payments", "error");
    } finally {
      setLoadingPayments(false);
    }
  }, [pagination.page, pagination.limit, notify]);


  const {
    control: paymentControl,
    handleSubmit: handlePaymentSubmit,
    reset: resetPayment,
    formState: { errors: paymentErrors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: 0,
      type: "credit",
      mode: "cash",
      date: new Date().toISOString().split("T")[0],
      bankAccount: "",
      payerName: "",
      notes: "",
    },
  });

  const handleAddPayment = async (data: PaymentFormData) => {
    try {
      await createPayment(data);
      notify("Payment added successfully 💰", "success");
      setPaymentModalOpen(false);
      resetPayment();
      loadPayments();
    } catch {
      notify("Failed to add payment", "error");
    }
  };

  const handleUpdatePayment = async (data: PaymentFormData) => {
    if (!selectedPayment?._id) return;
    try {
      await updatePayment(selectedPayment._id, data);
      notify("Payment updated successfully ✅", "success");
      setPaymentModalOpen(false);
      resetPayment();
      loadPayments();
    } catch {
      notify("Failed to update payment", "error");
    }
  };

  const handleDeletePayment = async () => {
    if (!selectedPayment?._id) return;
    try {
      await deletePayment(selectedPayment._id);
      notify("Payment deleted 🗑️", "info");
      setDeletePaymentOpen(false);
      loadPayments();
    } catch {
      notify("Failed to delete payment", "error");
    }
  };

  const paymentColumns = [
    { id: "date", label: "Date" },
    { id: "amount", label: "Amount" },
    { id: "type", label: "Type" },
    { id: "mode", label: "Mode" },
    { id: "payerName", label: "Payer" },
    { id: "bankAccount.name", label: "Bank" },
  ];

  const paymentRowActions = (row: Payment) => (
    <div className="flex gap-2 justify-center">
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setSelectedPayment(row);
          resetPayment({
            ...row,
            bankAccount: typeof row.bankAccount === "string" ? row.bankAccount : row.bankAccount?._id || "",
          });
          setPaymentModalOpen(true);
        }}
      >
        Edit
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => {
          setSelectedPayment(row);
          setDeletePaymentOpen(true);
        }}
      >
        Delete
      </Button>
    </div>
  );

  // ==============================
  // 📊 SUMMARY MANAGEMENT
  // ==============================
  const [summary, setSummary] = useState<any[]>([]);
  const [summaryFilters, setSummaryFilters] = useState({
    startDate: "",
    endDate: "",
    groupBy: "bank" as "bank" | "day",
    bankAccount: "",
    mode: "",
    type: "",
  });
  const [loadingSummary, setLoadingSummary] = useState(false);
  const loadSummary = useCallback(async () => {
    try {
      setLoadingSummary(true);
      const res = await getPaymentSummary(summaryFilters);
      setSummary(Array.isArray(res) ? res : []);
    } catch {
      notify("Failed to load summary", "error");
    } finally {
      setLoadingSummary(false);
    }
  }, [summaryFilters, notify]);

  // ==============================
  // 🔁 EFFECTS
  // ==============================
  useEffect(() => {
    loadBanks();
    loadPayments();
  }, []);

  // ==============================
  // 🧩 RENDER
  // ==============================
  return (
    <div className="space-y-6 p-6">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="banks">Banks</TabsTrigger>
          <TabsTrigger value="transactions">Payments</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        {/* BANKS TAB */}
        <TabsContent value="banks">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Bank Accounts</h2>
            <Button onClick={() => setBankModalOpen(true)}>+ Add Bank</Button>
          </div>

          <DataTable<BankAccount>
            columns={bankColumns}
            data={banks}
            showIndex
            rowActions={bankRowActions}
            emptyMessage={loadingBanks ? "Loading..." : "No banks found"}
          />

          {/* Add / Edit Bank Modals */}
          <FormDialogWrapper
            open={bankModalOpen}
            onOpenChange={setBankModalOpen}
            title="Add Bank"
            onSubmit={handleBankSubmit(handleAddBank)}
          >
            <FormInput name="name" label="Name" control={bankControl} error={bankErrors.name?.message} />
            <FormSelect
              name="type"
              label="Type"
              control={bankControl}
              options={[
                { value: "bank", label: "Bank" },
                { value: "cash", label: "Cash" },
                { value: "wallet", label: "Wallet" },
              ]}
            />
            <FormInput name="bankName" label="Bank Name" control={bankControl} />
            <FormInput name="accountNumber" label="Account Number" control={bankControl} />
            <FormInput name="ifsc" label="IFSC" control={bankControl} />
            <FormInput name="branch" label="Branch" control={bankControl} />
          </FormDialogWrapper>

          <FormDialogWrapper
            open={editBankModalOpen}
            onOpenChange={setEditBankModalOpen}
            title="Edit Bank"
            onSubmit={handleBankSubmit(handleUpdateBank)}
            submitLabel="Update"
          >
            <FormInput name="name" label="Name" control={bankControl} />
            <FormSelect
              name="type"
              label="Type"
              control={bankControl}
              options={[
                { value: "bank", label: "Bank" },
                { value: "cash", label: "Cash" },
                { value: "wallet", label: "Wallet" },
              ]}
            />
            <FormInput name="bankName" label="Bank Name" control={bankControl} />
            <FormInput name="accountNumber" label="Account Number" control={bankControl} />
            <FormInput name="ifsc" label="IFSC" control={bankControl} />
            <FormInput name="branch" label="Branch" control={bankControl} />
          </FormDialogWrapper>

          <ConfirmDialog
            open={deleteBankModalOpen}
            onOpenChange={setDeleteBankModalOpen}
            title="Delete Bank"
            description={`Delete bank ${selectedBank?.name}?`}
            onConfirm={handleDeleteBank}
          />
        </TabsContent>

        {/* PAYMENTS TAB */}
        <TabsContent value="transactions">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Payments</h2>
            <Button onClick={() => setPaymentModalOpen(true)}>+ Add Payment</Button>
          </div>

          <DataTable<Payment>
            columns={paymentColumns}
            data={payments}
            totalItems={pagination.totalItems}
            page={pagination.page}
            limit={pagination.limit}
            serverSide
            rowActions={paymentRowActions}
            emptyMessage={loadingPayments ? "Loading..." : "No payments found"}
            onPaginationChange={(info) =>
              setPagination((prev) => ({ ...prev, page: info.page, limit: info.limit }))
            }
            showIndex
          />

          <FormDialogWrapper
            open={paymentModalOpen}
            onOpenChange={setPaymentModalOpen}
            title={selectedPayment ? "Edit Payment" : "Add Payment"}
            onSubmit={handlePaymentSubmit(
              selectedPayment ? handleUpdatePayment : handleAddPayment
            )}
          >
            <FormInput name="amount" label="Amount" control={paymentControl} type="number" />
            <FormSelect
              name="type"
              label="Type"
              control={paymentControl}
              options={[
                { value: "credit", label: "Credit" },
                { value: "debit", label: "Debit" },
              ]}
            />
            <FormSelect
              name="mode"
              label="Mode"
              control={paymentControl}
              options={[
                { value: "cash", label: "Cash" },
                { value: "online", label: "Online" },
                { value: "upi", label: "UPI" },
                { value: "card", label: "Card" },
                { value: "cheque", label: "Cheque" },
              ]}
            />
            <FormSelect
              name="bankAccount"
              label="Bank Account"
              control={paymentControl}
              options={banks.map((b) => ({ value: b._id!, label: b.name }))}
            />
            <FormInput name="date" label="Date" control={paymentControl} type="date" />
            <FormInput name="payerName" label="Payer" control={paymentControl} />
            <FormInput name="notes" label="Notes" control={paymentControl} />
          </FormDialogWrapper>

          <ConfirmDialog
            open={deletePaymentOpen}
            onOpenChange={setDeletePaymentOpen}
            title="Delete Payment"
            description={`Delete payment from ${selectedPayment?.payerName || "Unknown"}?`}
            onConfirm={handleDeletePayment}
          />
        </TabsContent>

        {/* SUMMARY TAB */}
        <TabsContent value="summary">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Payment Summary</h2>
              <Button onClick={loadSummary}>Apply Filters</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <input
                type="date"
                value={summaryFilters.startDate}
                onChange={(e) =>
                  setSummaryFilters((p) => ({ ...p, startDate: e.target.value }))
                }
                className="border p-2 rounded"
              />
              <input
                type="date"
                value={summaryFilters.endDate}
                onChange={(e) =>
                  setSummaryFilters((p) => ({ ...p, endDate: e.target.value }))
                }
                className="border p-2 rounded"
              />
              <select
                className="border p-2 rounded"
                value={summaryFilters.groupBy}
                onChange={(e) =>
                  setSummaryFilters((p) => ({ ...p, groupBy: e.target.value as any }))
                }
              >
                <option value="bank">Bank</option>
                <option value="day">Day</option>
              </select>
              <select
                className="border p-2 rounded"
                value={summaryFilters.mode}
                onChange={(e) =>
                  setSummaryFilters((p) => ({ ...p, mode: e.target.value }))
                }
              >
                <option value="">All Modes</option>
                <option value="cash">Cash</option>
                <option value="online">Online</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
                <option value="cheque">Cheque</option>
              </select>
              <select
                className="border p-2 rounded"
                value={summaryFilters.bankAccount}
                onChange={(e) =>
                  setSummaryFilters((p) => ({ ...p, bankAccount: e.target.value }))
                }
              >
                <option value="">All Banks</option>
                {banks.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <DataTable<Payment>
              columns={
                summaryFilters.groupBy === "bank"
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
                  ]
              }
              data={summary}
              showIndex
              emptyMessage={loadingSummary ? "Loading..." : "No summary data"}
              onPaginationChange={(info) =>
                setPagination((prev) => {
                  if (prev.page === info.page && prev.limit === info.limit) return prev;
                  return { ...prev, page: info.page, limit: info.limit };
                })
              }
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
