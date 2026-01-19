import { Button } from "@/shared/components/Button";

export function UsersToolbar({
  q,
  status,
  onChangeQ,
  onChangeStatus,
  onNewUser,
}: {
  q: string;
  status: "all" | "active" | "inactive";
  onChangeQ: (v: string) => void;
  onChangeStatus: (v: "all" | "active" | "inactive") => void;
  onNewUser: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold">Users</h2>
        <p className="text-sm text-gray-500">
          Manage users with filters, pagination, and CRUD actions.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <input
          value={q}
          onChange={(e) => onChangeQ(e.target.value)}
          placeholder="Search name or email..."
          className="w-full sm:w-64 border rounded-lg p-2"
        />
        <select
          value={status}
          onChange={(e) => onChangeStatus(e.target.value as any)}
          className="w-full sm:w-40 border rounded-lg p-2"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <Button variant="primary" onClick={onNewUser}>
          New User
        </Button>
      </div>
    </div>
  );
}
