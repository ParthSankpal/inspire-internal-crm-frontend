import { axiosClient } from "@/lib/apiClient";


export const getSubjects = async () => {
  const { data } = await axiosClient.get("/syllabus-seed/subjects");
  return data;
};

export const getChapters = async (subject: string) => {
  const { data } = await axiosClient.get("/syllabus-seed/chapters", {
    params: { subject },
  });
  return data;
};

export const getTopics = async (subject: string, chapter: string) => {
  const { data } = await axiosClient.get("/syllabus-seed/topics", {
    params: { subject, chapter },
  });
  return data;
};
