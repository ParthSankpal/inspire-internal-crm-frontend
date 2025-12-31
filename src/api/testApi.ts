import { axiosClient } from "@/lib/apiClient";
import { PaginatedResponse } from "@/features/pagination";
import { Test } from "@/features/test/types";

interface GetTestsParams {
  page?: number;
  limit?: number;
  batchId?: string;
  examType?: string;
  status?: string;
}

export async function getAllTests(
  params: GetTestsParams = {}
): Promise<PaginatedResponse<Test>> {
  const query = new URLSearchParams(params as string);
  const { data } = await axiosClient.get(`/tests?${query}`);
  return data;
}

export async function createTest(payload: Partial<Test>): Promise<Test> {
  const { data } = await axiosClient.post("/tests", payload);
  return data.data;
}

export async function updateTest(
  id: string,
  payload: Partial<Test>
): Promise<Test> {
  const { data } = await axiosClient.put(`/tests/${id}`, payload);
  return data.data;
}

export async function deleteTest(id: string): Promise<{ message: string }> {
  const { data } = await axiosClient.delete(`/tests/${id}`);
  return data;
}

export async function publishTest(id: string): Promise<Test> {
  const { data } = await axiosClient.patch(`/tests/${id}/publish`);
  return data.data;
}

export async function unpublishTest(id: string): Promise<Test> {
  const { data } = await axiosClient.patch(`/tests/${id}/unpublish`);
  return data.data;
}
