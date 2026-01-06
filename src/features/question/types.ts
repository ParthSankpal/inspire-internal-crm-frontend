
import { z } from "zod";

export type Subject = "Physics" | "Chemistry" | "Maths" | "Biology";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type CognitiveType = "Conceptual" | "Application" | "Mixed";

export interface Question {
  _id?: string;
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

  createdAt?: string;
}



export const questionSchema = z.object({
  subject: z.enum(["Physics", "Chemistry", "Maths", "Biology"]),
  classLevel: z.union([
    z.literal(8),
    z.literal(9),
    z.literal(10),
    z.literal(11),
    z.literal(12),
  ]),

  chapter: z.string().min(1, "Chapter is required"),
  topic: z.string().min(1, "Topic is required"),

  cognitiveType: z.enum(["Conceptual", "Application", "Mixed"]),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),

  options: z.object({
    A: z.string().min(1),
    B: z.string().min(1),
    C: z.string().min(1),
    D: z.string().min(1),
  }),

  correctOption: z.enum(["A", "B", "C", "D"]),
  marks: z.number().min(1).default(4),
  negativeMarks: z.number().min(-10).max(0).default(-1),

});

export type QuestionFormData = z.infer<typeof questionSchema>;
