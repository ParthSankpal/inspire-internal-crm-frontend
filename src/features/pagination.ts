import { ReactNode } from "react";

export interface PaginationMeta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: PaginationMeta;
}

export interface Column<T> {
  id: keyof T | string;          // property key or custom id
  label: string;                 // column header text
  accessor?: (row: T) => string | number | boolean | null; 
  render?: (row: T) => ReactNode;
  sortKey?: keyof T | string;    // key to sort on
  searchKey?: keyof T | string;  // key to search on
  className?: string;            // optional styling
}
