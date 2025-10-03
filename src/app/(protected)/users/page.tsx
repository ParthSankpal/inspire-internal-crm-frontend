"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { User } from "@/features/auth/types";
import { deleteUser, getAllUsers, createUser } from "@/api/authApi";
import { useNotify } from "@/components/common/NotificationProvider";
import { ConfirmDialog } from "@/components/common/dialogs/ConfirmDialog";
import { FormDialog } from "@/components/common/dialogs/FormDialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UserRole } from "@/features/constants/roles";
import { RoleDefaultScopes } from "@/features/constants/roleDefaultScopes";
import { Scope, ScopeLabels } from "@/features/constants/scope";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const notify = useNotify();

  // dialogs
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState<{ open: boolean; id?: string }>({ open: false });

  // form data
  const [formData, setFormData] = useState<Partial<User> & { passwordHashed?: string }>({});
  const [scopes, setScopes] = useState<Scope[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch {
      notify("Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    try {
      if (!formData.name || !formData.email || !formData.role || !formData.passwordHashed) {
        notify("All fields are required", "warning");
        return;
      }

      await createUser({
        ...formData,
        scope: scopes,
      });

      notify("User created successfully", "success");
      setOpenCreate(false);
      setFormData({});
      setScopes([]);
      loadUsers();
    } catch {
      notify("Failed to create user", "error");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteUser(id);
      notify("User deleted successfully", "success");
      loadUsers();
    } catch {
      notify("Failed to delete user", "error");
    }
  }

  const columns = [
    { id: "name", label: "Name", searchKey: "name" },
    { id: "email", label: "Email", searchKey: "email" },
    { id: "role", label: "Role" },
    {
      id: "createdAt",
      label: "Created",
      accessor: (row: User) => new Date(row.createdAt!).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <Button onClick={() => setOpenCreate(true)}>Create User</Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable<User>
          columns={columns}
          data={users}
          showIndex
          searchable
          rowActions={(row) => (
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => notify(`Edit ${row.name}`, "info")}>
                Edit
              </Button>
              <Button size="sm" variant="outline" onClick={() => notify(`Scope ${row.name}`, "warning")}>
                Scope
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setOpenDelete({ open: true, id: row._id })}
              >
                Delete
              </Button>
            </div>
          )}
        />
      )}

      {/* Create User Dialog */}
      <FormDialog
        open={openCreate}
        onOpenChange={setOpenCreate}
        title="Create New User"
        description="Fill out the details to add a new user."
        submitLabel="Create"
        onSubmit={handleCreate}
      >
        <div className="space-y-3">
          <Input
            placeholder="Name"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            placeholder="Phone"
            value={formData.phone || ""}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            value={formData.passwordHashed || ""}
            onChange={(e) => setFormData({ ...formData, passwordHashed: e.target.value })}
          />

          {/* Role Selector */}
          <Select
            value={formData.role || ""}
            onValueChange={(role: UserRole) => {
              setFormData({ ...formData, role });
              setScopes(RoleDefaultScopes[role] || []);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(UserRole).map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>


          {/* Scope Checkboxes */}
          {formData.role && (
            <div className="border p-2 rounded-md">
              <h4 className="font-semibold mb-2 text-sm">Scopes</h4>
              <div className="flex flex-col gap-1">
                {RoleDefaultScopes[formData.role as UserRole]?.map((scope) => (
                  <label key={scope} className="flex items-center gap-2">
                    <Checkbox
                      checked={scopes.includes(scope)}
                      onCheckedChange={(checked: boolean) => {
                        if (checked) setScopes([...scopes, scope]);
                        else setScopes(scopes.filter((s) => s !== scope));
                      }}
                    />
                    <span className="text-sm">{ScopeLabels[scope]}</span> {/* ✅ pretty label */}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </FormDialog>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={openDelete.open}
        onOpenChange={(o) => setOpenDelete({ open: o })}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={() => openDelete.id && handleDelete(openDelete.id)}
      />
    </div>
  );
}
