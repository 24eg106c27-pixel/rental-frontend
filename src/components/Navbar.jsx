import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { homeFor } from "../roles";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <Link to="/" className="brand">🏠 RentEase</Link>
      <div className="nav-links">
        <Link to="/">Browse Properties</Link>
        {user ? (
          <>
            <Link to={homeFor(user)}>My Dashboard</Link>
            <span className="muted who">{user.name} ({user.role.toLowerCase()})</span>
            <button className="btn small" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn primary small">Login / Register</Link>
        )}
      </div>
    </nav>
  );
}
