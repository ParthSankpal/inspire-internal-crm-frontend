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

export type BankFormData = z.infer<typeof bankSchema>;

export const paymentSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  type: z.enum(["credit", "debit"]),
  mode: z.enum(["cash", "online", "cheque", "upi", "card", "other"]),
  date: z.string().min(1, "Date is required"),
  bankAccount: z.string().min(1, "Bank account is required"),
  payerName: z.string().optional(),
  notes: z.string().optional(),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
