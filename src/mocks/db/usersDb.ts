export type UserEntity = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "User";
  status: "Active" | "Inactive";
  createdAt: string;
};

const seed: UserEntity[] = Array.from({ length: 57 }).map((_, i) => {
  const id = String(i + 1);
  return {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
    role: i % 7 === 0 ? "Admin" : i % 3 === 0 ? "Manager" : "User",
    status: i % 5 === 0 ? "Inactive" : "Active",
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  };
});

let users = [...seed];

export const usersDb = {
  list() {
    return users;
  },
  create(u: Omit<UserEntity, "id" | "createdAt">) {
    const newUser: UserEntity = {
      ...u,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    users = [newUser, ...users];
    return newUser;
  },
  update(id: string, patch: Partial<Omit<UserEntity, "id" | "createdAt">>) {
    users = users.map((u) => (u.id === id ? { ...u, ...patch } : u));
    return users.find((u) => u.id === id) ?? null;
  },
  remove(id: string) {
    const before = users.length;
    users = users.filter((u) => u.id !== id);
    return users.length !== before;
  },
};
