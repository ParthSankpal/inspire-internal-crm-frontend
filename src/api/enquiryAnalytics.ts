import { axiosClient } from "@/lib/apiClient";

/* ======================
   TYPES
====================== */

export interface EnquiryFunnelAnalytics {
  totalEnquiries: number;
  admitted: number;
  lost: number;
  active: number;
  conversionRate: number;
}

export interface SourceWiseAnalytics {
  source: string;
  enquiries: number;
  admissions: number;
  conversionRate: number;
}

export interface SchoolWiseAnalytics {
  schoolId: string;
  schoolName: string;
  enquiries: number;
  admissions: number;
  conversionRate: number;
}

export interface LostReasonAnalytics {
  reason: string;
  count: number;
}

export interface CounselorWiseAnalytics {
  counselorId: string;
  counselorName: string;
  enquiries: number;
  admissions: number;
  conversionRate: number;
}

export interface SchoolAreaWiseAnalytics {
  area: "urban" | "semi_urban" | "rural";
  enquiries: number;
  admissions: number;
  conversionRate: number;
}


export interface SchoolMediumWiseAnalytics {
  medium: "CBSE" | "ICSE" | "MARATHI" | "SEMI-ENGLISH" | "ENGLISH" | "IB/IGCSE";
  enquiries: number;
  admissions: number;
  conversionRate: number;
}

export interface EnquiryQualityAnalytics {
  quality: "high" | "medium" | "low";
  enquiries: number;
  admissions: number;
  conversionRate: number;
}

export interface PriceSensitivityAnalytics {
  priceSensitive: boolean;
  enquiries: number;
  admissions: number;
  conversionRate: number;
}

export interface FollowUpOutcomeAnalytics {
  outcome:
    | "interested"
    | "call_back"
    | "demo_attended"
    | "test_given"
    | "not_interested";
  count: number;
}

/* ======================
   API CALLS
====================== */

export const getEnquiryFunnelAnalytics = async () => {
  const { data } = await axiosClient.get(
    "/enquiries/analytics/funnel"
  );
  return data.data as EnquiryFunnelAnalytics;
};

export const getSourceWiseAnalytics = async () => {
  const { data } = await axiosClient.get(
    "/enquiries/analytics/source-wise"
  );
  return data.data as SourceWiseAnalytics[];
};

export const getSchoolWiseAnalytics = async () => {
  const { data } = await axiosClient.get(
    "/enquiries/analytics/school-wise"
  );
  return data.data as SchoolWiseAnalytics[];
};

export const getLostReasonAnalytics = async () => {
  const { data } = await axiosClient.get(
    "/enquiries/analytics/lost-reasons"
  );
  return data.data as LostReasonAnalytics[];
};

export const getCounselorWiseAnalytics = async () => {
  const { data } = await axiosClient.get(
    "/enquiries/analytics/counselor-wise"
  );
  return data.data as CounselorWiseAnalytics[];
};


export const getSchoolAreaWiseAnalytics = async () => {
  const { data } = await axiosClient.get(
    "/enquiries/analytics/school-area-wise"
  );
  return data.data as SchoolAreaWiseAnalytics[];
};


export const getSchoolMediumWiseAnalytics = async () => {
  const { data } = await axiosClient.get(
    "/enquiries/analytics/school-medium-wise"
  );
  return data.data as SchoolMediumWiseAnalytics[];
};


export const getEnquiryQualityAnalytics = async () => {
  const { data } = await axiosClient.get(
    "/enquiries/analytics/enquiry-quality"
  );
  return data.data as EnquiryQualityAnalytics[];
};

export const getPriceSensitivityAnalytics = async () => {
  const { data } = await axiosClient.get(
    "/enquiries/analytics/price-sensitivity"
  );
  return data.data as PriceSensitivityAnalytics[];
};


export const getFollowUpOutcomeAnalytics = async () => {
  const { data } = await axiosClient.get(
    "/enquiries/analytics/followup-outcomes"
  );
  return data.data as FollowUpOutcomeAnalytics[];
};
