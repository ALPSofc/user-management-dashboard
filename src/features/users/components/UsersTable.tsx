import type { User } from "../types/user";
import { Button } from "@/shared/components/Button";

export function UsersTable({
  users,
  onEdit,
  onDelete,
}: {
  users: User[];
  onEdit: (u: User) => void;
  onDelete: (u: User) => void;
}) {
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3">Created</th>
            <th className="p-3 w-[160px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.role}</td>
              <td className="p-3">
                <span
                  className={
                    "inline-flex items-center rounded-full px-2 py-0.5 text-xs border " +
                    (u.status === "Active"
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200")
                  }
                >
                  {u.status}
                </span>
              </td>
              <td className="p-3">{new Date(u.createdAt).toLocaleDateString()}</td>
              <td className="p-3">
                <div className="flex gap-2">
                  <Button onClick={() => onEdit(u)}>Edit</Button>
                  <Button variant="danger" onClick={() => onDelete(u)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
