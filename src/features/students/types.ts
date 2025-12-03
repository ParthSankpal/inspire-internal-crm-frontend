// src/features/students/types.ts
import { z } from "zod";

export type StudentStatus = "Active" | "Left" | "Completed" | "Hold";
export type DiscountType = "None" | "Onetime" | "Installments";
export type InstallmentStatus = "Pending" | "Paid" | "Overdue";

export interface Installment {
  installmentNo: number;
  dueDate: Date; // ISO date (YYYY-MM-DD)
  amount: number;
  paidDate: Date;
  paidAmount: number;
  pendingAmount: number;
  status: InstallmentStatus;
}

export interface Fees {
  baseFees: number;
  discountType: DiscountType;
  discountValue: number;
  finalFees: number;
  installments: Installment[];
}

export interface Student {
  _id?: string;
  studentId?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  dob: string; // ISO date string in frontend
  aadhaarNo?: string;

  contact: {
    email?: string;
    phone: string;
  };

  parent: {
    fatherName: string;
    motherName: string;
    fatherPhone?: string;
    motherPhone?: string;
    occupation?: string;
  };

  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
  };

  academicInfo: {
    schoolName: string;
    grade10Marks?: string;
    grade10PassingYear?: string;
  };

  course: string;
  batch?: { _id?: string; name?: string };
  targetExam: "IIT JEE" | "NEET" | "MHT-CET" | "Foundation" | "Other";
  admissionDate: string; // ISO date
  status: StudentStatus;
  remarks?: string;

  fees: Fees;

  createdAt?: string;
  updatedAt?: string;
}

export interface StudentResponse {
  success: boolean;
  data: Student;
}

/**
 * Zod Schema for form validation
 */
const installmentSchema = z.object({
  installmentNo: z.number().min(1),
  dueDate: z.string().min(1, "Due date is required"),
  amount: z.number().min(1, "Amount is required"),
  status: z.enum(["Pending", "Paid", "Overdue"]),
});

export const studentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  dob: z.string().min(1, "Date of birth is required"),
  aadhaarNo: z.string().optional(),

  contact: z.object({
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
  }),

  parent: z.object({
    fatherName: z.string().min(1, "Father name required"),
    motherName: z.string().min(1, "Mother name required"),
    fatherPhone: z.string().optional(),
    motherPhone: z.string().optional(),
    occupation: z.string().optional(),
  }),

  address: z.object({
    line1: z.string().min(1, "Address line 1 is required"),
    line2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().min(1, "Pincode is required"),
  }),

  academicInfo: z.object({
    schoolName: z.string().min(1, "School name required"),
    grade10Marks: z.string().optional(),
    grade10PassingYear: z.string().optional(),
  }),

  course: z.string().min(1, "Course is required"),
  batch: z.string().min(1, "Batch is required"),
  targetExam: z.enum(["IIT JEE", "NEET", "MHT-CET", "Foundation", "Other"]),
  admissionDate: z.string().min(1, "Admission date is required"),
  status: z.enum(["Active", "Left", "Completed", "Hold"]),
  remarks: z.string().optional(),

  fees: z.object({
    baseFees: z.number().min(1, "Base fees required"),

    discountValue: z.preprocess((v) => Number(v) || 0, z.number()),
    finalFees: z.preprocess((v) => Number(v) || 0, z.number().min(0, "Final fees required")),

    discountType: z.enum(["None", "Onetime", "Installments"]),

    installments: z.array(installmentSchema).optional().default([]),
  }),
});

export type StudentFormData = z.infer<typeof studentSchema>;
