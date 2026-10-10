import { useState } from "react";
import { api, money } from "../api";
import useFetch from "../useFetch";
import { Badge, Empty, Message, PROPERTY_TYPES } from "../components/ui";

const empty = {
  title: "", description: "", location: "", address: "", propertyType: "APARTMENT",
  rent: "", bedrooms: 1, bathrooms: 1, areaSqft: "", imageUrl: "",
};

export default function MyProperties() {
  const { data: list, reload } = useFetch("/owner/properties");
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState({ text: "", error: false });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const say = (text, error = false) => setMsg({ text, error });

  const save = async (e) => {
    e.preventDefault();
    const body = {
      ...form,
      rent: Number(form.rent),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      areaSqft: Number(form.areaSqft || 0),
    };
    try {
      if (editId) await api(`/owner/properties/${editId}`, { method: "PUT", body });
      else await api("/owner/properties", { method: "POST", body });
      say(editId ? "Property updated" : "Property added. Tenants can see it after the admin verifies the listing.");
      setForm(empty);
      setEditId(null);
      reload();
    } catch (err) {
      say(err.message, true);
    }
  };

  const edit = (p) => {
    setEditId(p.id);
    setForm({
      title: p.title, description: p.description || "", location: p.location, address: p.address,
      propertyType: p.propertyType, rent: p.rent, bedrooms: p.bedrooms, bathrooms: p.bathrooms,
      areaSqft: p.areaSqft, imageUrl: p.imageUrl || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggle = async (p) => {
    try {
      await api(`/owner/properties/${p.id}/availability?available=${!p.available}`, { method: "PUT" });
      reload();
    } catch (err) {
      say(err.message, true);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this property?")) return;
    try {
      await api(`/owner/properties/${id}`, { method: "DELETE" });
      say("Property deleted");
      reload();
    } catch (err) {
      say(err.message, true);
    }
  };

  return (
    <>
      <h2>My Properties</h2>
      <form className="card form-grid" onSubmit={save}>
        <label>Title<input name="title" value={form.title} onChange={change} required /></label>
        <label>City / location<input name="location" value={form.location} onChange={change} required /></label>
        <label>Address<input name="address" value={form.address} onChange={change} required /></label>
        <label>Type
          <select name="propertyType" value={form.propertyType} onChange={change}>
            {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>
        <label>Monthly rent (₹)<input name="rent" type="number" min="1" value={form.rent} onChange={change} required /></label>
        <label>Bedrooms<input name="bedrooms" type="number" min="0" value={form.bedrooms} onChange={change} /></label>
        <label>Bathrooms<input name="bathrooms" type="number" min="0" value={form.bathrooms} onChange={change} /></label>
        <label>Area (sq ft)<input name="areaSqft" type="number" min="0" value={form.areaSqft} onChange={change} /></label>
        <label className="wide">Image link (URL)<input name="imageUrl" value={form.imageUrl} onChange={change} placeholder="https://…" /></label>
        <label className="wide">Description<textarea name="description" rows="3" value={form.description} onChange={change} /></label>
        <div className="row wide">
          <button className="btn primary">{editId ? "Update property" : "Add property"}</button>
          {editId && <button type="button" className="btn" onClick={() => { setEditId(null); setForm(empty); }}>Cancel</button>}
        </div>
      </form>
      <Message text={msg.text} error={msg.error} />

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Title</th><th>Location</th><th>Type</th><th>Rent</th><th>Listing</th><th>Availability</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td><td>{p.location}</td><td>{p.propertyType}</td><td>{money(p.rent)}</td>
                <td><Badge value={p.listingStatus} /></td>
                <td><Badge value={p.available ? "AVAILABLE" : "RENTED"} /></td>
                <td className="actions">
                  <button className="btn small" onClick={() => edit(p)}>Edit</button>
                  <button className="btn small" onClick={() => toggle(p)}>{p.available ? "Mark rented" : "Mark available"}</button>
                  <button className="btn small danger" onClick={() => remove(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Empty rows={list} text="You have not added any property yet." />
      </div>
    </>
  );
}
