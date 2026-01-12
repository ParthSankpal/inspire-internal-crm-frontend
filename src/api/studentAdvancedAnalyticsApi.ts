import { StudentSubjectAnalyticsResponse, StudentTopicAnalyticsResponse, StudentTopicCoverageResponse, StudentTopicDifficultyAnalyticsResponse, StudentTopicStrengthWeaknessResponse } from "@/features/analytics/studentAdvancedAnalytics.types";
import { StudentOverallAnalyticsResponse } from "@/features/analytics/studentOverall.types";
import { axiosClient } from "@/lib/apiClient";



/* ===========================
   OVERALL
=========================== */

export const getStudentOverallAnalytics = async (studentId: string) => {
  const { data } = await axiosClient.get<StudentOverallAnalyticsResponse>(
    `/advanceAnalytics/student/${studentId}/overall`
  );
  return data.data;
};

/* ===========================
   SUBJECT
=========================== */

export const getStudentSubjectAnalytics = async (studentId: string) => {
  const { data } = await axiosClient.get<StudentSubjectAnalyticsResponse>(
    `/advanceAnalytics/student/${studentId}/subjects`
  );
  return data.data;
};

/* ===========================
   TOPIC
=========================== */

export const getStudentTopicAnalytics = async (studentId: string) => {
  const { data } = await axiosClient.get<StudentTopicAnalyticsResponse>(
    `/advanceAnalytics/student/${studentId}/topics`
  );
  return data.data;
};

/* ===========================
   TOPIC × DIFFICULTY
=========================== */

export const getStudentTopicDifficultyAnalytics = async (
  studentId: string
) => {
  const { data } =
    await axiosClient.get<StudentTopicDifficultyAnalyticsResponse>(
      `/advanceAnalytics/student/${studentId}/topics-difficulty`
    );
  return data.data;
};

/* ===========================
   STRENGTH / WEAKNESS
=========================== */

export const getStudentTopicStrengthWeakness = async (
  studentId: string
) => {
  const { data } =
    await axiosClient.get<StudentTopicStrengthWeaknessResponse>(
      `/advanceAnalytics/student/${studentId}/topic-strength-weakness`
    );
  return data.data;
};



export const getStudentTopicCoverageAnalytics = async (
  studentId: string
) => {
  const { data } =
    await axiosClient.get<StudentTopicCoverageResponse>(
      `/advanceAnalytics/student/${studentId}/topic-coverage`
    );

  return data.data;
};