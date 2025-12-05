"use client";

import { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Navbar from "./Navbar";
import AppSidebar from "./Sidebar";
import { UserRole } from "@/features/constants/roles";
import { Scope } from "@/features/constants/scope";
import { getCookie } from "@/lib/cookies";

interface MainSectionProps {
  children: ReactNode;
}

export default function MainSection({ children }: MainSectionProps) {
  // Read user from cookie
  const storedUser = getCookie("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Fallback if no user found
  const role: UserRole = user?.role || UserRole.SUPER_ADMIN;
  const scopes: Scope[] = user?.scope || [];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-background text-foreground">

        {/* Sidebar — now gets dynamic role & scopes */}
        <AppSidebar role={role} scopes={scopes} />

        <SidebarInset className="flex flex-col flex-1 w-full">
          <Navbar />
          <main className="flex-1 w-full p-6 overflow-y-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
