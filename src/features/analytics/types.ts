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


export interface DifficultyStats {
  total: number;
  attempted: number;
  correct: number;
}


export interface TopicAnalytics {
  totalQuestions: number;
  attemptedQuestions: number;
  correctQuestions: number;
  accuracy: number;   // 0 → 1
  coverage: number;   // 0 → 1
  cognitiveType: string;

  difficultyStats: {
    Easy: DifficultyStats;
    Medium: DifficultyStats;
    Hard: DifficultyStats;
  };
}


export type LearningHierarchy = Record<
  string, // subject
  Record<
    string, // chapter
    Record<string, TopicAnalytics> // topic
  >
>;


export interface DifficultyMismatch {
  subject: string;
  chapter: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  accuracy: number;
  issue: string;
}


export interface BloomsHeatmapLevel {
  difficulty: "Easy" | "Medium" | "Hard";
  totalQuestions: number;
  attempted: number;
  accuracy: number; // 0 → 1
  coverage: number; // attempted / totalQuestions
}

export interface BloomsHeatmapRow {
  cognitiveType: string;
  levels: BloomsHeatmapLevel[];
}

export interface LearningMapResponse {
  hierarchy: LearningHierarchy;
  difficultyMismatch: DifficultyMismatch[];
  bloomsHeatmap: BloomsHeatmapRow[];
}


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
