import { axiosClient } from "@/lib/apiClient";
import { PaginatedResponse } from "@/features/pagination";
import { ImportTestResultsResponse, Test } from "@/features/test/types";

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



export async function importTestResults(
  testId: string,
  rows: any[]
): Promise<ImportTestResultsResponse> {
  const { data } = await axiosClient.post(
    `/analytics/results/import/${testId}`,
    rows
  );
  return data;
}


export async function getTestResponses(
  testId: string,
  params: { page: number; limit: number; search?: string }
) {
  const res = await fetch(
    `/api/tests/${testId}/responses?page=${params.page}&limit=${params.limit}&search=${params.search ?? ""}`
  );
  const json = await res.json();
  return json;
}



export async function downloadTestResultsPdf(testId: string) {
  const response = await axiosClient.get(
    `/tests/${testId}/responses/pdf`,
    {
      responseType: "blob",
    }
  );

  const blob = new Blob([response.data], {
    type: "application/pdf",
  });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "test-results.pdf";
  a.click();

  window.URL.revokeObjectURL(url);
}
