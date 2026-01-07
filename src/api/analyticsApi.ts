import { axiosClient } from "@/lib/apiClient";

/* ======================================================
   TYPES
====================================================== */

export interface SubjectWiseMarks {
  [subject: string]: number;
}

export interface StudentTestResult {
  _id: string;
  totalMarks: number;
  correctCount: number;
  incorrectCount: number;
  notAttemptedCount: number;
  subjectWiseMarks: SubjectWiseMarks;
  createdAt: string;
  rank?: number;
  test?: {
    _id: string;
    name: string;
    maxMarks: number;
    date: string;
  };
}

export interface StudentAnalyticsSummary {
  totalTests: number;
  totalMarks: number;
  avgMarks: number;
}

/* ======================================================
   STUDENT – TEST SPECIFIC ANALYTICS
====================================================== */

/**
 * Single test performance of a student
 * GET /api/analytics/student/:testId/:studentId
 */
export async function getStudentResult(
  testId: string,
  studentId: string | number
) {
  const { data } = await axiosClient.get<{
    success: boolean;
    data: StudentTestResult | null;
  }>(`/analytics/student/${testId}/${studentId}`);

  return data;
}

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
