"use client";
import { getCurrentUser } from "@/api/authApi";
import { User } from "@/features/auth/types";
import { RoleDefaultScopes } from "@/features/constants/roleDefaultScopes";
import { RoleScopes, UserRole } from "@/features/constants/roles";
import { Scope } from "@/features/constants/scope";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [showTechnical, setShowTechnical] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        // assuming API returns { user, token }
        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("❌ Failed to fetch current user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading user settings…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">No user data found. Please log in again.</p>
      </div>
    );
  }

  // Merge defaults + DB scopes
  const combinedScopes: Scope[] = [
    ...RoleDefaultScopes[user.role],
    ...(user.scope || []),
  ];

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Profile Section */}
      <div className="p-4 border rounded-lg shadow">
        <h2 className="font-semibold">Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      {/* Human-friendly role scopes */}
      <div className="p-4 border rounded-lg shadow">
        <h2 className="font-semibold">Role Permissions</h2>
        <ul className="list-disc pl-5">
          {RoleScopes[user.role].map((scope) => (
            <li key={scope}>{scope}</li>
          ))}
        </ul>
      </div>

      {/* Technical scopes — toggle for super_admin */}
      {user.role === UserRole.SUPER_ADMIN && (
        <div className="p-4 border rounded-lg shadow bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Technical Scopes (keys)</h2>
            <button
              onClick={() => setShowTechnical(!showTechnical)}
              className="text-sm text-blue-600 hover:underline"
            >
              {showTechnical ? "Hide" : "Show"}
            </button>
          </div>

          {showTechnical && (
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-600">
              {combinedScopes.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
