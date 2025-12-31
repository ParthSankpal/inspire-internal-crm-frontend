import { BatchAnalytics, QuestionAnalytics, StudentAnalytics, SubjectWiseAnalytics, TopicAnalytics } from "@/features/analytics/types";
import { axiosClient } from "@/lib/apiClient";


export async function getStudentAnalytics(
  testId: string,
  studentId: string
): Promise<StudentAnalytics[]> {
  const { data } = await axiosClient.get(
    `/analytics/student/${testId}/${studentId}`
  );
  return data.data;
}

export async function getStudentSubjectWise(
  testId: string,
  studentId: string
): Promise<SubjectWiseAnalytics[]> {
  const { data } = await axiosClient.get(
    `/analytics/student/${testId}/${studentId}/subjects`
  );
  return data.data;
}

export async function getStudentTopicAnalytics(
  testId: string,
  studentId: string
): Promise<TopicAnalytics[]> {
  const { data } = await axiosClient.get(
    `/analytics/student/${testId}/${studentId}/topics`
  );
  return data.data;
}

export async function getBatchAnalytics(
  testId: string
): Promise<BatchAnalytics[]> {
  const { data } = await axiosClient.get(`/analytics/batch/${testId}`);
  return data.data;
}

export async function getQuestionAnalytics(
  testId: string
): Promise<QuestionAnalytics[]> {
  const { data } = await axiosClient.get(
    `/analytics/test/${testId}/questions`
  );
  return data.data;
}
