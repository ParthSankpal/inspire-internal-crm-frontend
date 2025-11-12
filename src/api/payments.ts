import { BankAccount, Payment } from "@/features/payments/types";
import { PaginatedResponse } from "@/features/pagination";
import { axiosClient } from "@/lib/apiClient";

// ✅ Get all banks
export async function getAllBanks(): Promise<BankAccount[]> {
  const { data } = await axiosClient.get<BankAccount[]>("/payments/banks");
  return data;
}

// ✅ Create new bank
export async function createBank(bank: Partial<BankAccount>): Promise<BankAccount> {
  const { data } = await axiosClient.post<BankAccount>("/payments/banks", bank);
  return data;
}

// ✅ Update bank
export async function updateBank(id: string, updates: Partial<BankAccount>): Promise<BankAccount> {
  const { data } = await axiosClient.patch<BankAccount>(`/payments/banks/${id}`, updates);
  return data;
}

// ✅ Delete bank (soft delete)
export async function deleteBank(id: string): Promise<{ message: string }> {
  const { data } = await axiosClient.delete(`/payments/banks/${id}`);
  return data;
}

// ✅ Update a payment
export async function updatePayment(id: string, updates: Partial<Payment>): Promise<Payment> {
  const { data } = await axiosClient.put<Payment>(`/payments/${id}`, updates);
  return data;
}

// ✅ Delete a payment
export async function deletePayment(id: string): Promise<{ message: string }> {
  const { data } = await axiosClient.delete(`/payments/${id}`);
  return data;
}


// ✅ Get all payments (paginated)
// ✅ Get all payments
export async function getAllPayments(
  page = 1,
  limit = 10,
  filters: Partial<{
    startDate: string;
    endDate: string;
    mode: string;
    type: string;
    bankAccount: string;
  }> = {}
): Promise<PaginatedResponse<Payment>> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)),
  });

  const { data } = await axiosClient.get<PaginatedResponse<Payment>>(`/payments?${params}`);
  return data;
}


// ✅ Create payment
export async function createPayment(payment: Partial<Payment>): Promise<Payment> {
  const { data } = await axiosClient.post<Payment>("/payments", payment);
  return data;
}

// ✅ Transfer between accounts
export async function transferBetweenAccounts(payload: {
  fromAccount: string;
  toAccount: string;
  amount: number;
  date: string;
  notes?: string;
}): Promise<{ debit: Payment; credit: Payment }> {
  const { data } = await axiosClient.post<{ debit: Payment; credit: Payment }>("/payments/transfer", payload);
  return data;
}



export async function getPaymentSummary(
  filters?: {
    startDate?: string;
    endDate?: string;
    groupBy?: "bank" | "day";
    bankAccount?: string;
    mode?: string;
    type?: string;
  }
): Promise<
  | { bank: { _id: string; name: string } | null; totalIn: number; totalOut: number; balance: number }[]
  | { day: string; totalIn: number; totalOut: number; balance: number }[]
> {
  const queryParams = new URLSearchParams({
    ...(filters?.startDate ? { startDate: filters.startDate } : {}),
    ...(filters?.endDate ? { endDate: filters.endDate } : {}),
    ...(filters?.groupBy ? { groupBy: filters.groupBy } : {}),
    ...(filters?.bankAccount ? { bankAccount: filters.bankAccount } : {}),
    ...(filters?.mode ? { mode: filters.mode } : {}),
    ...(filters?.type ? { type: filters.type } : {}),
  }).toString();

  const { data } = await axiosClient.get(`/payments/summary?${queryParams}`);
  return data;
}