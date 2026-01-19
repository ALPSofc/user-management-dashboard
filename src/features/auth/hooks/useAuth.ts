import { storage } from "../../../shared/lib/storage";
import { useMemo } from "react";

export function useAuth() {
  const token = storage.getToken();

  return useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      token,
      login: (tokenValue: string) => storage.setToken(tokenValue),
      logout: () => storage.clearToken(),
    }),
    [token]
  );
}
