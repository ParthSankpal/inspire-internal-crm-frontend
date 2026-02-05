import { BankAccount, Payment, PaymentPayload } from "@/features/payments/types";
import { PaginatedResponse } from "@/features/pagination";
import { axiosClient } from "@/lib/apiClient";

/* =========================
   BANKS
========================= */
export async function getAllBanks(): Promise<BankAccount[]> {
  const { data } = await axiosClient.get("/payments/banks");
  return data;
}

export async function createBank(
  bank: Partial<BankAccount>
): Promise<BankAccount> {
  const { data } = await axiosClient.post("/payments/banks", bank);
  return data;
}

export async function updateBank(
  id: string,
  updates: Partial<BankAccount>
): Promise<BankAccount> {
  const { data } = await axiosClient.patch(`/payments/banks/${id}`, updates);
  return data;
}

export async function deleteBank(
  id: string
): Promise<{ message: string }> {
  const { data } = await axiosClient.delete(`/payments/banks/${id}`);
  return data;
}

/* =========================
   PAYMENTS
========================= */
export async function getAllPayments(
  page = 1,
  limit = 10,
  filters: Partial<{
    startDate: string;
    endDate: string;
    mode: string;
    type: "credit" | "debit";
    bankAccount: string;
    expenseCategory: string;
  }> = {}
): Promise<PaginatedResponse<Payment>> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v)
    ),
  });

  const { data } = await axiosClient.get(
    `/payments?${params.toString()}`
  );
  return data;
}

export async function createPayment(
  payload: PaymentPayload
): Promise<Payment> {
  const { data } = await axiosClient.post("/payments", payload);
  return data;
}

export async function updatePayment(
  id: string,
  payload: PaymentPayload
): Promise<Payment> {
  const { data } = await axiosClient.put(`/payments/${id}`, payload);
  return data;
}

export async function deletePayment(
  id: string
): Promise<{ message: string }> {
  const { data } = await axiosClient.delete(`/payments/${id}`);
  return data;
}

/* =========================
   TRANSFER
========================= */
export async function transferBetweenAccounts(payload: {
  fromAccount: string;
  toAccount: string;
  amount: number;
  date: string;
  notes?: string;
}): Promise<{ debit: Payment; credit: Payment }> {
  const { data } = await axiosClient.post(
    "/payments/transfer",
    payload
  );
  return data;
}
