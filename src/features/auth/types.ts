

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}


// 👤 Types based on backend response
export type UserRole =
  | "super_admin"
  | "counselor"
  | "fee_manager"
  | "academic_coord"
  | "faculty"
  | "data_entry";

export interface User {
  _id: string;       // ✅ match backend "_id"
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  scope: string[];
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
