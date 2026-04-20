import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";
import api from "../api";

function Register({ onSwitch }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Sab fields bharo!");
      return;
    }
    if (form.password.length < 6) {
      setError("Password kam se kam 6 characters ka hona chahiye!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/api/auth/register", form);
      login(res.data.user, res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Register failed!");
    }
    setLoading(false);
  };

  return (
    <div className="auth-box">
      <h2>Account banao</h2>
      <p className="auth-sub">Free mein register karo</p>

      {error && <div className="auth-error">{error}</div>}

      <input
        type="text"
        placeholder="Tumhara naam"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="auth-input"
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="auth-input"
      />
      <input
        type="password"
        placeholder="Password (min 6 chars)"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="auth-input"
      />

      <button onClick={handleSubmit} disabled={loading} className="auth-btn">
        {loading ? "Registering..." : "Register"}
      </button>

      <p className="auth-switch">
        Already account hai? <span onClick={onSwitch}>Login karo</span>
      </p>
    </div>
  );
}

export default Register;
