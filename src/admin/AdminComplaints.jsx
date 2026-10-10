import { useState } from "react";
import { api } from "../api";
import useFetch from "../useFetch";
import { Badge, Empty, Message } from "../components/ui";

export default function AdminComplaints() {
  const { data: rows, reload } = useFetch("/admin/complaints");
  const [replies, setReplies] = useState({});
  const [msg, setMsg] = useState({ text: "", error: false });

  const resolve = async (c) => {
    try {
      await api(`/admin/complaints/${c.id}/resolve`, { method: "PUT", body: { response: replies[c.id] || "" } });
      setMsg({ text: "Complaint resolved", error: false });
      reload();
    } catch (err) {
      setMsg({ text: err.message, error: true });
    }
  };

  return (
    <>
      <h2>Complaints</h2>
      <Message text={msg.text} error={msg.error} />
      <div className="table-wrap">
        <table>
          <thead><tr><th>Date</th><th>From</th><th>Subject</th><th>Description</th><th>Status</th><th>Response</th></tr></thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id}>
                <td>{c.createdDate}</td>
                <td>{c.raisedBy.name}<br /><span className="muted small">{c.raisedBy.role.toLowerCase()}</span></td>
                <td>{c.subject}</td><td className="note">{c.description}</td>
                <td><Badge value={c.status} /></td>
                <td className="note">
                  {c.status === "OPEN" ? (
                    <div className="stack">
                      <textarea rows="2" placeholder="Write your response" value={replies[c.id] || ""}
                        onChange={(e) => setReplies({ ...replies, [c.id]: e.target.value })} />
                      <button className="btn small primary" onClick={() => resolve(c)}>Resolve</button>
                    </div>
                  ) : c.adminResponse}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Empty rows={rows} text="No complaints." />
      </div>
    </>
  );
}
