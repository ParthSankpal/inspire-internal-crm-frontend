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
