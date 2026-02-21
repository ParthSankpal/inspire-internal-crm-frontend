import { z } from "zod";

export type BankType = "bank" | "cash" | "wallet";
export type PaymentType = "credit" | "debit";
export type PaymentMode = "cash" | "online" | "cheque" | "upi" | "card" | "other" | "bank";
export type LinkedType =
  | "student"
  | "enquiry"
  | "batch"
  | "expense"
  | "other";

export type ExpenseCategory =
  | "salary"
  | "rent"
  | "electricity"
  | "internet"
  | "maintenance"
  | "marketing"
  | "stationery"
  | "transport"
  | "other";

export type PayeeType = "staff" | "vendor" | "other";

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

  type: "credit" | "debit";
  mode: PaymentMode;
  date: string;

  bankAccount: BankAccount | string;
  isRecieptGiven: boolean;
  receiptNumber: string,
  receiptGeneratedAt: Date;
  /* linking */
  linkedType?: LinkedType;
  linkedId?: string;

  /* student (credit) */
  batch?: string;
  student?: string;
  linkedInstallmentNo?: number;
  appliedAmount?: number;

  /* expense (debit) */
  expenseCategory?: ExpenseCategory;
  expenseSubType?: string;

  payeeType?: PayeeType;
  payeeName?: string;
  payeeId?: string;

  payerName?: string;
  notes?: string;

  createdAt?: string;
}



export const bankSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Account name is required"),

    type: z
      .enum(["bank", "cash", "wallet"])
      .refine((val) => !!val, {
        message: "Account type is required",
      }),

    bankName: z.string().trim().optional(),
    accountNumber: z.string().trim().optional(),
    ifsc: z.string().trim().optional(),
    branch: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    // 🔥 If type is BANK → require full bank details
    if (data.type === "bank") {
      if (!data.bankName) {
        ctx.addIssue({
          path: ["bankName"],
          code: z.ZodIssueCode.custom,
          message: "Bank name is required",
        });
      }

      if (!data.accountNumber) {
        ctx.addIssue({
          path: ["accountNumber"],
          code: z.ZodIssueCode.custom,
          message: "Account number is required",
        });
      }

      if (!data.ifsc) {
        ctx.addIssue({
          path: ["ifsc"],
          code: z.ZodIssueCode.custom,
          message: "IFSC code is required",
        });
      }

      if (!data.branch) {
        ctx.addIssue({
          path: ["branch"],
          code: z.ZodIssueCode.custom,
          message: "Branch is required",
        });
      }
    }
  });

export type BankFormData = z.infer<typeof bankSchema>;

export const paymentSchema = z
  .object({
    amount: z.number().positive("Amount must be positive"),
    type: z.enum(["credit", "debit"]),

    /* common */
    mode: z.enum(["cash", "online", "cheque", "upi", "card", "bank", "other"]),
    date: z.string(),
    bankAccount: z.string().min(1, "Bank is required"),
    notes: z.string().optional(),

    /* student credit */
    batch: z.string().optional(),
    student: z.string().optional(),
    linkedInstallmentNo: z.string().optional(),

    /* expense debit */
    expenseCategory: z
      .enum([
        "salary",
        "rent",
        "electricity",
        "internet",
        "maintenance",
        "marketing",
        "stationery",
        "transport",
        "other",
      ])
      .optional(),

    expenseSubType: z.string().optional(),

    payeeType: z.enum(["staff", "vendor", "other"]).optional(),
    payeeName: z.string().optional(),
  })
  .superRefine((d, ctx) => {
    // CREDIT → student fees
    if (d.type === "credit") {
      if (!d.batch || !d.student || !d.linkedInstallmentNo) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Batch, Student & Installment are required for credit",
          path: ["batch"],
        });
      }
    }

    // DEBIT → expense
    if (d.type === "debit") {
      if (!d.expenseCategory) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Expense category is required",
          path: ["expenseCategory"],
        });
      }
      if (!d.payeeName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Payee name is required",
          path: ["payeeName"],
        });
      }
    }
  });


export type PaymentFormData = z.infer<typeof paymentSchema>;

export interface PaymentPayload {
  amount: number;
  type: "credit" | "debit";
  mode: PaymentMode;
  date: string;
  bankAccount: string;

  /* linking */
  linkedType: LinkedType;
  linkedId?: string | null;
  linkedInstallmentNo?: number | null;

  /* expense */
  expenseCategory?: ExpenseCategory;
  expenseSubType?: string;
  payeeType?: PayeeType;
  payeeName?: string;

  /* optional */
  notes?: string;
}
