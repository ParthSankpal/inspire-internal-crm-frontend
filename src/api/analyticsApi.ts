import { LearningMapResponse, StudentAnalyticsSummary, StudentTestResult, SubjectWiseMarks } from "@/features/analytics/types";
import { axiosClient } from "@/lib/apiClient";

/* ======================================================
   TYPES
====================================================== */


/* ======================================================
   STUDENT – TEST SPECIFIC ANALYTICS
====================================================== */


/**
 * Subject-wise marks (single test)
 * GET /api/analytics/student/:testId/:studentId/subjects
 */
export async function getStudentSubjectWise(
  testId: string,
  studentId: string | number
) {
  const { data } = await axiosClient.get<{
    success: boolean;
    data: SubjectWiseMarks;
  }>(`/analytics/student/${testId}/${studentId}/subjects`);

  return data;
}

/**
 * Question / topic analysis (single test)
 * GET /api/analytics/student/:testId/:studentId/topics
 */
export async function getStudentQuestionAnalytics(
  testId: string,
  studentId: string | number
) {
  const { data } = await axiosClient.get(
    `/analytics/student/${testId}/${studentId}/topics`
  );

  return data;
}

/* ======================================================
   STUDENT – OVERALL ANALYTICS (ALL TESTS)
====================================================== */

/**
 * Full student analytics (all tests)
 * GET /api/analytics/student/:studentId
 */
export async function getStudentAnalytics(studentId: string) {

  const { data } = await axiosClient.get<{
    success: boolean;
    summary: StudentAnalyticsSummary;
    tests: StudentTestResult[];
  }>(`/analytics/student/${studentId}`);

  return data;
}

/**
 * Subject-wise accuracy / average
 * GET /api/analytics/student/:studentId/subjects-accuracy
 */
export async function getStudentSubjectAccuracy(studentId: string) {
  const { data } = await axiosClient.get<{
    success: boolean;
    data: {
      subject: string;
      avgMarks: number;
    }[];
  }>(`/analytics/student/${studentId}/subjects-accuracy`);

  return data;
}

/**
 * Strength & weakness detection
 * GET /api/analytics/student/:studentId/strength-weakness
 */
export async function getStudentStrengthWeakness(studentId: string) {
  const { data } = await axiosClient.get<{
    success: boolean;
    strongest: { _id: string; avg: number } | null;
    weakest: { _id: string; avg: number } | null;
  }>(`/analytics/student/${studentId}/strength-weakness`);

  return data;
}

/**
 * Marks trend (graph-ready)
 * GET /api/analytics/student/:studentId/trend
 */
export async function getStudentTrend(studentId: string) {
  const { data } = await axiosClient.get<{
    success: boolean;
    data: {
      totalMarks: number;
      createdAt: string;
    }[];
  }>(`/analytics/student/${studentId}/trend`);

  return data;
}

/**
 * Parent PDF report data
 * GET /api/analytics/student/:studentId/report
 */
export async function getStudentReportData(studentId: string) {
  const { data } = await axiosClient.get<{
    success: boolean;
    tests: StudentTestResult[];
  }>(`/analytics/student/${studentId}/report`);

  return data;
}

/* ======================================================
   BATCH & TEST ANALYTICS
====================================================== */

/**
 * Batch performance analytics
 * GET /api/analytics/batch/:testId
 */
export async function getBatchAnalytics(testId: string) {
  const { data } = await axiosClient.get<{
    success: boolean;
    data: {
      avgScore: number;
      maxScore: number;
      minScore: number;
    }[];
  }>(`/analytics/batch/${testId}`);

  return data;
}

/**
 * Question-wise difficulty analysis
 * GET /api/analytics/test/:testId/questions
 */
export async function getTestQuestionAnalytics(testId: string) {
  const { data } = await axiosClient.get(
    `/analytics/test/${testId}/questions`
  );

  return data;
}





/* ======================================================
   STUDENT – TEST SPECIFIC ANALYTICS
====================================================== */

/**
 * GET student result (marks, accuracy, normalized score)
 */
export async function getStudentTestResult(
  testId: string,
  studentId: string
): Promise<StudentTestResult | null> {
  const { data } = await axiosClient.get(
    `/analytics/student/test/${testId}/${studentId}`
  );
  return data.data;
}

/**
 * GET subject-wise marks (single test)
 */
export async function getStudentSubjectWiseMarks(
  testId: string,
  studentId: string
): Promise<SubjectWiseMarks> {
  const { data } = await axiosClient.get(
    `/analytics/student/${testId}/${studentId}/subjects`
  );
  return data.data?.subjectWiseMarks ?? {};
}

/* ======================================================
   TOPIC / DIFFICULTY / BLOOM’S ANALYTICS
====================================================== */

/**
 * GET subject → chapter → topic hierarchy
 * + difficulty mismatch
 * + Bloom’s taxonomy heatmap
 */
export async function getTestLearningMap(
  testId: string
): Promise<LearningMapResponse> {
  const { data } = await axiosClient.get(
    `/analytics/test/${testId}/learning-map`
  );
  return data.data;
}


export async function getStudentLearningMapAnalytics(
  testId: string,
  studentId: string
): Promise<LearningMapResponse> {
  const { data } = await axiosClient.get(
    `/analytics/test/${testId}/learning-map/student/${studentId}`
  );
  return data.data;
}

export const downloadStudentLearningMapPdf = async (
  testId: string,
  studentId: string
) => {
  return axiosClient.get(
    `/analytics/test/${testId}/student/${studentId}/learning-map/pdf`,
    {
      responseType: "blob",
    }
  );
};


/* ======================================================
   OPTIONAL (FUTURE READY)
====================================================== */

/**
 * Student-specific topic analytics (if you enable later)
 */
export async function getStudentTopicDifficultyAnalytics(
  testId: string,
  studentId: string
) {
  const { data } = await axiosClient.get(
    `/analytics/student/${testId}/${studentId}/topics-difficulty`
  );
  return data.data;
}




export interface EmailStudentReportResponse {
  success: boolean;
  message?: string;
}

export async function emailStudentAnalyticsPDF(
  testId: string,
  studentId: string
): Promise<EmailStudentReportResponse> {
  const { data } = await axiosClient.post(
    `/email/studentAnalytics`,
    {
      testId,
      studentId,
    }
  );

  return data;
}



export interface BulkEmailFailure {
  studentId: string;
  studentName: string;
  reason: string;
}

export interface EmailBulkStudentReportsResponse {
  success: boolean;
  total: number;
  sent: number;
  failed: number;
  failures: BulkEmailFailure[];
}

export async function emailBulkStudentAnalyticsPDF(
  testId: string,
  studentIds: string[]
): Promise<EmailBulkStudentReportsResponse> {
  const { data } = await axiosClient.post(
    `/email/test/bulkAnalytics`,
    {
      testId,
      studentIds,
    }
  );

  return data;
}
