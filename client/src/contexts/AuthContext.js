import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function parseJwt(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem("token");
    return t ? parseJwt(t) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setUser(parseJwt(token));
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  const isAuthenticated = () => {
    if (!token) return false;
    const payload = parseJwt(token);
    if (!payload || !payload.exp) return false;
    // exp is usually in seconds
    return Date.now() / 1000 < payload.exp;
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
