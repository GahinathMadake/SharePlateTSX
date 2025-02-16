import React from 'react';
import Donate from './../components/Dashboard/Restaurant/Donate';
import Pastdonation from './../components/Dashboard/Restaurant/Pastdonation';
import Tracklocation from './../components/Dashboard/Restaurant/Tracklocation';
import ThanksPage from '@/components/Dashboard/Restaurant/ThanksPage';
import Donerprofile from '@/components/Dashboard/Restaurant/Donerprofile';
import Notification from '@/components/Dashboard/Restaurant/Notification';

const RestaurantDashBoard: React.FC = () => {
  return (
    <div>
      
      <Donate />
      <Pastdonation />
      <ThanksPage />
      <Tracklocation />
      <Donerprofile />
      <Notification />
    </div>
  );
};

export default RestaurantDashBoard;
