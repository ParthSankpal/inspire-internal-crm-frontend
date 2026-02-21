import { School, SchoolDetailsResponse } from "@/features/schools/types";
import { axiosClient } from "@/lib/apiClient";


/* =========================
   GET ALL SCHOOLS
========================= */
export async function getAllSchools(): Promise<School[]> {
  const { data } = await axiosClient.get("/schools");
  return data.data; // because backend returns { success, data }
}

/* =========================
   GET SINGLE SCHOOL
========================= */
export async function getSchoolDetails(
  id: string
): Promise<SchoolDetailsResponse> {
  const { data } = await axiosClient.get(`/schools/${id}`);
  return data.data;
}

/* =========================
   CREATE SCHOOL
========================= */
export async function createSchool(
  payload: Partial<School>
): Promise<School> {
  const { data } = await axiosClient.post("/schools", payload);
  return data.data;
}

/* =========================
   UPDATE SCHOOL
========================= */
export async function updateSchool(
  id: string,
  payload: Partial<School>
): Promise<School> {
  const { data } = await axiosClient.put(`/schools/${id}`, payload);
  return data.data;
}

/* =========================
   DELETE SCHOOL
========================= */
export async function deleteSchool(
  id: string
): Promise<{ message: string }> {
  const { data } = await axiosClient.delete(`/schools/${id}`);
  return data;
}