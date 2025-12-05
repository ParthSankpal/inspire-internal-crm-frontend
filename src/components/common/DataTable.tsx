"use client";

import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";

interface Column<T> {
  id: string;
  label: string;
  accessor?: (row: T) => React.ReactNode;
  sortKey?: string;
  searchKey?: string;
  className?: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  totalItems?: number;
  page?: number;
  limit?: number;
  onPaginationChange?: (info: PaginationInfo) => void;
  onSearchChange?: (value: string) => void;
  rowActions?: (row: T) => React.ReactNode;
  showIndex?: boolean;
  emptyMessage?: string;
  pageSizeOptions?: number[];
  searchable?: boolean;
  serverSide?: boolean;
}

type SortConfig = { key: string; direction: "asc" | "desc" };

// -----------------------------------------------------

export function DataTable<T extends { _id?: string }>({
  columns,
  data,
  totalItems,
  page: externalPage,
  limit: externalLimit,
  onPaginationChange,
  onSearchChange,
  rowActions,
  showIndex = false,
  emptyMessage = "No data found",
  pageSizeOptions = [1, 5, 10, 20, 50],
  searchable = true,
  serverSide = false,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(externalPage || 1);
  const [pageSize, setPageSize] = useState(externalLimit || 10);
  const [sortConfigs, setSortConfigs] = useState<SortConfig[]>([]);

  // -----------------------------------------------------
  // 🌟 FIX #1: safeData memoized (removes dependency warning)
  const safeData = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  // -----------------------------------------------------
  // 🌟 FIX #2 — NO infinite loop: onPaginationChange is dependency safe
  useEffect(() => {
    if (!onPaginationChange) return;

    const total = totalItems ?? safeData.length;

    onPaginationChange({
      page,
      limit: pageSize,
      totalItems: total,
      totalPages: Math.ceil(total / pageSize) || 1,
    });
  }, [page, pageSize, totalItems, safeData.length, onPaginationChange]);

  // -----------------------------------------------------
  // Filtering
  const filteredData = useMemo(() => {
    if (serverSide) return safeData;
    if (!search) return safeData;

    const searchLower = search.toLowerCase();

    return safeData.filter((row) =>
      columns.some((col) => {
        const key = col.searchKey || col.id;
        const value = (row as Record<string, unknown>)[key];
        return value?.toString().toLowerCase().includes(searchLower);
      })
    );
  }, [search, safeData, columns, serverSide]);

  // -----------------------------------------------------
  // Sorting
  const sortedData = useMemo(() => {
    if (serverSide || sortConfigs.length === 0) return filteredData;

    return [...filteredData].sort((a, b) => {
      for (const config of sortConfigs) {
        const key = config.key;
        const aVal = (a as Record<string, unknown>)[key];
        const bVal = (b as Record<string, unknown>)[key];

        // Null safety
        if (aVal == null && bVal == null) continue;
        if (aVal == null) return 1;
        if (bVal == null) return -1;

        // Auto-convert to numeric/date/string
        const parseValue = (val: unknown): number | string => {
          if (typeof val === "string" && !isNaN(Date.parse(val))) {
            return new Date(val).getTime();
          }
          if (!isNaN(Number(val))) return Number(val);
          return String(val);
        };

        const aComp = parseValue(aVal);
        const bComp = parseValue(bVal);

        if (aComp < bComp) return config.direction === "asc" ? -1 : 1;
        if (aComp > bComp) return config.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfigs, serverSide]);

  // -----------------------------------------------------
  // Pagination
  const totalRecords = totalItems ?? sortedData.length;
  const totalPages = Math.ceil(totalRecords / pageSize) || 1;

  const paginatedData = serverSide
    ? safeData
    : sortedData.slice((page - 1) * pageSize, page * pageSize);

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  // -----------------------------------------------------
  // Sorting handler
  const toggleSort = (col: Column<T>, shift: boolean) => {
    const key = col.sortKey || col.id;
    let configs = [...sortConfigs];

    const existing = configs.find((c) => c.key === key);

    if (!existing) {
      configs = shift
        ? [...configs, { key, direction: "asc" }]
        : [{ key, direction: "asc" }];
    } else if (existing.direction === "asc") {
      existing.direction = "desc";
    } else {
      configs = configs.filter((c) => c.key !== key);
    }

    setSortConfigs([...configs]);
  };

  const getDirection = (key: string) =>
    sortConfigs.find((c) => c.key === key)?.direction;

  // -----------------------------------------------------
  // Render
  return (
    <div className="w-full border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 p-2 border-b">
        {searchable && (
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              const val = e.target.value;
              setSearch(val);
              onSearchChange?.(val);
              setPage(1);
            }}
            className="max-w-sm"
          />
        )}

        {/* Page size */}
        <div className="flex items-center gap-2">
          <span className="text-sm">Rows per page:</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(v) => {
              setPageSize(Number(v));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((opt) => (
                <SelectItem key={opt} value={opt.toString()}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-muted">
            {showIndex && <th className="p-2 border">#</th>}

            {columns.map((col) => {
              const dir = getDirection(col.sortKey || col.id);
              return (
                <th
                  key={col.id}
                  className={cn(
                    "p-2 border font-medium cursor-pointer select-none",
                    col.className
                  )}
                  onClick={(e) => toggleSort(col, e.shiftKey)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {dir === "asc" && <ChevronUp className="w-4 h-4" />}
                    {dir === "desc" && <ChevronDown className="w-4 h-4" />}
                  </div>
                </th>
              );
            })}

            {rowActions && <th className="p-2 border text-center">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td
                colSpan={
                  columns.length +
                  (rowActions ? 1 : 0) +
                  (showIndex ? 1 : 0)
                }
                className="p-4 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            paginatedData.map((row, i) => (
              <tr key={row._id ?? i} className="hover:bg-accent/30">
                {showIndex && (
                  <td className="p-2 border">{(page - 1) * pageSize + i + 1}</td>
                )}

                {columns.map((col) => (
                  <td key={col.id} className={cn("p-2 border", col.className)}>
                    {col.accessor
                      ? col.accessor(row)
                      : (() => {
                        const raw = (row as Record<string, unknown>)[col.id];

                        if (raw === null || raw === undefined) return "";
                        if (React.isValidElement(raw)) return raw;
                        if (typeof raw === "object")
                          return typeof raw === "object" && raw !== null
                            ? JSON.stringify(raw, null, 2)
                            : String(raw);


                        return String(raw);
                      })()
                    }
                  </td>

                ))}

                {rowActions && (
                  <td className="p-2 border text-center">{rowActions(row)}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center p-2 border-t text-sm">
        <span>
          Showing {(page - 1) * pageSize + 1}–
          {Math.min(page * pageSize, totalRecords)} of {totalRecords}
        </span>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span>
            Page {page} of {totalPages}
          </span>

          <Button
            size="sm"
            variant="outline"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
