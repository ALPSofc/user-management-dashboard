import { Modal } from "@/shared/components/Modal";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User, UserRole, UserStatus } from "../types/user";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email."),
  role: z.enum(["Admin", "Manager", "User"]),
  status: z.enum(["Active", "Inactive"]),
});
type FormData = z.infer<typeof schema>;

export function UserFormModal({
  open,
  mode,
  initialUser,
  isSubmitting,
  onClose,
  onSubmit,
}: {
  open: boolean;
  mode: "create" | "edit";
  initialUser?: User | null;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (values: FormData) => void;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      role: "User",
      status: "Active",
    },
  });

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialUser) {
      form.reset({
        name: initialUser.name,
        email: initialUser.email,
        role: initialUser.role as UserRole,
        status: initialUser.status as UserStatus,
      });
    } else {
      form.reset({ name: "", email: "", role: "User", status: "Active" });
    }
  }, [open, mode, initialUser, form]);

  const title = mode === "create" ? "Create user" : "Edit user";

  return (
    <Modal
      open={open}
      title={title}
      onClose={() => {
        if (!isSubmitting) onClose();
      }}
      footer={
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={onClose}
            disabled={Boolean(isSubmitting)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            form="user-form"
            disabled={Boolean(isSubmitting)}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      }
    >
      <form
        id="user-form"
        className="space-y-3"
        onSubmit={form.handleSubmit((v) => onSubmit(v))}
      >
        <Input
          label="Name"
          placeholder="Jane Doe"
          {...form.register("name")}
          error={form.formState.errors.name?.message}
        />

        <Input
          label="Email"
          placeholder="jane@example.com"
          {...form.register("email")}
          error={form.formState.errors.email?.message}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Role</label>
            <select
              className="mt-1 w-full border rounded-lg p-2"
              {...form.register("role")}
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>
            {form.formState.errors.role?.message && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.role.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              className="mt-1 w-full border rounded-lg p-2"
              {...form.register("status")}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {form.formState.errors.status?.message && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.status.message}
              </p>
            )}
          </div>
        </div>

        {form.formState.errors.root?.message && (
          <p className="text-sm text-red-600">{form.formState.errors.root.message}</p>
        )}
      </form>
    </Modal>
  );
}
