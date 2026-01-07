export interface StudentTestAnalytics {
  totalMarks: number;
  correctCount: number;
  incorrectCount: number;
  notAttemptedCount: number;
  subjectWiseMarks: Record<string, number>;
  createdAt: string;
  rank?: number;
  test: {
    _id: string;
    name: string;
    maxMarks: number;
    date: string;
  };
}

export interface StudentAnalyticsResponse {
  success: boolean;
  summary: {
    totalTests: number;
    totalMarks: number;
    avgMarks: number;
  };
  tests: StudentTestAnalytics[];
}