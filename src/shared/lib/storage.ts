const KEY = "umd_auth";

export const storage = {
  getToken(): string | null {
    return localStorage.getItem(KEY);
  },
  setToken(token: string) {
    localStorage.setItem(KEY, token);
  },
  clearToken() {
    localStorage.removeItem(KEY);
  },
};
