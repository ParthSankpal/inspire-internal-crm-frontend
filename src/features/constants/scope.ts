// constants/scopes.ts
export enum Scope {
  MANAGE_USERS = "manage_users",
  MANAGE_ENQUIRIES = "manage_enquiries",
  HANDLE_ADMISSIONS = "handle_admissions",
  HANDLE_FEES = "handle_fees",
  MANAGE_RECEIPTS = "manage_receipts",
  UPLOAD_TIMETABLE = "upload_timetable",
  UPLOAD_TESTS = "upload_tests",
  MANAGE_ATTENDANCE = "manage_attendance",
  ADD_NOTES = "add_notes",
  RAISE_COMPLAINTS = "raise_complaints",
  UPLOAD_EXCELS = "upload_excels",
}


export const ScopeLabels: Record<Scope, string> = {
  [Scope.MANAGE_USERS]: "Manage Users",
  [Scope.MANAGE_ENQUIRIES]: "Manage Enquiries",
  [Scope.HANDLE_ADMISSIONS]: "Handle Admissions",
  [Scope.HANDLE_FEES]: "Handle Fees",
  [Scope.MANAGE_RECEIPTS]: "Manage Receipts",
  [Scope.UPLOAD_TIMETABLE]: "Upload Timetable",
  [Scope.UPLOAD_TESTS]: "Upload Tests",
  [Scope.MANAGE_ATTENDANCE]: "Manage Attendance",
  [Scope.ADD_NOTES]: "Add Notes",
  [Scope.RAISE_COMPLAINTS]: "Raise Complaints",
  [Scope.UPLOAD_EXCELS]: "Upload Excels",
};
