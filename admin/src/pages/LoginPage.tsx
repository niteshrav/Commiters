import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MaterialIcon from "../components/MaterialIcon";
import { api, checkBackendHealth, checkCmsReady, setToken } from "../lib/api";

function resolveStatusTone(status: string): "ready" | "warn" | "idle" {
  if (/connected|ready/i.test(status)) return "ready";
  if (/offline|not ready|unavailable|mongodb/i.test(status)) return "warn";
  return "idle";
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@commiters.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Checking backend...");
  const [loading, setLoading] = useState(false);

  const statusTone = useMemo(() => resolveStatusTone(status), [status]);

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
      setStatus("Backend connected. Ready to sign in.");
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
      <div className="login-shell">
        <aside className="login-brand-panel" aria-hidden="false">
          <p className="login-brand-kicker">Commiters</p>
          <h1 className="login-brand-title">Engineering Studio</h1>
          <p className="login-brand-copy">
            Manage website content, careers, inquiries, media, and publishing from one focused console.
          </p>
          <ul className="login-brand-list">
            <li>
              <MaterialIcon name="dashboard_customize" />
              CMS modules for hero, services, jobs, and blog
            </li>
            <li>
              <MaterialIcon name="forum" />
              Contact queries and recruitment pipeline
            </li>
            <li>
              <MaterialIcon name="public" />
              Live preview links to your public site
            </li>
          </ul>
        </aside>

        <form className="card login-card form-grid" onSubmit={onSubmit}>
          <div className="login-card-head">
            <h2>Sign in</h2>
            <p className={`login-status login-status--${statusTone}`}>
              <MaterialIcon name={statusTone === "ready" ? "check_circle" : statusTone === "warn" ? "error" : "sync"} />
              {status}
            </p>
          </div>

          <label>
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="username"
              required
            />
          </label>
          <label>
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              required
            />
          </label>

          {error ? <p className="error login-error">{error}</p> : null}

          <button className="btn login-submit" type="submit" disabled={loading || statusTone === "warn"}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <button className="btn secondary" type="button" disabled={loading} onClick={onRegister}>
            Create First Admin
          </button>

          <details className="login-help">
            <summary>First-time setup</summary>
            <p className="muted help-text">
              Requires MongoDB and <code>npm run cms:seed</code> in the backend folder. Use the admin credentials from{" "}
              <code>backend/.env</code> after seeding.
            </p>
          </details>
        </form>
      </div>
    </div>
  );
}
