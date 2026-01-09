import { PaginationMeta } from "../pagination";

export type Subject =
  | "Physics"
  | "Chemistry"
  | "Maths"
  | "Biology";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

/* =============================
   SUMMARY
============================= */

export interface StudentTestParticipationSummary {
  totalTestsConducted: number;
  testsAppeared: number;
  testsAbsent: number;
  attendancePercentage: number;
}

/* =============================
   TIMELINE
============================= */

export interface StudentTestTimelineItem {
  testId: string;
  testName: string;
  date: Date;

  totalMarks: number;
  normalizedScore: number; // %
  accuracy: number;        // 0–1

  subjectWiseMarks: Record<Subject, number>;
}

export type StudentTestTimeline = StudentTestTimelineItem[];

/* =============================
   SUBJECT AGGREGATION
============================= */

export interface StudentSubjectPerformance {
  subject: Subject;
  avgMarks: number;
}

export type StudentSubjectPerformanceList =
  StudentSubjectPerformance[];

/* =============================
   STRENGTH / WEAKNESS
============================= */

export interface StudentStrengthWeakness {
  strongest: StudentSubjectPerformance | null;
  weakest: StudentSubjectPerformance | null;
}

/* =============================
   OVERALL ANALYTICS
============================= */

export interface StudentOverallAnalytics {
  summary: StudentTestParticipationSummary;
  timeline: StudentTestTimeline;
  subjects: StudentSubjectPerformanceList;
  strengthWeakness: StudentStrengthWeakness;
}

export type StudentOverallAnalyticsResponse =
  ApiResponse<StudentOverallAnalytics>;



  /* =============================
   SINGLE ROW (DATATABLE)
============================= */

export interface StudentTestHistoryRow {
  _id?: string;
  testId: string;
  testName: string;
  date: string;            // ISO string (API-friendly)

  attempts: number;
  normalizedScore: number; // %
  accuracy: number;        // 0–1
}


/* =============================
   API RESPONSE
============================= */

export interface StudentTestHistoryResponse {
  success: boolean;
  data: StudentTestHistoryRow[];
  pagination: PaginationMeta;
}
