import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DonerDashboard from "@/components/Dashboard/Restaurant/DonerDashboard";
import Donate from "./../components/Dashboard/Restaurant/Donate";
import Pastdonation from "./../components/Dashboard/Restaurant/Pastdonation";
import Tracklocation from "./../components/Dashboard/Restaurant/Tracklocation";
import ThanksPage from "@/components/Dashboard/Restaurant/ThanksPage";
import Donerprofile from "@/components/Dashboard/Restaurant/Donerprofile";
import Notification from "@/components/Dashboard/Restaurant/Notification";
import Donatemain from "@/components/Dashboard/Restaurant/Donatemain";
import Profileedit from "@/components/Dashboard/Restaurant/Profileedit";
const RestaurantDashBoard: React.FC = () => {
  
  return (
    <Router>
      <Routes>
        {/* Use DonerDashboard as the layout */}
        <Route path="/restaurant" element={<DonerDashboard />}>
          {/* Nested routes */}
          <Route path="/restaurant/donate" element={<Donate />} />
          <Route path="/restaurant/past-donations" element={<Pastdonation />} />
          <Route path="/restaurant/track-location" element={<Tracklocation />} />
          <Route path="/restaurant/thanks" element={<ThanksPage />} />
          <Route path="/restaurant/profile" element={<Donerprofile />} />
          <Route path="/restaurant/notifications" element={<Notification />} />
          <Route path="/restaurant/Donatemain" element={<Donatemain/>} />
         <Route path="/restaurant/profileedit" element={<Profileedit />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RestaurantDashBoard;