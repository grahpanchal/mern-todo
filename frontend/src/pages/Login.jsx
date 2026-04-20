import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";import api from "../api";

function Login({ onSwitch }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError("Sab fields bharo!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/api/auth/login", form);
      login(res.data.user, res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    }
    setLoading(false);
  };

  return (
    <div className="auth-box">
      <h2>Welcome back</h2>
      <p className="auth-sub">Apne account mein login karo</p>

      {error && <div className="auth-error">{error}</div>}

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="auth-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="auth-input"
      />

      <button onClick={handleSubmit} disabled={loading} className="auth-btn">
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="auth-switch">
        Account nahi hai? <span onClick={onSwitch}>Register karo</span>
      </p>
    </div>
  );
}

export default Login;
