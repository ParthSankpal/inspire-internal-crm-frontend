import { useEffect, useState } from "react";
import {
  BatchFinanceSummary,
  BatchStudentFinance,
} from "../types";
import {
  getBatchFinanceSummary,
  getBatchStudentFinance,
} from "../apis";
import { PaginationMeta } from "@/features/pagination";

export function useBatchFinance(batchId: string) {
  const [students, setStudents] = useState<BatchStudentFinance[]>([]);
  const [summary, setSummary] = useState<BatchFinanceSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState<PaginationMeta>({
    currentPage: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  });

  useEffect(() => {
    if (!batchId) return;

    setLoading(true);

    Promise.all([
      // ✅ summary API (no pagination)
      getBatchFinanceSummary(batchId),

      // ✅ students API (paginated)
      getBatchStudentFinance(
        batchId,
        pagination.currentPage,
        pagination.limit
      ),
    ])
      .then(([summaryRes, studentsRes]) => {
      
        setSummary(summaryRes.data);
        setStudents(studentsRes.data);

        setPagination((prev) => ({
          ...prev,
          totalItems: studentsRes.pagination.totalItems,
          totalPages: studentsRes.pagination.totalPages,
        }));
      })
      .finally(() => setLoading(false));
  }, [batchId, pagination.currentPage, pagination.limit]);

  return {
    summary,
    students,
    pagination,
    setPagination,
    loading,
  };
}
