import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, checkBackendHealth, checkCmsReady, setToken } from "../lib/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@commiters.com");
  const [password, setPassword] = useState("ChangeMe123!");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Checking backend...");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function probe() {
      const healthy = await checkBackendHealth();
      if (!healthy) {
        setStatus("Backend offline — run: cd backend && npm run dev");
        return;
      }
      const cms = await checkCmsReady();
      if (!cms.ok) {
        setStatus(cms.message ?? "CMS not ready");
        return;
      }
      setStatus("Backend connected. Ready to login.");
    }
    void probe();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api<{ token: string }>("/api/admin/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setToken(res.token);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  async function onRegister(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api<{ token: string }>("/api/admin/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name: "Commiters Admin" }),
      });
      setToken(res.token);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <form className="card login-card form-grid" onSubmit={onSubmit}>
        <h2>Engineering Studio</h2>
        <p className="status-line">Admin Console — {status}</p>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>
        <label>
          Password
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </label>
        {error ? <p className="error">{error}</p> : null}
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <button className="btn secondary" type="button" disabled={loading} onClick={onRegister}>
          Create First Admin (if none exists)
        </button>
        <p className="muted help-text">
          Default after seed: admin@commiters.com / ChangeMe123!
          <br />
          Requires MongoDB running + <code>npm run cms:seed</code> in backend.
        </p>
      </form>
    </div>
  );
}
