"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
  const userData = localStorage.getItem("user");

  if (userData) {
    setIsLoggedIn(true);
    setUser(JSON.parse(userData));
  } else {
    setIsLoggedIn(false);
    setUser(null);
  }
}, []);

  const login = (_, userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
  setIsLoggedIn(true);
  setUser(userData);
};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
