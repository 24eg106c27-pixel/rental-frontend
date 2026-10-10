import { useState } from "react";
import { api } from "../api";
import useFetch from "../useFetch";
import { Badge, Empty, Message } from "../components/ui";

// owners and tenants raise complaints and read the admin's reply here
export default function ComplaintsTab() {
  const { data: rows, reload } = useFetch("/complaints");
  const [form, setForm] = useState({ subject: "", description: "" });
  const [msg, setMsg] = useState({ text: "", error: false });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api("/complaints", { method: "POST", body: form });
      setForm({ subject: "", description: "" });
      setMsg({ text: "Complaint submitted. The admin will respond soon.", error: false });
      reload();
    } catch (err) {
      setMsg({ text: err.message, error: true });
    }
  };

  return (
    <>
      <h2>Complaints</h2>
      <form className="card stack" onSubmit={submit}>
        <label>Subject<input name="subject" value={form.subject} onChange={change} required /></label>
        <label>Describe the problem<textarea name="description" rows="3" value={form.description} onChange={change} required /></label>
        <div><button className="btn primary">Submit complaint</button></div>
      </form>
      <Message text={msg.text} error={msg.error} />

      <div className="table-wrap">
        <table>
          <thead><tr><th>Date</th><th>Subject</th><th>Description</th><th>Status</th><th>Admin response</th></tr></thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id}>
                <td>{c.createdDate}</td><td>{c.subject}</td><td className="note">{c.description}</td>
                <td><Badge value={c.status} /></td><td className="note">{c.adminResponse || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Empty rows={rows} text="You have not raised any complaint." />
      </div>
    </>
  );
}
