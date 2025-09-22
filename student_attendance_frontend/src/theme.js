export const theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB",
    secondary: "#F59E0B",
    success: "#F59E0B",
    error: "#EF4444",
    background: "#f9fafb",
    surface: "#ffffff",
    text: "#111827",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    gradientFrom: "rgba(59,130,246,0.08)",
    gradientTo: "rgba(249,250,251,1)"
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px"
  },
  shadow: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
    lg: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)"
  },
  transition: "all 200ms ease"
};

export function applyTheme() {
  const root = document.documentElement;
  const c = theme.colors;
  root.style.setProperty("--color-primary", c.primary);
  root.style.setProperty("--color-secondary", c.secondary);
  root.style.setProperty("--color-success", c.success);
  root.style.setProperty("--color-error", c.error);
  root.style.setProperty("--color-background", c.background);
  root.style.setProperty("--color-surface", c.surface);
  root.style.setProperty("--color-text", c.text);
  root.style.setProperty("--color-text-muted", c.textMuted);
  root.style.setProperty("--color-border", c.border);
  root.style.setProperty("--gradient-from", c.gradientFrom);
  root.style.setProperty("--gradient-to", c.gradientTo);

  root.style.setProperty("--radius-sm", theme.radius.sm);
  root.style.setProperty("--radius-md", theme.radius.md);
  root.style.setProperty("--radius-lg", theme.radius.lg);
  root.style.setProperty("--radius-xl", theme.radius.xl);

  root.style.setProperty("--shadow-sm", theme.shadow.sm);
  root.style.setProperty("--shadow-md", theme.shadow.md);
  root.style.setProperty("--shadow-lg", theme.shadow.lg);

  root.style.setProperty("--transition", theme.transition);
}
