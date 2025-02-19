import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';


// Import Pages
import Navbar from '../components/common/Navbar'
import Spinner from '@/Animations/Spinner';
import Hero from '../components/LandingPage/Hero'
import {FeatureSection} from '../components/LandingPage/FeatureSection'
import { AppUsageSection } from '../components/LandingPage/AppUsageSection'
import FAQ from '../components/LandingPage/FAQ';
import Footer from '../components/common/Footer';


const LandingPage = () => {
  const {user, fetchUserData, isLogin} = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAndNavigate = async () => {
      setIsLoading(true);
      await fetchUserData();  // Fetch user data first
      setIsLoading(false);
    };

    fetchAndNavigate();
  }, []); // Run once on mount

  
  useEffect(() => {
    console.log("Updated User:", user);
    if (isLogin && user) {
      navigate(`/user/${user.role}`);
    }
  }, [user, isLogin]);

  return (
    <div className="relative z-0">
      {
        isLoading ?
        <div className='w-full h-screen flex justify-center items-center'>
          <Spinner />
        </div>

        :

        <>
          <Navbar className="relative z-[1000]" />
          <Hero className='z-0'/>
          <FeatureSection />
          <AppUsageSection />
          <FAQ />
          <Footer />
        </>
      }
    </div>
  );
};

export default LandingPage;
