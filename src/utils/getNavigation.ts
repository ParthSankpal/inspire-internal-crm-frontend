import { AppNavigation } from "@/features/constants/navigation";
import { RoleDefaultScopes } from "@/features/constants/roleDefaultScopes";
import { UserRole } from "@/features/constants/roles";
import { Scope } from "@/features/constants/scope";

export function getNavigationForUser(
  role: UserRole,
  userScopes: (Scope | "all")[] = []
) {
  // 1. If user has all permissions → show full navigation
  if (userScopes.includes("all")) {
    return AppNavigation;
  }

  // 2. Merge role default scopes + user scopes
  const allowedScopes: Scope[] = Array.from(
    new Set([
      ...(RoleDefaultScopes[role] || []),
      ...(userScopes as Scope[]),
    ])
  );

  // 3. Filter navigation based on allowed scopes
  return AppNavigation.filter((item) => {
    // Items with no scopes (Dashboard) should always be visible
    if (item.scopes.length === 0) return true;

    // Item is visible only if the user has at least one matching scope
    return item.scopes.some((scope) => allowedScopes.includes(scope));
  });
}
