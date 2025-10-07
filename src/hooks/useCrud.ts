"use client";

import { useState, useCallback } from "react";
import { useNotify } from "@/components/common/NotificationProvider";

interface UseCrudProps<
  T,
  CreateData = T,
  UpdateData = T,
  CreateReturn = unknown,
  UpdateReturn = unknown
> {
  fetchFn: () => Promise<T[]>;
  createFn: (data: CreateData) => Promise<CreateReturn>;
  updateFn: (id: string, data: UpdateData) => Promise<UpdateReturn>;
  deleteFn: (id: string) => Promise<unknown>;
}

export function useCrud<
  T,
  CreateData = T,
  UpdateData = T,
  CreateReturn = unknown,
  UpdateReturn = unknown
>({
  fetchFn,
  createFn,
  updateFn,
  deleteFn,
}: UseCrudProps<T, CreateData, UpdateData, CreateReturn, UpdateReturn>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const notify = useNotify();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchFn();
      setItems(data);
    } catch (err) {
      console.error(err);
      notify("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  }, [fetchFn, notify]);

  const create = async (data: CreateData): Promise<CreateReturn | void> => {
    try {
      const result = await createFn(data);
      notify("Created successfully", "success");
      await load();
      return result;
    } catch (err) {
      console.error(err);
      notify("Failed to create", "error");
    }
  };

  const update = async (
    id: string,
    data: UpdateData
  ): Promise<UpdateReturn | void> => {
    try {
      const result = await updateFn(id, data);
      notify("Updated successfully", "success");
      await load();
      return result;
    } catch (err) {
      console.error(err);
      notify("Failed to update", "error");
    }
  };

  const remove = async (id: string): Promise<void> => {
    try {
      await deleteFn(id);
      notify("Deleted successfully", "success");
      await load();
    } catch (err) {
      console.error(err);
      notify("Failed to delete", "error");
    }
  };

  return { items, loading, load, create, update, remove };
}
