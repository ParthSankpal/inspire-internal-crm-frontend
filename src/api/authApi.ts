import { axiosClient } from "@/lib/apiClient";
import { LoginRequest, AuthResponse, User } from "@/features/auth/types";
import { PaginatedResponse } from "@/features/pagination";

// 🔹 Login user
export async function loginUser(payload: LoginRequest): Promise<AuthResponse> {
  const { data } = await axiosClient.post<AuthResponse>("/auth/login", payload, {
    withCredentials: true, // ensure cookies are sent
  });
  return data;
}

// 🔹 Get current user (based on token/cookie)
export async function getCurrentUser(): Promise<AuthResponse> {
  const { data } = await axiosClient.get<AuthResponse>("/auth/me", {
    withCredentials: true,
  });
  return data;
}

// 🔹 Logout user
export async function logoutUser(): Promise<{ message: string }> {
  const { data } = await axiosClient.post("/auth/logout", {}, {
    withCredentials: true,
  });
  return data;
}


// ✅ Get all users (Paginated)
export async function getAllUsers(page = 1, limit = 10, search = ""): Promise<PaginatedResponse<User>> {
  const { data } = await axiosClient.get<PaginatedResponse<User>>(
    `/auth/all?page=${page}&limit=${limit}&search=${search}`
  );
  return data;
}

// 🔹 Create user
export async function createUser(user: Partial<User>): Promise<User> {
  const { data } = await axiosClient.post<User>("/auth/create", user);
  return data;
}

// 🔹 Update user details (name, phone, role)
export async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  const { data } = await axiosClient.put<User>(`/auth/${id}`, updates);
  return data;
}

// 🔹 Update user scopes
export async function updateUserScope(id: string, scope: string[]): Promise<User> {
  const { data } = await axiosClient.put<User>(`/auth/${id}/scope`, { scope });
  return data;
}

// 🔹 Delete user
export async function deleteUser(id: string): Promise<{ message: string }> {
  const { data } = await axiosClient.delete(`/auth/${id}`);
  return data;
}
