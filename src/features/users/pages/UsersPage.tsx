import { useMemo, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { UsersToolbar } from "../components/UsersToolbar";
import { UsersTable } from "../components/UsersTable";
import { Pagination } from "../components/Pagination";
import { UserFormModal } from "../components/UserFormModal";
import type { User } from "../types/user";
import { Spinner } from "@/shared/components/Spinner";
import { ErrorState } from "@/shared/components/ErrorState";
import { EmptyState } from "@/shared/components/EmptyState";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useToast } from "../hooks/useToast";
import { Toast } from "@/shared/components/Toast";

export function UsersPage() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const [qInput, setQInput] = useState("");
  const q = useDebouncedValue(qInput, 300);

  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const toast = useToast();

  const params = useMemo(() => ({ page, pageSize, q, status }), [page, pageSize, q, status]);
  const { usersQuery, createMutation, updateMutation, deleteMutation } = useUsers(params);

  const totalPages = usersQuery.data ? Math.ceil(usersQuery.data.total / pageSize) : 1;

  function openCreate() {
    setModalMode("create");
    setEditingUser(null);
    setModalOpen(true);
  }

  function openEdit(user: User) {
    setModalMode("edit");
    setEditingUser(user);
    setModalOpen(true);
  }

  async function handleDelete(user: User) {
    const ok = window.confirm(`Delete ${user.name}? This action cannot be undone.`);
    if (!ok) return;

    try {
      await deleteMutation.mutateAsync(user.id);
      toast.show("success", "User deleted.");
    } catch {
      toast.show("error", "Failed to delete user. Rolled back changes.");
    }
  }

  return (
    <div className="space-y-4">
      <UsersToolbar
        q={qInput}
        status={status}
        onChangeQ={(v) => {
          setPage(1);
          setQInput(v);
        }}
        onChangeStatus={(v) => {
          setPage(1);
          setStatus(v);
        }}
        onNewUser={openCreate}
      />

      {usersQuery.isLoading && (
        <div className="border rounded-2xl bg-white p-6">
          <Spinner label="Loading users..." />
        </div>
      )}

      {usersQuery.isError && (
        <ErrorState
          description="Could not load users. Check your connection and try again."
          onRetry={() => usersQuery.refetch()}
        />
      )}

      {usersQuery.data && usersQuery.data.items.length === 0 && (
        <EmptyState
          title="No users found"
          onClear={() => {
            setPage(1);
            setQInput("");
            setStatus("all");
          }}
        />
      )}

      {usersQuery.data && usersQuery.data.items.length > 0 && (
        <>
          <UsersTable
            users={usersQuery.data.items}
            onEdit={openEdit}
            onDelete={(user) => {
              void handleDelete(user);
            }}
          />

          <div className="border rounded-2xl bg-white p-3">
            <Pagination
              page={page}
              totalPages={totalPages}
              totalItems={usersQuery.data.total}
              onPrev={() => setPage((p) => Math.max(1, p - 1))}
              onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
            />
          </div>
        </>
      )}

      <UserFormModal
        open={modalOpen}
        mode={modalMode}
        initialUser={editingUser}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        onClose={() => setModalOpen(false)}
        onSubmit={async (values) => {
          try {
            if (modalMode === "create") {
              await createMutation.mutateAsync(values);
              toast.show("success", "User created.");
            } else if (editingUser) {
              await updateMutation.mutateAsync({ id: editingUser.id, patch: values });
              toast.show("success", "User updated.");
            }
            setModalOpen(false);
          } catch {
            toast.show("error", "Operation failed. Please try again.");
          }
        }}
      />

      <Toast
        open={toast.open}
        variant={toast.variant}
        message={toast.message}
        onClose={toast.close}
      />
    </div>
  );
}
