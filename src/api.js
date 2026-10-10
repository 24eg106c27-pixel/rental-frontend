// every call to the Spring Boot backend goes through this one function
const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export async function api(path, { method = "GET", body } = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null); // some replies have no body

  // login expired -> back to the login page
  if (res.status === 401 && !path.startsWith("/auth") && !path.startsWith("/public")) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
  if (!res.ok) throw new Error(data?.message || "Something went wrong");
  return data;
}

export const money = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");
