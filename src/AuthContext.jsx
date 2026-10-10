import { createContext, useContext, useState } from "react";
import { api } from "./api";

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  });

  const save = (res) => {
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    setUser(res.user);
  };

  const login = async (email, password) =>
    save(await api("/auth/login", { method: "POST", body: { email, password } }));

  const register = async (form) =>
    save(await api("/auth/register", { method: "POST", body: form }));

  // re-read the user, because the admin may have verified the account meanwhile
  const refresh = async () => {
    const u = await api("/account/me");
    localStorage.setItem("user", JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return <Ctx.Provider value={{ user, login, register, refresh, logout }}>{children}</Ctx.Provider>;
}
