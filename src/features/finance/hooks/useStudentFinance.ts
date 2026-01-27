import { useEffect, useState } from "react";
import { StudentFinanceDetail } from "../types";
import { getStudentFinanceDetail } from "../apis";



export function useStudentFinance(studentId: string) {
  const [data, setData] = useState<StudentFinanceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) return;

    getStudentFinanceDetail(studentId)
      .then(setData)
      .finally(() => setLoading(false));
  }, [studentId]);

  return { data, loading };
}
