"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface Column<T> {
  id: string;
  label: string;
  accessor?: (row: T) => React.ReactNode;
  sortKey?: string;
  searchKey?: string;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowActions?: (row: T) => React.ReactNode;
  showIndex?: boolean;
  emptyMessage?: string;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  searchable?: boolean;
}

type SortConfig = { key: string; direction: "asc" | "desc" };

export function DataTable<T extends { _id?: string }>({
  columns,
  data,
  rowActions,
  showIndex = false,
  emptyMessage = "No data found",
  pageSizeOptions = [5, 10, 20, 50],
  defaultPageSize = 10,
  searchable = true,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // MULTI-SORT: keep array of { key, direction }
  const [sortConfigs, setSortConfigs] = useState<SortConfig[]>([]);

  // ---- Handle Search ----
  const filteredData = useMemo(() => {
    if (!search) return data;
    const searchLower = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const key = col.searchKey || col.id;
        // const val = (row as any)[key];
        const val = (row as Record<string, unknown>)[key];
        if (!val) return false;
        return String(val).toLowerCase().includes(searchLower);
      })
    );
  }, [search, data, columns]);

  // ---- Handle Sorting ----
  const sortedData = useMemo(() => {
    if (sortConfigs.length === 0) return filteredData;

    return [...filteredData].sort((a, b) => {
      for (const config of sortConfigs) {
        const aVal = (a as Record<string, unknown>)[config.key];
        const bVal = (b as Record<string, unknown>)[config.key];

        if (aVal == null && bVal == null) continue;
        if (aVal == null) return 1;
        if (bVal == null) return -1;

        let aComp: number | string = String(aVal);
        let bComp: number | string = String(bVal);

        // ✅ Check if values are date strings
        if (typeof aVal === "string" && !isNaN(Date.parse(aVal))) {
          aComp = new Date(aVal).getTime();
          bComp =
            typeof bVal === "string" && !isNaN(Date.parse(bVal))
              ? new Date(bVal).getTime()
              : 0;
        }
        // ✅ Check if both are numeric
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
      return 0; // equal across all configs
    });

  }, [filteredData, sortConfigs]);

  // ---- Handle Pagination ----
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  // ---- Toggle Sorting ----
  const toggleSort = (col: Column<T>, isShift: boolean) => {
    const key = col.sortKey || col.id;
    let newConfigs = [...sortConfigs];
    const existing = newConfigs.find((c) => c.key === key);

    if (!existing) {
      // Add new config
      if (isShift) {
        newConfigs.push({ key, direction: "asc" });
      } else {
        newConfigs = [{ key, direction: "asc" }];
      }
    } else if (existing.direction === "asc") {
      existing.direction = "desc";
    } else {
      // remove config
      newConfigs = newConfigs.filter((c) => c.key !== key);
    }

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
              setPage(1);
            }}
            className="max-w-sm"
          />
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-muted text-left">
            {showIndex && <th className="p-2 border">#</th>}
            {columns.map((col) => {
              const key = col.sortKey || col.id;
              const dir = getSortDirection(key);

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
                    {dir === "asc" && <ChevronUp className="w-4 h-4 inline" />}
                    {dir === "desc" && <ChevronDown className="w-4 h-4 inline" />}
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
                  columns.length + (rowActions ? 1 : 0) + (showIndex ? 1 : 0)
                }
                className="p-4 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <tr
                key={(row as Record<string, unknown>)._id?.toString() || rowIndex}
                className="hover:bg-accent/30 transition-colors"
              >
                {showIndex && (
                  <td className="p-2 border">
                    {(page - 1) * pageSize + rowIndex + 1}
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.id} className={cn("p-2 border", col.className)}>
                    {col.accessor
                      ? col.accessor(row)
                      : (row as Record<string, unknown>)[col.id] as React.ReactNode}
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
          {Math.min(page * pageSize, sortedData.length)} of {sortedData.length}
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
