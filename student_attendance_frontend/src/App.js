import React, { useEffect, useState } from "react";
import "./App.css";
import { applyTheme } from "./theme";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import DashboardLayout from "./pages/Dashboard";
import MarkAttendance from "./pages/MarkAttendance";
import Records from "./pages/Records";
import Reports from "./pages/Reports";

// Simple in-app router state without external deps
function AppRouter() {
  const { isAuthenticated } = useAuth();
  const [route, setRoute] = useState("mark");

  useEffect(() => {
    applyTheme();
  }, []);

  if (!isAuthenticated) {
    return <Login onSuccess={() => setRoute("mark")} />;
  }

  const renderRoute = () => {
    switch (route) {
      case "mark":
        return <MarkAttendance />;
      case "records":
        return <Records />;
      case "reports":
        return <Reports />;
      default:
        return <MarkAttendance />;
    }
  };

  return (
    <DashboardLayout current={route} onNavigate={setRoute}>
      {renderRoute()}
    </DashboardLayout>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Root application component with theme and auth provider. */
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
