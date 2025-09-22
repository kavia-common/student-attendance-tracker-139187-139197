import React, { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, logout as apiLogout } from "../api/client";

// PUBLIC_INTERFACE
export const AuthContext = createContext({
  /** Auth context with user email and token presence. */
  isAuthenticated: false,
  user: null,
  login: async (_email, _password) => {},
  logout: () => {},
});

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access auth context values. */
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provider to wrap the app and manage auth state persisted via localStorage token. */
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const email = localStorage.getItem("auth_email");
    if (token && email) {
      setUser({ email });
    }
  }, []);

  const handleLogin = async (email, password) => {
    const res = await apiLogin(email, password);
    // backend returns token; store email for header display
    localStorage.setItem("auth_email", email);
    setUser({ email });
    return res;
  };

  const handleLogout = () => {
    apiLogout();
    localStorage.removeItem("auth_email");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
