// src/app/tests/TestsPage.tsx
"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import TestsTable from "./TestsTable";
import CreateTestDialog from "./CreateTestDialog";

export default function TestsPage() {
  const [activeTab, setActiveTab] = useState("draft");
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Tests</h1>

        <Button onClick={() => setOpenCreate(true)}>
          + Create Test
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="draft">
          <TestsTable status="Draft" />
        </TabsContent>

        <TabsContent value="published">
          <TestsTable status="Published" />
        </TabsContent>

        <TabsContent value="completed">
          <TestsTable status="Completed" />
        </TabsContent>
      </Tabs>

      <CreateTestDialog open={openCreate} onOpenChange={setOpenCreate} />
    </div>
  );
}
