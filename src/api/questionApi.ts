import { Question, QuestionFormData } from "@/features/question/types";
import { Test } from "@/features/test/types";
import { axiosClient } from "@/lib/apiClient";

interface GetQuestionsParams {
  subject?: string;
  classLevel?: number;
  chapter?: string;
  topic?: string;
}

export async function getQuestions(
  params: GetQuestionsParams = {}
): Promise<Question[]> {
  const query = new URLSearchParams(params as string);
  const { data } = await axiosClient.get(`/questions?${query}`);
  return data.data;
}

export async function createQuestion(
  payload: Partial<Question>
): Promise<Question> {
  const { data } = await axiosClient.post("/questions", payload);
  return data.data;
}

export async function updateQuestion(
  id: string,
  payload: Partial<Question>
): Promise<Question> {
  const { data } = await axiosClient.put(`/questions/${id}`, payload);
  return data.data;
}

export async function deleteQuestion(id: string) {
  const { data } = await axiosClient.delete(`/questions/${id}`);
  return data;
}




export async function saveQuestionConfig(
  testId: string,
  questions: QuestionFormData[]
) {
  const { data } = await axiosClient.put(
    `/tests/${testId}/question-config`,
    { questions }
  );

  return data;
}

/**
 * Fetch single test with full question configuration
 * GET /api/tests/:id
 */
export async function getTestById(testId: string): Promise<Test> {
  const res = await axiosClient.get(`/tests/${testId}`);

  if (!res.data?.success) {
    throw new Error("Failed to fetch test");
  }

  return res.data.data as Test;
}
