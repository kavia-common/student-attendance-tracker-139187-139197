import React, { useState } from "react";
import { Card, Button, Input } from "../components/UI";
import { useAuth } from "../context/AuthContext";

// PUBLIC_INTERFACE
export default function Login({ onSuccess }) {
  /** Login page for teachers/admins. Accepts email/password, shows errors. */
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      onSuccess?.();
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, var(--gradient-from), var(--gradient-to))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <Card style={{ width: 380, padding: 24 }}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div
            aria-hidden
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "var(--color-primary)",
              margin: "0 auto 10px",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              boxShadow: "var(--shadow-sm)",
            }}
          >
            A
          </div>
          <div style={{ fontWeight: 800, fontSize: 20 }}>Attendance Tracker</div>
          <div style={{ color: "var(--color-text-muted)", fontSize: 13 }}>Sign in to continue</div>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@school.edu" />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          {error && <div style={{ color: "var(--color-error)", fontSize: 13 }}>{error}</div>}
          <Button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div style={{ marginTop: 12, fontSize: 12, color: "var(--color-text-muted)" }}>
          Demo: admin@example.com / admin123
        </div>
      </Card>
    </div>
  );
}
