import { StudentOverallAnalytics, StudentTestHistoryResponse } from "@/features/analytics/studentOverall.types";
import { axiosClient } from "@/lib/apiClient";


/**
 * GET /api/analytics/student/:studentId/overall
 */
export async function getStudentOverallAnalytics(
  studentId: string
): Promise<StudentOverallAnalytics> {
  const { data } = await axiosClient.get(
    `/analytics/student/${studentId}/overallAnalytics`
  );

  return data.data;
}


export async function getStudentTestHistory(params: {
  studentId: string;
  page: number;
  limit: number;
  search?: string;
  sortKey?: string;
  sortDir?: "asc" | "desc";
}): Promise<StudentTestHistoryResponse> {
  const { studentId, ...query } = params;

  const { data } = await axiosClient.get(
    `/analytics/students/${studentId}/tests`,
    { params: query }
  );

  return data;
}
