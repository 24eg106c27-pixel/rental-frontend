import { useState } from "react";
import { Link } from "react-router-dom";
import { api, money } from "../api";
import useFetch from "../useFetch";
import { Badge, Empty, Message } from "../components/ui";

export default function MyRequests() {
  const { data: rows, reload } = useFetch("/tenant/requests");
  const [method, setMethod] = useState({});
  const [msg, setMsg] = useState({ text: "", error: false });

  const pay = async (r) => {
    if (!window.confirm(`Pay ${money(r.totalAmount)} for ${r.property.title}?`)) return;
    try {
      const res = await api(`/tenant/requests/${r.id}/pay`, {
        method: "POST",
        body: { method: method[r.id] || "UPI" },
      });
      setMsg({ text: `Payment successful. Reference: ${res.reference}`, error: false });
      reload();
    } catch (err) {
      setMsg({ text: err.message, error: true });
    }
  };

  return (
    <>
      <h2>My Rental Requests & History</h2>
      <p className="muted">Pay online after the owner approves your request.</p>
      <Message text={msg.text} error={msg.error} />
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Property</th><th>Owner</th><th>Requested on</th><th>Move-in</th><th>Months</th><th>Total</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td><Link to={`/property/${r.property.id}`}>{r.property.title}</Link></td>
                <td>{r.property.owner?.name}</td>
                <td>{r.requestDate}</td><td>{r.moveInDate}</td><td>{r.months}</td><td>{money(r.totalAmount)}</td>
                <td><Badge value={r.status} /></td>
                <td className="actions">
                  {r.status === "APPROVED" && (
                    <>
                      <select value={method[r.id] || "UPI"} onChange={(e) => setMethod({ ...method, [r.id]: e.target.value })}>
                        <option>UPI</option><option>CARD</option><option>NETBANKING</option>
                      </select>
                      <button className="btn small primary" onClick={() => pay(r)}>Pay now</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Empty rows={rows} text="You have not sent any rental request yet. Browse properties to get started." />
      </div>
    </>
  );
}
