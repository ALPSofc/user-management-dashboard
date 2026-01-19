import { Outlet, useNavigate } from "react-router-dom";
import { storage } from "../lib/storage";

export function AppShell() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-semibold">User Management Dashboard</h1>
            <p className="text-xs text-gray-500">Admin panel demo</p>
          </div>
          <button
            className="text-sm border rounded-lg px-3 py-1.5"
            onClick={() => {
              storage.clearToken();
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
