import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Navbar from "./components/Navbar";
import { homeFor } from "./roles";
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import Login from "./pages/Login";
import OwnerDashboard from "./pages/OwnerDashboard";
import TenantDashboard from "./pages/TenantDashboard";
import AdminDashboard from "./pages/AdminDashboard";


// lets only the right role open a page
function Guard({ role, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to={homeFor(user)} replace />;
  return children;
}

export default function App() {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/login" element={user ? <Navigate to={homeFor(user)} replace /> : <Login />} />
        <Route path="/owner" element={<Guard role="OWNER"><OwnerDashboard /></Guard>} />
        <Route path="/tenant" element={<Guard role="TENANT"><TenantDashboard /></Guard>} />
        <Route path="/admin" element={<Guard role="ADMIN"><AdminDashboard /></Guard>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
