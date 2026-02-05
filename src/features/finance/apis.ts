import { axiosClient } from "@/lib/apiClient";
import {
  BatchFinanceSummary,
  BatchFinanceSummaryResponse,
  BatchStudentFinance,
  BatchStudentFinanceResponse,
  MonthlyFinanceSummary,
  StudentFinanceDetail,
} from "./types";
import { PaginatedResponse } from "../pagination";
import { Payment } from "../payments/types";

/* =========================
   MONTHLY
========================= */

export async function getMonthlyFinanceSummary(): Promise<MonthlyFinanceSummary> {
  const { data } = await axiosClient.get<{ data: MonthlyFinanceSummary }>(
    "/finance/monthly-summary"
  );
  return data.data;
}

/* =========================
   BATCH
========================= */

export async function getBatchFinanceSummary(
  batchId: string
): Promise<BatchFinanceSummaryResponse> {
  const { data } = await axiosClient.get<BatchFinanceSummaryResponse>(
    `/finance/batch/${batchId}/summary`
  );

  return data;
}


export async function getBatchStudentFinance(
  batchId: string,
  page = 1,
  limit = 10
): Promise<PaginatedResponse<BatchStudentFinance>> {
  const { data } = await axiosClient.get<
    PaginatedResponse<BatchStudentFinance>
  >(`/finance/batch/${batchId}/students`, {
    params: { page, limit },
  });

  return data;
}

/* =========================
   STUDENT
========================= */

export async function getStudentFinanceDetail(
  studentId: string
): Promise<StudentFinanceDetail> {
  const { data } = await axiosClient.get<{ data: StudentFinanceDetail }>(
    `/finance/student/${studentId}/fees`
  );
  return data.data;
}

/* =========================
   EXPENSES
========================= */

export async function getExpenses(
  page = 1,
  limit = 10,
  filters?: {
    startDate?: string;
    endDate?: string;
    expenseCategory?: string;
    payeeType?: string;
  }
):  Promise<PaginatedResponse<Payment>>{
  const { data } = await axiosClient.get("/finance/expenses", {
    params: { page, limit, ...filters },
  });
  return data;
}

/* =========================
   MONTHLY P&L
========================= */

export type MonthlyPnL = {
  month: number;
  income: number;
  expense: number;
  profit: number;
};

export async function getMonthlyPnL(
  year?: number
): Promise<MonthlyPnL[]> {
  const { data } = await axiosClient.get<{ data: MonthlyPnL[] }>(
    "/finance/pnl",
    { params: { year } }
  );
  return data.data;
}
