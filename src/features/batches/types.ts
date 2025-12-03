import { z } from "zod";

// ✅ Interface matching backend schema
export interface Batch {
  _id?: string;
  name: string;
  startYear: number;
  endYear?: number;
  durationYears: number;
  class: string;  
  totalStudents?: number;
  studentTargets?: {
    jee: number;
    neet: number;
    cet: number;
    foundation: number;
  };
  remarks?: string;
  createdAt?: string;
  updatedAt?: string;
}


// ✅ Form Schema
export const batchSchema = z.object({
  name: z.string().min(2, "Batch name is required"),
  startYear: z.preprocess((v) => Number(v), z.number().min(2000, "Invalid year")),
  durationYears: z.preprocess((v) => Number(v), z.number().min(1, "Minimum 1 year")),

  class: z
    .string()
    .min(1, "Class is required")
    .regex(/^\d{1,2}$/, "Class must be 1 or 2 digits (e.g., 8 or 08)"),

  remarks: z.string().optional(),
});

export type BatchFormData = z.infer<typeof batchSchema>;

