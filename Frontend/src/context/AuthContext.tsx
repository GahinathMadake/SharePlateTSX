import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
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
    console.log("Fetching User Data...");
    
    try{
      const response = await axios.get(
        `${import.meta.env.VITE_Backend_URL}/user/getUser`,
        {
          withCredentials: true,
        }
      );
  
      if (response.data) {
        setUser(response.data.user);
        setIsLogin(true);
      } 
      else {
        throw new Error("No user data returned");
      }
    } 
    catch (error) {
      console.error("Error fetching user:", error);
      setIsLogin(false);
      setUser(null);
    }
  }
  

  const logout = async () => {
    try {
      console.log("Logging Out!!");
  
      // Call backend to clear the authentication cookie
      await axios.post(`${import.meta.env.VITE_Backend_URL}/user/logout`, {}, {
        withCredentials: true,
      });
  
      // Clear user state in frontend
      setUser(null);
      setIsLogin(false);
    } 
    catch (error) {
      console.error("Logout Error:", error);
    }
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
