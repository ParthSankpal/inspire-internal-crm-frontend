import { AuthResponse, LoginRequest } from "@/features/auth/types";
import { axiosClient } from "@/lib/apiClient";

// POST /api/auth/login
export async function loginApi(values: LoginRequest): Promise<AuthResponse> {
  const { data } = await axiosClient.post<AuthResponse>("/auth/login", values);
  return data;
}

// GET /api/auth/me
export async function getCurrentUser(): Promise<AuthResponse> {
  const { data } = await axiosClient.get<AuthResponse>("/auth/me");
  return data;
}

// POST /api/auth/logout (if you add it later in backend)
export async function logoutApi(): Promise<{ message: string }> {
  const { data } = await axiosClient.post("/auth/logout");
  return data;
}
