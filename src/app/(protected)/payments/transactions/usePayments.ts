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

  // -----------------------
  // LOAD BANKS
  // -----------------------
  const loadBanks = useCallback(async () => {
    const data = await getAllBanks();
    setBanks(data);
  }, []);

  // -----------------------
  // LOAD BATCHES
  // -----------------------
  const loadBatches = useCallback(async () => {
    const res = await getAllBatches();

    setBatches(
      res.data.map((b: Batch) => ({
        value: b._id ?? "",
        label: b.name,
      }))
    );
  }, []);

  // -----------------------
  // LOAD PAYMENTS
  // -----------------------
  const loadPayments = useCallback(
    async () => {
      try {
        setLoading(true);
        const res = await getAllPayments(pagination.page, pagination.limit);
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
    },
    [pagination.page, pagination.limit, notify]
  );

  // -----------------------
  // INITIAL LOAD + REFRESH
  // -----------------------
  useEffect(() => {
    loadBanks();
    loadBatches();
  }, [loadBanks, loadBatches]);

  // Load payments whenever pagination changes
  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  // -----------------------------
  // ADD PAYMENT
  // -----------------------------
  const addPayment = async (d: PaymentFormData) => {
    try {
      const payload: PaymentPayload = {
        ...d,
        linkedType: d.type === "credit" ? "student" : "other",
        linkedId: d.type === "credit" ? d.student : null,
        linkedInstallmentNo:
          d.type === "credit" ? Number(d.installmentNo) : null,
      };

      await createPayment(payload);
      notify("Payment added successfully", "success");
      loadPayments();
    } catch {
      notify("Failed to add payment", "error");
    }
  };

  // -----------------------------
  // EDIT PAYMENT
  // -----------------------------
  const editPayment = async (id: string, d: PaymentFormData) => {
    try {
      const payload: PaymentPayload = {
        ...d,
        linkedType: d.type === "credit" ? "student" : "other",
        linkedId: d.type === "credit" ? d.student : null,
        linkedInstallmentNo:
          d.type === "credit" ? Number(d.installmentNo) : null,
      };

      await updatePayment(id, payload);
      notify("Payment updated", "success");
      loadPayments();
    } catch {
      notify("Failed to update payment", "error");
    }
  };

  const removePayment = async (id: string) => {
    try {
      await deletePayment(id);
      notify("Payment deleted", "info");
      loadPayments();
    } catch {
      notify("Failed to delete payment", "error");
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
