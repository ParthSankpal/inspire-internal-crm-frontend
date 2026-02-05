import { useCallback, useEffect, useState } from "react";
import {
  getAllPayments,
  createPayment,
  updatePayment,
  deletePayment,
  getAllBanks,
} from "@/api/payments";

import {
  Payment,
  PaymentFormData,
  PaymentPayload,
  BankAccount,
} from "@/features/payments/types";

import { useNotify } from "@/components/common/NotificationProvider";
import { getAllBatches } from "@/api/batchApi";
import { Batch } from "@/features/batches/types";

export default function usePayments(initialPage = 1, initialLimit = 10) {
  const notify = useNotify();

  const [payments, setPayments] = useState<Payment[]>([]);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    totalItems: 0,
    totalPages: 1,
  });

  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState<BankAccount[]>([]);
  const [batches, setBatches] =
    useState<{ value: string; label: string }[]>([]);

  /* =========================
     LOAD BANKS
  ========================= */
  const loadBanks = useCallback(async () => {
    const data = await getAllBanks();
    setBanks(data);
  }, []);

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
     LOAD PAYMENTS
  ========================= */
  const loadPayments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllPayments(
        pagination.page,
        pagination.limit
      );

      setPayments(res.data);
      setPagination((prev) => ({
        ...prev,
        totalItems: res.pagination.totalItems,
        totalPages: res.pagination.totalPages,
      }));
    } catch {
      notify("Failed to load payments", "error");
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, notify]);

  /* =========================
     INITIAL LOAD
  ========================= */
  useEffect(() => {
    loadBanks();
    loadBatches();
  }, [loadBanks, loadBatches]);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  /* =========================
     BUILD PAYLOAD (IMPORTANT)
  ========================= */
const buildPayload = (d: PaymentFormData): PaymentPayload => {
  if (d.type === "credit") {
    return {
      amount: d.amount,
      type: d.type,
      mode: d.mode,
      date: d.date,
      bankAccount: d.bankAccount,

      linkedType: "student",
      linkedId: d.student ?? null,
      linkedInstallmentNo: d.linkedInstallmentNo
        ? Number(d.linkedInstallmentNo)
        : null,

      notes: d.notes,
    };
  }

  return {
    amount: d.amount,
    type: d.type,
    mode: d.mode,
    date: d.date,
    bankAccount: d.bankAccount,

    linkedType: "expense",
    linkedId: null,

    expenseCategory: d.expenseCategory,
    expenseSubType: d.expenseSubType,
    payeeType: d.payeeType,
    payeeName: d.payeeName,

    notes: d.notes,
  };
};

  /* =========================
     ADD PAYMENT
  ========================= */
  const addPayment = async (d: PaymentFormData) => {
    try {
      const payload = buildPayload(d);
      await createPayment(payload);
      notify("Transaction added successfully", "success");
      loadPayments();
    } catch {
      notify("Failed to add transaction", "error");
    }
  };

  /* =========================
     EDIT PAYMENT
  ========================= */
  const editPayment = async (id: string, d: PaymentFormData) => {
    try {
      const payload = buildPayload(d);
      await updatePayment(id, payload);
      notify("Transaction updated", "success");
      loadPayments();
    } catch {
      notify("Failed to update transaction", "error");
    }
  };

  /* =========================
     DELETE PAYMENT
  ========================= */
  const removePayment = async (id: string) => {
    try {
      await deletePayment(id);
      notify("Transaction deleted", "info");
      loadPayments();
    } catch {
      notify("Failed to delete transaction", "error");
    }
  };

  return {
    payments,
    banks,
    batches,
    pagination,
    loading,
    setPagination,
    addPayment,
    editPayment,
    removePayment,
  };
}
