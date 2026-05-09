import { PaginatedResponse } from "@/features/pagination";
import { Student, StudentFormData, StudentResponse } from "@/features/students/types";
import { axiosClient } from "@/lib/apiClient";


interface GetStudentsParams {
  page?: number;
  limit?: number;
  search?: string;
  batchId?: string;
  status?: string;
  isArchived?: boolean;
}

export async function getAllStudents(
  params: GetStudentsParams = {}
): Promise<PaginatedResponse<Student>> {
  const {
    page = 1,
    limit = 10,
    search = "",
    batchId = "",
    status = "",
    isArchived = false,
  } = params;

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search,
    status,
    batchId,
    isArchived: String(isArchived),
  });

  const { data } = await axiosClient.get<PaginatedResponse<Student>>(`/students?${query}`);
  return data;
}

export async function getStudentById(id: string): Promise<Student> {
  const { data } = await axiosClient.get<StudentResponse>(`/students/${id}`);
  return data.data; // unwrap backend response
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



export async function exportStudentsCsv(
  params: GetStudentsParams = {}
): Promise<void> {
  try {
    const {
      page = 1,
      limit = 1000,
      search = "",
      batchId = "",
      status = "",
      isArchived = false,
    } = params;

    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      search,
      status,
      batchId,
      isArchived: String(isArchived),
    });

    const response = await axiosClient.get(
      `/students/export/studnetCSV?${query}`,
      {
        responseType: "blob",
      }
    );

    // Create CSV Blob
    const blob = new Blob(
      [response.data],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    // Create temporary download link
    const link =
      document.createElement("a");

    link.href = url;

    link.download = `students-export-${Date.now()}.csv`;

    document.body.appendChild(link);

    link.click();

    // Cleanup
    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(
      "❌ Student CSV export failed:",
      error
    );

    throw error;
  }
}