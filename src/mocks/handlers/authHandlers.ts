import { http, HttpResponse } from "msw";

export const authHandlers = [
  http.post("/api/login", async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email === "admin@demo.com" && body.password === "admin123") {
      return HttpResponse.json({ token: "demo-token" }, { status: 200 });
    }
    return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }),
];
