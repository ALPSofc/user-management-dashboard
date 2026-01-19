import { http } from "../../../shared/lib/http";
import type { User } from "../types/user";

export type UsersListResponse = {
  items: User[];
  total: number;
  page: number;
  pageSize: number;
};

export async function fetchUsers(params: {
  page: number;
  pageSize: number;
  q: string;
  status: "all" | "active" | "inactive";
}) {
  const { data } = await http.get<UsersListResponse>("/api/users", { params });
  return data;
}

export async function createUser(payload: Omit<User, "id" | "createdAt">) {
  const { data } = await http.post<User>("/api/users", payload);
  return data;
}

export async function updateUser(id: string, patch: Partial<Omit<User, "id" | "createdAt">>) {
  const { data } = await http.put<User>(`/api/users/${id}`, patch);
  return data;
}

export async function deleteUser(id: string) {
  await http.delete(`/api/users/${id}`);
}
