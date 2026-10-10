import { useState } from "react";
import { api } from "../api";
import useFetch from "../useFetch";
import { Badge, Empty, Message } from "../components/ui";

export default function UsersTab() {
  const { data: users, reload } = useFetch("/admin/users");
  const [msg, setMsg] = useState({ text: "", error: false });

  const setVerified = async (u, verified) => {
    try {
      await api(`/admin/users/${u.id}/verify?verified=${verified}`, { method: "PUT" });
      setMsg({ text: `${u.name} is now ${verified ? "verified" : "unverified"}`, error: false });
      reload();
    } catch (err) {
      setMsg({ text: err.message, error: true });
    }
  };

  return (
    <>
      <h2>Users</h2>
      <p className="muted">Owners can list properties only after you verify them.</p>
      <Message text={msg.text} error={msg.error} />
      <div className="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Verified</th><th>Action</th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.phone}</td>
                <td>{u.role}</td><td><Badge value={u.verified ? "VERIFIED" : "PENDING"} /></td>
                <td>
                  {u.role !== "ADMIN" && (u.verified
                    ? <button className="btn small" onClick={() => setVerified(u, false)}>Unverify</button>
                    : <button className="btn small primary" onClick={() => setVerified(u, true)}>Verify</button>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Empty rows={users} />
      </div>
    </>
  );
}
