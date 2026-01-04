
// import { z } from "zod";


// export type ExamType = "JEE" | "NEET" | "Foundation";
// export type TestType =
//   | "Full Length"
//   | "Subject Test"
//   | "Part Test"
//   | "Topic Test";

// export type TestStatus = "Draft" | "Published" | "Completed";

// export interface Test {
//   _id?: string;
//   name: string;
//   examType: ExamType;
//   testType: TestType;

//   batch: string;
//   date: string; // ISO
//   durationMinutes: number;

//   subjectsIncluded: (
//     | "Physics"
//     | "Chemistry"
//     | "Maths"
//     | "Biology"
//     | "Mental Ability"
//   )[];

//   totalMarks: number;
//   status: TestStatus;

//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface TestResponse {
//   success: boolean;
//   data: Test;
// }



// export const testSchema = z.object({
//   name: z.string().min(1, "Test name required"),

//   examType: z.enum(["JEE", "NEET", "Foundation"]),

//   testType: z.enum([
//     "Full Length",
//     "Subject Test",
//     "Part Test",
//     "Topic Test",
//   ]),

//   batch: z.string().min(1, "Batch required"),

//   date: z.string().min(1, "Date required"),

//   durationMinutes: z.number().min(1, "Duration required"),

//   subjectsIncluded: z.array(
//     z.enum([
//       "Physics",
//       "Chemistry",
//       "Maths",
//       "Biology",
//       "Mental Ability",
//     ])
//   ).min(1, "Select at least one subject"),

//   totalMarks: z.number().min(1, "Total marks required"),
// });

// export type TestFormData = z.infer<typeof testSchema>;


// export const testQuestionSchema = z.object({
//   questions: z.array(
//     z.object({
//       questionId: z.string().min(1),
//       questionNo: z.number().min(1),
//     })
//   ).min(1, "At least one question required"),
// });

// export type AddQuestionsFormData = z.infer<typeof testQuestionSchema>;



import { z } from "zod";

/* ----------------------------------------------------
   Enums
---------------------------------------------------- */

export type ExamType = "JEE" | "NEET" | "Foundation";

export type TestType =
  | "Full Length"
  | "Subject Test"
  | "Part Test"
  | "Topic Test";

export type TestStatus = "Draft" | "Published" | "Completed";

export type Subject = "Physics" | "Chemistry" | "Maths" | "Biology";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type CognitiveType = "Conceptual" | "Application" | "Mixed";

/* ----------------------------------------------------
   Question Config (embedded in Test)
---------------------------------------------------- */

export interface QuestionConfig {
  questionNo: number;
  subject: Subject;
  classLevel: 8 | 9 | 10 | 11 | 12;
  chapter: string;
  topic: string;

  cognitiveType: CognitiveType;
  difficulty: Difficulty;

  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };

  correctOption: "A" | "B" | "C" | "D";
  marks: number;
  negativeMarks: number;
}

/* ----------------------------------------------------
   Test Interface
---------------------------------------------------- */

export interface Test {
  _id?: string;
  name: string;
  examType: ExamType;
  testType: TestType;

  batch: string;
  date: string; // ISO string
  durationMinutes: number;

  subjectsIncluded: (
    | "Physics"
    | "Chemistry"
    | "Maths"
    | "Biology"
    | "Mental Ability"
  )[];

  totalMarks: number;
  status: TestStatus;

  /** 🔥 NEW: Manual question configuration */
  questionConfig?: QuestionConfig[];

  createdAt?: string;
  updatedAt?: string;
}

/* ----------------------------------------------------
   API Response
---------------------------------------------------- */

export interface TestResponse {
  success: boolean;
  data: Test;
}

/* ----------------------------------------------------
   Test Creation Schema
---------------------------------------------------- */

export const testSchema = z.object({
  name: z.string().min(1, "Test name required"),

  examType: z.enum(["JEE", "NEET", "Foundation"]),

  testType: z.enum([
    "Full Length",
    "Subject Test",
    "Part Test",
    "Topic Test",
  ]),

  batch: z.string().min(1, "Batch required"),

  date: z.string().min(1, "Date required"),

  durationMinutes: z.number().min(1, "Duration required"),

  subjectsIncluded: z
    .array(
      z.enum([
        "Physics",
        "Chemistry",
        "Maths",
        "Biology",
        "Mental Ability",
      ])
    )
    .min(1, "Select at least one subject"),

  totalMarks: z.number().min(1, "Total marks required"),
});

export type TestFormData = z.infer<typeof testSchema>;


export interface ImportTestResultsResponse {
  success: boolean;
  total: number;
  verified: number;
  rejected: number;
  message: string;
}