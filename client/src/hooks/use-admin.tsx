import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminContextType {
  isAdmin: boolean;
  login: (key: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ds_admin_mode");
    if (saved === "true") setIsAdmin(true);
  }, []);

  const login = (key: string) => {
    // This should match the secret on the server
    if (key === "dilpreet_admin_2026") {
      setIsAdmin(true);
      localStorage.setItem("ds_admin_mode", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("ds_admin_mode");
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
