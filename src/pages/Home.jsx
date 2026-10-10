import { useEffect, useState } from "react";
import { api } from "../api";
import PropertyCard from "../components/PropertyCard";
import { Message, PROPERTY_TYPES } from "../components/ui";

export default function Home() {
  const [filters, setFilters] = useState({ location: "", type: "", minRent: "", maxRent: "" });
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const search = (f) => {
    const params = new URLSearchParams();
    Object.entries(f).forEach(([k, v]) => { if (v !== "") params.append(k, v); });
    setLoading(true);
    api("/public/properties?" + params)
      .then((d) => { setList(d); setError(""); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { search(filters); }, []); // load once when the page opens

  const change = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const submit = (e) => { e.preventDefault(); search(filters); };
  const clear = () => {
    const blank = { location: "", type: "", minRent: "", maxRent: "" };
    setFilters(blank);
    search(blank);
  };

  return (
    <>
      <section className="hero">
        <h1>Find a home you will love</h1>
        <p>Search verified properties by location, budget and type. Rent directly from the owner.</p>
        <form className="filters" onSubmit={submit}>
          <input name="location" placeholder="City or area" value={filters.location} onChange={change} />
          <select name="type" value={filters.type} onChange={change}>
            <option value="">All types</option>
            {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <input name="minRent" type="number" min="0" placeholder="Min rent ₹" value={filters.minRent} onChange={change} />
          <input name="maxRent" type="number" min="0" placeholder="Max rent ₹" value={filters.maxRent} onChange={change} />
          <button className="btn accent">Search</button>
          <button type="button" className="btn" onClick={clear}>Clear</button>
        </form>
      </section>

      <section className="container">
        <Message text={error} error />
        {loading ? (
          <p className="muted">Loading properties… the free server may take up to a minute to wake up.</p>
        ) : list.length === 0 ? (
          <p className="muted">No properties match your search.</p>
        ) : (
          <>
            <h2>{list.length} {list.length === 1 ? "property" : "properties"} available</h2>
            <div className="grid-cards">{list.map((p) => <PropertyCard key={p.id} p={p} />)}</div>
          </>
        )}
      </section>
    </>
  );
}
