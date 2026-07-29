import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/auth/register", { name, email, password });
      setMessage("Account created. You can now sign in.");
      navigate("/login");
    } catch (err: any) {
      setMessage(err?.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__hero">
          <p className="eyebrow">Create your account</p>
          <h1>Start your LabVision AI journey</h1>
          <p>Register to manage patients, samples, uploads, and AI-backed insights.</p>
        </div>

        <form onSubmit={handleRegister} className="auth-form">
          <label>
            Full name
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Dr. Jane Doe" required />
          </label>

          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@labvision.ai" required />
          </label>

          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a strong password" required />
          </label>

          {message ? <p className="error-text">{message}</p> : null}

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
