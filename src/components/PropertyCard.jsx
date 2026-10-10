import { Link } from "react-router-dom";
import { money } from "../api";

export const fallbackImage = "https://placehold.co/640x420?text=No+Image";

export default function PropertyCard({ p }) {
  return (
    <Link to={`/property/${p.id}`} className="card prop-card">
      <img src={p.imageUrl || fallbackImage} alt={p.title} onError={(e) => (e.target.src = fallbackImage)} />
      <div className="prop-body">
        <span className="badge type">{p.propertyType}</span>
        <h3>{p.title}</h3>
        <p className="muted">📍 {p.location}</p>
        <p className="muted small">
          {p.bedrooms} bed · {p.bathrooms} bath · {p.areaSqft} sq ft
        </p>
        <p className="rent">{money(p.rent)}<span className="muted small"> / month</span></p>
      </div>
    </Link>
  );
}
