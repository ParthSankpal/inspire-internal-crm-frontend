
export interface School {
  _id: string;
  name: string;

  area: "urban" | "semi_urban" | "rural";
  type: "private" | "govt" | "semi_govt";
  category: "top" | "mid" | "local";
  

  contactPerson?: string;
  contactNumber?: string;
  address?: string;

  isActive: boolean;

  studentCount?: number;
  enquiryCount?: number;
  conversionRate?: number | string;

  createdAt: string;
  updatedAt: string;
}

/* =========================
   SCHOOL DETAILS RESPONSE
========================= */

export interface SchoolStudent {
  _id: string;
  firstName: string;
  lastName: string;
  studentId: string;
  status: string;
}

export interface SchoolEnquiry {
  _id: string;
  studentName: string;
  phoneNo: string;
  status: string;
  enquiryDate: string;
}

export interface SchoolDetailsResponse {
  school: School;
  students: SchoolStudent[];
  enquiries: SchoolEnquiry[];
  studentCount: number;
  enquiryCount: number;
}