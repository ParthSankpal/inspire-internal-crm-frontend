// constants/roles.ts
export enum UserRole {
  SUPER_ADMIN = "super_admin",
  COUNSELOR = "counselor",
  FEE_MANAGER = "fee_manager",
  ACADEMIC_CORD = "academic_coord",
  FACULTY = "faculty",
  DATA_ENTRY = "data_entry",
}

export const RoleScopes: Record<UserRole, string[]> = {
  [UserRole.SUPER_ADMIN]: [
    "Create, update & remove any user",
    "Manage admins, faculty & staff",
    "View & update all student data",
    "Manage courses, batches & schedules",
    "Access financial reports & system settings",
    "Full system control",
  ],
  [UserRole.COUNSELOR]: [
    "Add new student inquiries",
    "Manage admission process",
    "Track and update student onboarding",
    "Communicate with students & parents",
    "Generate counseling reports",
  ],
  [UserRole.FEE_MANAGER]: [
    "Manage student fee records",
    "Track pending & completed payments",
    "Generate financial reports",
    "Send fee reminders",
    "Access limited student info (related to fees only)",
  ],
  [UserRole.ACADEMIC_CORD]: [
    "Manage academic schedules",
    "Assign faculty to classes",
    "Track student performance reports",
    "Oversee tests & exams",
    "Coordinate between faculty and management",
  ],
  [UserRole.FACULTY]: [
    "View assigned students & subjects",
    "Take attendance",
    "Update marks & performance",
    "Upload study material & assignments",
    "Communicate with students academically",
  ],
  [UserRole.DATA_ENTRY]: [
    "Enter new student details",
    "Update records in the system",
    "Assist faculty/counselor in maintaining data",
    "No permission to delete or modify financial data",
  ],
};
