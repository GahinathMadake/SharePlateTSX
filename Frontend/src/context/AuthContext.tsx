import React, { createContext, useState, ReactNode, useContext } from "react";
import axios from "axios";

// Define the context type
interface AuthContextType {
  user: any;
  isLogin: boolean;
  setUser: (user: any) => void;
  fetchUserData: () => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  async function fetchUserData() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(import.meta.env.VITE_Backend_URL+"/api/getuser",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      setIsLogin(true);
    } catch (error) {
      console.error("Error fetching user:", error);
      setIsLogin(false);
      setUser(null);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLogin(false);
  };

  // Context value
  const value: AuthContextType = {
    isLogin,
    logout,
    user,
    setUser,
    fetchUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};


export default AuthContextProvider;
