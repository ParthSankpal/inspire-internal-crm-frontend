import { Subject, ApiResponse } from "./studentOverall.types";

/* =============================
   SUBJECT-WISE ANALYTICS
============================= */

export interface StudentSubjectAnalytics {
  subject: Subject;

  attempted: number;
  correct: number;

  accuracy: number;        // 0–1
}

export type StudentSubjectAnalyticsResponse =
  ApiResponse<StudentSubjectAnalytics[]>;


/* =============================
   TOPIC-WISE ANALYTICS
============================= */

export interface StudentTopicAnalytics {
  subject: Subject;
  chapter: string;
  topic: string;

  attempted: number;
  correct: number;

  accuracy: number;        // 0–1
}

export type StudentTopicAnalyticsResponse =
  ApiResponse<StudentTopicAnalytics[]>;


/* =============================
   TOPIC × DIFFICULTY ANALYTICS
============================= */

export type DifficultyLevel = "Easy" | "Medium" | "Hard";

export interface StudentTopicDifficultyAnalytics {
  subject: Subject;
  chapter: string;
  topic: string;
  difficulty: DifficultyLevel;

  attempted: number;
  correct: number;

  accuracy: number;        // 0–1
}

export type StudentTopicDifficultyAnalyticsResponse =
  ApiResponse<StudentTopicDifficultyAnalytics[]>;


/* =============================
   TOPIC STRENGTH / WEAKNESS
============================= */

export interface StudentTopicStrengthWeakness {
  subject: Subject;
  chapter: string;
  topic: string;

  accuracy: number;

  level: "Strong" | "Weak";
}

export type StudentTopicStrengthWeaknessResponse =
  ApiResponse<{
    strengths: StudentTopicStrengthWeakness[];
    weaknesses: StudentTopicStrengthWeakness[];
  }>;


  
export interface StudentTopicCoverage {
  subject: Subject;
  chapter: string;
  topic: string;
  difficulty: DifficultyLevel;

  totalQuestionsAsked: number;
  attempted: number;
  correct: number;
  accuracy: number; // 0–1
}

export type StudentTopicCoverageResponse =
  ApiResponse<StudentTopicCoverage[]>;