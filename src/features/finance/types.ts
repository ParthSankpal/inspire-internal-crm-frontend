/* =========================
   INSTALLMENTS
========================= */

import { PaginationMeta } from "../pagination";

export type InstallmentStatus = "Pending" | "Partial" | "Paid" | "Overdue";

export interface Installment {
    
  installmentNo: number;
  dueDate: string;
  amount: number;
  paidAmount: number;
  pendingAmount: number;
  paidDate?: string;
  status: InstallmentStatus;
}

/* =========================
   STUDENT FEES
========================= */

export interface StudentFees {
  finalFees: number;
  installments: Installment[];
}

/* =========================
   BATCH SUMMARY
========================= */

export interface BatchFinanceSummary {
  totalFinalFees: number;
  totalCollected: number;
  totalPending: number;
}

export interface BatchFinanceSummaryResponse {
    data:BatchFinanceSummary;
    success:boolean;
}

/* =========================
   BATCH STUDENT ROW
========================= */

export interface BatchStudentFinanceResponse {
  data: BatchStudentFinance[];
  pagination: PaginationMeta;
}


export interface BatchStudentFinance {
  _id: string;
  studentId: string;
  firstName: string;
  lastName: string;

  fees: {
    finalFees: number;
  };

  totalCollected: number;
  totalPending: number;

  upcomingInstallments: Installment[];
  overdueInstallments: Installment[];
}

/* =========================
   STUDENT FINANCE DETAIL
========================= */

export interface StudentFinanceDetail {
  _id: string;
  studentId: string;
  firstName: string;
  lastName: string;

  fees: StudentFees;

  totalCollected: number;
  totalPending: number;

  payments: {
    _id: string;
    amount: number;
    date: string;
    mode: string;
    paymentRef?: string;
    notes?: string;
  }[];
}

/* =========================
   MONTHLY SUMMARY
========================= */

export interface MonthlyFinanceSummary {
  collectedThisMonth: number;
  upcomingThisMonth: number;
  overdueTotal: number;
}
