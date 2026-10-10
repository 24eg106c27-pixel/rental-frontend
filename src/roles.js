// where each role lands after login
export const homeFor = (u) => ({ ADMIN: "/admin", OWNER: "/owner", TENANT: "/tenant" }[u.role]);
