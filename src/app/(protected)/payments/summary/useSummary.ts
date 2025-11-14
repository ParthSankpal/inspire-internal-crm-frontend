// src/app/payments/summary/useSummary.ts
import { useCallback, useState } from "react";
import { getPaymentSummary } from "@/api/payments";
import { useNotify } from "@/components/common/NotificationProvider";

export default function useSummary() {
  const notify = useNotify();
  const [summary, setSummary] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadSummary = useCallback(
    async (filters: any) => {
      try {
        setLoading(true);
        const res = await getPaymentSummary(filters);
        setSummary(Array.isArray(res) ? res : []);
      } catch {
        notify("Failed to load summary", "error");
      } finally {
        setLoading(false);
      }
    },
    [notify]
  );

  return {
    summary,
    loading,
    loadSummary,
  };
}
