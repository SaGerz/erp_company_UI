import { createContext, useContext, useEffect, useState } from "react";
import { decodeJwt } from "../Utils/auth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(""); // "atasan" | "karyawan"
  const [userName, setUserName] = useState(""); 
  const [authLoading, setAuthLoading] = useState(true);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJwt(token);
      const role = decoded.role_id === 1 ? "atasan" : "karyawan";
      const name = decoded?.username;
      setUserName(name);
      setUserRole(role);
      console.log(`✅ User Role dari AuthContext: ${role}`);
    } else {
      setUserName("");
      setUserRole(""); // token hilang/logged out
    }
    setAuthLoading(false);
  };

  useEffect(() => {
    checkToken();

    // Listen perubahan token (misal setelah login/logout)
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  return (
    <AuthContext.Provider value={{ userName, userRole, authLoading, setUserRole, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
