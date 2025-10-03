import { User } from "@/features/auth/types";
import { axiosClient } from "@/lib/apiClient";

// GET all users
export async function getAllUsers(): Promise<User[]> {
  const { data } = await axiosClient.get<User[]>("/auth/all");
  return data;
}

// CREATE user
export async function createUser(user: Partial<User>): Promise<User> {
  const { data } = await axiosClient.post<User>("/auth/create", user);
  return data;
}

// UPDATE user (name, phone, role)
export async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  const { data } = await axiosClient.put<User>(`/auth/${id}`, updates);
  return data;
}

// UPDATE user scope
export async function updateUserScope(id: string, scope: string[]): Promise<User> {
  const { data } = await axiosClient.put<User>(`/auth/${id}/scope`, { scope });
  return data;
}

// DELETE user
export async function deleteUser(id: string): Promise<{ message: string }> {
  const { data } = await axiosClient.delete(`/auth/${id}`);
  return data;
}
