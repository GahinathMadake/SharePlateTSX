import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";

const ProtectedApp = () => {
  const { user, isLogin, fetchUserData } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!user && !isLogin) {
        await fetchUserData();
      }
      setLoading(false);
    };

    checkAuth();
  }, [user, isLogin, fetchUserData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default ProtectedApp;