"use client";

import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getNavigationForRole } from "@/utils/getNavigation";
import { UserRole } from "@/features/constants/roles";
import Image from "next/image";

export default function AppSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const { state } = useSidebar();

  const navigation = getNavigationForRole(role);

  return (
    <Sidebar collapsible="icon" className="border-r">
      {/* Header / Logo */}
      <SidebarHeader className="flex items-center justify-center py-4">
        {state === "expanded" ? (
          <Image src={"/cclogo.png"} alt="Logo" className="h-8 w-auto" width={200} height={200} />
        ) : (
          <Image src={"/cclogoshort.png"} alt="Short Logo" className="h-8 w-auto" width={200} height={200} />
        )}
      </SidebarHeader>

      <SidebarContent className="sidebaricons flex-none items-start">
        <SidebarGroup>
          <SidebarMenu>
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.name}>
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link
                            href={item.href}
                            className={`
                              flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors
                              ${
                                isActive
                                  ? "bg-accent text-accent-foreground shadow-sm"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                              }
                            `}
                          >
                            <item.icon className="size-6 shrink-0" />
                            <span className="truncate">{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="text-sm">
                        {item.name}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
