import { useState } from "react";
import { Link } from "react-router-dom";
import { api, money } from "../api";
import useFetch from "../useFetch";
import { Badge, Empty, Message } from "../components/ui";

export default function PropertiesTab() {
  const { data: list, reload } = useFetch("/admin/properties");
  const [msg, setMsg] = useState({ text: "", error: false });

  const setStatus = async (p, value) => {
    try {
      await api(`/admin/properties/${p.id}/status?value=${value}`, { method: "PUT" });
      setMsg({ text: `"${p.title}" is now ${value.toLowerCase()}`, error: false });
      reload();
    } catch (err) {
      setMsg({ text: err.message, error: true });
    }
  };

  return (
    <>
      <h2>Property Listings</h2>
      <p className="muted">Only verified listings are shown to tenants.</p>
      <Message text={msg.text} error={msg.error} />
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>ID</th><th>Title</th><th>Owner</th><th>Location</th><th>Rent</th><th>Listing</th><th>Availability</th><th>Action</th></tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.listingStatus === "VERIFIED" ? <Link to={`/property/${p.id}`}>{p.title}</Link> : p.title}</td>
                <td>{p.owner?.name}</td><td>{p.location}</td><td>{money(p.rent)}</td>
                <td><Badge value={p.listingStatus} /></td>
                <td><Badge value={p.available ? "AVAILABLE" : "RENTED"} /></td>
                <td className="actions">
                  {p.listingStatus !== "VERIFIED" && <button className="btn small primary" onClick={() => setStatus(p, "VERIFIED")}>Verify</button>}
                  {p.listingStatus !== "REJECTED" && <button className="btn small danger" onClick={() => setStatus(p, "REJECTED")}>Reject</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Empty rows={list} />
      </div>
    </>
  );
}
