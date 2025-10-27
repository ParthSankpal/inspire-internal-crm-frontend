import { Student, StudentFormData } from "@/features/students/types";
import { axiosClient } from "@/lib/apiClient";

interface GetStudentsParams {
  page?: number;
  limit?: number;
  search?: string;
  batchId?: string;
  status?: string;
  isArchived?: boolean;
}

export async function getAllStudents(params: GetStudentsParams = {}): Promise<{
  data: Student[];
  page: number;
  totalPages: number;
  totalRecords: number;
}> {
  const { page = 1, limit = 10, search = "", batchId = "", status = "", isArchived = false } = params;

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
    status,
    batchId,
    isArchived: String(isArchived),
  });

  const { data } = await axiosClient.get(`/students?${query.toString()}`);
  return data;
}

export async function getStudentById(id: string): Promise<Student> {
  const { data } = await axiosClient.get<Student>(`/students/${id}`);
  return data;
}

export async function createStudent(student: StudentFormData): Promise<Student> {
  const { data } = await axiosClient.post<Student>("/students/create", student);
  return data;
}

export async function updateStudent(id: string, updates: StudentFormData): Promise<Student> {
  const { data } = await axiosClient.put<Student>(`/students/${id}`, updates);
  return data;
}


export async function deleteStudent(id: string): Promise<{ message: string }> {
  const { data } = await axiosClient.delete(`/students/${id}`);
  return data;
}

export async function restoreStudent(id: string): Promise<{ message: string }> {
  const { data } = await axiosClient.patch(`/students/${id}/restore`);
  return data;
}
