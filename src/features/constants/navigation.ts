

import { Home, Users, FileText, Calendar, Receipt, Upload, BookOpen, ClipboardList, NotebookPen, AlertTriangle } from "lucide-react";
import { Scope } from "./scope";

export const AppNavigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    scopes: [], 
  },
  {
    name: "Users",
    href: "/users",
    icon: Users,
    scopes: [Scope.MANAGE_USERS],
  },
  {
    name: "Enquiries",
    href: "/enquiries",
    icon: FileText,
    scopes: [Scope.MANAGE_ENQUIRIES],
  },
  {
    name: "Admissions",
    href: "/admissions",
    icon: BookOpen,
    scopes: [Scope.HANDLE_ADMISSIONS],
  },
  {
    name: "Fees",
    href: "/fees",
    icon: Receipt,
    scopes: [Scope.HANDLE_FEES],
  },
  {
    name: "Receipts",
    href: "/receipts",
    icon: FileText,
    scopes: [Scope.MANAGE_RECEIPTS],
  },
  {
    name: "Timetable",
    href: "/timetable",
    icon: Calendar,
    scopes: [Scope.UPLOAD_TIMETABLE],
  },
  {
    name: "Tests",
    href: "/tests",
    icon: ClipboardList,
    scopes: [Scope.UPLOAD_TESTS],
  },
  {
    name: "Attendance",
    href: "/attendance",
    icon: FileText,
    scopes: [Scope.MANAGE_ATTENDANCE],
  },
  {
    name: "Notes",
    href: "/notes",
    icon: NotebookPen,
    scopes: [Scope.ADD_NOTES],
  },
  {
    name: "Complaints",
    href: "/complaints",
    icon: AlertTriangle,
    scopes: [Scope.RAISE_COMPLAINTS],
  },
  {
    name: "Uploads",
    href: "/uploads",
    icon: Upload,
    scopes: [Scope.UPLOAD_EXCELS],
  },
];
