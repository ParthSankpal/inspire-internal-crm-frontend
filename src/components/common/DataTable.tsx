"use client";

import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  totalItems?: number; // optional if using server-side pagination
  page?: number;
  limit?: number;
  onPaginationChange?: (info: PaginationInfo) => void;
  onSearchChange?: (value: string) => void;
  rowActions?: (row: T) => React.ReactNode;
  showIndex?: boolean;
  emptyMessage?: string;
  pageSizeOptions?: number[];
  searchable?: boolean;
  serverSide?: boolean; // true when using API pagination
}

type SortConfig = { key: string; direction: "asc" | "desc" };

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

  useEffect(() => {
    if (onPaginationChange) {
      const total = totalItems ?? data.length;
      onPaginationChange({
        page,
        limit: pageSize,
        totalItems: total,
        totalPages: Math.ceil(total / pageSize) || 1,
      });
    }
  }, [page, pageSize, data.length, totalItems]);

  // ---- Handle Search ----
  const safeData = Array.isArray(data) ? data : [];
  const filteredData = useMemo(() => {
    if (serverSide) return safeData;
    if (!search) return safeData;
    const searchLower = search.toLowerCase();
    return safeData.filter((row) =>
      columns.some((col) => {
        const key = col.searchKey || col.id;
        const val = (row as Record<string, unknown>)[key];
        return val && String(val).toLowerCase().includes(searchLower);
      })
    );
  }, [search, safeData, columns, serverSide]);

  // ---- Handle Sorting ----
  const sortedData = useMemo(() => {
    if (serverSide || sortConfigs.length === 0) return filteredData;

    return [...filteredData].sort((a, b) => {
      for (const config of sortConfigs) {
        const aVal = (a as Record<string, unknown>)[config.key];
        const bVal = (b as Record<string, unknown>)[config.key];

        if (aVal == null && bVal == null) continue;
        if (aVal == null) return 1;
        if (bVal == null) return -1;

        let aComp: number | string = String(aVal);
        let bComp: number | string = String(bVal);

        // ✅ Safely handle date strings
        if (typeof aVal === "string" && !isNaN(Date.parse(aVal))) {
          aComp = new Date(aVal).getTime();
          if (typeof bVal === "string" && !isNaN(Date.parse(bVal))) {
            bComp = new Date(bVal).getTime();
          }
        }

        // ✅ Safely handle numeric values
        else if (
          (typeof aVal === "string" || typeof aVal === "number") &&
          (typeof bVal === "string" || typeof bVal === "number") &&
          !isNaN(Number(aVal)) &&
          !isNaN(Number(bVal))
        ) {
          aComp = Number(aVal);
          bComp = Number(bVal);
        }

        if (aComp < bComp) return config.direction === "asc" ? -1 : 1;
        if (aComp > bComp) return config.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  }, [filteredData, sortConfigs, serverSide]);

  // ---- Pagination ----
  const totalRecords = totalItems ?? sortedData.length;
  const totalPages = Math.ceil(totalRecords / pageSize) || 1;
  const paginatedData = serverSide
    ? safeData
    : sortedData.slice((page - 1) * pageSize, page * pageSize);

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  // ---- Sorting ----
  const toggleSort = (col: Column<T>, isShift: boolean) => {
    const key = col.sortKey || col.id;
    let newConfigs = [...sortConfigs];
    const existing = newConfigs.find((c) => c.key === key);

    if (!existing) {
      if (isShift) newConfigs.push({ key, direction: "asc" });
      else newConfigs = [{ key, direction: "asc" }];
    } else if (existing.direction === "asc") existing.direction = "desc";
    else newConfigs = newConfigs.filter((c) => c.key !== key);

    setSortConfigs(newConfigs);
  };

  const getSortDirection = (key: string) =>
    sortConfigs.find((c) => c.key === key)?.direction;

  return (
    <div className="w-full border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 p-2 border-b">
        {searchable && (
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onSearchChange?.(e.target.value);
              setPage(1);
            }}
            className="max-w-sm"
          />
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm">Rows per page:</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(val) => {
              const newLimit = Number(val);
              setPageSize(newLimit);
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
          <tr className="bg-muted text-left">
            {showIndex && <th className="p-2 border">#</th>}
            {columns.map((col) => {
              const dir = getSortDirection(col.sortKey || col.id);
              return (
                <th
                  key={col.id}
                  className={cn("p-2 border font-medium cursor-pointer select-none", col.className)}
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
                colSpan={columns.length + (rowActions ? 1 : 0) + (showIndex ? 1 : 0)}
                className="p-4 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            paginatedData.map((row, i) => (
              <tr key={(row as any)._id || i} className="hover:bg-accent/30 transition-colors">
                {showIndex && <td className="p-2 border">{(page - 1) * pageSize + i + 1}</td>}
                {columns.map((col) => (
                  <td key={col.id} className={cn("p-2 border", col.className)}>
                    {col.accessor ? col.accessor(row) : (row as any)[col.id]}
                  </td>
                ))}
                {rowActions && <td className="p-2 border text-center">{rowActions(row)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center p-2 border-t text-sm">
        <span>
          Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalRecords)} of{" "}
          {totalRecords}
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
