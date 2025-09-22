import React from "react";

// Basic Button
// PUBLIC_INTERFACE
export function Button({ children, onClick, type = "button", variant = "primary", disabled = false, style, className }) {
  /** A styled button with variants (primary, secondary, ghost). */
  const base = {
    padding: "10px 14px",
    borderRadius: "var(--radius-md)",
    border: "1px solid transparent",
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "var(--transition)",
    boxShadow: "var(--shadow-sm)",
    opacity: disabled ? 0.6 : 1,
  };
  const variants = {
    primary: {
      background: "linear-gradient(180deg, var(--gradient-from), var(--gradient-to))",
      color: "var(--color-surface)",
      backgroundColor: "var(--color-primary)",
      borderColor: "rgba(0,0,0,0.0)",
    },
    secondary: {
      backgroundColor: "var(--color-secondary)",
      color: "#111827",
      borderColor: "rgba(0,0,0,0.0)",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "var(--color-text)",
      borderColor: "var(--color-border)",
    },
  };
  const hover = !disabled ? { filter: "brightness(0.98)", transform: "translateY(-1px)" } : {};
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{ ...base, ...variants[variant], ...hover, ...style }}
    >
      {children}
    </button>
  );
}

// Card Container
// PUBLIC_INTERFACE
export function Card({ children, style, className }) {
  /** A surface card with rounded corners and shadow. */
  const s = {
    backgroundColor: "var(--color-surface)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-md)",
    border: "1px solid var(--color-border)",
    padding: 16,
  };
  return (
    <div style={{ ...s, ...style }} className={className}>
      {children}
    </div>
  );
}

// Header Bar
// PUBLIC_INTERFACE
export function Header({ userEmail, onLogout }) {
  /** Top header bar with app title and user actions. */
  return (
    <div
      style={{
        height: 64,
        background: "linear-gradient(90deg, var(--gradient-from), var(--gradient-to))",
        borderBottom: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span
          aria-hidden
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: "var(--color-primary)",
            boxShadow: "var(--shadow-sm)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 800,
          }}
        >
          A
        </span>
        <div>
          <div style={{ fontWeight: 700, color: "var(--color-text)" }}>Attendance Tracker</div>
          <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>Ocean Professional</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ color: "var(--color-text-muted)", fontSize: 14 }}>{userEmail}</div>
        <Button variant="ghost" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

// Sidebar Navigation
// PUBLIC_INTERFACE
export function Sidebar({ current, onNavigate }) {
  /** Vertical navigation sidebar for dashboard pages. */
  const items = [
    { key: "mark", label: "Mark Attendance", icon: "📝" },
    { key: "records", label: "Records", icon: "📋" },
    { key: "reports", label: "Reports", icon: "📊" },
  ];

  return (
    <aside
      role="navigation"
      aria-label="Main navigation"
      style={{
        width: 240,
        backgroundColor: "var(--color-surface)",
        borderRight: "1px solid var(--color-border)",
        padding: 16,
        position: "sticky",
        top: 64,
        height: "calc(100vh - 64px)",
        maxHeight: "calc(100vh - 64px)",
        overflowY: "auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((it) => {
          const active = current === it.key;
          return (
            <button
              key={it.key}
              onClick={() => onNavigate(it.key)}
              style={{
                textAlign: "left",
                padding: "10px 12px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                backgroundColor: active ? "rgba(37,99,235,0.08)" : "transparent",
                color: active ? "var(--color-primary)" : "var(--color-text)",
                fontWeight: active ? 700 : 500,
                cursor: "pointer",
                transition: "var(--transition)",
              }}
              aria-current={active ? "page" : undefined}
            >
              <span style={{ marginRight: 8 }} aria-hidden>
                {it.icon}
              </span>
              {it.label}
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 16, fontSize: 12, color: "var(--color-text-muted)" }}>
        © {new Date().getFullYear()} School
      </div>
    </aside>
  );
}

// Inputs
// PUBLIC_INTERFACE
export function Input({ label, type = "text", value, onChange, placeholder, style, ...rest }) {
  /** Labeled text input */
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label && <label style={{ fontSize: 13, color: "var(--color-text-muted)" }}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
        style={{
          padding: "10px 12px",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border)",
          outline: "none",
          transition: "var(--transition)",
        }}
      />
    </div>
  );
}

// PUBLIC_INTERFACE
export function Select({ label, value, onChange, options = [], style, ...rest }) {
  /** Labeled select input */
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label && <label style={{ fontSize: 13, color: "var(--color-text-muted)" }}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        {...rest}
        style={{
          padding: "10px 12px",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border)",
          outline: "none",
          transition: "var(--transition)",
          background: "white",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Table
// PUBLIC_INTERFACE
export function Table({ columns, data, emptyLabel = "No data" }) {
  /** Simple responsive table component */
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
          background: "white",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                style={{
                  textAlign: "left",
                  padding: "12px",
                  background: "rgba(59,130,246,0.06)",
                  color: "var(--color-text)",
                  borderBottom: "1px solid var(--color-border)",
                  fontSize: 13,
                }}
              >
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: 16, textAlign: "center", color: "var(--color-text-muted)" }}>
                {emptyLabel}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid var(--color-border)" }}>
                {columns.map((c) => (
                  <td key={c.key} style={{ padding: "10px 12px", fontSize: 14 }}>
                    {c.render ? c.render(row[c.dataIndex], row) : row[c.dataIndex]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// Loader
// PUBLIC_INTERFACE
export function Loader({ label = "Loading..." }) {
  /** Subtle loader text */
  return <div style={{ color: "var(--color-text-muted)", padding: 8, fontSize: 14 }}>{label}</div>;
}

// Empty State
// PUBLIC_INTERFACE
export function EmptyState({ title = "Nothing here", description = "Try adjusting filters or add new data.", action }) {
  /** Empty state with optional action button */
  return (
    <Card style={{ textAlign: "center" }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div style={{ color: "var(--color-text-muted)", marginBottom: 10 }}>{description}</div>
      {action}
    </Card>
  );
}
