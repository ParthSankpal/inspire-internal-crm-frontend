import { z } from "zod";

export type BankType = "bank" | "cash" | "wallet";
export type PaymentType = "credit" | "debit";
export type PaymentMode = "cash" | "online" | "cheque" | "upi" | "card" | "other";

export interface BankAccount {
  _id?: string;
  name: string;
  type: BankType;
  bankName?: string;
  accountNumber?: string;
  ifsc?: string;
  branch?: string;
  currency?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Payment {
  _id?: string;
  amount: number;
  currency?: string;
  type: PaymentType;
  mode: PaymentMode;
  date: string;
  batch: string;
  student: string;
  installmentNo?: string;
  paymentRef?: string;
  bankAccount: BankAccount | string;
  payerName?: string;
  notes?: string;
  createdAt?: string;
}
export const bankSchema = z.object({
  name: z.string().min(1, "Bank name is required"),
  type: z.enum(["bank", "cash", "wallet"]),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  ifsc: z.string().optional(),
  branch: z.string().optional(),
});

export type BankFormData = z.infer<typeof bankSchema>;export const paymentSchema = z
  .object({
    amount: z.number().positive("Amount must be positive"),
    type: z.enum(["credit", "debit"]),
    batch: z.string().optional(),
    student: z.string().optional(),
    installmentNo: z.string().optional(),
    mode: z.enum(["cash", "online", "cheque", "upi", "card", "other"]),
    date: z.string(),
    bankAccount: z.string().min(1, "Bank is required"),
    payerName: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine(
    (d) => {
      if (d.type === "credit") {
        return d.batch && d.student && d.installmentNo;
      }
      return true;
    },
    { message: "Batch, Student & Installment are required for credit payments" }
  );

export type PaymentFormData = z.infer<typeof paymentSchema>;

export interface PaymentPayload extends PaymentFormData {
  linkedType?: "student" | "other";
  linkedId?: string | null;
  linkedInstallmentNo?: number | null;
}


export interface SummaryFilters {
  startDate: string;
  endDate: string;
  groupBy: "bank" | "day";
  mode: "" | "cash" | "online" | "upi" | "card" | "cheque";
  bankAccount: string;
}

export interface SummaryBankRow {
  bank: { _id: string; name: string } | null;
  totalIn: number;
  totalOut: number;
  balance: number;
}

export interface SummaryDayRow {
  day: string;
  totalIn: number;
  totalOut: number;
  balance: number;
}

export type SummaryRawResponse = SummaryBankRow[] | SummaryDayRow[];