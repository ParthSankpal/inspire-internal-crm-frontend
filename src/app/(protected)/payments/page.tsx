// src/app/payments/PaymentsPage.tsx
"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BanksTab from "./banks/BanksTab";
import PaymentsTab from "./transactions/PaymentsTab";


export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState<"banks" | "transactions" | "summary">("transactions");

  return (
    <div className="space-y-6 p-6">
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "banks" | "transactions" | "summary")}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="transactions">Payments</TabsTrigger>
          <TabsTrigger value="banks">Bank Accounts</TabsTrigger>
          {/* <TabsTrigger value="summary">Summary</TabsTrigger> */}
        </TabsList>

        <TabsContent value="banks">
          <BanksTab />
        </TabsContent>

        <TabsContent value="transactions">
          <PaymentsTab />
        </TabsContent>

        {/* <TabsContent value="summary">
          <SummaryTab />
        </TabsContent> */}
      </Tabs>
    </div>
  );
}

