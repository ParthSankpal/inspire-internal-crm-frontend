"use client";

import { useCallback, useEffect, useState } from "react";

import { School } from "@/features/schools/types";
import { useNotify } from "@/components/common/NotificationProvider";
import { createSchool, deleteSchool, getAllSchools, updateSchool } from "@/api/schoolsApi";

export default function useSchools() {
  const notify = useNotify();

  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);

  const loadSchools = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllSchools();
      setSchools(data);
    } catch {
      notify("Failed to load schools", "error");
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    loadSchools();
  }, [loadSchools]);

  const addSchool = async (data: Partial<School>) => {
    try {
      await createSchool(data);
      notify("School added successfully", "success");
      loadSchools();
    } catch {
      notify("Failed to add school", "error");
    }
  };

  const editSchool = async (id: string, data: Partial<School>) => {
    try {
      await updateSchool(id, data);
      notify("School updated", "success");
      loadSchools();
    } catch {
      notify("Failed to update school", "error");
    }
  };

  const removeSchool = async (id: string) => {
    try {
      await deleteSchool(id);
      notify("School deleted", "info");
      loadSchools();
    } catch {
      notify("Failed to delete school", "error");
    }
  };

  return {
    schools,
    loading,
    addSchool,
    editSchool,
    removeSchool,
  };
}