// src/app/payments/transactions/usePayments.ts
import { useCallback, useEffect, useState } from "react";
import {
  getAllPayments,
  createPayment,
  updatePayment,
  deletePayment,
  getAllBanks,
} from "@/api/payments";
import { Payment, PaymentFormData, BankAccount } from "@/features/payments/types";
import { useNotify } from "@/components/common/NotificationProvider";

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

  const loadBanks = useCallback(async () => {
    try {
      const data = await getAllBanks();
      setBanks(data);
    } catch {
      // silent
    }
  }, []);

  const loadPayments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllPayments(pagination.page, pagination.limit);
      setPayments(res.data);
      setPagination((prev) => {
        const next = {
          ...prev,
          totalItems: res.pagination.totalItems,
          totalPages: res.pagination.totalPages,
        };
        if (prev.totalItems === next.totalItems && prev.totalPages === next.totalPages)
          return prev;
        return next;
      });
    } catch {
      notify("Failed to load payments", "error");
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, notify]);

  useEffect(() => {
    loadBanks();
    loadPayments();
  }, [loadBanks, loadPayments]);

  const addPayment = async (payload: PaymentFormData) => {
    try {
      await createPayment(payload);
      notify("Payment added successfully 💰", "success");
      await loadPayments();
    } catch {
      notify("Failed to add payment", "error");
      throw new Error("Failed to add payment");
    }
  };

  const editPayment = async (id: string, payload: PaymentFormData) => {
    try {
      await updatePayment(id, payload);
      notify("Payment updated successfully ✅", "success");
      await loadPayments();
    } catch {
      notify("Failed to update payment", "error");
      throw new Error("Failed to update payment");
    }
  };

  const removePayment = async (id: string) => {
    try {
      await deletePayment(id);
      notify("Payment deleted 🗑️", "info");
      await loadPayments();
    } catch {
      notify("Failed to delete payment", "error");
      throw new Error("Failed to delete payment");
    }
  };

  return {
    payments,
    banks,
    pagination,
    loading,
    setPagination,
    loadPayments,
    addPayment,
    editPayment,
    removePayment,
  };
}
