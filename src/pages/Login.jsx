import { useState } from "react";
import { useAuth } from "../AuthContext";
import { Message } from "../components/ui";

export default function Login() {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", role: "TENANT" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (isRegister) await register(form);
      else await login(form.email, form.password);
      // App.jsx moves the user to their dashboard once the login is saved
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-wrap">
      <form className="card auth" onSubmit={submit}>
        <h1>{isRegister ? "Create your account" : "Welcome back"}</h1>
        <p className="muted">{isRegister ? "Join as a tenant or a property owner" : "Login to continue"}</p>

        {isRegister && (
          <>
            <input name="name" placeholder="Full name" value={form.name} onChange={change} required />
            <input name="phone" placeholder="Phone number" value={form.phone} onChange={change} />
            <select name="role" value={form.role} onChange={change}>
              <option value="TENANT">I want to rent a property (Tenant)</option>
              <option value="OWNER">I want to list properties (Owner)</option>
            </select>
          </>
        )}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={change} required />
        <input name="password" type="password" placeholder="Password (min 6 characters)" value={form.password} onChange={change} required />

        <Message text={error} error />
        <button className="btn primary" disabled={busy}>
          {busy ? "Please wait…" : isRegister ? "Register" : "Login"}
        </button>
        {busy && <p className="muted small center">The free server may take up to a minute to wake up.</p>}

        <p className="link center" onClick={() => { setIsRegister(!isRegister); setError(""); }}>
          {isRegister ? "Already have an account? Login" : "New here? Create an account"}
        </p>
        {!isRegister && (
          <div className="demo muted small">
            <b>Demo logins</b><br />
            Admin: admin@rental.com / admin123<br />
            Owner: owner@rental.com / owner123<br />
            Tenant: tenant@rental.com / tenant123
          </div>
        )}
      </form>
    </div>
  );
}
