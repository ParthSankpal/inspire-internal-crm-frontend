// src/app/payments/banks/useBanks.ts
import { useCallback, useEffect, useState } from "react";
import {
  getAllBanks,
  createBank,
  updateBank,
  deleteBank,
} from "@/api/payments";
import { BankAccount, BankFormData } from "@/features/payments/types";
import { useNotify } from "@/components/common/NotificationProvider";

export default function useBanks() {
  const notify = useNotify();
  const [banks, setBanks] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(false);

  const loadBanks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllBanks();
      setBanks(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load banks";
      notify(message, "error");
    } finally {
      setLoading(false);
    }
  }, [notify]);


  useEffect(() => {
    loadBanks();
  }, [loadBanks]);

  const addBank = async (payload: BankFormData) => {
    try {
      await createBank(payload);
      notify("Bank added successfully ✅", "success");
      await loadBanks();
    } catch {
      notify("Failed to add bank", "error");
      throw new Error("Failed to add bank");
    }
  };

  const editBank = async (id: string, payload: BankFormData) => {
    try {
      await updateBank(id, payload);
      notify("Bank updated successfully ✅", "success");
      await loadBanks();
    } catch {
      notify("Failed to update bank", "error");
      throw new Error("Failed to update bank");
    }
  };

  const removeBank = async (id: string) => {
    try {
      await deleteBank(id);
      notify("Bank deleted 🗑️", "info");
      await loadBanks();
    } catch {
      notify("Failed to delete bank", "error");
      throw new Error("Failed to delete bank");
    }
  };

  return {
    banks,
    loading,
    loadBanks,
    addBank,
    editBank,
    removeBank,
  };
}
