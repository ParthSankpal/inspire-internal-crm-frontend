import { StudentOverallAnalytics } from "@/features/analytics/studentOverall.types";
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
