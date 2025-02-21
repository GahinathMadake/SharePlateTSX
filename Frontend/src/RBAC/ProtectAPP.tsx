import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";
import Spinner from "@/Animations/Spinner";

const ProtectedApp = () => {
  const { user, isLogin, fetchUserData } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("On Protect App");
    const checkAuth = async () => {
      if (!user && !isLogin) {
        await fetchUserData();
      }
      setLoading(false);
    };

    checkAuth();
  }, [user, isLogin, fetchUserData]);


  return <>
  {
    loading?
    <div className='w-full h-screen flex justify-center items-center'>
        <Spinner />
    </div>
    :
    <Outlet />
  }
  </>
};

export default ProtectedApp;