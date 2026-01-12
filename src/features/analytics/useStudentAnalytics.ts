
import { getStudentSubjectAnalytics, getStudentTopicAnalytics, getStudentTopicCoverageAnalytics, getStudentTopicDifficultyAnalytics, getStudentTopicStrengthWeakness } from "@/api/studentAdvancedAnalyticsApi";
import { getStudentOverallAnalytics } from "@/api/studentOverallAnalytics";
import { useQuery } from "@tanstack/react-query";


export const useStudentOverall = (studentId?: string) =>
  useQuery({
    queryKey: ["student-overall", studentId],
    queryFn: () => getStudentOverallAnalytics(studentId!),
    enabled: !!studentId,
  });

export const useStudentSubjects = (studentId?: string) =>
  useQuery({
    queryKey: ["student-subjects", studentId],
    queryFn: () => getStudentSubjectAnalytics(studentId!),
    enabled: !!studentId,
  });

export const useStudentTopics = (studentId?: string) =>
  useQuery({
    queryKey: ["student-topics", studentId],
    queryFn: () => getStudentTopicAnalytics(studentId!),
    enabled: !!studentId,
  });

export const useStudentTopicDifficulty = (studentId?: string) =>
  useQuery({
    queryKey: ["student-topic-difficulty", studentId],
    queryFn: () => getStudentTopicDifficultyAnalytics(studentId!),
    enabled: !!studentId,
  });

export const useStudentStrengthWeakness = (studentId?: string) =>
  useQuery({
    queryKey: ["student-strength-weakness", studentId],
    queryFn: () => getStudentTopicStrengthWeakness(studentId!),
    enabled: !!studentId,
  });


  export const useStudentTopicCoverage = (studentId?: string) =>
  useQuery({
    queryKey: ["student-topic-coverage", studentId],
    queryFn: () => getStudentTopicCoverageAnalytics(studentId!),
    enabled: !!studentId,
  });