export type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "User";
  status: "Active" | "Inactive";
  createdAt: string;
};

export type UsersListResponse = {
  items: User[];
  total: number;
  page: number;
  pageSize: number;
};

const KEY = "umd_users_db_v1";

function seedUsers(): User[] {
  const now = Date.now();
  return Array.from({ length: 57 }).map((_, i) => {
    const id = String(i + 1);
    return {
      id,
      name: `User ${id}`,
      email: `user${id}@example.com`,
      role: i % 7 === 0 ? "Admin" : i % 3 === 0 ? "Manager" : "User",
      status: i % 5 === 0 ? "Inactive" : "Active",
      createdAt: new Date(now - i * 86400000).toISOString(),
    };
  });
}

function readDb(): User[] {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    const seeded = seedUsers();
    localStorage.setItem(KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    const parsed = JSON.parse(raw) as User[];
    return Array.isArray(parsed) ? parsed : seedUsers();
  } catch {
    const seeded = seedUsers();
    localStorage.setItem(KEY, JSON.stringify(seeded));
    return seeded;
  }
}

function writeDb(users: User[]) {
  localStorage.setItem(KEY, JSON.stringify(users));
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fetchUsersLocal(params: {
  page: number;
  pageSize: number;
  q: string;
  status: "all" | "active" | "inactive";
}): Promise<UsersListResponse> {
  await sleep(250);
  const { page, pageSize, q, status } = params;

  let data = readDb();

  const qq = q.trim().toLowerCase();
  if (qq) {
    data = data.filter(
      (u) => u.name.toLowerCase().includes(qq) || u.email.toLowerCase().includes(qq)
    );
  }

  if (status !== "all") {
    data = data.filter((u) => u.status.toLowerCase() === status);
  }

  const total = data.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const items = data.slice(start, end);

  return { items, total, page, pageSize };
}

export async function createUserLocal(payload: Omit<User, "id" | "createdAt">): Promise<User> {
  await sleep(200);
  const db = readDb();
  const newUser: User = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  writeDb([newUser, ...db]);
  return newUser;
}

export async function updateUserLocal(
  id: string,
  patch: Partial<Omit<User, "id" | "createdAt">>
): Promise<User> {
  await sleep(200);
  const db = readDb();
  const idx = db.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error("Not found");

  const updated: User = { ...db[idx], ...patch };
  const next = [...db];
  next[idx] = updated;
  writeDb(next);
  return updated;
}

export async function deleteUserLocal(id: string): Promise<void> {
  await sleep(200);
  const db = readDb();
  writeDb(db.filter((u) => u.id !== id));
}
