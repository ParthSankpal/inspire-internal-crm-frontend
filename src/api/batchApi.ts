import { Batch } from "@/features/batches/types";
import { PaginatedResponse } from "@/features/pagination";
import { axiosClient } from "@/lib/apiClient";




export async function getAllBatches(page = 1, limit = 10): Promise<PaginatedResponse<Batch>> {
  const { data } = await axiosClient.get<PaginatedResponse<Batch>>(
    `/batches?page=${page}&limit=${limit}`
  );
  return data;
}

// ✅ GET single batch by ID
export async function getBatchById(id: string): Promise<Batch> {
  const { data } = await axiosClient.get<Batch>(`/batches/${id}`);
  return data;
}

// ✅ CREATE batch
export async function createBatch(batch: Partial<Batch>): Promise<Batch> {
  const { data } = await axiosClient.post<Batch>("/batches/create", batch);
  return data;
}

// ✅ UPDATE batch
export async function updateBatch(id: string, updates: Partial<Batch>): Promise<Batch> {
  const { data } = await axiosClient.put<Batch>(`/batches/${id}`, updates);
  return data;
}

// ✅ DELETE batch
export async function deleteBatch(id: string): Promise<{ message: string }> {
  const { data } = await axiosClient.delete(`/batches/${id}`);
  return data;
}
