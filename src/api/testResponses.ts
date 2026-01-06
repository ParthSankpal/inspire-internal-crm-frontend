import { axiosClient } from "@/lib/apiClient";
import { PaginatedResponse } from "@/features/pagination";

export interface TestResponse {
  _id: string;
  rollNo: number;
  studentName: string;
  totalMarks: number;
  correctCount: number;
  incorrectCount: number;
  notAttemptedCount: number;
  subjectWiseMarks: Record<string, number>;
  student: {
    _id: string;
    firstName: string;
    lastName: string;
    studentId: string;
  };
}

export async function getTestResponses(
  testId: string,
  params: {
    page?: number;
    limit?: number;
    search?: string;
  }
): Promise<PaginatedResponse<TestResponse>> {
  const query = new URLSearchParams(params as any).toString();
  const { data } = await axiosClient.get(
    `/tests/${testId}/responses?${query}`
  );
  return data;
}
