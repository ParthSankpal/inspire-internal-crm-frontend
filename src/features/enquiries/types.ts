import { z } from "zod";

export type EnquiryStatus = "new" | "counseling_done" | "admitted" | "dropped";

export interface ParentNames {
  fatherName?: string;
  fatherOccupation?: string;
  motherName?: string;
  motherOccupation?: string;
}

export interface Reminder {
  _id?: string;
  date: string;
  message?: string;
  completed?: boolean;
}

export interface Enquiry {
  _id?: string;
  studentName: string;
  phoneNo: string;
  email?: string;
  schoolName: string;
  parentNames: ParentNames;
  targetExams: string[];
  enquiryDate: string;
  status: EnquiryStatus;
  counselor?: { id?: string; name?: string };
  note?: string;
  reference?: string;
  referenceContact?: string;
  address?: string;
  standard?: string;
  reminders?: Reminder[];
}


export const enquirySchema = z.object({
  studentName: z.string().min(1, "Student name is required"),
  phoneNo: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  schoolName: z.string().min(1, "School is required"),
  standard: z.string().optional(),

  parentNames: z.object({
    fatherName: z.string().optional(),
    fatherOccupation: z.string().optional(),
    motherName: z.string().optional(),
    motherOccupation: z.string().optional(),
  }),

  targetExams: z.array(z.string().min(1)).min(1, "Select at least one exam"),
  status: z.enum(["new", "counseling_done", "admitted", "dropped"]),

  counselor: z.object({
    id: z.string().optional(),
    name: z.string().optional(),
  }),

  reference: z.string().optional(),
  referenceContact: z.string().optional(),
  address: z.string().optional(),
  note: z.string().optional(),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;

export const reminderSchema = z.object({
  date: z.string().min(1, "Date is required"),
  message: z.string().min(1, "Message is required"),
});

export type ReminderFormData = z.infer<typeof reminderSchema>;