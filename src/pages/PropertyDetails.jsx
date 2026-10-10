import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, money } from "../api";
import { useAuth } from "../AuthContext";
import { Badge, Message } from "../components/ui";
import { fallbackImage } from "../components/PropertyCard";

export default function PropertyDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [p, setP] = useState(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ message: "", moveInDate: "", months: 11 });

  useEffect(() => {
    api(`/public/properties/${id}`).then(setP).catch((e) => setError(e.message));
  }, [id]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const send = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api("/tenant/requests", {
        method: "POST",
        body: { propertyId: p.id, message: form.message, moveInDate: form.moveInDate, months: Number(form.months) },
      });
      setSent(true);
    } catch (err) {
      setMsg(err.message);
    }
  };

  if (error) return <div className="container"><Message text={error} error /><Link to="/">← Back to properties</Link></div>;
  if (!p) return <div className="container"><p className="muted">Loading…</p></div>;

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="container detail">
      <Link to="/">← Back to properties</Link>
      <div className="detail-grid">
        <div>
          <img className="detail-img" src={p.imageUrl || fallbackImage} alt={p.title} onError={(e) => (e.target.src = fallbackImage)} />
          <h1>{p.title}</h1>
          <p className="muted">📍 {p.address}, {p.location}</p>
          <div className="facts">
            <span><b>{p.bedrooms}</b> Bedrooms</span>
            <span><b>{p.bathrooms}</b> Bathrooms</span>
            <span><b>{p.areaSqft}</b> sq ft</span>
            <span><Badge value={p.propertyType} /></span>
          </div>
          <h3>About this property</h3>
          <p>{p.description || "No description provided."}</p>
          <p className="muted">Listed by {p.owner?.name}</p>
        </div>

        <div className="card side">
          <p className="rent big">{money(p.rent)}<span className="muted small"> / month</span></p>
          {!p.available && <Message text="This property is currently rented." error />}

          {p.available && !user && (
            <p>Please <Link to="/login">login or register as a tenant</Link> to send a rental request.</p>
          )}
          {p.available && user && user.role !== "TENANT" && (
            <p className="muted">Only tenant accounts can send rental requests.</p>
          )}
          {p.available && user?.role === "TENANT" && (sent ? (
            <>
              <Message text="Request sent! The owner will review it. Track it from your dashboard." />
              <Link className="btn primary" to="/tenant">Go to my requests</Link>
            </>
          ) : (
            <form onSubmit={send} className="stack">
              <h3>Send a rental request</h3>
              <label>Move-in date
                <input type="date" name="moveInDate" min={today} value={form.moveInDate} onChange={change} required />
              </label>
              <label>Stay (months)
                <input type="number" name="months" min="1" max="36" value={form.months} onChange={change} required />
              </label>
              <label>Message to the owner
                <textarea name="message" rows="3" value={form.message} onChange={change} placeholder="Tell the owner a little about yourself" />
              </label>
              <p className="muted small">Total for {form.months || 0} month(s): <b>{money(p.rent * (form.months || 0))}</b></p>
              <Message text={msg} error />
              <button className="btn primary">Send request</button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
