import { AppNavigation } from "@/features/constants/navigation";
import { RoleDefaultScopes } from "@/features/constants/roleDefaultScopes";
import { UserRole } from "@/features/constants/roles";


export function getNavigationForRole(role: UserRole) {
  const allowedScopes = RoleDefaultScopes[role] || [];
  return AppNavigation.filter((item) => {
    if (item.scopes.length === 0) return true; // dashboard
    return item.scopes.some((scope) => allowedScopes.includes(scope));
  });
}
