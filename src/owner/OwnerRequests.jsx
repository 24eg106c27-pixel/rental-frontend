import { useState } from "react";
import { api, money } from "../api";
import useFetch from "../useFetch";
import { Badge, Empty, Message } from "../components/ui";

export default function OwnerRequests() {
  const { data: rows, reload } = useFetch("/owner/requests");
  const [msg, setMsg] = useState({ text: "", error: false });

  const decide = async (id, action) => {
    try {
      await api(`/owner/requests/${id}/${action}`, { method: "PUT" });
      setMsg({ text: action === "approve" ? "Request approved. The tenant can now pay." : "Request rejected.", error: false });
      reload();
    } catch (err) {
      setMsg({ text: err.message, error: true });
    }
  };

  return (
    <>
      <h2>Rental Requests</h2>
      <Message text={msg.text} error={msg.error} />
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Property</th><th>Tenant</th><th>Contact</th><th>Move-in</th><th>Months</th><th>Total</th><th>Message</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.property.title}</td>
                <td>{r.tenant.name}</td>
                <td>{r.tenant.phone}<br /><span className="muted small">{r.tenant.email}</span></td>
                <td>{r.moveInDate}</td><td>{r.months}</td><td>{money(r.totalAmount)}</td>
                <td className="note">{r.message || "-"}</td>
                <td><Badge value={r.status} /></td>
                <td className="actions">
                  {r.status === "PENDING" && (
                    <>
                      <button className="btn small primary" onClick={() => decide(r.id, "approve")}>Approve</button>
                      <button className="btn small danger" onClick={() => decide(r.id, "reject")}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Empty rows={rows} text="No rental requests yet." />
      </div>
    </>
  );
}
