// src/app/payments/summary/useSummary.ts
import { useCallback, useState } from "react";
import { getPaymentSummary } from "@/api/payments";
import { useNotify } from "@/components/common/NotificationProvider";
import {
  SummaryFilters,
  SummaryRawResponse,
} from "@/features/payments/types";

export default function useSummary() {
  const notify = useNotify();
  const [summary, setSummary] = useState<SummaryRawResponse>([]);
  const [loading, setLoading] = useState(false);

  const loadSummary = useCallback(
    async (filters: SummaryFilters) => {
      try {
        setLoading(true);
        const res = await getPaymentSummary(filters);
        setSummary(res);
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
