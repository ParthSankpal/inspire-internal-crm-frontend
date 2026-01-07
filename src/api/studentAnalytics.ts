import { axiosClient } from "@/lib/apiClient";

export async function getStudentAnalytics(studentId: string) {
  const { data } = await axiosClient.get(
    `/students/${studentId}/analytics`
  );
  return data;
}
