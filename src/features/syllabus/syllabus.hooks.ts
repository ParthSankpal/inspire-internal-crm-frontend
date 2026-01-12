import { getChapters, getSubjects, getTopics } from "@/api/syllabusApi";
import { useQuery } from "@tanstack/react-query";

export const useSubjects = () =>
  useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
    staleTime: Infinity,
  });

export const useChapters = (subject?: string) =>
  useQuery({
    queryKey: ["chapters", subject],
    queryFn: () => getChapters(subject!),
    enabled: !!subject,
    staleTime: Infinity,
  });

export const useTopics = (subject?: string, chapter?: string) =>
  useQuery({
    queryKey: ["topics", subject, chapter],
    queryFn: () => getTopics(subject!, chapter!),
    enabled: !!subject && !!chapter,
    staleTime: Infinity,
  });
