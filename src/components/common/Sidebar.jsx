"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  Folder,
  Calendar,
  FileText,
  Award,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Challenges", href: "/challenges", icon: Folder },
  { name: "Learning Modules", href: "/learning-modules", icon: Calendar },
  { name: "Leaderboard", href: "/leaderboard", icon: FileText },
  { name: "Rewards", href: "/rewards", icon: Award },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r">
      {/* Header / Logo */}
      <SidebarHeader className="flex items-center justify-center py-4">
        {state === "expanded" ? (
          <img src={"/cclogo.png"} alt="Logo" className="h-8 w-auto" />
        ) : (
          <img src={"/cclogoshort.png"} alt="Short Logo" className="h-8 w-auto" />
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