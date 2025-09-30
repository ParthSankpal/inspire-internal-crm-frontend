// constants/roleDefaultScopes.ts
import { UserRole } from "./roles";
import { Scope } from "./scope";

export const RoleDefaultScopes: Record<UserRole, Scope[]> = {
  [UserRole.SUPER_ADMIN]: [
    Scope.MANAGE_USERS,
    Scope.MANAGE_ENQUIRIES,
    Scope.HANDLE_ADMISSIONS,
    Scope.HANDLE_FEES,
    Scope.MANAGE_RECEIPTS,
    Scope.UPLOAD_TIMETABLE,
    Scope.UPLOAD_TESTS,
    Scope.MANAGE_ATTENDANCE,
    Scope.ADD_NOTES,
    Scope.RAISE_COMPLAINTS,
    Scope.UPLOAD_EXCELS,
  ],
  [UserRole.COUNSELOR]: [
    Scope.MANAGE_ENQUIRIES,
    Scope.HANDLE_ADMISSIONS,
  ],
  [UserRole.FEE_MANAGER]: [
    Scope.HANDLE_FEES,
    Scope.MANAGE_RECEIPTS,
  ],
  [UserRole.ACADEMIC_CORD]: [
    Scope.UPLOAD_TIMETABLE,
    Scope.UPLOAD_TESTS,
    Scope.MANAGE_ATTENDANCE,
  ],
  [UserRole.FACULTY]: [
    Scope.ADD_NOTES,
    Scope.RAISE_COMPLAINTS,
  ],
  [UserRole.DATA_ENTRY]: [
    Scope.UPLOAD_EXCELS,
  ],
};
