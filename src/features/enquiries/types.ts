import { z } from "zod";

/* ======================
   ENUMS
====================== */

export type EnquiryStatus =
  | "new"
  | "follow_up"
  | "counseling_done"
  | "admitted"
  | "lost";

export interface ParentNames {
  fatherName?: string;
  fatherOccupation?: string;
  motherName?: string;
  motherOccupation?: string;
}


export type EnquirySourceType =
  | "school_visit"
  | "seminar"
  | "ktse"
  | "walk_in"
  | "student_referral"
  | "parent_referral"
  | "social_media"
  | "whatsapp"
  | "website"
  | "teacher_reference"
  | "digital_banner"
  | "paper_leaflet"
  | "radio_advertisement"
  | "calling"
  | "news_paper";
/* ======================
   SUB TYPES
====================== */

export interface FollowUp {
  follow_up_date: string;
  mode: "call" | "whatsapp" | "in_person";
  outcome:
  | "interested"
  | "call_back"
  | "demo_attended"
  | "test_given"
  | "not_interested";
  note?: string;
  nextFollowUpDate?: string;
}

export interface AdmissionInfo {
  admissionDate: string;
  program: string;
  feesFinalized: number;
  paymentMode: "full" | "installment";
  discountPercent?: number;
}

export interface LostReason {
  reason:
  | "fees"
  | "distance"
  | "school_pressure"
  | "joined_competitor"
  | "not_serious"
  | "parents_not_convinced"
  | "plan_changed";
  note?: string;
}

/* ======================
   MAIN ENQUIRY TYPE
====================== */

export interface Enquiry {
  _id?: string;

  studentName: string;
  phoneNo: string;
  email?: string;
  standard: string;
  parentNames: ParentNames;
  targetExams: string[];

  school: {
    name: string;
    area?: "urban" | "semi_urban" | "rural";
    type?: "private" | "govt" | "semi_govt";
    category?: "top" | "mid" | "local";
    medium?: "CBSE" | "SEMI-ENGLISH" | "ENGLISH" | "MARATHI" | "ICSE" | "IB/IGCSE";
  };

  source: {
    type: EnquirySourceType;
    sourceSchoolName?: string;
    referenceName?: string;
    referenceContact?: string;
  };

  enquiryQuality: "high" | "medium" | "low";
  academicLevel?: "strong" | "average" | "weak";
  priceSensitivity?: boolean;

  status: EnquiryStatus;

  counselor?: {
    id?: string;
    name?: string;
  };
  reference?: string;
  referenceContact?: string;
  followUps?: FollowUp[];
  admission?: AdmissionInfo;
  lostReason?: LostReason;

  enquiryDate?: string;
  createdAt?: string;
}

export type FollowUpFormData = {
  mode: "call" | "whatsapp" | "in_person";
  outcome:
  | "interested"
  | "call_back"
  | "demo_attended"
  | "test_given"
  | "not_interested";
  note?: string;
  nextFollowUpDate?: string;
  follow_up_date:Date;
};

export type AdmissionFormData = {
  program: string;
  feesFinalized: number;
  paymentMode: "full" | "installment";
  discountPercent?: number;
};

export type LostFormData = {
  reason:
  | "fees"
  | "distance"
  | "school_pressure"
  | "joined_competitor"
  | "not_serious"
  | "parents_not_convinced"
  | "plan_changed";
  note?: string;
};


const enquirySourceEnum = z.enum([
  "school_visit",
  "seminar",
  "ktse",
  "walk_in",
  "student_referral",
  "parent_referral",
  "social_media",
  "whatsapp",
  "website",
  "teacher_reference",
  "digital_banner",
  "paper_leaflet",
  "radio_advertisement",
  "calling",
  "news_paper"
]);



export const enquirySchema = z.object({
  studentName: z
    .string()
    .trim()
    .min(1, "Student name is required"),

  phoneNo: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10}$/, "Enter valid 10 digit phone number"),

  email: z
    .string()
    .email("Enter valid email address")
    .optional()
    .or(z.literal("")),

  standard: z
    .string()
    .trim()
    .min(1, "Standard is required"),

  school: z.object({
    name: z
      .string()
      .trim()
      .min(1, "School name is required"),

    area: z
      .enum(["urban", "semi_urban", "rural"])
      .refine((val) => !!val, {
        message: "School area is required",
      }),

    type: z
      .enum(["private", "govt", "semi_govt"])
      .refine((val) => !!val, {
        message: "School type is required",
      }),

    category: z
      .enum(["top", "mid", "local"])
      .refine((val) => !!val, {
        message: "School category is required",
      }),

    medium: z
      .enum([
        "CBSE",
        "SEMI-ENGLISH",
        "ENGLISH",
        "MARATHI",
        "ICSE",
        "IB/IGCSE",
      ])
      .refine((val) => !!val, {
        message: "School medium is required",
      }),
  }),

  parentNames: z.object({
    fatherName: z.string().optional(),
    fatherOccupation: z.string().optional(),
    motherName: z.string().optional(),
    motherOccupation: z.string().optional(),
  }),

  targetExams: z
    .array(z.string())
    .min(1, "Select at least one target exam"),

  source: z.object({
    type: z
      .enum([
        "school_visit",
        "seminar",
        "ktse",
        "walk_in",
        "student_referral",
        "parent_referral",
        "social_media",
        "whatsapp",
        "website",
        "teacher_reference",
        "digital_banner",
        "paper_leaflet",
        "radio_advertisement",
        "calling",
        "news_paper",
      ])
      .refine((val) => !!val, {
        message: "Source is required",
      }),

    referenceName: z.string().optional(),
    referenceContact: z.string().optional(),
  }),

  enquiryQuality: z
    .enum(["high", "medium", "low"])
    .default("medium"),

  counselor: z.object({
    id: z
      .string()
      .trim()
      .min(1, "Counselor is required"),
    name: z.string().optional(),
  }),

  reference: z.string().optional(),
  referenceContact: z.string().optional(),

  status: z
    .enum([
      "new",
      "follow_up",
      "counseling_done",
      "admitted",
      "lost",
    ])
    .refine((val) => !!val, {
      message: "Status is required",
    }),
});


export type EnquiryFormData = z.infer<typeof enquirySchema>;



export const schoolOptions = [
  { value: "Shantiniketan", label: "Shantiniketan" },
  { value: "Poddar International School", label: "Poddar International School" },
  { value: "Nagojirao Pathankar High School", label: "Nagojirao Pathankar High School" },
  { value: "Don Bosco", label: "Don Bosco" },
  { value: "Siddheswar High School", label: "Siddheswar High School" },
  { value: "Mahaveer School", label: "Mahaveer School" },
  { value: "Radhabai Shinde English Medium School", label: "Radhabai Shinde English Medium School" },
  { value: "Mitiya English Medium School", label: "Mitiya English Medium School" },
  { value: "Usharaje High School", label: "Usharaje High School" },
  { value: "Vimla Goenka English Medium School", label: "Vimla Goenka English Medium School" },
  { value: "New Model English School", label: "New Model English School" },
  { value: "Holyden English Medium School, Kagal", label: "Holyden English Medium School, Kagal" },
  { value: "V. J. Deshmukh High School", label: "V. J. Deshmukh High School" },
  { value: "Chinchwad High School", label: "Chinchwad High School" },
  { value: "SGI", label: "SGI" },
  { value: "Vilasrao Kore International School", label: "Vilasrao Kore International School" },
  { value: "Don Bosco High School & Jr. College", label: "Don Bosco High School & Jr. College" },
  { value: "Mai Madhavrao Bagal High School", label: "Mai Madhavrao Bagal High School" },
  { value: "Vivekanand College", label: "Vivekanand College" },
  { value: "Warana Vidyalay Warnanagar", label: "Warana Vidyalay Warnanagar" },
  { value: "Karveer High School", label: "Karveer High School" },
  { value: "S. M. Lohiya", label: "S. M. Lohiya" },
  { value: "Maisaheb Bavdekar Vidyalaya", label: "Maisaheb Bavdekar Vidyalaya" },
  { value: "Xavier High School", label: "Xavier High School" },
  { value: "Yashvant International English Academy", label: "Yashvant International English Academy" },
  { value: "Maharashtra High School", label: "Maharashtra High School" }
];
