import React from 'react'

// Import Pages
import Navbar from '../components/common/Navbar'
import Hero from '../components/LandingPage/Hero'
import {FeatureSection} from '../components/LandingPage/FeatureSection'
import { AppUsageSection } from '../components/LandingPage/AppUsageSection'
import FAQ from '../components/LandingPage/FAQ';
import Footer from '../components/common/Footer';


const LandingPage = () => {
  return (
    <div className="relative z-0">
      <Navbar className="relative z-[1000]" />
      <Hero className='z-0'/>
      <FeatureSection />
      <AppUsageSection />
      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;
