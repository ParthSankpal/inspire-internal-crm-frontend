import { useEffect, useState } from "react";
import { MonthlyFinanceSummary } from "../types";
import { getMonthlyFinanceSummary } from "../apis";

export function useMonthlyFinance() {
  const [data, setData] = useState<MonthlyFinanceSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMonthlyFinanceSummary()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
