import React from "react";
import { Sidebar, Header } from "../components/UI";
import { useAuth } from "../context/AuthContext";

// PUBLIC_INTERFACE
export default function DashboardLayout({ current, onNavigate, children }) {
  /** Dashboard layout with header and sidebar. Renders page content in main area. */
  const { user, logout } = useAuth();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-background)" }}>
      <Header userEmail={user?.email} onLogout={logout} />
      <div style={{ display: "flex", alignItems: "stretch", gap: 16, padding: 16, flexWrap: "wrap" }}>
        <Sidebar current={current} onNavigate={onNavigate} />
        <main style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
