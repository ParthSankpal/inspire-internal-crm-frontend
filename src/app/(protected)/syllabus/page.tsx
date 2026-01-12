"use client";

import { useState } from "react";
import { seedAllSubjects } from "@/features/syllabus/seedAllSyllabus";

export default function SeedSyllabusPage() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const handleSeed = async () => {
    setLoading(true);
    setLogs([]);

    try {
      const results = await seedAllSubjects();

      results.forEach((res, index) => {
        setLogs(prev => [
          ...prev,
          `✅ Subject ${index + 1} seeded (${res.insertedOrUpdated} topics)`,
        ]);
      });
    } catch (err) {
      setLogs(prev => [...prev, "❌ Seeding failed"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">
        Seed Complete Syllabus
      </h1>

      <button
        onClick={handleSeed}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Seeding syllabus..." : "Seed ALL Subjects"}
      </button>

      <div className="bg-gray-100 p-4 rounded space-y-2">
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
}
