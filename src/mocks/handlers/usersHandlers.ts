import { http, HttpResponse } from "msw";
import { usersDb } from "../db/usersDb";

export const usersHandlers = [
  http.get("/api/users", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "1");
    const pageSize = Number(url.searchParams.get("pageSize") ?? "10");
    const q = (url.searchParams.get("q") ?? "").toLowerCase();
    const status = url.searchParams.get("status") ?? "all";

    let data = usersDb.list();

    if (q) {
      data = data.filter(
        (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }
    if (status !== "all") {
      data = data.filter((u) => u.status.toLowerCase() === status);
    }

    const total = data.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return HttpResponse.json(
      { items: data.slice(start, end), total, page, pageSize },
      { status: 200 }
    );
  }),

  http.post("/api/users", async ({ request }) => {
    const body = (await request.json()) as {
      name: string;
      email: string;
      role: "Admin" | "Manager" | "User";
      status: "Active" | "Inactive";
    };
    const created = usersDb.create(body);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.put("/api/users/:id", async ({ params, request }) => {
    const id = String(params.id);
    const patch = (await request.json()) as any;
    const updated = usersDb.update(id, patch);
    if (!updated) return HttpResponse.json({ message: "Not found" }, { status: 404 });
    return HttpResponse.json(updated, { status: 200 });
  }),

  http.delete("/api/users/:id", ({ params }) => {
    const ok = usersDb.remove(String(params.id));
    if (!ok) return HttpResponse.json({ message: "Not found" }, { status: 404 });
    return new HttpResponse(null, { status: 204 });
  }),
];
