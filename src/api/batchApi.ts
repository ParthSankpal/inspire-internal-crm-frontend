import { Batch } from "@/features/batches/types";
import { axiosClient } from "@/lib/apiClient";

// ✅ GET all batches
export async function getAllBatches(): Promise<Batch[]> {
  const { data } = await axiosClient.get<Batch[]>("/batches");
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
