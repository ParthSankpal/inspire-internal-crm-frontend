"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StudentsTable } from "./StudentsTable";

export default function StudentsPage() {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Students</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active Students</TabsTrigger>
          <TabsTrigger value="archived">Archived Students</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <StudentsTable isArchived={false} />
        </TabsContent>

        <TabsContent value="archived">
          <StudentsTable isArchived={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
